import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Hero = ({ profile }) => {
  if (!profile) return null;
  
  // 获取社交图标
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin': return <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-blue-600" />;
      case 'github': return <FontAwesomeIcon icon={faGithub} size="2x" className="text-gray-800" />;
      case 'blog': return <FontAwesomeIcon icon={faGlobe} size="2x" className="text-green-600" />;
      default: return null;
    }
  };
  
  return (
    <div className="hero-section">
      <div className="content-container" style={{ position: 'relative', zIndex: 10, padding: '80px 24px' }}>
        <div className="text-center">
          {/* 头像 */}
          {profile.avatarUrl && (
            <div className="mb-8">
              <img 
                src={profile.avatarUrl || 'https://via.placeholder.com/200'} 
                alt="头像" 
                className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
          )}
          
          <h1 className="font-artistic mb-4">
            {profile.name}
          </h1>
          <p className="text-1.75rem text-gray-600 font-light mb-6">
            {profile.title}
          </p>
          <div className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 prose prose-lg max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>{profile.bio || ''}</Markdown>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="text-gray-600 hover:text-indigo-700 transition-colors duration-300">
                <span>{profile.email}</span>
              </a>
            )}
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="text-gray-600 hover:text-indigo-700 transition-colors duration-300">
                <span>{profile.phone}</span>
              </a>
            )}
            {profile.location && (
              <div className="text-gray-600">
                <span>{profile.location}</span>
              </div>
            )}
          </div>
          <div className="flex gap-8 justify-center">
            {profile.socialLinks && Array.isArray(profile.socialLinks) && profile.socialLinks.map((link, index) => (
              link.url && getSocialIcon(link.platform) && (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="social-icon p-2 hover:bg-gray-100 rounded-full transition-colors">
                  {getSocialIcon(link.platform)}
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;