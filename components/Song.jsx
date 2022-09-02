/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentTrackState, isPlayingState } from '../atoms/songAtom'
import { millisToMinutesAndSeconds } from './Support/time'

import useSpotify from '../hooks/useSpotify'
import { playlistAtom } from '../atoms/playlistAtom'

function Song({ item, index }) {
  const spotifyApi = useSpotify()
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const currentPlaylist = useRecoilValue(playlistAtom)

  const playSong = () => {
    setCurrentTrack(item.track)
    setIsPlaying(true)
    spotifyApi.play({
      // Provide spotify song's uri and the current playlist so that we can skip to next or previous song
      context_uri: currentPlaylist.uri,
      offset: {
        uri: item.track.uri,
      },
    })
  }

  return (
    <div
      key={item.track.id}
      className="flex justify-between p-3 md:grid md:grid-cols-4 rounded-md cursor-pointer hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center gap-x-4">
        <h2 className="text-left">{index + 1}</h2>
        <img className="w-12 h-12 object-cover" src={item?.track?.album?.images[0]?.url} alt="" />
        <div>
          <h2 className="font-bold !text-white flex-grow w-40 truncate">{item?.track?.name}</h2>
          <h2 className="font-semibold flex-grow">{item?.track?.artists?.[0].name}</h2>
        </div>
      </div>

      <h2 className="hidden md:inline-grid text-gray-500 justify-self-start">
        {item?.track?.album?.name}
      </h2>

      <h2 className="hidden md:inline-grid justify-self-center">
        {new Date(item.added_at).toLocaleDateString()}
      </h2>

      <h2 className="justify-self-end">{millisToMinutesAndSeconds(item.track.duration_ms)}</h2>
    </div>
  )
}

export default Song
