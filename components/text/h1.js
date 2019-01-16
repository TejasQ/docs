const H1 = ({ children }) => (
  <h1>
    {children}
    <style jsx>{`
      h1 {
        font-size: 36px;
        font-weight: 600;
        margin-top: 0;
        line-height: 1.333;
      }
    `}</style>
  </h1>
)

export default H1
