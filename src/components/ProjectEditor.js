import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faPlusCircle, faTrashAlt, faArrowUp, faArrowDown, faTag, faListCheck, faBriefcase, faPlus, faCaretRight, faFolderPlus, faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
const ProjectEditor = ({ data, onSave }) => {
  const [formData, setFormData] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // 初始化表单数据
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setFormData(data.map(item => ({
  ...item,
  technologies: item.technologies || [],
  achievements: item.achievements || [],
  coreWork: item.coreWork ? (Array.isArray(item.coreWork) ? item.coreWork.map(work => typeof work === 'string' ? (() => { const [category, item] = work.split(':', 2); if (item === undefined) { return { category: '未分类', items: [category.trim()] }; } return { category: category?.trim() || '', items: [item.trim()] }; })() : (work && typeof work === 'object' ? { category: work.category?.trim() === '' ? '' : work.category?.trim() || '未分类', items: Array.isArray(work.items) ? work.items : work.items !== null && work.items !== undefined ? [work.items.toString()] : ['数据格式不支持'] } : { category: '未分类', items: [] }) ) : typeof item.coreWork === 'object' ? Object.entries(item.coreWork).map(([category, items]) => ({ category: category.trim(), items: Array.isArray(items) ? items : items !== null && items !== undefined ? [items.toString()] : ['数据格式不支持'] })) : typeof item.coreWork === 'string' ? item.coreWork.split(/\r?\n/).map(line => line.trim()).filter(line => line).map(line => { const [category, item] = line.split(':', 2); if (item === undefined) { return { category: '未分类', items: [category.trim()] }; } return { category: category?.trim() || '未分类', items: [item.trim()] }; }) : []) : []
})));
    }
  }, [data]);

  // 添加新项目
  const addProject = () => {
    const newProject = {
      title: '',
      company: '',
      period: '',
      description: '',
      technologies: [],
      achievements: []
    };
    setFormData([...formData, newProject]);
    setSaveStatus(null);
  };

  // 删除项目
  const removeProject = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
    setSaveStatus(null);
  };

  // 调整项目顺序
  const reorderProject = (fromIndex, toIndex) => {
    const updatedProjects = [...formData];
    const [removed] = updatedProjects.splice(fromIndex, 1);
    updatedProjects.splice(toIndex, 0, removed);
    setFormData(updatedProjects);
    setSaveStatus(null);
  };

  // 更新项目字段
  const updateProjectField = (index, field, value) => {
    const updatedProjects = [...formData];
    updatedProjects[index][field] = value;
    setFormData(updatedProjects);
    setSaveStatus(null);
  };

  // 添加技术标签
  const addTechnology = (index) => {
    const updatedProjects = [...formData];
    if (!updatedProjects[index].technologies) {
      updatedProjects[index].technologies = [];
    }
    updatedProjects[index].technologies.push('');
    setFormData(updatedProjects);
    setSaveStatus(null);
  };

  // 更新技术标签
  const updateTechnology = (projIndex, techIndex, value) => {
    const updatedProjects = [...formData];
    updatedProjects[projIndex].technologies[techIndex] = value;
    setFormData(updatedProjects);
    setSaveStatus(null);
  };

  // 删除技术标签
  const removeTechnology = (projIndex, techIndex) => {
    const updatedProjects = [...formData];
    updatedProjects[projIndex].technologies.splice(techIndex, 1);
    setFormData(updatedProjects);
    setSaveStatus(null);
  };

  // 添加项目成果
  const addAchievement = (index) => {
    const updatedProjects = [...formData];
    if (!updatedProjects[index].achievements) {
      updatedProjects[index].achievements = [];
    }
    updatedProjects[index].achievements.push('');
    setFormData(updatedProjects);
    setSaveStatus(null);
  };

  // 更新项目成果
  const updateAchievement = (projIndex, achIndex, value) => {
    const updatedProjects = [...formData];
    updatedProjects[projIndex].achievements[achIndex] = value;
    setFormData(updatedProjects);
    setSaveStatus(null);
  };

  // 删除项目成果
const removeAchievement = (projIndex, achIndex) => {
  const updatedProjects = [...formData];
  updatedProjects[projIndex].achievements.splice(achIndex, 1);
  setFormData(updatedProjects);
  setSaveStatus(null);
};

