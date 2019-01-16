// Packages
import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'

import LoadingDots from '~/components/loading-dots'

class Button extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      animationStartAt: null
    }

    this.el = null
    this.onClick = this.onClick.bind(this)
    this.onElement = this.onElement.bind(this)
    this.onAnimationComplete = this.onAnimationComplete.bind(this)
  }

  onClick(ev) {
    const { disabled, onClick } = this.props
    if (disabled) return

    const rect = this.el.getBoundingClientRect()

    this.setState({
      animationStartAt: Date.now(),
      animationX: ev.clientX - rect.left,
      animationY: ev.clientY - rect.top
    })

    if (onClick) {
      onClick()
    }
  }

  onElement(el) {
    this.el = el
  }

  onAnimationComplete() {
    this.setState({
      animationStartAt: null,
      animationX: null,
      animationY: null
    })
  }

  render() {
    const { darkBg, disabled: disabledContext } = this.context
    const {
      children,
      loading,
      disabled,
      icon,
      iconRight,
      iconPush,
      small,
      warning,
      title,
      active,
      abort,
      highlight,
      type = 'text',
      color = '#fff',
      bgColor = '#000',
      secondaryColor,
      secondary,
      iconColor,
      Component = 'button',
      ...props
    } = this.props
    let { width } = this.props
    const { animationStartAt, animationX, animationY } = this.state

    // backwards compatibility
    if (width === undefined && !small) {
      // small buttons default to being flexible width
      width = 200
    }

    return (
      <Component
        role="button"
        ref={this.onElement}
        title={title}
        onClick={this.onClick}
        type={type}
        disabled={disabled || disabledContext}
        className={cn(
          'button',
          {
            dark: darkBg,
            small,
            warning,
            highlight,
            active,
            loading,
            secondary,
            abort
          },
          disabled || disabledContext ? 'disabled' : 'not-disabled',
          icon && iconRight ? 'icon--right' : null,
          icon && iconPush ? 'icon--push' : null
        )}
        {...props}
      >
        {icon && !loading ? <span className="icon">{icon}</span> : null}
        <b>
          {children}
          {loading && (
            <span className="loading-shim">
              <LoadingDots size="big" />
            </span>
          )}
        </b>
        {this.state.animationStartAt && (
          <Animation
            key={animationStartAt}
            x={animationX}
            y={animationY}
            onComplete={this.onAnimationComplete}
          />
        )}
        <style jsx>{`
          .button {
            appearance: none;
            align-items: center;
            color: ${color};
            background: ${bgColor};
            display: inline-flex;
            width: ${width != null ? `${width}px` : 'auto'};
            height: 40px;
            padding: 0 25px;
            outline: none;
            border: 1px solid ${bgColor};
            font-size: 12px;
            justify-content: center;
            text-transform: uppercase;
            cursor: pointer;
            text-align: center;
            user-select: none;
            font-weight: 100;
            position: relative;
            overflow: hidden;
            transition: border 0.2s, background 0.2s, color 0.2s ease-out;
            border-radius: 5px;
            white-space: nowrap;
            text-decoration: none;
            line-height: 0;
          }

          .button.secondary {
            background: #fff;
            border: 1px solid #eaeaea;
            color: ${secondaryColor || '#666'};
          }

          .button.secondary.dark {
            background: #000;
            border: 1px solid #666;
            color: ${secondaryColor || '#999'};
          }

          .button .icon {
            position: absolute;
            left: 8px;
            top: 9px;
          }

          .button.icon--push:not(.icon--right) {
            padding-left: 42px;
          }

          .button.icon--right.icon--push {
            padding-right: 42px;
          }

          .button .icon :global(svg) {
            height: 20px;
            width: 20px;
          }

          .button .icon :global(path) {
            fill: ${iconColor || color};
            transition: fill 0.2s ease;
          }

          .button.secondary.icon--right .icon {
            right: 8px;
            left: auto;
          }

          .button.secondary .icon :global(path) {
            fill: ${iconColor || '#999'};
          }

          .button.disabled .icon :global(path) {
            fill: ${iconColor || '#ccc'};
          }

          .button b {
            display: inline-block;
            overflow: none;
            z-index: 100;
            font-weight: 500;
            /* relative positioning is needed so that
            * the text can show up on top of the
            * animated layer shown upon click */
            position: relative;
          }

          .button:hover,
          .button.active {
            border: 1px solid ${bgColor};
            background: ${bgColor !== '#000' ? 'transparent' : '#fff'};
            color: #000;
          }

          .button.secondary:hover,
          .button.secondary.active {
            color: ${secondaryColor || '#000'};
            border-color: ${secondaryColor || '#000'};
            background: #fff;
          }

          .button.not-disabled:hover :global(path),
          .button.not-disabled.active :global(path) {
            fill: ${bgColor};
            stroke: ${bgColor};
          }

          .button.secondary.not-disabled:hover :global(path),
          .button.secondary.not-disabled.active :global(path) {
            fill: currentColor;
            stroke: none;
          }

          .button.warning {
            border-color: #eb5757;
            background-color: #eb5757;
            color: #fff;
          }

          .button.warning:hover,
          .button.warning.active {
            color: #eb5757;
            background: #fff;
          }

          .button.highlight {
            border-color: #007aff;
            background-color: #007aff;
            color: #fff;
          }

          .button.highlight:hover,
          .button.highlight.active {
            color: #007aff;
            background: #fff;
          }

          .button.disabled {
            background: #fafafa !important;
            border-color: #eaeaea !important;
            color: #ccc !important;
            cursor: not-allowed;
          }
          .button.dark.disabled {
            background: #111 !important;
            border: 1px solid #333 !important;
            color: #333 !important;
          }

          .button.dark {
            color: #000;
            border: 2px solid #fff;
            background: #fff;
          }

          .button.dark:hover,
          .button.dark.active {
            color: #fff;
            border: 1px solid #fff;
            background: ${bgColor};
          }

          .button.small {
            height: 24px;
            width: ${width != null ? `${width}px` : 'auto'};
            padding: 0 10px;
            font-size: 12px;
          }

          .button.loading {
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

          .button.dark.loading {
            background-color: #585858;
            border-color: #585858;
            color: #585858;
          }

          .button.abort {
            background-color: transparent;
            border-color: transparent;
            color: #666;
          }
          .button.abort.button.disabled {
            color: #ccc;
          }
        `}</style>
      </Component>
    )
  }
}

