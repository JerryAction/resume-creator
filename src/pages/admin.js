import React, { useState, useEffect } from 'react';
import { saveResumeData } from '../services/api.js';
import { Experience, Project, Skill, Education } from '../entities/all.js';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar_url: '',
    linkedin: '',
    github: '',
    website: ''
  });
  
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  
  // 加载现有数据
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      const profileData = await Profile.list('-created_date');
      if (profileData[0]) setProfile(profileData[0]);
      
      const experienceData = await Experience.list('-start_date');
      setExperiences(experienceData);
      
      const projectData = await Project.list('-start_date');
      setProjects(projectData);
      
      const skillData = await Skill.list('category');
      setSkills(skillData);
      
      const educationData = await Education.list('-start_date');
      setEducation(educationData);
    } catch (err) {
      console.error('加载数据失败:', err);
    }
  };
  
  // 保存数据
  const saveProfile = async () => {
    try {
      await saveResumeData('personalInfo', profile);
      alert('个人信息保存成功');
    } catch (err) {
      console.error('保存失败:', err);
      alert('保存失败: ' + err.message);
    }
  };
  
  const saveExperience = async (exp, index) => {
    try {
      if (exp.id) {
        await Experience.update(exp.id, exp);
      } else {
        await Experience.create(exp);
      }
      alert('工作经历保存成功');
    } catch (err) {
      console.error('保存失败:', err);
      alert('保存失败: ' + err.message);
    }
  };
  
  const saveProject = async (proj, index) => {
    try {
      if (proj.id) {
        await Project.update(proj.id, proj);
      } else {
        await Project.create(proj);
      }
      alert('项目保存成功');
    } catch (err) {
      console.error('保存失败:', err);
      alert('保存失败: ' + err.message);
    }
  };

  const deleteProject = async (id, index) => {
    try {
      if (id) {
        await Project.delete(id);
      }
      // 从本地状态中移除项目
      const newProjects = [...projects];
      newProjects.splice(index, 1);
      setProjects(newProjects);
      alert('项目删除成功');
    } catch (err) {
      console.error('删除失败:', err);
      alert('删除失败: ' + err.message);
    }
  };
  
  const saveSkill = async (skill, index) => {
    try {
      if (skill.id) {
        await Skill.update(skill.id, skill);
      } else {
        await Skill.create(skill);
      }
      alert('技能保存成功');
    } catch (err) {
      console.error('保存失败:', err);
      alert('保存失败: ' + err.message);
    }
  };
  
  const saveEducation = async (edu, index) => {
    try {
      if (edu.id) {
        await Education.update(edu.id, edu);
      } else {
        await Education.create(edu);
      }
      alert('教育背景保存成功');
    } catch (err) {
      console.error('保存失败:', err);
      alert('保存失败: ' + err.message);
    }
  };
  
  // 添加新项
  const addExperience = () => {
    setExperiences([...experiences, {
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
      achievements: [],
      location: ''
    }]);
  };
  
  const addProject = () => {
    setProjects([...projects, {
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
      image_url: '',
      featured: false,
      start_date: '',
      end_date: '',
      team_size: 0,
      role: '',
      achievements: []
    }]);
  };
  
  const addSkill = () => {
    setSkills([...skills, {
      name: '',
      category: 'other',
      level: 5,
      years_experience: 0
    }]);
  };
  
  const addEducation = () => {
    setEducation([...education, {
      school: '',
      degree: '',
      major: '',
      start_date: '',
      end_date: '',
      gpa: '',
      description: ''
    }]);
  };
  
  // 更新字段
  const updateProfileField = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };
  
  const updateExperienceField = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setExperiences(newExperiences);
  };
  
  const updateProjectField = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };
  
  const updateSkillField = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setSkills(newSkills);
  };
  
  const updateEducationField = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">简历管理后台</h1>
        
        {/* 标签页 */}
        <div className="mb-8 bg-white rounded-lg shadow p-1 flex flex-wrap gap-1">
          <button 
            className={`px-4 py-2 rounded-md ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('profile')}
          >
            个人信息
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${activeTab === 'experience' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('experience')}
          >
            工作经历
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('projects')}
          >
            项目作品
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${activeTab === 'skills' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('skills')}
          >
            技能
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${activeTab === 'education' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('education')}
          >
            教育背景
          </button>
        </div>
        
        {/* 个人信息 */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">个人信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input
                  type="text"
                  value={profile.name || ''}
                  onChange={(e) => updateProfileField('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">职位/头衔</label>
                <input
                  type="text"
                  value={profile.title || ''}
                  onChange={(e) => updateProfileField('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input
                  type="email"
                  value={profile.email || ''}
                  onChange={(e) => updateProfileField('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
                <input
                  type="tel"
                  value={profile.phone || ''}
                  onChange={(e) => updateProfileField('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">所在地</label>
                <input
                  type="text"
                  value={profile.location || ''}
                  onChange={(e) => updateProfileField('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">头像URL</label>
                <input
                  type="text"
                  value={profile.avatar_url || ''}
                  onChange={(e) => updateProfileField('avatar_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  type="text"
                  value={profile.linkedin || ''}
                  onChange={(e) => updateProfileField('linkedin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                <input
                  type="text"
                  value={profile.github || ''}
                  onChange={(e) => updateProfileField('github', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">个人网站</label>
                <input
                  type="text"
                  value={profile.website || ''}
                  onChange={(e) => updateProfileField('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
                <textarea
                  value={profile.bio || ''}
                  onChange={(e) => updateProfileField('bio', e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">预览:</h4>
                  <div className="prose prose-sm max-w-none">
                    <Markdown remarkPlugins={[remarkGfm]}>{profile.bio || ''}</Markdown>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={saveProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                保存个人信息
              </button>
            </div>
          </div>
        )}
        
        {/* 工作经历 */}
        {activeTab === 'experience' && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">工作经历</h2>
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                添加工作经历
              </button>
            </div>
            
            {experiences.map((exp, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">公司名称</label>
                    <input
                      type="text"
                      value={exp.company || ''}
                      onChange={(e) => updateExperienceField(index, 'company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">职位</label>
                    <input
                      type="text"
                      value={exp.position || ''}
                      onChange={(e) => updateExperienceField(index, 'position', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                    <input
                      type="date"
                      value={exp.start_date || ''}
                      onChange={(e) => updateExperienceField(index, 'start_date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                    <input
                      type="date"
                      value={exp.end_date || ''}
                      onChange={(e) => updateExperienceField(index, 'end_date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">工作地点</label>
                    <input
                      type="text"
                      value={exp.location || ''}
                      onChange={(e) => updateExperienceField(index, 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <input
                      type="checkbox"
                      checked={exp.is_current || false}
                      onChange={(e) => updateExperienceField(index, 'is_current', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">当前职位</label>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">工作描述</label>
                    <textarea
                      value={exp.description || ''}
                      onChange={(e) => updateExperienceField(index, 'description', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">预览:</h4>
                      <div className="prose prose-sm max-w-none">
                        <Markdown remarkPlugins={[remarkGfm]}>{exp.description || ''}</Markdown>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">主要成就（每行一个）</label>
                    <textarea
                      value={exp.achievements ? exp.achievements.join('\n') : ''}
                      onChange={(e) => updateExperienceField(index, 'achievements', e.target.value.split('\n'))}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">预览:</h4>
                      <div className="prose prose-sm max-w-none">
                        {exp.achievements && exp.achievements.map((achievement, i) => (
                          <div key={i} className="mb-2">
                            <Markdown remarkPlugins={[remarkGfm]}>{achievement}</Markdown>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => saveExperience(exp, index)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    保存工作经历
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* 项目作品 */}
        {activeTab === 'projects' && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">项目作品</h2>
              <button
                onClick={addProject}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                添加项目
              </button>
            </div>
            
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">暂无项目</h3>
                <p className="mt-1 text-sm text-gray-500">开始添加您的第一个项目作品</p>
                <div className="mt-6">
                  <button
                    onClick={addProject}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    添加项目
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.map((proj, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-gray-900">{proj.name || `项目 #${index + 1}`}</h3>
                      <button
                        onClick={() => {
                          if (window.confirm('确定要删除这个项目吗？')) {
                            deleteProject(proj.id, index);
                          }
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">项目名称</label>
                        <input
                          type="text"
                          value={proj.name || ''}
                          onChange={(e) => updateProjectField(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="项目名称"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">项目截图URL</label>
                        <input
                          type="text"
                          value={proj.image_url || ''}
                          onChange={(e) => updateProjectField(index, 'image_url', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com/screenshot.png"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">项目链接</label>
                        <input
                          type="text"
                          value={proj.link || ''}
                          onChange={(e) => updateProjectField(index, 'link', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com/project"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub链接</label>
                        <input
                          type="text"
                          value={proj.github || ''}
                          onChange={(e) => updateProjectField(index, 'github', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://github.com/user/project"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                        <input
                          type="date"
                          value={proj.start_date || ''}
                          onChange={(e) => updateProjectField(index, 'start_date', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                        <input
                          type="date"
                          value={proj.end_date || ''}
                          onChange={(e) => updateProjectField(index, 'end_date', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">团队规模</label>
                        <input
                          type="number"
                          value={proj.team_size || 0}
                          onChange={(e) => updateProjectField(index, 'team_size', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">在项目中的角色</label>
                        <input
                          type="text"
                          value={proj.role || ''}
                          onChange={(e) => updateProjectField(index, 'role', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="前端开发工程师"
                        />
                      </div>
                      <div className="flex items-center pt-6">
                        <input
                          type="checkbox"
                          checked={proj.featured || false}
                          onChange={(e) => updateProjectField(index, 'featured', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">特色项目</label>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">使用技术（每行一个）</label>
                        <textarea
                          value={proj.technologies ? proj.technologies.join('\n') : ''}
                          onChange={(e) => updateProjectField(index, 'technologies', e.target.value.split('\n'))}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="React\nRedux\nNode.js"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">项目描述</label>
                        <textarea
                          value={proj.description || ''}
                          onChange={(e) => updateProjectField(index, 'description', e.target.value)}
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="项目的主要功能和特点..."
                        />
                        <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">预览:</h4>
                          <div className="prose prose-sm max-w-none">
                            <Markdown remarkPlugins={[remarkGfm]}>{proj.description || ''}</Markdown>
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">项目成就（每行一个）</label>
                        <textarea
                          value={proj.achievements ? proj.achievements.join('\n') : ''}
                          onChange={(e) => updateProjectField(index, 'achievements', e.target.value.split('\n'))}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="优化了页面加载速度30%\n实现了核心功能模块"
                        />
                        <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">预览:</h4>
                          <div className="prose prose-sm max-w-none">
                            {proj.achievements && proj.achievements.map((achievement, i) => (
                              <div key={i} className="mb-2">
                                <Markdown remarkPlugins={[remarkGfm]}>{achievement}</Markdown>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={() => {
                          if (window.confirm('确定要删除这个项目吗？')) {
                            deleteProject(proj.id, index);
                          }
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        删除
                      </button>
                      <button
                        onClick={() => saveProject(proj, index)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        保存项目
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* 技能 */}
        {activeTab === 'skills' && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">技能</h2>
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                添加技能
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">技能名称</label>
                      <input
                        type="text"
                        value={skill.name || ''}
                        onChange={(e) => updateSkillField(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">类别</label>
                      <select
                        value={skill.category || 'other'}
                        onChange={(e) => updateSkillField(index, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="frontend">前端开发</option>
                        <option value="backend">后端开发</option>
                        <option value="database">数据库</option>
                        <option value="design">设计</option>
                        <option value="tools">工具</option>
                        <option value="other">其他</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">技能水平 (1-10)</label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={skill.level || 5}
                        onChange={(e) => updateSkillField(index, 'level', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="text-center text-sm text-gray-500">{skill.level || 5}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">经验年数</label>
                      <input
                        type="number"
                        value={skill.years_experience || 0}
                        onChange={(e) => updateSkillField(index, 'years_experience', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => saveSkill(skill, index)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                      >
                        保存
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 教育背景 */}
        {activeTab === 'education' && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">教育背景</h2>
              <button
                onClick={addEducation}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                添加教育背景
              </button>
            </div>
            
            {education.map((edu, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">学校名称</label>
                    <input
                      type="text"
                      value={edu.school || ''}
                      onChange={(e) => updateEducationField(index, 'school', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">学位</label>
                    <input
                      type="text"
                      value={edu.degree || ''}
                      onChange={(e) => updateEducationField(index, 'degree', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">专业</label>
                    <input
                      type="text"
                      value={edu.major || ''}
                      onChange={(e) => updateEducationField(index, 'major', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">成绩</label>
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducationField(index, 'gpa', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                    <input
                      type="date"
                      value={edu.start_date || ''}
                      onChange={(e) => updateEducationField(index, 'start_date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                    <input
                      type="date"
                      value={edu.end_date || ''}
                      onChange={(e) => updateEducationField(index, 'end_date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                    <textarea
                      value={edu.description || ''}
                      onChange={(e) => updateEducationField(index, 'description', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">预览:</h4>
                      <div className="prose prose-sm max-w-none">
                        <Markdown remarkPlugins={[remarkGfm]}>{edu.description || ''}</Markdown>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => saveEducation(edu, index)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    保存教育背景
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}