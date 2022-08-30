import React from 'react'
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

function Sidebar() {
  const { data: session, status } = useSession()

  return (
    <div className="text-gray-500 h-screen border-r-2 border-slate-800 p-5 md:max-w-[12rem] overflow-y-scroll scrollbar-hide lg:max-w-[15rem] hidden md:inline-flex">
      <div className="flex flex-col space-y-4">
        <div>
          <Button Icon={HomeIcon} title="Log out" onClick={() => signOut()} />
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
      </div>
    </div>
  )
}

export default Sidebar
