import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPlusCircle, faTrashAlt, faArrowUp, faArrowDown, faListCheck } from '@fortawesome/free-solid-svg-icons';

const ExperienceEditor = ({ data, onSave }) => {
  const [formData, setFormData] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // 初始化表单数据
  // 定义模板数据
  const templateData = [
    {
      company: "示例科技有限公司",
      position: "前端开发工程师",
      period: "2020年3月 - 2023年5月",
      description: "负责公司核心产品的前端开发与优化工作，参与从需求分析到上线的全流程",
      achievements: [
        "重构用户界面组件库，提升开发效率30%",
        "优化前端性能，页面加载时间减少40%",
        "实现响应式设计，支持多终端访问"
      ]
    },
    {
      company: "创新软件工作室",
      position: "实习软件工程师",
      period: "2019年7月 - 2019年12月",
      description: "参与内部管理系统开发，负责前端页面实现与交互逻辑",
      achievements: [
        "开发数据可视化模块，帮助管理层实时监控业务数据",
        "修复多个兼容性问题，提升系统稳定性"
      ]
    }
  ];

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      // 使用用户数据
      setFormData(data.map(item => ({
        ...item,
        achievements: item.achievements || []
      })));
    } else {
      // 使用模板数据
      setFormData(templateData);
    }
  }, [data]);

  // 添加新工作经历
  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      period: '',
      description: '',
      achievements: []
    };
    setFormData([...formData, newExperience]);
    setSaveStatus(null);
  };

  // 删除工作经历
  const removeExperience = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
    setSaveStatus(null);
  };

  // 调整工作经历顺序
  const reorderExperience = (fromIndex, toIndex) => {
    const updatedExperiences = [...formData];
    const [removed] = updatedExperiences.splice(fromIndex, 1);
    updatedExperiences.splice(toIndex, 0, removed);
    setFormData(updatedExperiences);
    setSaveStatus(null);
  };

  // 更新工作经历字段
  const updateExperienceField = (index, field, value) => {
    const updatedExperiences = [...formData];
    updatedExperiences[index][field] = value;
    setFormData(updatedExperiences);
    setSaveStatus(null);
  };

  // 添加成就
  const addAchievement = (index) => {
    const updatedExperiences = [...formData];
    if (!updatedExperiences[index].achievements) {
      updatedExperiences[index].achievements = [];
    }
    updatedExperiences[index].achievements.push('');
    setFormData(updatedExperiences);
    setSaveStatus(null);
  };

  // 更新成就
  const updateAchievement = (expIndex, achIndex, value) => {
    const updatedExperiences = [...formData];
    updatedExperiences[expIndex].achievements[achIndex] = value;
    setFormData(updatedExperiences);
    setSaveStatus(null);
  };

  // 删除成就
  const removeAchievement = (expIndex, achIndex) => {
    const updatedExperiences = [...formData];
    updatedExperiences[expIndex].achievements.splice(achIndex, 1);
    setFormData(updatedExperiences);
    setSaveStatus(null);
  };

  // 验证工作经历数据
  const validateExperienceData = () => {
    for (const exp of formData) {
      if (!exp.company) {
        return false;
      }
    }
    return true;
  };

  // 保存工作经历数据
  const handleSave = async () => {
    if (!validateExperienceData()) {
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">工作经历编辑</h2>
        <p className="text-gray-600 mb-6">添加您的工作经历，包括公司名称、职位、时间段、工作职责描述和主要成就</p>

        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> 添加工作经历
        </button>
      </div>

      {formData.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-md text-gray-500 mt-8">
          暂无工作经历
          <p className="mt-2">点击上方"添加工作经历"按钮开始添加</p>
        </div>
      ) : (
        <div className="space-y-8 mt-8">
          {formData.map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faBriefcase} className="text-primary mr-2" />
                  <span className="font-medium">工作经历 #{index + 1}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => reorderExperience(index, index - 1)}
                    disabled={index === 0}
                    className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:text-primary'}`}
                    title="上移"
                  >
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  </button>
                  <button
                    type="button"
                    onClick={() => reorderExperience(index, index + 1)}
                    disabled={index === formData.length - 1}
                    className={`p-1 rounded ${index === formData.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:text-primary'}`}
                    title="下移"
                  >
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">公司名称 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={exp.company || ''}
                      onChange={(e) => updateExperienceField(index, 'company', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      placeholder="输入公司名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">职位</label>
                    <input
                      type="text"
                      value={exp.position || ''}
                      onChange={(e) => updateExperienceField(index, 'position', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      placeholder="输入职位"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">时间段</label>
                  <input
                    type="text"
                    value={exp.period || ''}
                    onChange={(e) => updateExperienceField(index, 'period', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="例如：2020年1月 - 至今"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">工作职责描述</label>
                  <textarea
                    value={exp.description || ''}
                    onChange={(e) => updateExperienceField(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    rows={3}
                    placeholder="描述您的主要工作职责和内容"
                  ></textarea>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">主要成就</label>
                    <button
                      type="button"
                      onClick={() => addAchievement(index)}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      <FontAwesomeIcon icon={faPlusCircle} className="mr-1" /> 添加成就
                    </button>
                  </div>

                  {exp.achievements && exp.achievements.length > 0 ? (
                    <div className="space-y-3">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-start">
                          <FontAwesomeIcon icon={faListCheck} className="text-green-500 mt-1.5 mr-3 flex-shrink-0" />
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            placeholder="例如：优化数据库性能，提升查询速度30%"
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
                      暂无成就
                      <p className="mt-1">点击上方"添加成就"按钮开始添加</p>
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
            {isSaving ? '保存中...' : '保存工作经历'}
          </button>
          {saveStatus === 'success' && (
            <div className="text-green-600 flex items-center">
              <i className="fa fa-check-circle mr-1"></i> 保存成功
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="text-red-600 flex items-center">
              <i className="fa fa-exclamation-circle mr-1"></i> 请填写公司名称
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExperienceEditor;