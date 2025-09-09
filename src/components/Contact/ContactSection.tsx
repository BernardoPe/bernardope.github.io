import React from 'react';
import { Fade } from '../Fade';
import {
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { Section } from '../Section';
import { ContactCard } from './ContactCard';
import { contactMethods } from '../../data';
import './Contact.css';

export const ContactSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Email':
        return <EmailIcon />;
      case 'LinkedIn':
        return <LinkedInIcon />;
      case 'GitHub':
        return <GitHubIcon />;
      default:
        return <EmailIcon />;
    }
  };

  return (
    <Section
      className="contact-section"
      title="Get In Touch"
      subtitle="I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out!"
      sectionId="contact"
    >
      <Fade direction="up" delay={200} duration={400} triggerOnce>
        <div className="contact-methods">
          {contactMethods.map((contact) => (
            <ContactCard
              key={contact.type}
              title={contact.title}
              description={contact.description}
              href={contact.href}
              icon={getIcon(contact.iconName)}
            />
          ))}
        </div>
      </Fade>
    </Section>
  );
};
