import React from "react";
import './Login.css'; // import the CSS file

const Login = () => {
  return (
    <div className="auth-page-container">
      <header className="u-border-1 u-border-grey-75 u-clearfix u-header u-palette-3-base u-header" id="sec-568f">
        <div className="u-clearfix u-sheet u-sheet-1">
          <a href="Home.html" className="u-image u-logo u-image-1">
            <img src="images/icon.png" alt="logo" className="u-logo-image u-logo-image-1" />
          </a>
          <nav className="u-align-right u-menu u-menu-mega u-offcanvas u-menu-1" data-responsive-from="MD">
            <div className="menu-collapse" style={{ fontSize: '1rem', fontWeight: '700' }}>
              <a href="#" className="u-button-style u-custom-active-border-color u-custom-border u-custom-text-color">
                <svg className="u-svg-link" viewBox="0 0 24 24">
                  <use xlinkHref="#svg-0fac"></use>
                </svg>
                <svg className="u-svg-content" version="1.1" id="svg-0fac" viewBox="0 0 16 16">
                  <g>
                    <rect y="1" width="16" height="2"></rect>
                    <rect y="7" width="16" height="2"></rect>
                    <rect y="13" width="16" height="2"></rect>
                  </g>
                </svg>
              </a>
            </div>
            <div className="u-custom-menu u-nav-container">
              <ul className="u-nav u-spacing-20 u-unstyled u-nav-1">
                <li className="u-nav-item">
                  <a className="u-nav-link u-text-grey-90" href="Login.html">Login</a>
                </li>
                <li className="u-nav-item">
                  <a className="u-nav-link u-text-grey-90" href="Sign-Up.html">Sign Up</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <div className="auth-container">
        <h2 className="form-title">Login</h2>
        <form>
          <input type="email" className="form-control" placeholder="Email" required />
          <input type="password" className="form-control" placeholder="Password" required />
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <div className="auth-switch">
          <p>Don’t have an account? <a href="Sign-Up.html">Sign Up</a></p>
        </div>
      </div>

      <footer className="u-align-center u-footer u-grey-80 u-footer">
        <p className="u-small-text u-text u-text-variant">Tasty Travel 2024 Copyright</p>
      </footer>

      <section className="u-backlink u-grey-80">
        <p>This site was created with <a href="https://nicepage.com/">Nicepage</a></p>
      </section>
    </div>
  );
};

export default Login;
