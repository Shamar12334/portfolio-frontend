import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer(){
    return(
        <footer className="nav-foot">
            <div className="flex flex-col items-center">
                <div className="nav-links-2">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/about">About</Link>
                    <Link className="nav-link" to="/projects">Projects</Link>
                    <Link className="nav-link" to="/skills">Skills</Link>
                    <Link className="nav-link" to="/contact">Contact</Link>
                </div>
                <div className="social-links">
                    <a className="nav-link" href="https://linkedin.com/in/shamar-weekes" target="_blank" rel="noopener">LinkedIn</a>
                    <a className="nav-link" href="https://github.com/Shamar12334" target="_blank" rel="noopener">GitHub</a>
                </div>
                <h1>&copy; 2025 Shamar Weekes</h1>
            </div>
        </footer>
    );
}
export default Footer;