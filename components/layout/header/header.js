import { Component, Fragment } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import logout from '~/lib/logout'
import getDashboardHref from '~/lib/utils/get-dashboard-href'
import { Menu, MenuItem, MenuDivider } from '~/components/menu'
import { Navigation, NavigationItem } from '~/components/navigation'
import Avatar from '~/components/avatar'
import ChatCount from '~/components/chat-count'
import LayoutHeader from './header-wrapper'
import Logo from '~/components/icons/logo'
import Plus from '~/components/icons/plus'
import Arrow from '~/components/icons/arrow'

class Header extends Component {
  state = {
    menuActive: false
  }

  handleAvatarClick = () => {
    this.setState(state => ({
      menuActive: !state.menuActive
    }))
  }

  handleLogout = async () => {
    await logout()
    Router.push('/login')
  }

  handleClickOutsideMenu = () => {
    this.setState(() => ({
      menuActive: false
    }))
  }

  handleClickEditProfile = e => {
    if (!e.metaKey) {
      e.preventDefault()

      const { user } = this.props
      if (!user) return

      const urlSegment = user.username || 'profile'

      if (window.location.pathname.includes(urlSegment)) {
        Router.push(
          { pathname: '/user-profile', query: { editing: '1' } },
          `/${urlSegment}/edit`,
          { shallow: true }
        )
      } else {
        Router.push(
          { pathname: '/user-profile', query: { editing: '1' } },
          `/${urlSegment}/edit`
        )
      }

      return
    }
  }

  renderMenuTrigger = ({ handleProviderRef, menu }) => {
    const { user } = this.props
    return (
      <span
        onClick={this.handleAvatarClick}
        ref={handleProviderRef}
        style={{ position: 'relative' }}
      >
        <Avatar user={user} uid={user.uid} hash={user.avatar} size={30} />
        {menu}
        <style jsx>{`
          span {
            cursor: pointer;
            margin-left: 10px;
          }
        `}</style>
      </span>
    )
  }

  renderTeam = ({
    displayName = null,
    avatar,
    teamId,
    teamSlug,
    username,
    uid
  }) => {
    const currentTeam = this.props.team

    const slug = teamSlug || username
    const active = !currentTeam && !teamSlug ? true : currentTeam === teamSlug
    const linkProps = teamSlug
      ? {
          as: `/teams/${teamSlug}/settings/identity`,
          href: {
            pathname: `/teams/settings/identity`,
            query: { teamSlug }
          }
        }
      : { as: '/account', href: '/account/identity' }

    return (
      <MenuItem key={slug} active={active}>
        <Link {...linkProps}>
          <a className={active ? 'active team' : 'team'}>
            <span className="user">
              <span className="avatar">
                <Avatar
                  teamId={teamId}
                  username={username}
                  uid={uid}
                  size={24}
                  hash={avatar}
                />
              </span>
              <span className="username">{displayName || slug}</span>
            </span>
          </a>
        </Link>
        <style jsx>{`
          a {
            transition: 0.2s ease;
          }

          a:hover {
            background: #fafafa;
          }

          .team {
            padding: 8px 20px !important;
            margin: -8px -20px !important;
          }

          .user {
            display: inline-flex;
            height: 20px;
            line-height: 30px;
            vertical-align: middle;
            align-items: center;
          }

          .username {
            display: inline-block;
            max-width: 118px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .avatar {
            float: left;
            height: 24px;
            margin-right: 10px;
            line-height: 24px;
            width: 24px;
          }
        `}</style>
      </MenuItem>
    )
  }

