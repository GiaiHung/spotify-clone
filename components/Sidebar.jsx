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

function Sidebar() {
  return (
    <div className="text-gray-500 border-r-2 border-gray-900 p-5 md:max-w-[12rem] lg:max-w-[15rem]  hidden md:inline-flex">
      <div className='flex flex-col space-y-4'>
        <div>
            <Button Icon={HomeIcon} title="Home" />
            <Button Icon={SearchIcon} title="Search" />
            <Button Icon={LibraryIcon} title="Your library" />
        </div>

        <div>
            <Button Icon={PlusCircleIcon} title="Create playlist" />
            <Button Icon={HeartIcon} title="Liked songs" />
            <Button Icon={RssIcon} title="Your espisodes" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
