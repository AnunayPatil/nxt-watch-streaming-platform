import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  savedVideos: [],
  addOrRemoveSavedVideo: () => {},
})

export default NxtWatchContext
