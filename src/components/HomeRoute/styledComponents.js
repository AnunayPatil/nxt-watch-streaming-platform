import styled from 'styled-components'

export const HomeMainContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
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
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const BannerLeftPart = styled.div`
  width: 45%;
`

export const BannerLogo = styled.img`
  width: 140px;
`

export const BannerText = styled.p`
  font-family: 'Roboto';
  font-size: 16px;
  color: #1e293b;
  margin: 16px 0;
`

export const GetItNowButton = styled.button`
  background-color: transparent;
  border: 1px solid #1e293b;
  color: #1e293b;
  font-family: 'Roboto';
  font-weight: bold;
  padding: 8px 16px;
  cursor: pointer;
`

export const CloseBannerButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`

export const SearchAndVideosContainer = styled.div`
  padding: 24px;
`

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 450px;
  border: 1px solid ${props => (props.isDarkTheme ? '#606060' : '#cccccc')};
  margin-bottom: 24px;
`

export const SearchInput = styled.input`
  flex-grow: 1;
  background: transparent;
  border: none;
  padding: 8px 12px;
  font-family: 'Roboto';
  outline: none;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#000000')};
`

export const SearchButton = styled.button`
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#f4f4f4')};
  border: none;
  border-left: 1px solid
    ${props => (props.isDarkTheme ? '#606060' : '#cccccc')};
  padding: 8px 24px;
  cursor: pointer;
  outline: none;
`

export const VideosList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

export const VideoItem = styled.li`
  width: 100%;
  max-width: 300px;
`

export const ThumbnailImage = styled.img`
  width: 100%;
  border-radius: 4px;
`

export const VideoDetailsContainer = styled.div`
  display: flex;
  margin-top: 10px;
`

export const ChannelLogo = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
`

export const VideoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const VideoTitle = styled.p`
  font-family: 'Roboto';
  font-size: 13px;
  margin: 0 0 6px 0;
  line-height: 1.4;
  color: ${props => (props.isDarkTheme ? '#f9f9f9' : '#1e293b')};
`

export const ChannelName = styled.p`
  font-family: 'Roboto';
  font-size: 12px;
  color: #64748b;
  margin: 0 0 4px 0;
`

export const ViewsAndDate = styled.p`
  font-family: 'Roboto';
  font-size: 12px;
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
  text-align: center;
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
  font-family: 'Roboto';
  font-weight: 500;
  border: none;
  border-radius: 4px;
  padding: 10px 24px;
  cursor: pointer;
`