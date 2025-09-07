import React from 'react';
import "./resume.css";
import Hero from '../components/resume/hero.js';
import Skills from '../components/resume/skills.js';
import ExperienceSection from '../components/resume/experience.js';
import Projects from '../components/resume/projects.js';
import EducationSection from '../components/resume/education.js';
import Footer from '../components/resume/footer.js';

export default function Resume({ data }) {
  // 如果有传入data属性，直接使用
  if (data) {
    const { personalInfo: profile, skills, experience: experiences, projects, education } = data;
    
    // 转换skills数据结构以适应Skills组件
    let formattedSkills = [];
    if (skills) {
      // 处理databases类别
      if (skills.databases && Array.isArray(skills.databases)) {
        formattedSkills = formattedSkills.concat(
          skills.databases.map((skill, index) => ({
            id: `database-${index}`,
            name: skill.name,
            level: skill.level,
            category: '数据库技术',
            description: `掌握${skill.name}，熟练度${skill.level * 10}%`
          }))
        );
      }
      
      // 处理tools类别
      if (skills.tools && Array.isArray(skills.tools)) {
        formattedSkills = formattedSkills.concat(
          skills.tools.map((skill, index) => ({
            id: `tool-${index}`,
            name: skill.name,
            level: skill.level,
            category: '工具与技术',
            description: `掌握${skill.name}，熟练度${skill.level * 10}%`
          }))
        );
      }
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {profile && <Hero profile={profile} />}
        {formattedSkills.length > 0 && <Skills skills={formattedSkills} />}
        {experiences && experiences.length > 0 && <ExperienceSection experiences={experiences} />}
        {projects && projects.length > 0 && <Projects projects={projects} />}
        {education && Object.keys(education).length > 0 && <EducationSection education={education} />}
        <Footer />
      </div>
    );
  }

  // 如果没有传入data属性，显示加载提示
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-2xl font-medium text-gray-700">
        加载中...
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-2xl font-medium text-gray-700">
          加载中...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-2xl text-red-500 font-medium">
          加载失败: {error}
        </div>
      </div>
    );
  }

  // 检查是否有数据
  const hasData = profile || experiences.length > 0 || projects.length > 0 || skills.length > 0 || education.length > 0;

  if (!hasData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-2xl font-medium text-gray-700">
          暂无数据
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {profile && <Hero profile={profile} />}
      {skills.length > 0 && <Skills skills={skills} />}
      {experiences.length > 0 && <ExperienceSection experiences={experiences} />}
      {projects.length > 0 && <Projects projects={projects} />}
      {education.length > 0 && <EducationSection education={education} />}
      <Footer />
    </div>
  );
}