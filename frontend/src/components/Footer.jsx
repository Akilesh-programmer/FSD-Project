import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-logo">
            <span style={{ background: "#ff6b6b" }}></span>
            <span style={{ background: "#ffd93d" }}></span>
            <span style={{ background: "#6bcb77" }}></span>
            <span style={{ background: "#4d96ff" }}></span>
          </div>
          <span className="footer-name">CubeTimer</span>
        </div>
        <div className="footer-center">
          <span>Made with ❤️ for speedcubers</span>
        </div>
        <div className="footer-right">
          <span className="footer-version">v2.0.0</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
