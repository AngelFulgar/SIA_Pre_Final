export function Footer() {
  return (
    <footer className="footer">
      <a className="brand brand--footer" href="#top"><span className="brand__mark">F</span><span>field<span className="brand__amp">&</span>form</span></a>
      <span>Thoughtful things for everyday living.</span>
      <span>© {new Date().getFullYear()} Field & Form</span>
    </footer>
  )
}
