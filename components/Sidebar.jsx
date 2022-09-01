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
import { useSession, signOut } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import {playlistAtomId} from '../atoms/playlistAtom'

function Sidebar() {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistAtomId)
  const spotifyApi = useSpotify()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => setPlaylists(data.body.items))
    }
  }, [session, spotifyApi])

  return (
    <div className="text-gray-500 h-screen border-r-2 border-slate-800 p-5 min-w-[13rem] md:max-w-[13rem] overflow-y-scroll scrollbar-hide lg:max-w-[15rem] hidden md:inline-flex">
      <div className="flex flex-col space-y-4">
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

        <div className="flex flex-col space-y-4 pb-4">
          {playlists.map((playlist) => (
            <p
              key={playlist.id}
              className={`text-gray-500 cursor-pointer hover:text-white ${playlist.id === playlistId && '!text-white'}`}
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
