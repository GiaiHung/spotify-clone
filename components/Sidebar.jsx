import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline'
import Button from './Support/Button'
import { useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { playlistAtomId } from '../atoms/playlistAtom'
import { sidebarActiveState } from '../atoms/sidebarAtom'

function Sidebar() {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistAtomId)
  const [sidebarActive, setSidebarActive] = useRecoilState(sidebarActiveState)
  const spotifyApi = useSpotify()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => setPlaylists(data.body.items))
    }
  }, [session, spotifyApi])

  return (
    <div
      className={`text-gray-500 h-screen bg-black md:h-[90vh] md:border-r-2 md:border-slate-800 p-5 md:max-w-[13rem] overflow-y-scroll scrollbar-hide lg:max-w-[15rem] absolute md:relative -translate-x-full md:translate-x-0 ease-in-out duration-200 ${
        sidebarActive && 'active'
      }`}
    >
      <div className="flex flex-col space-y-4 relative">
        <div
          className="absolute right-4 top-4 text-2xl text-white cursor-pointer block md:hidden"
          onClick={() => setSidebarActive(!sidebarActive)}
        >
          &times;
        </div>
        <div>
          <Button Icon={HomeIcon} title="Home" />
          <Button Icon={SearchIcon} title="Search" />
          <Button Icon={LibraryIcon} title="Your library" />
          <hr className="border-t-[0.1px] border-gray-700 -mt-2" />
        </div>

        <div>
          <Button Icon={PlusCircleIcon} title="Create playlist" />
          <Button Icon={HeartIcon} title="Liked songs" />
          <Button Icon={RssIcon} title="Your espisodes" />
          <hr className="border-t-[0.1px] border-gray-700 -mt-2" />
        </div>

        <div className="flex flex-col space-y-4 pb-8">
          {playlists.map((playlist) => (
            <p
              key={playlist.id}
              className={`text-gray-500 cursor-pointer hover:text-white ${
                playlist.id === playlistId && '!text-white'
              }`}
              onClick={() => setPlaylistId(playlist.id)}
            >
              {playlist.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
