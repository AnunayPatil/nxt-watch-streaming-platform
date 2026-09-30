import  {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import NxtWatchContext from './context/NxtWatchContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import VideoItemDetailsRoute from './components/VideoItemDetailsRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideos: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  addOrRemoveSavedVideo = videoDetails => {
    this.setState(prevState => {
      const {savedVideos} = prevState
      const isAlreadySaved = savedVideos.some(
        each => each.id === videoDetails.id,
      )
      if (isAlreadySaved) {
        const updatedList = savedVideos.filter(
          each => each.id !== videoDetails.id,
        )
        return {savedVideos: updatedList}
      }
      return {savedVideos: [...savedVideos, videoDetails]}
    })
  }

  render() {
    const {isDarkTheme, savedVideos} = this.state

    return (
      <NxtWatchContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          savedVideos,
          addOrRemoveSavedVideo: this.addOrRemoveSavedVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <Route path="/not-found" component={NotFoundRoute} />
          <Redirect to="/not-found" />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App