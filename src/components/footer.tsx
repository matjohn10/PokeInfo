import "../componentCss/footer.css";
import { Link } from "react-router-dom";
import {BACKEND} from "../api/url"

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-nav">
        <h3 className="text-white mb-3">Quick links</h3>
        <ul className="list-unstyled text-muted">
          <li className="footer-nav-item">
            <Link className="footer-nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="footer-nav-item">
            <Link to="/carousel" className="footer-nav-link">
              Carousel
            </Link>
          </li>
          <li className="footer-nav-item">
            <Link className="footer-nav-link" to="/pokedex">
              Pokedex
            </Link>
          </li>
          <li className="footer-nav-item">
            <Link className="footer-nav-link" to="/team">
              Teams
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-about">
        <h3 className="text-white mb-3">About</h3>
        <p className="footer-about-text">
          Donec faucibus tempus sem vel volutpat. Ut in lorem turpis. In ut orci
          volutpat, blandit nisl eu, iaculis nunc. Nulla commodo ligula eu
          sapien hendrerit consectetur. Nam interdum tellus mi, ac tincidunt
          odio fermentum vitae. Donec vestibulum et nisi scelerisque malesuada.
          Pellentesque finibus urna mauris, nec gravida turpis egestas id.
        </p>
        <p className="developer-info">
          Developper:&nbsp;
          <a
            className="footer-about-text dev-link"
            href="https://www.linkedin.com/in/mathieu-johnson-86b015252/"
          >
            Mathieu Johnson
          </a>
        </p>
      </div>
      <div className="footer-contact">
        <h3 className="text-white mb-3">Newsletter</h3>
        <form
          action={BACKEND + "newsletter/add-newsletter"}
          method="POST"
          className="newsletter"
        >
          <label htmlFor="newsletter-email" className="email-label">
            Join our newslater:
          </label>
          <input
            type="email"
            name="newsletter-email"
            id="newsletter-email"
            className="email-input"
          />
          <button className="newsletter-btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Footer;
