import { Component } from 'react'
import { withRouter } from 'next/router'
import NativeLink from 'next/link'
import PropTypes from 'prop-types'
import CircledQuestion from '~/components/icons/circled-question'

export const GenericLink = props => {
  if (
    props.href.startsWith('/docs') ||
    props.href.startsWith('/api') ||
    props.href.startsWith('/examples') ||
    props.href.startsWith('/guides')
  ) {
    return <InternalLink {...props} />
  }

  if (props.href.includes('@') || props.href.startsWith('#')) {
    return <AnchorLink {...props} />
  }

  return <ExternalLink {...props} />
}

export const InternalLink = ({ href, as, children }, { darkBg } = {}) => (
  <span>
    <LinkWithHoverPrefetch href={href} as={as}>
      {children}
    </LinkWithHoverPrefetch>
    <style jsx>{`
      span :global(a) {
        text-decoration: none;
        color: #0076ff;
        font-size: inherit;
        cursor: pointer;
      }

      span :global(a:hover) {
        text-decoration: underline;
      }

      ${darkBg
        ? `
        span :global(a.dark) {
          color: #fff;
        }
      `
        : ``};
    `}</style>
  </span>
)

InternalLink.contextTypes = {
  darkBg: PropTypes.bool
}

export const AnchorLink = ({ href, onClick, children }, { darkBg } = {}) => (
  <a href={href} onClick={onClick} className={darkBg ? 'dark' : ''}>
    {children}

    <style jsx>
      {`
        a {
          text-decoration: none;
          color: #0076ff;
          font-size: inherit;
        }

        a:hover {
          text-decoration: underline;
        }

        a.dark {
          color: #fff;
        }
      `}
    </style>
  </a>
)

AnchorLink.contextTypes = {
  darkBg: PropTypes.bool
}

export const ExternalLink = ({ href, children }, { darkBg } = {}) => (
  <a
    className={darkBg ? 'dark' : ''}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}

    <style jsx>
      {`
        a {
          text-decoration: none;
          color: #0076ff;
          font-size: inherit;
        }

        a:hover {
          text-decoration: underline;
        }

        a.dark {
          color: #fff;
        }
      `}
    </style>
  </a>
)

ExternalLink.contextTypes = {
  darkBg: PropTypes.bool
}

export const LabeledExternalLink = ({
  href,
  label,
  icon,
  hideLabel,
  children
}) => (
  <ExternalLink href={href}>
    <div className="labeled-link">
      {!hideLabel && (
        <b className="labeled-link__label">
          {(label && `${label}`) || `Note`}
          <span className="labeled-link__suffix">: </span>
        </b>
      )}
      <span className="labeled-link__link">{children}</span>
      {icon && <span className="labeled-link__icon">{icon}</span>}
    </div>
    <style jsx>{`
      .labeled-link {
        align-items: center;
        padding: 4px 10px;
        border-radius: 4px;
        background: white;
        border: 1px solid #dddddd;
        font-size: 14px;
        line-height: 1.8;
        transition: border 0.2s ease, color 0.2s ease;
        vertical-align: middle;
        display: inline-block;
      }

      .labeled-link__label {
        color: #000;
        font-weight: 500;
      }

      .labeled-link__icon {
        border-left: 1px solid #dddddd;
        padding: 8px 10px;
        position: relative;
        right: -10px;
      }

      .labeled-link:hover,
      .labeled-link:hover .labeled-link__icon {
        border-color: #999;
      }

      @media screen and (max-width: 950px) {
        .labeled-link__suffix {
          display: none;
        }

        .labeled-link__link {
          display: none;
        }
      }
    `}</style>
  </ExternalLink>
)

LabeledExternalLink.contextTypes = {
  darkBg: PropTypes.bool,
  disabled: PropTypes.bool
}

