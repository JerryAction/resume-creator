import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faBlog } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt, faGlobe, faCheckCircle, faDatabase, faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
import Skills from './resume/skills.js';

const ResumePreview = ({ data }) => {
  const [expandedProjects, setExpandedProjects] = useState({});
  if (!data) return <div className="text-center py-10">暂无简历数据</div>;

  let { personalInfo, skills = [], experience = [], projects = [], education = [] } = data;
personalInfo = personalInfo ?? {};

  // 获取社交图标
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin': return <FontAwesomeIcon icon={faLinkedin} className="text-blue-600" />;
      case 'github': return <FontAwesomeIcon icon={faGithub} className="text-gray-800" />;
      case 'blog': return <FontAwesomeIcon icon={faGlobe} className="text-green-600" />;
      default: return null;
    }
  };

  // 渲染技能评分条
  const renderSkillBar = (level) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* 英雄区域 */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-2 text-shadow">{personalInfo.name || '您的姓名'}</h1>
              <p className="text-xl text-blue-100 mb-6">{personalInfo.title || '您的职位'}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                {personalInfo.email && (
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> {personalInfo.email}
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" /> {personalInfo.phone}
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> {personalInfo.location}
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faGlobe} className="mr-2" /> {personalInfo.website}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={personalInfo.avatarUrl || 'https://via.placeholder.com/200'} 
                    alt="头像"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 社交链接 */}
        {personalInfo.socialLinks && personalInfo.socialLinks.some(link => link.url) && (
          <div className="bg-gray-50 border-b border-gray-200 py-4 px-8 md:px-12">
            <div className="flex justify-center space-x-6">
              {personalInfo.socialLinks.filter(link => link.url && getSocialIcon(link.platform)).map((link, index) => (
                link.url && (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                    aria-label={link.platform}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                )
              ))}
            </div>
          </div>
        )}

        {/* 主要内容 */}
        <div className="p-8 md:p-12">
          {/* 技能部分 */}
          {skills && skills.categories && (
            <Skills categories={skills.categories} />
          )}

          {/* 工作经历 */}
          {experience && experience.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">工作经历</h2>
              <div className="space-y-8">
                {experience.map((item, index) => (
                  <div key={index} className="flex w-full">
                    <div className="mr-6 flex flex-col items-center">
                      
                      <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                    </div>
                    <div className="pb-8 last:pb-0 flex-1">
                      <div className="flex justify-between items-start mb-1">
                          <h3 className="text-xl font-semibold text-gray-800">{item.position || '职位'}</h3>
                          {item.period && <p className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-md">{item.period}</p>}
                        </div>
                        <p className="text-blue-600 font-medium mb-3">{item.company || '公司名称'}</p>
                      {item.description && (
                        <p className="text-gray-700 mb-4">{item.description}</p>
                      )}
                      {item.achievements && item.achievements.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {item.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 项目经验 */}
          {projects && projects.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">项目经验</h2>
              <div className="space-y-10">
                {projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{project.title || '项目名称'}</h3>
                        <div className="flex items-center space-x-2 ml-auto">
                          {project.period && <p className="text-gray-500 text-sm px-3 py-1 rounded-md">{project.period}</p>}
                          {project.tags && project.tags.includes('特色项目') && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">特色项目</span>
                          )}
                        </div>
                      </div>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded">{tech}</span>
                          ))}
                        </div>
                      )}
                      {project.overview && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 mb-3">项目概述</h4>
                          <p className="text-gray-700">{project.overview}</p>
                        </div>
                      )}
                      {project.description && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 mb-3">项目描述</h4>
                          <p className="text-gray-700">{project.description}</p>
                        </div>
                      )}
                      {project.coreWork && project.coreWork.length > 0 && (
                        <div className="mb-6 border border-gray-200 rounded-lg p-4 shadow-sm">
                          <button
                            className="text-blue-500 text-sm mb-2 flex items-center"
                            onClick={() => setExpandedProjects(prev => ({...prev, [index]: !prev[index]}))}
                          >
                            {expandedProjects[index] ? '收起详情 ▲' : '展示详情 ▼'}
                          </button>
                          <div className={`overflow-y-auto transition-all duration-300 ${expandedProjects[index] ? 'max-h-96' : 'max-h-0'}`}>
                            <h4 className="font-semibold text-gray-800 mb-3">核心工作内容</h4>
                            <div className="space-y-4">
                              {project.coreWork.map((category, catIndex) => (
                                <div key={catIndex} className="mb-4">
                                  <h5 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                    <FontAwesomeIcon icon={faFolder} className="text-blue-500 mr-2" />
                                    {category.category || '未命名分类'}
                                  </h5>
                                  {category.items && category.items.length > 0 && (
                                    <ul className="ml-8 space-y-2">
                                      {category.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start">
                                          <FontAwesomeIcon icon={faFile} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      {project.achievements && project.achievements.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">项目成果</h4>
                          <ul className="space-y-1 text-gray-700">
                            {project.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span> {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 教育背景 */}
          {education && education.length > 0 && (
            <section>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">教育背景</h2>
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <div key={index} className="flex w-full">
                        <div className="pb-8 last:pb-0 flex-1">
                        <div className="flex justify-between items-start mb-1">
                         <h3 className="text-xl font-semibold text-gray-800">{edu.school || '学校名称'}</h3>
                         <p className="text-gray-500 text-sm px-3 py-1 rounded-md ml-auto">{edu.period || '时间段'}</p>
                       </div>
                       <p className="text-blue-600 font-medium mb-1">{edu.degree || '学位'} · {edu.major || '专业'}</p>
                        {edu.description && (
                          <p className="text-gray-700">{edu.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;