  render() {
    const {
      currentTeamSlug,
      navigationActive,
      onToggleNavigation,
      router,
      user,
      teams = [],
      userLoaded
    } = this.props
    const { menuActive } = this.state
    const dashboard = getDashboardHref(user, currentTeamSlug)

    return (
      <LayoutHeader className="header">
        <a className="logo" href={dashboard} aria-label="ZEIT Home">
          <Logo height="25px" width="28px" />
        </a>

        <Navigation className="main-navigation">
          <NavigationItem
            href="/docs"
            active={
              router.pathname.startsWith('/docs') &&
              !router.pathname.startsWith('/docs/api')
            }
          >
            Docs
          </NavigationItem>
          <NavigationItem
            href="/guides"
            active={router.pathname.startsWith('/guides')}
          >
            Guides
          </NavigationItem>
          <NavigationItem
            href="/docs/api"
            active={router.pathname.startsWith('/docs/api')}
          >
            API Reference
          </NavigationItem>
          <NavigationItem
            href="/examples"
            active={router.pathname.startsWith('/examples')}
          >
            Examples
          </NavigationItem>
        </Navigation>

        <Navigation className="user-navigation">
          {userLoaded && (
            <Fragment>
              {!user ? (
                <Fragment>
                  <NavigationItem className="chat" href="https://zeit.co/chat">
                    Chat <ChatCount className="chat-count" />
                  </NavigationItem>
                  <NavigationItem href="/login">Login</NavigationItem>
                </Fragment>
              ) : (
                <Fragment>
                  <NavigationItem className="chat" href="https://zeit.co/chat">
                    Chat <ChatCount className="chat-count" />
                  </NavigationItem>
                  <Menu
                    tip
                    active={menuActive}
                    onClickOutside={this.handleClickOutsideMenu}
                    render={this.renderMenuTrigger}
                    style={{ minWidth: 200 }}
                  >
                    <MenuItem>
                      {user.username ? (
                        <Link href={`/${user.username}`}>
                          <a className="avatar-link">
                            <Avatar
                              uid={user.uid}
                              size={50}
                              hash={user.avatar}
                            />
                          </a>
                        </Link>
                      ) : (
                        <Avatar user={user} size={50} />
                      )}
                      <div className="avatar-user-info">
                        {user.username && (
                          <Link href={`/${user.username}`}>
                            <a className="username">
                              <span>{user.username}</span>
                            </a>
                          </Link>
                        )}
                        <a
                          className="edit-profile"
                          href={`/${user.username || 'profile'}/edit`}
                          onClick={this.onEditProfileClick}
                        >
                          Edit Profile
                        </a>
                      </div>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>
                      <Link prefetch href="/dashboard">
                        <a>Dashboard</a>
                      </Link>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>
                      {teams.length === 0 ? (
                        <Link href="/account">
                          <a>Settings</a>
                        </Link>
                      ) : (
                        <span className="settings">SETTINGS</span>
                      )}
                    </MenuItem>
                    {teams.map(team => this.renderTeam(team))}
                    <MenuDivider />
                    <MenuItem>
                      <Link
                        href="/teams/settings/url?isCreating=1"
                        as="/teams/create"
                      >
                        <a>
                          Create a Team <Plus />
                        </a>
                      </Link>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>
                      <a onClick={this.handleLogout}>Logout</a>
                    </MenuItem>
                  </Menu>
                </Fragment>
              )}
            </Fragment>
          )}
        </Navigation>

        <div
          className={cn('arrow-toggle', { active: navigationActive })}
          onClick={onToggleNavigation}
        >
          <Arrow height="14px" width="27px" />
        </div>
        <style jsx>{`
          :global(.header .main-navigation) {
            margin-right: auto;
          }

          :global(.header .user-navigation) {
            padding-right: 0;
          }

          :global(.chat:hover .chat-count) {
            background-color: #000;
          }

          @keyframes load {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          :global(.header .user-navigation) {
            animation-name: load;
            animation-duration: 1s;
          }

          .arrow-toggle {
            cursor: pointer;
            display: none;
            margin-left: auto;
            padding: 10px;
            transition: transform 0.2s ease;
          }

          .arrow-toggle.active {
            transform: rotate(180deg);
          }

          .avatar-link {
            flex: 0;
            margin: -8px -15px;
            padding: 8px 15px;
          }
          a.avatar-link:hover,
          a.avatar-user-info:hover {
            background: none !important;
          }
          .avatar-user-info {
            margin-left: 15px;
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            height: 50px;
          }
          .avatar-user-info .username {
            color: #000;
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 3px;
            text-decoration: none;
          }
          .avatar-user-info .edit-profile {
            color: #0076ff;
            font-weight: 500;
            font-size: 12px;
            text-decoration: none;
            border: 0;
            background: none;
            padding: 0;
            margin: 0;
            outline: 0;
            cursor: pointer;
          }
          .avatar-link:hover,
          .username:hover,
          .edit-profile:hover {
            background-color: white;
            opacity: 0.7;
          }
          .avatar-link,
          .username,
          .edit-profile {
            transition: opacity 0.2s ease;
          }
          span.settings {
            font-size: 12px;
          }

          @media screen and (max-width: 950px) {
            :global(.header .main-navigation),
            :global(nav.user-navigation) {
              display: none;
            }

            .arrow-toggle {
              display: flex;
            }
          }
        `}</style>
      </LayoutHeader>
    )
  }
}

export default withRouter(Header)
