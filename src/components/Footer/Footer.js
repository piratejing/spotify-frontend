import React from "react";
import "./Footer.css";
import About from "../About/About";

export default function Footer() {
  return (
    <footer className="footer__container">
      <About />
      <div className="footer">
        <address className="footer__author">Developed by: Alan Shieh</address>
        <time className="footer__year">2023</time>
      </div>
    </footer>
  );
}
