import React from 'react';

interface ContactCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

export const ContactCard: React.FC<ContactCardProps> = ({ title, description, href, icon }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="contact-card">
      <h3 className="contact-card-title">{title}</h3>
      <div className="contact-icon">{icon}</div>
      <p className="contact-card-content">{description}</p>
    </a>
  );
};
