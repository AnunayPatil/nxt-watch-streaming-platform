import styled from 'styled-components'

export const NotFoundMainContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
  min-height: 100vh;
`

export const AppBodyContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`

export const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NotFoundCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
`

export const NotFoundImage = styled.img`
  width: 320px;
  margin-bottom: 20px;
`

export const NotFoundHeading = styled.h1`
  font-family: 'Roboto';
  font-size: 24px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#1e293b')};
  margin-bottom: 12px;
`

export const NotFoundDesc = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  color: ${props => (props.isDarkTheme ? '#94a3b8' : '#475569')};
  margin: 0;
`