export const IconExternalLink = ({
  children,
  href,
  disabled,
  icon,
  iconRight,
  iconPush,
  small,
  warning,
  active,
  bgColor = '#000',
  width = 'auto',
  darkBg,
  secondary
}) => (
  <a
    href={href}
    disabled={disabled}
    target="_blank"
    rel="noopener noreferrer"
    className={
      'link-button' +
      (darkBg ? ' light' : '') +
      (small ? ' small' : '') +
      (warning ? ' warning' : '') +
      (active ? ' active' : '') +
      (disabled ? ' disabled' : ' not-disabled') +
      (secondary ? ' secondary' : '') +
      (icon && iconRight ? ' icon--right' : '') +
      (icon && iconPush ? ' icon--push' : '')
    }
  >
    {icon ? <span className="icon">{icon}</span> : null}
    <b>{children}</b>
    <style jsx>{`
      .link-button {
        appearance: none;
        align-items: center;
        color: #fff;
        background: ${bgColor};
        display: inline-flex;
        width: ${width != null ? `${width}px` : 'auto'};
        height: 35px;
        padding: 0 10px;
        outline: none;
        border: 1px solid ${bgColor};
        font-size: 12px;
        justify-content: center;
        text-transform: uppercase;
        text-decoration: none;
        transition: background 0.2s ease, color 0.2 ease;
        cursor: pointer;
        text-align: center;
        user-select: none;
        font-weight: 100;
        position: relative;
        overflow: hidden;
        transition: border 0.2s, background 0.2s, color 0.2s ease-out;
        border-radius: 5px;
        white-space: nowrap;
        line-height: 0;
      }

      .link-button.secondary {
        background: #fff;
        border: 1px solid #eaeaea;
        color: #999999;
      }

      .link-button .icon {
        border-right: 1px solid #333333;
        padding: 7px 6px 7px 0;
        margin-right: 6px;
        position: relative;
        left: -4px;
        transition: all 0.2s ease;
      }

      .link-button.icon--push:not(.icon--right) {
        padding-left: 42px;
      }

      .link-button.icon--right.icon--push {
        padding-right: 42px;
      }

      .link-button .icon :global(svg) {
        height: 20px;
        width: 20px;
      }

      .link-button .icon :global(path) {
        fill: #fff;
        transition: fill 0.2s ease;
      }

      .link-button.secondary .icon {
        border-right: 1px solid #eaeaea;
      }

      .link-button.secondary .icon :global(path) {
        fill: #999999;
      }

      .link-button.disabled .icon :global(path) {
        fill: #ccc;
      }

      .link-button b {
        display: inline-block;
        overflow: none;
        z-index: 100;
        font-weight: 500;
        /* relative positioning is needed so that
        * the text can show up on top of the
        * animated layer shown upon click */
        position: relative;
      }

      .link-button:hover,
      .link-button.active {
        border: 1px solid ${bgColor};
        background: ${bgColor !== '#000' ? 'transparent' : '#fff'};
        color: #000;
      }

      .link-button.secondary:hover,
      .link-button.secondary.active {
        color: #000;
        border-color: #eaeaea;
        background: #fff;
      }

      .link-button.not-disabled:hover :global(path),
      .link-button.not-disabled.active :global(path) {
        fill: ${bgColor};
      }

      .link-button.secondary.not-disabled:hover :global(path),
      .link-button.secondary.not-disabled.active :global(path) {
        fill: currentColor;
        stroke: none;
      }

      .link-button.not-disabled:hover :global(.icon) {
        border-right: 1px solid #999;
      }

      .link-button.warning {
        border-color: #ff0000;
        background-color: #ff0000;
        color: #fff;
      }

      .link-button.warning:hover,
      .link-button.warning.active {
        color: #ff0000;
        background: #fff;
      }

      .link-button.disabled {
        background: #fafafa;
        border-color: #eaeaea;
        color: #ccc;
        cursor: auto;
        pointer-events: none;
      }

      .link-button.light {
        color: #000;
        border: 2px solid #fff;
        background: #fff;
      }

      .link-button.light:hover,
      .link-button.light.active {
        color: #fff;
        border: 2px solid #fff;
        background: ${bgColor};
      }

      .link-button.small {
        height: 24px;
        width: ${width != null ? `${width}px` : 'auto'};
        padding: 0 10px;
        font-size: 12px;
      }

      .link-button.loading {
        pointer-events: none;
        background: #fafafa;
        border-color: #eaeaea;
        color: transparent;
        position: relative;
      }

      .loading-shim {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .link-button.light.loading {
        background-color: #585858;
        border-color: #585858;
        color: #585858;
      }

      .link-button.abort {
        background-color: transparent;
        border-color: transparent;
        color: #666;
      }
      .link-button.abort.link-button.disabled {
        color: #ccc;
      }
    `}</style>
  </a>
)

IconExternalLink.contextTypes = {
  darkBg: PropTypes.bool,
  disabled: PropTypes.bool
}

class HoverPrefetchLink extends Component {
  render() {
    const { children, router, ...rest } = this.props
    return (
      <NativeLink {...rest}>
        <a onMouseEnter={() => router.prefetch(this.props.href)}>{children}</a>
      </NativeLink>
    )
  }
}

export const HelpLink = ({ children, href, hasIcon, ...props }) => (
  <a href={href} {...props} className={hasIcon ? 'icon' : ''}>
    <span>{children}</span>
    {hasIcon && <CircledQuestion />}
    <style jsx>{`
      a {
        text-decoration: none;
        color: #666;
        font-size: inherit;
        display: flex;
        cursor: pointer;
      }
      a.icon {
        align-items: center;
        color: inherit;
        display: flex;
      }
      a:hover,
      a.icon:hover {
        color: #000;
        text-decoration: underline dashed;
      }
      a.icon span {
        margin-right: 5px;
      }
      a.icon:hover :global(svg circle) {
        stroke: #000;
      }
      a.icon:hover :global(svg text) {
        fill: #000;
      }
    `}</style>
  </a>
)

export const LinkWithHoverPrefetch = withRouter(HoverPrefetchLink)
