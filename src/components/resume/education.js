import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const EducationSection = ({ education }) => {
  return (
    <div className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">教育经历</h2>
          <div className="title-divider"></div>
        </div>

        <div className="space-y-8">
          {education.map((edu) => (
            <div key={edu.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{edu.school}</h3>
                  <p className="text-lg text-indigo-600 font-medium">{edu.degree} in {edu.major}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <p className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">{edu.start_date} - {edu.end_date}</p>
                </div>
              </div>
              {edu.gpa && (
                <div className="mb-3">
                  <p className="text-gray-600">GPA: <span className="font-medium">{edu.gpa}</span></p>
                </div>
              )}
              {edu.description && (
                <div className="mt-4 text-gray-600 prose prose-sm max-w-none">
                  <Markdown remarkPlugins={[remarkGfm]}>{edu.description}</Markdown>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;