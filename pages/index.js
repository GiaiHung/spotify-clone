import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className='bg-black h-screen overflow-hidden'>
        <main>
          <Sidebar />
          {/* Main */}
        </main>
  
        <div>
          {/* Player */}
        </div>
      </div>
    </>
  )
}