// 添加核心工作内容
// 添加核心工作分类
const addCoreCategory = (index) => {
  const updatedProjects = [...formData];
  if (!updatedProjects[index].coreWork) {
    updatedProjects[index].coreWork = [];
  }
  updatedProjects[index].coreWork.push({ category: '', items: [] });
  setFormData(updatedProjects);
  setSaveStatus(null);
};

// 添加核心工作子项
const addCoreItem = (projIndex, catIndex) => {
  const updatedProjects = [...formData];
  updatedProjects[projIndex].coreWork[catIndex].items.push('');
  setFormData(updatedProjects);
  setSaveStatus(null);
};

// 更新核心工作分类
const updateCoreCategory = (projIndex, catIndex, value) => {
  const updatedProjects = [...formData];
  updatedProjects[projIndex].coreWork[catIndex].category = value;
  setFormData(updatedProjects);
  setSaveStatus(null);
};

// 更新核心工作子项
const updateCoreItem = (projIndex, catIndex, itemIndex, value) => {
  const updatedProjects = [...formData];
  updatedProjects[projIndex].coreWork[catIndex].items[itemIndex] = value;
  setFormData(updatedProjects);
  setSaveStatus(null);
};

// 删除核心工作分类
const removeCoreCategory = (projIndex, catIndex) => {
  const updatedProjects = [...formData];
  updatedProjects[projIndex].coreWork.splice(catIndex, 1);
  setFormData(updatedProjects);
  setSaveStatus(null);
};

// 删除核心工作子项
const removeCoreItem = (projIndex, catIndex, itemIndex) => {
  const updatedProjects = [...formData];
  updatedProjects[projIndex].coreWork[catIndex].items.splice(itemIndex, 1);
  setFormData(updatedProjects);
  setSaveStatus(null);
};

