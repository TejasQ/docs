const H2 = ({ children }) => (
  <h2>
    {children}
    <style jsx>{`
      h2 {
        font-size: 32px;
        font-weight: 500;
        margin-top: 32px;
        line-height: 1.5;
      }
    `}</style>
  </h2>
)

export default H2
