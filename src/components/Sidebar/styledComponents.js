import styled from 'styled-components'

export const SidebarContainer = styled.div`
  width: 240px;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  height: calc(100vh - 60px);
`

export const NavLinksList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`

export const NavLinkItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background-color: ${props => {
    if (props.isActive) {
      return props.isDarkTheme ? '#383838' : '#f1f5f9'
    }
    return 'transparent'
  }};
  cursor: pointer;
`

export const NavLinkText = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  margin: 0 0 0 16px;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  color: ${props => (props.isDarkTheme ? '#f9f9f9' : '#1e293b')};
`

export const FooterContainer = styled.div`
  padding: 24px;
`

export const ContactUsHeading = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  color: ${props => (props.isDarkTheme ? '#f9f9f9' : '#1e293b')};
`

export const SocialIconsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin: 16px 0;
`

export const SocialIcon = styled.img`
  width: 30px;
  height: 30px;
`

export const ContactDescription = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 1.5;
  color: ${props => (props.isDarkTheme ? '#cccccc' : '#475569')};
`