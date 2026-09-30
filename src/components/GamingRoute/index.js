import  {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  GamingContainer,
  AppBodyContainer,
  ContentContainer,
  BannerContainer,
  BannerIconContainer,
  BannerHeading,
  GamingVideosList,
  GamingVideoItem,
  ThumbnailImage,
  VideoTitle,
  ViewsCount,
  LoadingViewContainer,
  FailureViewContainer,
  FailureImage,
  FailureHeading,
  FailureDesc,
  RetryButton,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GamingRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedVideos = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      this.setState({
        videosList: formattedVideos,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <LoadingViewContainer className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </LoadingViewContainer>
  )

  renderFailureView = isDarkTheme => {
    const failureImgUrl = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    return (
      <FailureViewContainer>
        <FailureImage src={failureImgUrl} alt="failure view" />
        <FailureHeading isDarkTheme={isDarkTheme}>
          Oops! Something Went Wrong
        </FailureHeading>
        <FailureDesc isDarkTheme={isDarkTheme}>
          We are having some trouble to complete your request. Please try again.
        </FailureDesc>
        <RetryButton type="button" onClick={this.getGamingVideos}>
          Retry
        </RetryButton>
      </FailureViewContainer>
    )
  }

  renderSuccessView = isDarkTheme => {
    const {videosList} = this.state

    return (
      <GamingVideosList>
        {videosList.map(video => (
          <GamingVideoItem key={video.id}>
            <Link to={`/videos/${video.id}`} style={{textDecoration: 'none'}}>
              <ThumbnailImage src={video.thumbnailUrl} alt="video thumbnail" />
              <VideoTitle isDarkTheme={isDarkTheme}>{video.title}</VideoTitle>
              <ViewsCount>{video.viewCount} Worldwide</ViewsCount>
            </Link>
          </GamingVideoItem>
        ))}
      </GamingVideosList>
    )
  }

  renderGamingContent = isDarkTheme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView(isDarkTheme)
      case apiStatusConstants.failure:
        return this.renderFailureView(isDarkTheme)
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <GamingContainer isDarkTheme={isDarkTheme} data-testid="gaming">
              <Header />
              <AppBodyContainer>
                <Sidebar />
                <ContentContainer>
                  <BannerContainer
                    data-testid="banner"
                    isDarkTheme={isDarkTheme}
                  >
                    <BannerIconContainer isDarkTheme={isDarkTheme}>
                      <SiYoutubegaming size={28} color="#ff0000" />
                    </BannerIconContainer>
                    <BannerHeading isDarkTheme={isDarkTheme}>
                      Gaming
                    </BannerHeading>
                  </BannerContainer>
                  {this.renderGamingContent(isDarkTheme)}
                </ContentContainer>
              </AppBodyContainer>
            </GamingContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default GamingRoute
