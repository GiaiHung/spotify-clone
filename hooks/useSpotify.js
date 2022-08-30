import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import spotifyApi from '../lib/spotify'

function useSpotify() {
  const { data: session } = useSession()
  useEffect(() => {
    if (session) {
      // If refresh access token attemp fails, we redirect user to login page
      if (session.error === 'TokenRefreshError') {
        signIn()
      }

      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])

  return spotifyApi
}

export default useSpotify
