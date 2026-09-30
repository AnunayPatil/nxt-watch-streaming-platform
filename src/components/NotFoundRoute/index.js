import Header from '../Header'
import Sidebar from '../Sidebar'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  NotFoundMainContainer,
  AppBodyContainer,
  ContentContainer,
  NotFoundCard,
  NotFoundImage,
  NotFoundHeading,
  NotFoundDesc,
} from './styledComponents'

const NotFoundRoute = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const notFoundImgUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <NotFoundMainContainer isDarkTheme={isDarkTheme}>
          <Header />
          <AppBodyContainer>
            <Sidebar />
            <ContentContainer>
              <NotFoundCard>
                <NotFoundImage src={notFoundImgUrl} alt="not found" />
                <NotFoundHeading isDarkTheme={isDarkTheme}>
                  Page Not Found
                </NotFoundHeading>
                <NotFoundDesc isDarkTheme={isDarkTheme}>
                  we are sorry, the page you requested could not be found.
                </NotFoundDesc>
              </NotFoundCard>
            </ContentContainer>
          </AppBodyContainer>
        </NotFoundMainContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFoundRoute
