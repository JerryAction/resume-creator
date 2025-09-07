import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ExperienceSection = ({ experiences }) => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">
            工作经验
          </h2>
          <div className="title-divider"></div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-4 md:mb-0 md:pr-8">
                <div className={`h-full ${index !== experiences.length - 1 ? 'border-l-2 border-gray-200' : ''} pl-6 relative`}>
                  <div className="absolute left-0 top-0 w-4 h-4 bg-indigo-600 rounded-full -ml-2 mt-1"></div>
                  <p className="text-gray-500 font-medium">
                    {exp.start_date} - {exp.end_date || '至今'}
                  </p>
                </div>
              </div>
              <div className="md:w-3/4 bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-xl text-indigo-600">{exp.company}</p>
                </div>
                <div className="mb-4 prose prose-sm max-w-none">
                  <Markdown remarkPlugins={[remarkGfm]}>{exp.description}</Markdown>
                </div>
                {exp.achievements && exp.achievements.length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">主要成就:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <i className="fas fa-check text-indigo-500 mt-1 mr-2"></i>
                          <div className="text-gray-600 prose prose-sm max-w-none">
                            <Markdown remarkPlugins={[remarkGfm]}>{achievement}</Markdown>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;