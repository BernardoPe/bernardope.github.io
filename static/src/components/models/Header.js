import React from 'react';
import { NavLink } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import "./header.css";
import data from "../../data.json";


export default function Header() {
    return (
      <Fade triggerOnce>
        <header className="header">
          <div className="logo-name">
            <Link to={data.resume}>Bernardo André Pereira</Link>
          </div>
          <ul className="menu">
            <li>
              <NavLink to="/">
                <i className="fa fa-home menu-icon"></i>
                <p className="menu-item">Home</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">
                <i className="fa fa-user menu-icon"></i>
                <p className="menu-item">About</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects">
                <i className="fa fa-code menu-icon"></i>
                <p className="menu-item">Projects</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/skills">
                <i className="fa fa-cogs menu-icon"></i>
                <p className="menu-item">Skills</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/education">
                <i className="fa fa-graduation-cap menu-icon"></i>
                <p className="menu-item">Education</p>
              </NavLink>
            </li>
          </ul>
        </header>
      </Fade>
    );
}