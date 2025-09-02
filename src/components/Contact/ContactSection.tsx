import React from 'react';
import { Fade } from 'react-awesome-reveal';
import {
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { Section } from '../Section';
import { ContactCard } from './ContactCard';
import { contactMethods } from '../../data';
import './Contact.css';

interface ContactSectionProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ sectionRef }) => {
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
      sectionRef={sectionRef}
      className="contact-section"
      title="Get In Touch"
      subtitle="I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out!"
      sectionId="contact"
    >
      <Fade direction="up" delay={100} duration={600} triggerOnce>
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
