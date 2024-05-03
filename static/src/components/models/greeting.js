import React from 'react'
import "./greeting.css";
import data from "../../data.json";
import { Fade } from 'react-awesome-reveal';
import profileImage from '../../assets/images/code_review.svg';

export default function Greeting() {
    return (
      <Fade triggerOnce>
        <div className="greeting">
          <div className="greeting-text-div">
            <h1 className="greeting-title">{data.greeting.name}</h1>
            <h2 className="greeting-subtitle">
              {data.greeting.position} 
            </h2>
            <p className="greeting-text">
              <i className='fa fa-map-marker greeting-icon'></i>
              {data.greeting.location}
            </p>
            <div className="social-links">
              {data.social.map((social) => {
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="social-link"
                  >
                  <i
                    className={social.icon}
                    style={{ backgroundColor: social.bg_color }}
                  ></i>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="greeting-image-div">
            <img alt="profile" src={profileImage} className="greeting-image" />
          </div>
        </div>
      </Fade>
    );
}
