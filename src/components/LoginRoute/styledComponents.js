import styled from 'styled-components'

export const LoginBgContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
  font-family: 'Roboto';
`

export const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#ffffff')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
`

export const Logo = styled.img`
  width: 140px;
  align-self: center;
  margin-bottom: 24px;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`

export const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#64748b')};
  margin-bottom: 4px;
`

export const InputField = styled.input`
  height: 38px;
  border: 1px solid #94a3b8;
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
  font-family: 'Roboto';
  font-size: 14px;
  background-color: transparent;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#000000')};
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

export const Checkbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
`

export const CheckboxLabel = styled.label`
  font-size: 14px;
  cursor: pointer;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#0f0f0f')};
`

export const LoginButton = styled.button`
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  height: 38px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
`

export const ErrorMessage = styled.p`
  color: #ff0b37;
  font-size: 12px;
  margin-top: 8px;
`