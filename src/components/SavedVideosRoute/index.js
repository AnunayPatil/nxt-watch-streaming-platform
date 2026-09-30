import {Link} from 'react-router-dom'
import {MdPlaylistAdd} from 'react-icons/md'
import {formatDistanceToNow} from 'date-fns'

import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  SavedVideosContainer,
  AppBodyContainer,
  ContentContainer,
  BannerContainer,
  BannerIconContainer,
  BannerHeading,
  VideosList,
  VideoItem,
  ThumbnailImage,
  VideoTextDetails,
  VideoTitle,
  ChannelName,
  ViewsAndDate,
  NoVideosContainer,
  NoVideosImage,
  NoVideosHeading,
  NoVideosDesc,
} from './styledComponents'

const SavedVideosRoute = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideos} = value
      const hasSavedVideos = savedVideos.length > 0

      return (
        <SavedVideosContainer
          isDarkTheme={isDarkTheme}
          data-testid="savedVideos"
        >
          <Header />
          <AppBodyContainer>
            <Sidebar />
            <ContentContainer>
              {hasSavedVideos ? (
                <>
                  <BannerContainer
                    data-testid="banner"
                    isDarkTheme={isDarkTheme}
                  >
                    <BannerIconContainer isDarkTheme={isDarkTheme}>
                      <MdPlaylistAdd size={28} color="#ff0000" />
                    </BannerIconContainer>
                    <BannerHeading isDarkTheme={isDarkTheme}>
                      Saved Videos
                    </BannerHeading>
                  </BannerContainer>

                  <VideosList>
                    {savedVideos.map(video => {
                      let timeAgo = ''
                      try {
                        timeAgo = formatDistanceToNow(
                          new Date(video.publishedAt),
                        )
                      } catch (e) {
                        timeAgo = video.publishedAt
                      }

                      return (
                        <VideoItem key={video.id}>
                          <Link
                            to={`/videos/${video.id}`}
                            style={{
                              textDecoration: 'none',
                              display: 'flex',
                              width: '100%',
                            }}
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
                        </VideoItem>
                      )
                    })}
                  </VideosList>
                </>
              ) : (
                <NoVideosContainer>
                  <NoVideosImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                  />
                  <NoVideosHeading isDarkTheme={isDarkTheme}>
                    No saved videos found
                  </NoVideosHeading>
                  <NoVideosDesc isDarkTheme={isDarkTheme}>
                    You can save your videos while watching them
                  </NoVideosDesc>
                </NoVideosContainer>
              )}
            </ContentContainer>
          </AppBodyContainer>
        </SavedVideosContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SavedVideosRoute
