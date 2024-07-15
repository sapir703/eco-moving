import React from 'react';
import '../App.css';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Typography from "@mui/material/Typography";
function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">
        <div className="footer-logo">
            <LocalShippingIcon sx={{ display: { xs: 'none', md: 'flex'}, mr: 1, fontSize:'2vh' }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    fontSize: '2vh',
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                Eco Moving
            </Typography>        </div>
        <div className="footer-contact">
          <h2>Contact Us</h2>
          <p>Email: ecomoving@gmail.com</p>
          <p>Phone: 054-1122334</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Eco Moving. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
