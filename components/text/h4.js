import cns from 'classnames'

const H4 = ({ children, isCommand }) => (
  <h4 className={cns({ command: isCommand })}>
    {children}
    <style jsx>{`
      h4 {
        font-weight: 600;
        font-size: 24px;
        margin-bottom: 16px;
      }

      .command {
        color: #bd10e0;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
          serif;
        font-size: 0.9em;
      }
    `}</style>
  </h4>
)

export default H4
