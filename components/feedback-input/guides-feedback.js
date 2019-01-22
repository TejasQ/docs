import React, { Component } from 'react'
import FeedbackInput from './feedback-input'
import ClickOutside from '~/components/click-outside'
import fetchAPI from '~/lib/fetch-api'
import { getToken } from '~/lib/authenticate'
import { API_GUIDES_FEEDBACK } from '~/lib/constants'
import Stars from '~/components/stars'

export default class GuidesFeedback extends Component {
  state = {
    success: true,
    errorMessage: null,
    feedbackOpen: false,
    rating: null,
    feeedbackSent: false
  }

  setError = error => {
    this.setState({ errorMessage: error })
  }

  onErrorDismiss = () => {
    this.setState({ errorMessage: null })
  }

  setLoading = state => {
    this.setState({ loading: state })
  }

  setSuccessState = state => {
    this.setState({ success: state })
    if (state === true) {
      this.setState({ feedbackSent: true })
    }
  }

  handleValue = event => {
    this.setState({
      value: event.target.value
    })
  }

  onSubmit = () => {
    if (this.state.value.trim() === '') {
      this.setError('Your feedback cannot be empty')
      return
    }

    this.setLoading(true)

    fetchAPI(
      API_GUIDES_FEEDBACK +
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
          note: this.state.value,
          rating: this.state.rating
        }),
        throwOnHTTPError: true
      }
    )
      .then(() => {
        this.setLoading(false)
        this.setSuccessState(true)
      })
      .catch(err => {
        this.setError(err.message)
        this.setLoading(false)
      })
  }

  onRatingChange = event => {
    this.setState({
      feedbackOpen: true,
      rating: parseInt(event.target.value)
    })
  }

  handleOpen = () => {
    this.setState({
      feedbackOpen: true
    })
  }

  handleClose = () => {
    this.setState({
      feedbackOpen: false
    })
  }

  render() {
    return (
      <ClickOutside
        active={this.state.feedbackOpen}
        onClick={this.handleClose}
        render={({ innerRef }) => (
          <div className="feedback" ref={innerRef}>
            <Stars
              onChange={this.onRatingChange}
              onClick={this.state.feedbackSent ? null : this.handleOpen}
              disabled={this.state.feedbackSent}
            />
            <FeedbackInput
              focused={this.state.feedbackOpen}
              handleClose={this.handleClose}
              setError={this.setError}
              setSuccessState={this.setSuccessState}
              errorMessage={this.state.errorMessage}
              success={this.state.success}
              onErrorDismiss={this.onErrorDismiss}
              onSubmit={this.onSubmit}
              handleValue={this.handleValue}
              loading={this.state.loading}
            />
            <style jsx>{`
              .feedback {
                position: relative;
                display: flex;
              }

              .feedback :global(.feedback-input) {
                position: absolute;
                bottom: -5px;
                left: -8px;
                transform: scale(0);
                transform-origin: left bottom;
                opacity: 0;
                transition: transform 0.15s ease, opacity 0.15s ease;
              }

              .feedback :global(.feedback-input.focused) {
                opacity: 1;
                transform: scale(1);
              }
            `}</style>
          </div>
        )}
      />
    )
  }
}
