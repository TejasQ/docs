import Avatar, { GenericAvatar } from './avatar'

const AvatarGroup = ({ members, limit = 3, size = 22 }) => {
  const firstThree = members.slice(0, limit)
  const rest = members.slice(limit)

  return (
    <main className="avatar-group">
      {firstThree.map(member =>
        member.githubUser ? (
          <span key={member.username} className="avatar" title={member.name}>
            {member.username}
            <GenericAvatar
              size={size}
              src={`https://github.com/${member.username}.png`}
            />
          </span>
        ) : (
          <span
            key={member.uid || member.username}
            className="avatar"
            title={member.name}
          >
            {member.username ? (
              <Avatar size={size} username={member.username} />
            ) : (
              <Avatar size={size} uid={member.uid} />
            )}
          </span>
        )
      )}
      {rest.length ? <span className="note">+{rest.length}</span> : null}
      <style jsx>{`
        main {
          display: flex;
          width: 100%;
          align-items: center;
        }
        .avatar {
          display: inline-flex;
          align-items: center;
        }
        .avatar:nth-child(n + 2) {
          margin-left: -10px;
        }
        .note {
          font-size: 14px;
          display: inline-flex;
          padding-left: 5px;
          justify-content: flex-end;
          margin-right: auto;
        }
      `}</style>
    </main>
  )
}

export default AvatarGroup
