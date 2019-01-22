// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import Button from '~/components/buttons'

// Config
import { COLOR_ERROR, FONT_FAMILY_SANS } from '~/lib/css-config'

class FeedbackInput extends Component {
  clearSuccessTimer = null
  textAreaRef = null

  handleTextAreaRef = node => {
    this.textAreaRef = node
  }

  onKeyPress = e => {
    if (e.keyCode === 27) {
      this.props.handleClose()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.focused) {
      // textarea was hidden if we were showing an error message and
      // now we hide it
      if (prevProps.errorMessage != null && this.props.errorMessage == null) {
        this.textAreaRef.focus()
      }

      if (!prevProps.focused) {
        window.addEventListener('keypress', this.onKeyPress)
      }
    } else {
      if (prevProps.focused) {
        // needed for when we e.g.: unfocus based on pressing escape
        this.textAreaRef.blur()

        // if we unfocused and there was an error before,
        // clear it
        if (prevProps.errorMessage) {
          this.props.setError(null)
        }

        // if we had a success message
        // clear it
        if (prevProps.success) {
          this.props.setSuccessState(false)
        }

        window.removeEventListener('keypress', this.onKeyPress)
      }
    }

    if (this.props.success) {
      // forget about input state
      this.textAreaRef.value = ''

      // collapse in 5s
      this.clearSuccessTimer = setTimeout(() => {
        if (!document.hidden) {
          this.props.setSuccessState(false)
        }
      }, 5000)
    } else {
      if (prevProps.success) {
        clearTimeout(this.clearSuccessTimer)
        this.clearSuccessTimer = null
      }

      if (prevProps.success && this.props.focused) {
        this.props.handleClose()
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
      <main
        title="Share any feedback about our products and services"
        className={`
          ${this.props.focused ? 'focused' : ''}
          ${this.props.errorMessage != null ? 'error' : ''}
          ${this.props.loading ? 'loading' : ''}
          ${this.props.success ? 'success' : ''}
          ${this.context.darkBg ? 'dark' : ''}
          feedback-input
        `}
      >
        <textarea
          type="text"
          ref={this.handleTextAreaRef}
          onFocus={this.onFocus}
          disabled={
            this.props.loading === true || this.props.errorMessage != null
          }
          placeholder="Enter your feedback..."
          autoFocus
          onChange={this.props.handleValue}
        />

        {this.props.errorMessage != null && (
          <div className="error-message">
            <span>{this.props.errorMessage}</span>

            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                this.props.onErrorDismiss()
              }}
            >
              GO BACK
            </a>
          </div>
        )}

        {this.props.success && (
          <div className="success-message">
            <p>Your feedback has been received!</p>
            <p>Thank you for your help.</p>
          </div>
        )}

        {this.props.errorMessage == null && !this.props.success && (
          <div className="controls">
            {
              <span className={`buttons`}>
                <Button
                  small
                  loading={this.props.loading}
                  onClick={this.props.onSubmit}
                >
                  Send
                </Button>
              </span>
            }
          </div>
        )}

        <style jsx>{`
          main {
            position: relative;
            width: 400px;
            max-width: 99vw;
            height: 130px;
            display: inline-block;
          }

          textarea {
            appearance: none;
            border-width: 0;
            border-radius: 5px;
            padding: 4px 8px;
            font-size: 12px;
            font-family: ${FONT_FAMILY_SANS};
            resize: none;
            position: absolute;
            top: -3px;
            vertical-align: top;
            width: 400px;
            max-width: 99vw;
            height: 130px;
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
            width: 400px;
            background-color: white;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 0 0 5px 5px;
          }

          .controls .buttons {
            transition: opacity 200ms ease;
            margin-left: auto;
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
    )
  }
}

FeedbackInput.contextTypes = {
  darkBg: PropTypes.bool
}

export default FeedbackInput
