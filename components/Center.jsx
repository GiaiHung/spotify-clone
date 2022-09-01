/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilValue, useRecoilState } from 'recoil'
import { playlistAtom, playlistAtomId } from '../atoms/playlistAtom'
import spotifyApi from '../lib/spotify'
import Songs from './Songs'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

function Center() {
  const { data: session } = useSession()
  const [color, setColor] = useState(null)
  const [playlist, setPlaylist] = useRecoilState(playlistAtom)
  const playlistId = useRecoilValue(playlistAtomId)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((error) => alert(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyApi, playlistId])

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex items-center px-4 py-2 gap-x-3 bg-black opacity-90 hover:opacity-80 rounded-full cursor-pointer" onClick={() => signOut()}>
          <img className="w-12 h-12 rounded-full" src={session?.user?.image} alt="" />
          <h2 className="font-semibold">{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5" />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80`}>
        <img
          className="ml-4 md:ml-12 w-44 h-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p className="text-2xl">PLAYLIST</p>
          <h2 className="text-2xl md-text-3xl lg:text-4xl font-bold">{playlist?.name}</h2>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center
