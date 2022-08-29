/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React from 'react'

import { getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
  return (
    <>
      <Head>
        <title>Spotify Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex flex-col gap-y-5 justify-center items-center bg-black">
        <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.name}>
              <button
                className="bg-[#18d860] text-white p-5 rounded-full cursor-pointer hover:bg-[#01be4a]"
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                Log in with {provider.name}
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default Login
