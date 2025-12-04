export default function Layout(props) {
  const { children } = props;

  const header = (
    <div className="header">
      <h2>Anon Chat</h2>
    </div>
  )

  const footer = (
    <footer className="footer">
      <p>Application created by <a target="_blank" href="https://github.com/PaulTreusdell">Paul Treusdell</a> to learn CI/CD and Django</p>
    </footer>
  )

  return (
    <div className="page">
      {header}
      <main>
        {children}
      </main>
      {footer}
    </div>
  )
}