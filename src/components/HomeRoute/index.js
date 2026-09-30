import  {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'

import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  HomeMainContainer,
  AppBodyContainer,
  ContentContainer,
  BannerContainer,
  BannerLeftPart,
  BannerLogo,
  BannerText,
  GetItNowButton,
  CloseBannerButton,
  SearchAndVideosContainer,
  SearchInputContainer,
  SearchInput,
  SearchButton,
  VideosList,
  VideoItem,
  ThumbnailImage,
  VideoDetailsContainer,
  ChannelLogo,
  VideoTextContainer,
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

class HomeRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
    searchInput: '',
    showBanner: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.getVideos()
    }
  }

  onClickSearch = () => {
    this.getVideos()
  }

  onClickCloseBanner = () => {
    this.setState({showBanner: false})
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
        <RetryButton type="button" onClick={this.getVideos}>
          Retry
        </RetryButton>
      </FailureViewContainer>
    )
  }

  renderNoVideosView = isDarkTheme => (
    <FailureViewContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <FailureHeading isDarkTheme={isDarkTheme}>
        No Search results found
      </FailureHeading>
      <FailureDesc isDarkTheme={isDarkTheme}>
        Try different key words or remove search filter
      </FailureDesc>
      <RetryButton type="button" onClick={this.getVideos}>
        Retry
      </RetryButton>
    </FailureViewContainer>
  )

  renderSuccessView = isDarkTheme => {
    const {videosList} = this.state
    if (videosList.length === 0) {
      return this.renderNoVideosView(isDarkTheme)
    }

    return (
      <VideosList>
        {videosList.map(video => {
          let timeAgo = ''
          try {
            timeAgo = formatDistanceToNow(new Date(video.publishedAt))
          } catch (e) {
            timeAgo = video.publishedAt
          }

          return (
            <VideoItem key={video.id}>
              <Link to={`/videos/${video.id}`} style={{textDecoration: 'none'}}>
                <ThumbnailImage
                  src={video.thumbnailUrl}
                  alt="video thumbnail"
                />
                <VideoDetailsContainer>
                  <ChannelLogo
                    src={video.channel.profileImageUrl}
                    alt="channel logo"
                  />
                  <VideoTextContainer>
                    <VideoTitle isDarkTheme={isDarkTheme}>
                      {video.title}
                    </VideoTitle>
                    <ChannelName>{video.channel.name}</ChannelName>
                    <ViewsAndDate>
                      {video.viewCount} views • {timeAgo}
                    </ViewsAndDate>
                  </VideoTextContainer>
                </VideoDetailsContainer>
              </Link>
            </VideoItem>
          )
        })}
      </VideosList>
    )
  }

  renderHomeContent = isDarkTheme => {
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
    const {searchInput, showBanner} = this.state

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <HomeMainContainer isDarkTheme={isDarkTheme} data-testid="home">
              <Header />
              <AppBodyContainer>
                <Sidebar />
                <ContentContainer>
                  {showBanner && (
                    <BannerContainer data-testid="banner">
                      <BannerLeftPart>
                        <BannerLogo
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <BannerText>
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </BannerText>
                        <GetItNowButton type="button">
                          GET IT NOW
                        </GetItNowButton>
                      </BannerLeftPart>
                      <CloseBannerButton
                        type="button"
                        data-testid="close"
                        onClick={this.onClickCloseBanner}
                      >
                        <AiOutlineClose size={18} />
                      </CloseBannerButton>
                    </BannerContainer>
                  )}

                  <SearchAndVideosContainer>
                    <SearchInputContainer isDarkTheme={isDarkTheme}>
                      <SearchInput
                        type="search"
                        placeholder="Search"
                        value={searchInput}
                        onChange={this.onChangeSearchInput}
                        onKeyDown={this.onKeyDownSearch}
                        isDarkTheme={isDarkTheme}
                      />
                      <SearchButton
                        type="button"
                        data-testid="searchButton"
                        onClick={this.onClickSearch}
                        isDarkTheme={isDarkTheme}
                      >
                        <AiOutlineSearch size={18} color="#909090" />
                      </SearchButton>
                    </SearchInputContainer>
                    {this.renderHomeContent(isDarkTheme)}
                  </SearchAndVideosContainer>
                </ContentContainer>
              </AppBodyContainer>
            </HomeMainContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default HomeRoute
