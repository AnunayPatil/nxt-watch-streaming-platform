import  {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillFire} from 'react-icons/ai'
import {formatDistanceToNow} from 'date-fns'

import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  TrendingContainer,
  AppBodyContainer,
  ContentContainer,
  BannerContainer,
  BannerIconContainer,
  BannerHeading,
  TrendingVideosList,
  TrendingVideoItem,
  ThumbnailImage,
  VideoTextDetails,
  VideoTitle,
  ChannelName,
  ViewsAndDate,
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

class TrendingRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        viewCount: each.view_count,
        publishedAt: each.published_at,
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
        <RetryButton type="button" onClick={this.getTrendingVideos}>
          Retry
        </RetryButton>
      </FailureViewContainer>
    )
  }

  renderSuccessView = isDarkTheme => {
    const {videosList} = this.state

    return (
      <TrendingVideosList>
        {videosList.map(video => {
          let timeAgo = ''
          try {
            timeAgo = formatDistanceToNow(new Date(video.publishedAt))
          } catch (e) {
            timeAgo = video.publishedAt
          }

          return (
            <TrendingVideoItem key={video.id}>
              <Link
                to={`/videos/${video.id}`}
                style={{textDecoration: 'none', display: 'flex', width: '100%'}}
              >
                <ThumbnailImage
                  src={video.thumbnailUrl}
                  alt="video thumbnail"
                />
                <VideoTextDetails>
                  <VideoTitle isDarkTheme={isDarkTheme}>
                    {video.title}
                  </VideoTitle>
                  <ChannelName>{video.channel.name}</ChannelName>
                  <ViewsAndDate>
                    {video.viewCount} views • {timeAgo}
                  </ViewsAndDate>
                </VideoTextDetails>
              </Link>
            </TrendingVideoItem>
          )
        })}
      </TrendingVideosList>
    )
  }

  renderTrendingContent = isDarkTheme => {
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
            <TrendingContainer isDarkTheme={isDarkTheme} data-testid="trending">
              <Header />
              <AppBodyContainer>
                <Sidebar />
                <ContentContainer>
                  <BannerContainer
                    data-testid="banner"
                    isDarkTheme={isDarkTheme}
                  >
                    <BannerIconContainer isDarkTheme={isDarkTheme}>
                      <AiFillFire size={28} color="#ff0000" />
                    </BannerIconContainer>
                    <BannerHeading isDarkTheme={isDarkTheme}>
                      Trending
                    </BannerHeading>
                  </BannerContainer>
                  {this.renderTrendingContent(isDarkTheme)}
                </ContentContainer>
              </AppBodyContainer>
            </TrendingContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default TrendingRoute
