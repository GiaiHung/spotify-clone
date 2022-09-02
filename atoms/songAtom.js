import { atom } from 'recoil'

export const currentTrackState = atom({
  key: 'currentTrack',
  default: null
})

export const isPlayingState = atom({
  key: 'isPlaying',
  default: false,
})
