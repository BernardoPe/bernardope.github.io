import React from 'react'
import './skill.css'
import { Fade } from 'react-awesome-reveal'

export default function Skill({skill}) {
    return (
        <Fade>
            <div className="skill">
                <div className="skill__image">
                    <img src={require(`../../assets/images/` + skill.image)} alt={skill.title} />
                </div>
                <div className="skill__card">
                    <h2>{skill.title}</h2>
                    <div className="skill__list">
                        {skill.list.map((item) => (
                            <ul className="skill__listItem">
                                <img src={item.icon} alt={item.name} />
                            </ul>
                        ))}
                    </div> 
                    <div className="skill_text_list">
                        {skill.text.map((text) => (
                            <p className='skill_text'>{text}</p>
                        ))}
                    </div>
                </div>
            </div>
        </Fade>
    )
}