// 验证项目数据
  const validateProjectData = () => {
    for (const proj of formData) {
      if (!proj.title) {
        return false;
      }
    }
    return true;
  };

  // 保存项目数据
  const handleSave = async () => {
    if (!validateProjectData()) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    setIsSaving(true);
    const success = await onSave(formData);
    setSaveStatus(success ? 'success' : 'error');
    setIsSaving(false);

    if (success) {
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">项目经验编辑</h2>
        <p className="text-gray-600 mb-6">添加您的项目经验，包括项目名称、所属公司、时间段、项目描述、技术标签和项目成果</p>

        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> 添加项目经验
        </button>
      </div>

      {formData.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-md text-gray-500 mt-8">
          暂无项目经验
          <p className="mt-2">点击上方"添加项目经验"按钮开始添加</p>
        </div>
      ) : (
        <div className="space-y-8 mt-8">
          {formData.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faProjectDiagram} className="text-primary mr-2" />
                  <span className="font-medium">项目 #{index + 1}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => reorderProject(index, index - 1)}
                    disabled={index === 0}
                    className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:text-primary'}`}
                    title="上移"
                  >
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  </button>
                  <button
                    type="button"
                    onClick={() => reorderProject(index, index + 1)}
                    disabled={index === formData.length - 1}
                    className={`p-1 rounded ${index === formData.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:text-primary'}`}
                    title="下移"
                  >
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-700 p-1 rounded"
                    title="删除"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">项目名称 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={project.title || ''}
                      onChange={(e) => updateProjectField(index, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      placeholder="输入项目名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">所属公司/组织</label>
                    <input
                      type="text"
                      value={project.company || ''}
                      onChange={(e) => updateProjectField(index, 'company', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      placeholder="输入所属公司或组织"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">项目时间段</label>
                  <input
                    type="text"
                    value={project.period || ''}
                    onChange={(e) => updateProjectField(index, 'period', e.target.value.trim())}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="例如：2021年3月 - 2021年9月"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">项目描述</label>
                  <textarea
                    value={project.description || ''}
                    onChange={(e) => updateProjectField(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    rows={3}
                    placeholder="描述项目背景、目标和您的职责"
                  ></textarea>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">技术标签</label>
                    <button
                      type="button"
                      onClick={() => addTechnology(index)}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      <FontAwesomeIcon icon={faPlusCircle} className="mr-1" /> 添加技术标签
                    </button>
                  </div>

                  {project.technologies && project.technologies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                          <FontAwesomeIcon icon={faTag} className="text-gray-500 mr-2 text-xs" />
                          <input
                            type="text"
                            value={tech}
                            onChange={(e) => updateTechnology(index, techIndex, e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-sm px-1"
                            placeholder="技术名称"
                          />
                          <button
                            type="button"
                            onClick={() => removeTechnology(index, techIndex)}
                            className="ml-2 text-gray-400 hover:text-red-500"
                          >
                            <span className="text-xs">×</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 border border-dashed border-gray-300 rounded-md text-gray-500 text-sm">
                      暂无技术标签
                      <p className="mt-1">点击上方"添加技术标签"按钮开始添加</p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">项目成果</label>
                    <button
                      type="button"
                      onClick={() => addAchievement(index)}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      <FontAwesomeIcon icon={faPlusCircle} className="mr-1" /> 添加成果
                    </button>
                  </div>

                  {project.achievements && project.achievements.length > 0 ? (
                    <div className="space-y-3">
                      {project.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start">
                          <FontAwesomeIcon icon={faListCheck} className="text-green-500 mt-1.5 mr-3 flex-shrink-0" />
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            placeholder="例如：设计并实现了核心模块，提升系统性能25%"
                          />
                          <button
                            type="button"
                            onClick={() => removeAchievement(index, achIndex)}
                            className="ml-2 text-red-500 hover:text-red-700 p-2 flex-shrink-0"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 border border-dashed border-gray-300 rounded-md text-gray-500 text-sm">
                      暂无项目成果
                      <p className="mt-1">点击上方"添加成果"按钮开始添加</p>
                    </div>
                  )}
                </div>

                {/* 核心工作内容 */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">核心工作内容</label>
                    <button
                      type="button"
                      onClick={() => addCoreCategory(index)}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      <FontAwesomeIcon icon={faFolderPlus} className="mr-1" /> 添加工作分类
                    </button>
                  </div>

                  {(project.coreWork && project.coreWork.length > 0) ? (
                    <div className="space-y-6">
                      {project.coreWork.map((category, catIndex) => (
                        <div key={catIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center mb-4">
                            <FontAwesomeIcon icon={faFolder} className="text-blue-500 mr-3" />
                            <input
                              type="text"
                              value={category.category}
                              onChange={(e) => updateCoreCategory(index, catIndex, e.target.value)}
                              placeholder="输入工作分类（例如：数据迁移与归档）"
                              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            />
                            <button
                              type="button"
                              onClick={() => removeCoreCategory(index, catIndex)}
                              className="ml-3 text-red-500 hover:text-red-700"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </div>

                          <div className="ml-8 space-y-3">
                            {category.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-start">
                                <FontAwesomeIcon icon={faFile} className="text-green-500 mt-1.5 mr-3 flex-shrink-0" />
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => updateCoreItem(index, catIndex, itemIndex, e.target.value)}
                                  placeholder="输入具体工作内容"
                                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeCoreItem(index, catIndex, itemIndex)}
                                  className="ml-2 text-red-500 hover:text-red-700 p-1"
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                                </button>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() => addCoreItem(index, catIndex)}
                              className="text-sm text-green-600 hover:text-green-800"
                            >
                              <FontAwesomeIcon icon={faPlus} className="mr-1" /> 添加工作子项
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border border-dashed border-gray-300 rounded-md text-gray-500 text-sm">
                      暂无工作分类
                      <p className="mt-2">点击上方"添加工作分类"按钮开始添加</p>
                    </div>
                  )}
                </div>

                
              </div>
            </div>
          ))}
        </div>
      )}

      {formData.length > 0 && (
        <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${isSaving
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'}
            `}
          >
            {isSaving ? '保存中...' : '保存项目经验'}
          </button>
          {saveStatus === 'success' && (
            <div className="text-green-600 flex items-center">
              <i className="fa fa-check-circle mr-1"></i> 保存成功
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="text-red-600 flex items-center">
              <i className="fa fa-exclamation-circle mr-1"></i> 请填写所有必填字段
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectEditor;