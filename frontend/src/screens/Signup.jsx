import React from "react";
import "./SignUp.css";

function SignUp() {
  return (
    <div>
      <header className="u-border-1 u-border-grey-75 u-clearfix u-header u-palette-3-base u-header">
        <div className="u-clearfix u-sheet u-sheet-1">
          <a href="Home.html" className="u-image u-logo u-image-1" data-image-width="500" data-image-height="500">
            <img src="images/icon.png" className="u-logo-image u-logo-image-1" alt="Tasty Travel Logo" />
          </a>
          <nav className="u-align-right u-menu u-menu-mega u-offcanvas u-menu-1" data-responsive-from="MD">
            <div className="menu-collapse">
              <a className="u-button-style u-nav-link" href="#">
                <svg className="u-svg-link" viewBox="0 0 24 24"><use xlinkHref="#svg-0fac"></use></svg>
                <svg className="u-svg-content" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
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
                  <a className="u-nav-link" href="Login.html">Login</a>
                </li>
                <li className="u-nav-item">
                  <a className="u-nav-link" href="Sign-Up.html">Sign Up</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Auth Page Container */}
      <div className="auth-page-container">
        <div className="auth-container">
          <h2 className="form-title">Sign Up</h2>
          <form>
            <input type="text" className="form-control" placeholder="Full Name" required />
            <input type="email" className="form-control" placeholder="Email" required />
            <input type="password" className="form-control" placeholder="Password" required />
            <input type="password" className="form-control" placeholder="Confirm Password" required />
            <button className="btn-primary" type="submit">Sign Up</button>
          </form>
          <div className="auth-switch">
            <p>Already have an account? <a href="Login.html">Login</a></p>
          </div>
        </div>
      </div>

      <footer className="u-footer u-grey-80">
        <div className="u-sheet u-valign-middle">
          <p className="u-small-text">Tasty Travel 2024 Copyright</p>
        </div>
      </footer>
    </div>
  );
}

export default SignUp;
