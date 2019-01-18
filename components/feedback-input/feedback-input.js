// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fetchAPI from '~/lib/fetch-api'

// Components
import Button from '~/components/buttons'
import { getToken } from '~/lib/authenticate'
import ClickOutside from '~/components/click-outside'

// Config
import { API_FEEDBACK } from '~/lib/constants'
import { COLOR_ERROR, FONT_FAMILY_SANS } from '~/lib/css-config'

class FeedbackInput extends Component {
  state = {
    focused: false,
    success: false,
    errorMessage: null
  }

  clearSuccessTimer = null
  textAreaRef = null

  handleTextAreaRef = node => {
    this.textAreaRef = node
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  onErrorDismiss = () => {
    this.setState({ errorMessage: null })
  }

  handleClickOutside = () => {
    this.setState({ focused: false })
  }

  onKeyPress = e => {
    if (e.keyCode === 27) {
      this.setState({ focused: false })
    }
  }

  onSubmit = () => {
    if (this.textAreaRef.value.trim() === '') {
      this.setState({
        errorMessage: "Your feedback can't be empty"
      })
      return
    }

    this.setState({ loading: true })

    fetchAPI(
      API_FEEDBACK +
        (this.props.currentTeamSlug
          ? `?teamId=${encodeURIComponent(this.props.currentTeamSlug)}`
          : ''),
      getToken(),
      {
        method: 'POST',
        body: JSON.stringify({
          url:
            window.location.hostname === 'localhost'
              ? `https://zeit.co/dev-mode${window.location.pathname}`
              : window.location.toString(),
          note: this.textAreaRef.value,
          ua: `front ${VERSION} + ${
            navigator.userAgent
          } (${navigator.language || 'unknown language'})`
        }),
        throwOnHTTPError: true
      }
    )
      .then(() => {
        this.setState({ loading: false, success: true })
      })
      .catch(err => {
        this.setState({ loading: false, errorMessage: err.message })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.focused) {
      // textarea was hidden if we were showing an error message and
      // now we hide it
      if (prevState.errorMessage != null && this.state.errorMessage == null) {
        this.textAreaRef.focus()
      }

      if (!prevState.focused) {
        window.addEventListener('keypress', this.onKeyPress)
      }
    } else {
      if (prevState.focused) {
        // needed for when we e.g.: unfocus based on pressing escape
        this.textAreaRef.blur()

        // if we unfocused and there was an error before,
        // clear it
        if (prevState.errorMessage) {
          this.setState({ errorMessage: null })
        }

        // if we had a success message
        // clear it
        if (prevState.success) {
          this.setState({ success: false })
        }

        window.removeEventListener('keypress', this.onKeyPress)
      }
    }

    if (this.state.success) {
      // forget about input state
      this.textAreaRef.value = ''

      // collapse in 5s
      this.clearSuccessTimer = setTimeout(() => {
        if (!document.hidden) {
          this.setState({ success: false })
        }
      }, 5000)
    } else {
      if (prevState.success) {
        clearTimeout(this.clearSuccessTimer)
        this.clearSuccessTimer = null
      }

      if (prevState.success && this.state.focused) {
        this.setState({ focused: false })
      }
    }
  }

  componentWillUnmount() {
    if (this.clearSuccessTimer !== null) {
      clearTimeout(this.clearSuccessTimer)
      this.clearSuccessTimer = null
    }

    window.removeEventListener('keypress', this.onKeyPress)
  }

  render() {
    return (
      <ClickOutside
        active={this.state.focused}
        onClick={this.handleClickOutside}
        render={({ innerRef }) => (
          <main
            ref={innerRef}
            title="Share any feedback about our products and services"
            className={`
              ${this.state.focused ? 'focused' : ''}
              ${this.state.errorMessage != null ? 'error' : ''}
              ${this.state.loading ? 'loading' : ''}
              ${this.state.success ? 'success' : ''}
              ${this.context.darkBg ? 'dark' : ''}
            `}
          >
            <textarea
              type="text"
              ref={this.handleTextAreaRef}
              placeholder={this.state.focused ? '' : 'FEEDBACK...'}
              onFocus={this.onFocus}
              disabled={
                this.state.loading === true || this.state.errorMessage != null
              }
            />

            {this.state.errorMessage != null && (
              <div className="error-message">
                <span>{this.state.errorMessage}</span>

                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault()
                    this.onErrorDismiss()
                  }}
                >
                  GO BACK
                </a>
              </div>
            )}

            {this.state.success && (
              <div className="success-message">
                <p>Your feedback has been received!</p>
                <p>Thank you for your help.</p>
              </div>
            )}

            {this.state.errorMessage == null && !this.state.success && (
              <div className="controls">
                {
                  <span className={`buttons`}>
                    <Button
                      small
                      loading={this.state.loading}
                      onClick={this.onSubmit}
                    >
                      Send
                    </Button>
                  </span>
                }
              </div>
            )}

            <style jsx>{`
              main {
                padding: 0 10px;
                position: relative;
                height: 15px;
                width: 150px;
                display: inline-block;
              }

              textarea {
                appearance: none;
                border-width: 0;
                background: #fcfcfc;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.12);
                border-radius: 5px;
                padding: 4px 8px;
                font-size: 12px;
                font-family: ${FONT_FAMILY_SANS};
                width: 130px;
                resize: none;
                position: absolute;
                left: 10px;
                top: -3px;
                vertical-align: top;
                height: 24px;
                transition: all 150ms ease-out;
                /* fixes a bug in ff where the animation of the chat
                * counter appears on top of our input during its transition */
                z-index: 100;
                outline: 0;
                color: #000;
              }

              main.error textarea,
              main.loading textarea,
              main.success textarea {
                pointer-events: none;
              }

              main.error textarea,
              main.success textarea {
                color: transparent;
                user-select: none;
              }

              main.loading textarea {
                color: #ccc;
              }

              main.dark textarea {
                background: #282828;
                box-shadow: none;
                color: #fff;
              }

              textarea::placeholder {
                color: #666;
              }

              main.dark textarea::placeholder {
                color: #999;
              }

              main.focused textarea {
                width: 230px;
                height: 130px;
                background: #fff;
                padding-bottom: 40px;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
              }

              main.dark.focused textarea {
                background: #282828;
                box-shadow: none;
              }

              .error-message,
              .success-message {
                position: absolute;
                left: 10px;
                top: 0;
                z-index: 1001;
                width: 230px;
                font-size: 12px;
                height: 130px;
                line-height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 20px;
                flex-direction: column;
              }

              .error-message span {
                color: ${COLOR_ERROR};
                margin-bottom: 20px;
              }

              .success-message p {
                opacity: 0;
              }

              .success-message p:first-child {
                animation: appear 500ms ease;
                animation-delay: 100ms;
                animation-fill-mode: forwards;
              }

              .success-message p:last-child {
                animation: appear 500ms ease;
                animation-delay: 1s;
                animation-fill-mode: forwards;
              }

              main.dark .error-message span {
                color: #999;
              }

              .error-message a {
                color: #000;
                text-decoration: none;
              }

              main.dark .error-message a {
                color: #fff;
              }

              main.focused .controls,
              main.dark.focused .controls {
                display: flex;
              }

              .controls {
                pointer-events: none;
                position: absolute;
                top: 95px;
                display: none;
                opacity: 0;
                width: 230px;
                background-color: white;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: space-between;
              }

              .controls .buttons {
                flex: 1;
                transition: opacity 200ms ease;
              }

              .controls .buttons.hidden {
                opacity: 0;
              }

              main.focused .controls {
                animation-name: appear;
                animation-delay: 250ms;
                animation-duration: 150ms;
                animation-timing-function: ease-out;
                animation-fill-mode: forwards;
                pointer-events: inherit;
                z-index: 1001;
                padding: 0 8px;
              }

              @keyframes appear {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
            `}</style>
          </main>
        )}
      />
    )
  }
}

FeedbackInput.contextTypes = {
  darkBg: PropTypes.bool
}

export default FeedbackInput
