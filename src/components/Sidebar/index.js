import {Link, withRouter} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import NxtWatchContext from '../../context/NxtWatchContext'
import {
  SidebarContainer,
  NavLinksList,
  NavLinkItem,
  NavLinkText,
  FooterContainer,
  ContactUsHeading,
  SocialIconsContainer,
  SocialIcon,
  ContactDescription,
} from './styledComponents'

const Sidebar = props => {
  const {match} = props
  const {path} = match

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <SidebarContainer isDarkTheme={isDarkTheme}>
            <NavLinksList>
              <Link to="/" style={{textDecoration: 'none'}}>
                <NavLinkItem isActive={path === '/'} isDarkTheme={isDarkTheme}>
                  <AiFillHome
                    size={18}
                    color={path === '/' ? '#ff0b37' : '#909090'}
                  />
                  <NavLinkText
                    isActive={path === '/'}
                    isDarkTheme={isDarkTheme}
                  >
                    Home
                  </NavLinkText>
                </NavLinkItem>
              </Link>

              <Link to="/trending" style={{textDecoration: 'none'}}>
                <NavLinkItem
                  isActive={path === '/trending'}
                  isDarkTheme={isDarkTheme}
                >
                  <AiFillFire
                    size={18}
                    color={path === '/trending' ? '#ff0b37' : '#909090'}
                  />
                  <NavLinkText
                    isActive={path === '/trending'}
                    isDarkTheme={isDarkTheme}
                  >
                    Trending
                  </NavLinkText>
                </NavLinkItem>
              </Link>

              <Link to="/gaming" style={{textDecoration: 'none'}}>
                <NavLinkItem
                  isActive={path === '/gaming'}
                  isDarkTheme={isDarkTheme}
                >
                  <SiYoutubegaming
                    size={18}
                    color={path === '/gaming' ? '#ff0b37' : '#909090'}
                  />
                  <NavLinkText
                    isActive={path === '/gaming'}
                    isDarkTheme={isDarkTheme}
                  >
                    Gaming
                  </NavLinkText>
                </NavLinkItem>
              </Link>

              <Link to="/saved-videos" style={{textDecoration: 'none'}}>
                <NavLinkItem
                  isActive={path === '/saved-videos'}
                  isDarkTheme={isDarkTheme}
                >
                  <MdPlaylistAdd
                    size={18}
                    color={path === '/saved-videos' ? '#ff0b37' : '#909090'}
                  />
                  <NavLinkText
                    isActive={path === '/saved-videos'}
                    isDarkTheme={isDarkTheme}
                  >
                    Saved videos
                  </NavLinkText>
                </NavLinkItem>
              </Link>
            </NavLinksList>

            <FooterContainer>
              <ContactUsHeading isDarkTheme={isDarkTheme}>
                CONTACT US
              </ContactUsHeading>
              <SocialIconsContainer>
                <SocialIcon
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <SocialIcon
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <SocialIcon
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </SocialIconsContainer>
              <ContactDescription isDarkTheme={isDarkTheme}>
                Enjoy Now to see your channels and recommendations!
              </ContactDescription>
            </FooterContainer>
          </SidebarContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default withRouter(Sidebar)
