import  {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'

import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  VideoDetailsMainContainer,
  AppBodyContainer,
  ContentContainer,
  PlayerWrapper,
  VideoTitle,
  VideoStatsAndButtonsContainer,
  ViewsAndDate,
  ButtonsGroup,
  ActionButton,
  HorizontalLine,
  ChannelDetailsContainer,
  ChannelLogo,
  ChannelTextContainer,
  ChannelName,
  SubscribersCount,
  VideoDescription,
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

class VideoItemDetailsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetails: {},
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const video = data.video_details
      const formattedDetails = {
        id: video.id,
        title: video.title,
        videoUrl: video.video_url,
        thumbnailUrl: video.thumbnail_url,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
          subscriberCount: video.channel.subscriber_count,
        },
        viewCount: video.view_count,
        publishedAt: video.published_at,
        description: video.description,
      }
      this.setState({
        videoDetails: formattedDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
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
        <RetryButton type="button" onClick={this.getVideoDetails}>
          Retry
        </RetryButton>
      </FailureViewContainer>
    )
  }

  renderSuccessView = (isDarkTheme, savedVideos, addOrRemoveSavedVideo) => {
    const {videoDetails, isLiked, isDisliked} = this.state
    const isSaved = savedVideos.some(each => each.id === videoDetails.id)

    let timeAgo = ''
    try {
      timeAgo = formatDistanceToNow(new Date(videoDetails.publishedAt))
    } catch (e) {
      timeAgo = videoDetails.publishedAt
    }

    return (
      <>
        <PlayerWrapper>
          <ReactPlayer
            url={videoDetails.videoUrl}
            controls
            width="100%"
            height="100%"
          />
        </PlayerWrapper>
        <VideoTitle isDarkTheme={isDarkTheme}>{videoDetails.title}</VideoTitle>
        <VideoStatsAndButtonsContainer>
          <ViewsAndDate>
            {videoDetails.viewCount} views • {timeAgo}
          </ViewsAndDate>
          <ButtonsGroup>
            <ActionButton
              type="button"
              isActive={isLiked}
              onClick={this.onClickLike}
            >
              <AiOutlineLike size={20} /> Like
            </ActionButton>
            <ActionButton
              type="button"
              isActive={isDisliked}
              onClick={this.onClickDislike}
            >
              <AiOutlineDislike size={20} /> Dislike
            </ActionButton>
            <ActionButton
              type="button"
              isActive={isSaved}
              onClick={() => addOrRemoveSavedVideo(videoDetails)}
            >
              <MdPlaylistAdd size={20} /> {isSaved ? 'Saved' : 'Save'}
            </ActionButton>
          </ButtonsGroup>
        </VideoStatsAndButtonsContainer>
        <HorizontalLine />
        <ChannelDetailsContainer>
          <ChannelLogo
            src={videoDetails.channel.profileImageUrl}
            alt="channel logo"
          />
          <ChannelTextContainer>
            <ChannelName isDarkTheme={isDarkTheme}>
              {videoDetails.channel.name}
            </ChannelName>
            <SubscribersCount>
              {videoDetails.channel.subscriberCount} subscribers
            </SubscribersCount>
            <VideoDescription isDarkTheme={isDarkTheme}>
              {videoDetails.description}
            </VideoDescription>
          </ChannelTextContainer>
        </ChannelDetailsContainer>
      </>
    )
  }

  renderContent = (isDarkTheme, savedVideos, addOrRemoveSavedVideo) => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView(
          isDarkTheme,
          savedVideos,
          addOrRemoveSavedVideo,
        )
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
          const {isDarkTheme, savedVideos, addOrRemoveSavedVideo} = value

          return (
            <VideoDetailsMainContainer
              isDarkTheme={isDarkTheme}
              data-testid="videoItemDetails"
            >
              <Header />
              <AppBodyContainer>
                <Sidebar />
                <ContentContainer>
                  {this.renderContent(
                    isDarkTheme,
                    savedVideos,
                    addOrRemoveSavedVideo,
                  )}
                </ContentContainer>
              </AppBodyContainer>
            </VideoDetailsMainContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default VideoItemDetailsRoute
