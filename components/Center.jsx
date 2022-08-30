/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500',
  ];

function Center() {
  const { data: session } = useSession()
  const [color, setColor] = useState(null)

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [])

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div className="flex items-center px-4 py-2 gap-x-3 bg-black opacity-90 hover:opacity-80 rounded-full cursor-pointer">
          <img className="w-12 h-12 rounded-full" src={session?.user?.image} alt="" />
          <h2 className="font-semibold">{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80`}
      >
        <h1>Hello</h1>
      </section>
    </div>
  )
}

export default Center