Button.contextTypes = {
  darkBg: PropTypes.bool,
  disabled: PropTypes.bool
}

class Animation extends React.Component {
  constructor(props) {
    super(props)
    this.el = null
    this.onElement = this.onElement.bind(this)
    this.onAnimationEnd = this.onAnimationEnd.bind(this)
  }

  onElement(el) {
    this.el = el
    if (el) {
      el.addEventListener('animationend', this.onAnimationEnd)
    }
  }

  onAnimationEnd() {
    if (this.props.onComplete) {
      this.props.onComplete()
    }
  }

  render() {
    return (
      <div ref={this.onElement} className={this.context.darkBg ? 'dark' : ''}>
        <svg
          style={{
            top: this.props.y - 10,
            left: this.props.x - 10
          }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g fill="#ddd">
              <rect width="100%" height="100%" rx="10" />
            </g>
          </g>
        </svg>

        <style jsx>{`
          div {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }

          svg {
            position: absolute;
            animation: 400ms ease-in expand;
            animation-fill-mode: forwards;
            width: 20px;
            height: 20px;
          }

          div.dark g g {
            fill: #333;
          }

          @keyframes expand {
            0% {
              opacity: 0;
              transform: scale(1);
            }

            30% {
              opacity: 1;
            }

            80% {
              opacity: 0.5;
            }

            100% {
              transform: scale(25);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

Animation.contextTypes = {
  darkBg: PropTypes.bool
}

export default Button
