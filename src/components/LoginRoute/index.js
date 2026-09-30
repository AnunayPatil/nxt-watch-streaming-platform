import  {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'
import {
  LoginBgContainer,
  FormCard,
  Logo,
  InputContainer,
  Label,
  InputField,
  CheckboxContainer,
  Checkbox,
  CheckboxLabel,
  LoginButton,
  ErrorMessage,
} from './styledComponents'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onToggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showPassword, showSubmitError, errorMsg} =
      this.state

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const logoUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <LoginBgContainer isDarkTheme={isDarkTheme}>
              <FormCard isDarkTheme={isDarkTheme} onSubmit={this.submitForm}>
                <Logo src={logoUrl} alt="website logo" />
                <InputContainer>
                  <Label htmlFor="username" isDarkTheme={isDarkTheme}>
                    USERNAME
                  </Label>
                  <InputField
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.onChangeUsername}
                    isDarkTheme={isDarkTheme}
                  />
                </InputContainer>
                <InputContainer>
                  <Label htmlFor="password" isDarkTheme={isDarkTheme}>
                    PASSWORD
                  </Label>
                  <InputField
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangePassword}
                    isDarkTheme={isDarkTheme}
                  />
                </InputContainer>
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={this.onToggleShowPassword}
                  />
                  <CheckboxLabel
                    htmlFor="showPassword"
                    isDarkTheme={isDarkTheme}
                  >
                    Show Password
                  </CheckboxLabel>
                </CheckboxContainer>
                <LoginButton type="submit">Login</LoginButton>
                {showSubmitError && <ErrorMessage>*{errorMsg}</ErrorMessage>}
              </FormCard>
            </LoginBgContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default LoginRoute
