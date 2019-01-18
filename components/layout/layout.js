import Page from '~/components/layout/page'
import Header from '~/components/layout/header'
import { UserContext } from '~/lib/user-context'
import UseTeamInfo from '~/lib/use-team-info'
import * as bodyLocker from '~/lib/utils/body-locker'

export default class Layout extends React.Component {
  state = {
    navigationActive: false
  }

  handleToggleNavigation = () => {
    this.setState(({ navigationActive }) => {
      if (navigationActive) {
        bodyLocker.unlock()
      } else {
        bodyLocker.lock()
      }

      return {
        navigationActive: !navigationActive
      }
    })
  }

  render() {
    const { children } = this.props

    return (
      <Page>
        <UserContext.Consumer>
          {({ user, userLoaded }) => (
            <UseTeamInfo
              user={user}
              render={({ teams }) => (
                <Header
                  onToggleNavigation={this.handleToggleNavigation}
                  user={user}
                  teams={teams}
                  userLoaded={userLoaded}
                />
              )}
            />
          )}
        </UserContext.Consumer>
        {children}
      </Page>
    )
  }
}
