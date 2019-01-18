import React from 'react'
import PropTypes from 'prop-types'

export const GenericAvatar = ({ title, src, size }, { darkBg }) => (
  <span
    className={`avatar ${darkBg ? 'dark' : ''}`}
    style={{ width: size, height: size }}
  >
    <img alt={title} title={title} src={src} />
    <style jsx>
      {`
        span {
          border-radius: 100%;
          display: inline-block;
          overflow: hidden;
          border: 1px solid #eee;
          line-height: 0;
          vertical-align: top;
        }

        img {
          width: 100%;
          height: 100%;
        }

        .dark {
          border: 1px solid #333;
        }
      `}
    </style>
  </span>
)

const Avatar = ({
  title,
  size = 80,
  boxSize = null,
  teamId = null,
  username = null,
  uid,
  hash
}) => {
  let query
  const hasSHA = hash && /^[0-9a-f]{40}$/.test(hash)

  if (hasSHA) {
    query = hash
  } else {
    query =
      username != null
        ? `?u=${username}`
        : teamId != null
        ? `?teamId=${teamId}`
        : (uid ? uid : '') + '?'
  }

  const sizePrefix = hasSHA ? '?' : '&'
  const url = `https://zeit.co/api/www/avatar/${query + sizePrefix}s=${size *
    3}`

  return <GenericAvatar size={boxSize || size} title={title} src={url} />
}

GenericAvatar.contextTypes = {
  darkBg: PropTypes.bool
}

export default Avatar
