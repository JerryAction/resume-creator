import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './layout.js';
import ResumePreview from './components/ResumePreview.js';
import { fetchResumeData, saveResumeData } from './services/api.js';
import Admin from './pages/admin.js';
import PersonalInfoEditor from './components/PersonalInfoEditor.js';
import SkillsEditor from './components/SkillsEditor.js';
import ExperienceEditor from './components/ExperienceEditor.js';
import ProjectEditor from './components/ProjectEditor.js';
import EducationEditor from './components/EducationEditor.js';

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('personalInfo');

  // 初始化加载数据
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchResumeData();
        setResumeData(data);
      } catch (error) {
        console.error('Failed to load resume data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // 保存数据到后端
  const handleSaveData = async (section, data) => {
    if (!resumeData) return;

    const updatedData = {
      ...resumeData,
      [section]: data
    };

    try {
      await saveResumeData(section, data);
      setResumeData(updatedData);
      return true;
    } catch (error) {
      console.error(`Failed to save ${section} data:`, error);
      return false;
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-50"><div className="text-xl text-gray-600">加载中...</div></div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* 顶部导航 */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-primary">简历生成器</h1>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/admin"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  编辑模式
                </Link>
                <Link
                  to="/"
                  className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  预览模式
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<div className="editor-container"><ResumePreview data={resumeData} /></div>} />
            <Route
              path="/admin"
              element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/4">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">编辑内容</h2>
                        <nav className="space-y-1">
                          <button
                            onClick={() => setActiveSection('personalInfo')}
                            className={`w-full text-left px-3 py-2 rounded-md ${activeSection === 'personalInfo' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                          >
                            <i className="fa fa-user mr-2"></i>个人信息
                          </button>
                          <button
                            onClick={() => setActiveSection('skills')}
                            className={`w-full text-left px-3 py-2 rounded-md ${activeSection === 'skills' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                          >
                            <i className="fa fa-cogs mr-2"></i>技能特长
                          </button>
                          <button
                            onClick={() => setActiveSection('experience')}
                            className={`w-full text-left px-3 py-2 rounded-md ${activeSection === 'experience' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                          >
                            <i className="fa fa-briefcase mr-2"></i>工作经历
                          </button>
                          <button
                            onClick={() => setActiveSection('projects')}
                            className={`w-full text-left px-3 py-2 rounded-md ${activeSection === 'projects' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                          >
                            <i className="fa fa-sitemap mr-2"></i>项目经验
                          </button>
                          <button
                            onClick={() => setActiveSection('education')}
                            className={`w-full text-left px-3 py-2 rounded-md ${activeSection === 'education' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                          >
                            <i className="fa fa-graduation-cap mr-2"></i>教育背景
                          </button>
                        </nav>
                      </div>
                    </div>

                    <div className="lg:w-3/4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      {activeSection === 'personalInfo' && (
                        <PersonalInfoEditor
                          data={resumeData.personalInfo || {}}
                          onSave={(data) => handleSaveData('personalInfo', data)}
                        />
                      )}
                      {activeSection === 'skills' && (
                        <SkillsEditor
                          data={resumeData.skills || {}}
                          onSave={(data) => handleSaveData('skills', data)}
                        />
                      )}
                      {activeSection === 'experience' && (
                        <ExperienceEditor
                          data={resumeData.experience || []}
                          onSave={(data) => handleSaveData('experience', data)}
                        />
                      )}
                      {activeSection === 'projects' && (
                        <ProjectEditor
                          data={resumeData.projects || []}
                          onSave={(data) => handleSaveData('projects', data)}
                        />
                      )}
                      {activeSection === 'education' && (
                        <EducationEditor
                          data={resumeData.education || {}}
                          onSave={(data) => handleSaveData('education', data)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;