/* eslint-disable @next/next/no-img-element */
import { ClockIcon } from '@heroicons/react/outline'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistAtom } from '../atoms/playlistAtom'
import Song from './Song'

function Songs() {
  const playlist = useRecoilValue(playlistAtom)

  return (
    <div className="text-gray-500 flex flex-col space-y-2 pb-20 px-10 pt-10">
      {/* Songs header */}
      <div className="grid grid-cols-2 md:grid-cols-4 text-sm font-semibold px-3">
        <div className="flex gap-x-4">
          <h2>#</h2>
          <h2>Title</h2>
        </div>
        <h2 className="justify-self-start hidden md:inline-grid">ALBUM</h2>
        <h2 className="justify-self-center hidden md:inline-grid">DATE ADDED</h2>
        <ClockIcon className="h-5 justify-self-end" />
      </div>

      <hr className="py-2 text-gray-500 opacity-10" />

      {playlist?.tracks.items.map((item, index) => (
        <Song key={item.track.id} item={item} index={index} />
      ))}
    </div>
  )
}

export default Songs
