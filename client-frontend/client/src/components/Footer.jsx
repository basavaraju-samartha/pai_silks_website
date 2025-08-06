import "./Footer.css";
import facebook from '../assets/Facebook.svg'
import instagram from '../assets/instagram.svg'
import whatsapp from '../assets/whatsapp.svg'

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="newsletter">
          <h2>
            Subscribe to our newsletter!
          </h2>
          <form className="form" action="/submit-data" method="POST">
            <input className="emailplace" type="email" id="email" name="email" placeholder="Your Email address" required></input>
            <button className="emailbutton" type="submit">Subscribe</button>
          </form>
        </div>
        <div className="quickandabout">
          <div className="quickLinks">
            <h1>Quick Links</h1>
            <p>Home</p>
            <p>About Us</p>
            <p>Categories</p>
            <p>All Products</p>
          </div>
          <div className="about">
            <h1>About</h1>
            <p>+91 98745 60759</p>
            <p>paisilks@gmail.com</p>
            <p>Opp. Old Bus Stand,Near</p>
            <p> Hemavathi statue, Hassan</p>
          </div>
        </div>
      </footer>
      <div className="socialmedia">
        <a href="" className="socialLinks"><img src={facebook} alt="" /></a>
        <a href="https://www.instagram.com/pai_silks_hassan?igsh=MTZuYnZnMWthc2s3dA==" className="socialLinks"><img src={instagram} alt="" /></a>
        <a href="" className="socialLinks"><img src={whatsapp} alt="" /></a>
      </div>
    </>
  );
}

export default Footer;
