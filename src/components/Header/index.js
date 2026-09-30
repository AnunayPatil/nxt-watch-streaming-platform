import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'

import NxtWatchContext from '../../context/NxtWatchContext'
import {
  NavHeader,
  LogoImage,
  ActionsContainer,
  ThemeButton,
  ProfileImage,
  LogoutButton,
  ModalContainer,
  ModalHeading,
  ButtonsContainer,
  CloseButton,
  ConfirmButton,
} from './styledComponents'

const Header = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const logoUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      return (
        <NavHeader isDarkTheme={isDarkTheme}>
          <Link to="/">
            <LogoImage src={logoUrl} alt="website logo" />
          </Link>
          <ActionsContainer>
            <ThemeButton
              type="button"
              data-testid="theme"
              onClick={toggleTheme}
            >
              {isDarkTheme ? (
                <FiSun color="#ffffff" size={24} />
              ) : (
                <FaMoon color="#000000" size={24} />
              )}
            </ThemeButton>
            <ProfileImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup
              modal
              trigger={
                <LogoutButton type="button" isDarkTheme={isDarkTheme}>
                  Logout
                </LogoutButton>
              }
              className="popup-content"
            >
              {close => (
                <ModalContainer isDarkTheme={isDarkTheme}>
                  <ModalHeading isDarkTheme={isDarkTheme}>
                    Are you sure, you want to logout?
                  </ModalHeading>
                  <ButtonsContainer>
                    <CloseButton
                      type="button"
                      data-testid="closeButton"
                      onClick={() => close()}
                    >
                      Cancel
                    </CloseButton>
                    <ConfirmButton type="button" onClick={onClickLogout}>
                      Confirm
                    </ConfirmButton>
                  </ButtonsContainer>
                </ModalContainer>
              )}
            </Popup>
          </ActionsContainer>
        </NavHeader>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default withRouter(Header)
