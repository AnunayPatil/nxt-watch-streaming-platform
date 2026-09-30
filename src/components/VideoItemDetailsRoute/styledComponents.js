import styled from 'styled-components'

export const VideoDetailsMainContainer = styled.div`
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
  padding: 24px;
`

export const PlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
  margin-bottom: 20px;
`

export const VideoTitle = styled.p`
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 12px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#1e293b')};
`

export const VideoStatsAndButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ViewsAndDate = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  color: #64748b;
  margin: 0;
`

export const ButtonsGroup = styled.div`
  display: flex;
  gap: 16px;
`

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  color: ${props => (props.isActive ? '#2563eb' : '#64748b')};
`

export const HorizontalLine = styled.hr`
  border: 1px solid #d7dfe9;
  margin: 20px 0;
`

export const ChannelDetailsContainer = styled.div`
  display: flex;
  gap: 16px;
`

export const ChannelLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`

export const ChannelTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ChannelName = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 4px 0;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#1e293b')};
`

export const SubscribersCount = styled.p`
  font-family: 'Roboto';
  font-size: 12px;
  color: #64748b;
  margin: 0 0 16px 0;
`

export const VideoDescription = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 1.6;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#475569')};
  margin: 0;
`

export const LoadingViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
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