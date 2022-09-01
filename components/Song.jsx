/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import { millisToMinutesAndSeconds } from './Support/time'

import useSpotify  from '../hooks/useSpotify'

function Song({ item, index }) {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(item.track.id)
    setIsPlaying(true)
    spotifyApi.play({
      uris: [item.track.uri],
    })
  }

  return (
    <div
      key={item.track.id}
      className="flex justify-between p-3 md:grid md:grid-cols-4 rounded-md cursor-pointer hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center gap-x-4 ">
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
