const SmallLoadingDots = ({ children }) => (
  <span className="loading">
    {children}
    <span>.</span>
    <span>.</span>
    <span>.</span>
    <style jsx>{`
      @keyframes blink {
        0% {
          opacity: 0.2;
        }
        20% {
          opacity: 1;
        }
        100% {
          opacity: 0.2;
        }
      }
      .loading span {
        animation-name: blink;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
      }
      .loading span:nth-child(2) {
        animation-delay: 0.2s;
      }
      .loading span:nth-child(3) {
        animation-delay: 0.4s;
      }
    `}</style>
  </span>
)

const BigLoadingDots = ({ children }) => (
  <span className="loading">
    {children}
    <span />
    <span />
    <span />
    <style jsx>{`
      @keyframes blink {
        0% {
          opacity: 0.2;
        }
        20% {
          opacity: 1;
        }
        100% {
          opacity: 0.2;
        }
      }
      .loading span {
        animation-name: blink;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #444444;
        display: inline-block;
        margin: 0 1px;
      }
      .loading span:nth-child(2) {
        animation-delay: 0.2s;
      }
      .loading span:nth-child(3) {
        animation-delay: 0.4s;
      }
    `}</style>
  </span>
)

const LoadingDots = ({ size = 'small', ...props }) => {
  switch (size) {
    case 'big': {
      return <BigLoadingDots {...props} />
    }
    case 'small':
    default: {
      return <SmallLoadingDots {...props} />
    }
  }
}

export default LoadingDots
