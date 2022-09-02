/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'

import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  ReplyIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline'
import { debounce } from 'lodash'

function Player() {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [songInfo, setSongInfo] = useRecoilState(currentTrackState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  const fetchCurrentSong = () => {
    spotifyApi.getMyCurrentPlayingTrack().then((data) => {
      setSongInfo(data?.body?.item)
      spotifyApi.getMyCurrentPlaybackState().then((data) => setIsPlaying(data.body?.is_playing))
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((error) => {})
    }, 500),
    [spotifyApi]
  )

  const handleSkipSong = async (skipTo) => {
    if (skipTo === 'previous') {
      await spotifyApi.skipToPrevious()
    } else {
      await spotifyApi.skipToNext()
    }

    fetchCurrentSong()
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      fetchCurrentSong()
      setVolume(50)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyApi, session])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume])

  return (
    <div className="text-white bg-gradient-to-b from-[#111] to-gray-900 h-20 grid grid-cols-3 px-4 md:px-8 text-sm md:text-base lg:text-md ">
      <div className="flex items-center gap-x-4">
        <img className="w-12 h-12 object-cover" src={songInfo?.album?.images?.[0]?.url} alt="" />
        <div>
          <h2 className="font-semibold w-20 truncate md:w-60">{songInfo?.name}</h2>
          <p className="text-gray-500">{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button hidden md:inline" />
        <RewindIcon className="button" onClick={handleSkipSong.bind(this, 'previous')} />
        {isPlaying ? (
          <PauseIcon className="button h-10 w-10" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="button h-10 w-10" onClick={handlePlayPause} />
        )}
        <FastForwardIcon className="button" onClick={handleSkipSong.bind(this, 'next')} />
        <ReplyIcon className="button hidden md:inline" />
      </div>
      <div className="flex items-center gap-x-4 justify-end">
        <VolumeDownIcon className="button" onClick={() => volume > 0 && setVolume(volume - 10)} />
        <input
          className="slider w-16 md:w-32"
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon className="button" onClick={() => volume < 100 && setVolume(volume + 10)} />
      </div>
    </div>
  )
}

export default Player
