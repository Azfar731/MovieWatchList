// Footer.js

import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-text">
                    <p>&copy; {new Date().getFullYear()} Azfar Razzaq. All rights reserved.</p>
                </div>
                <div className="footer-links">
                    <a
                        href="https://github.com/Azfar731"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/azfar-razzaq/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="mailto:azfarrazzaq23@example.com"
                        className="footer-link"
                    >
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
