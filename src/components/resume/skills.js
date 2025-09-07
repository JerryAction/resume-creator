import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faTools, faCode, faServer, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

const Skills = ({ skills }) => {
  // 获取类别对应的图标
const getCategoryIcon = (category) => {
  switch(category.toLowerCase()) {
    case '数据库技术': return <FontAwesomeIcon icon={faDatabase} className="text-blue-600" />;
    case '工具与技术': return <FontAwesomeIcon icon={faTools} className="text-orange-500" />;
    case '编程技能': return <FontAwesomeIcon icon={faCode} className="text-purple-600" />;
    case '服务器技术': return <FontAwesomeIcon icon={faServer} className="text-green-600" />;
    case '前端开发': return <FontAwesomeIcon icon={faLaptopCode} className="text-indigo-500" />;
    default: return <FontAwesomeIcon icon={faLaptopCode} className="text-gray-500" />;
  }
};

// 按类别分组技能
const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
<h2 className="section-title flex items-center text-2xl font-bold text-gray-800 mb-6">
  <FontAwesomeIcon icon={faLaptopCode} className="mr-3 text-indigo-600" />
  专业技能
</h2><div className="title-divider"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-100 flex items-center">
  {getCategoryIcon(category)}
  <span className="ml-2 text-gray-800">{category}</span>
</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={`${category}-${skill.name}-${index}`} className="group p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">{skill.name}</h4>
                      <span className="text-sm text-gray-500">{skill.level}/10</span>
                    </div>
<div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
  <div 
    className="h-full rounded-full transition-all duration-1000 ease-out"
    style={{ 
  width: `${skill.level * 10}%`,
  background: category === '数据库技术' ? 'linear-gradient(to right, #8b5cf6, #a78bfa)' : 
             category === '工具与技术' ? 'linear-gradient(to right, #10b981, #34d399)' : 
             skill.level * 10 >= 90 ? 'linear-gradient(to right, #10b981, #34d399)' : 
             skill.level * 10 >= 70 ? 'linear-gradient(to right, #3b82f6, #60a5fa)' : 
             'linear-gradient(to right, #f59e0b, #fbbf24)'
}}
  ></div>
</div>
                    <div className="mt-2 text-sm text-gray-500 prose prose-sm max-w-none">
                      <Markdown remarkPlugins={[remarkGfm]}>{skill.description || (skill.years ? `${skill.years} 年经验` : '')}</Markdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;