import styled from 'styled-components'

export const NavHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 30px;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  height: 60px;
`

export const LogoImage = styled.img`
  width: 120px;
  cursor: pointer;
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`

export const ThemeButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin-right: 20px;
  outline: none;
`

export const ProfileImage = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 20px;
`

export const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  padding: 6px 14px;
  font-family: 'Roboto';
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
`

export const ModalContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  border-radius: 8px;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ModalHeading = styled.p`
  font-family: 'Roboto';
  font-size: 15px;
  color: ${props => (props.isDarkTheme ? '#f9f9f9' : '#00306e')};
  margin-bottom: 24px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
`

export const CloseButton = styled.button`
  background-color: transparent;
  border: 1px solid #7e858e;
  color: #7e858e;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`

export const ConfirmButton = styled.button`
  background-color: #3b82f6;
  border: none;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`
