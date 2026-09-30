import styled from 'styled-components'

export const TrendingContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  min-height: 100vh;
`

export const AppBodyContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`

export const ContentContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`

export const BannerContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#ebebeb')};
  padding: 16px 24px;
  display: flex;
  align-items: center;
`

export const BannerIconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#d7dfe9')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`

export const BannerHeading = styled.h1`
  font-family: 'Roboto';
  font-size: 24px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#1e293b')};
`

export const TrendingVideosList = styled.ul`
  list-style-type: none;
  padding: 24px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const TrendingVideoItem = styled.li`
  display: flex;
  width: 100%;
`

export const ThumbnailImage = styled.img`
  width: 320px;
  border-radius: 4px;
  margin-right: 20px;
`

export const VideoTextDetails = styled.div`
  display: flex;
  flex-direction: column;
`

export const VideoTitle = styled.p`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: ${props => (props.isDarkTheme ? '#f9f9f9' : '#1e293b')};
`

export const ChannelName = styled.p`
  font-family: 'Roboto';
  font-size: 13px;
  color: #64748b;
  margin: 0 0 6px 0;
`

export const ViewsAndDate = styled.p`
  font-family: 'Roboto';
  font-size: 13px;
  color: #64748b;
  margin: 0;
`

export const LoadingViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`

export const FailureViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`

export const FailureImage = styled.img`
  width: 250px;
  margin-bottom: 20px;
`

export const FailureHeading = styled.h1`
  font-family: 'Roboto';
  font-size: 20px;
  color: ${props => (props.isDarkTheme ? '#f9f9f9' : '#1e293b')};
  margin-bottom: 12px;
`

export const FailureDesc = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  color: ${props => (props.isDarkTheme ? '#94a3b8' : '#475569')};
  margin-bottom: 20px;
`

export const RetryButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 24px;
  cursor: pointer;
`