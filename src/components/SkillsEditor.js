import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faTools, faPlusCircle, faTrashAlt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slider';

const SkillsEditor = ({ data, onSave }) => {
  const [formData, setFormData] = useState({
    databases: [],
    tools: []
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // 初始化表单数据
  useEffect(() => {
    if (data) {
      setFormData({
        databases: data.databases || [],
        tools: data.tools || []
      });
    }
  }, [data]);

  // 添加新技能
  const addSkill = (category) => {
    const newSkill = { name: '', level: 5 };
  setFormData(prev => ({
      ...prev,
      [category]: [...prev[category], newSkill]
    }));
    setSaveStatus(null);
  };

  // 删除技能
  const removeSkill = (category, index) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
    setSaveStatus(null);
  };

  // 更新技能名称
  const updateSkillName = (category, index, name) => {
    const updatedSkills = [...formData[category]];
    updatedSkills[index].name = name;
    setFormData(prev => ({
      ...prev,
      [category]: updatedSkills
    }));
    setSaveStatus(null);
  };

  // 更新技能熟练度
  const updateSkillLevel = (category, index, level) => {
    const updatedSkills = [...formData[category]];
    updatedSkills[index].level = level;
    setFormData(prev => ({
      ...prev,
      [category]: updatedSkills
    }));
    setSaveStatus(null);
  };

  // 调整技能顺序
  const reorderSkill = (category, fromIndex, toIndex) => {
    const updatedSkills = [...formData[category]];
    const [removed] = updatedSkills.splice(fromIndex, 1);
    updatedSkills.splice(toIndex, 0, removed);
    setFormData(prev => ({
      ...prev,
      [category]: updatedSkills
    }));
    setSaveStatus(null);
  };

  // 保存技能数据
  const handleSave = async () => {
    // 验证所有技能都有名称
    const hasEmptyName = [...formData.databases, ...formData.tools].some(skill => !skill.name.trim());
    if (hasEmptyName) {
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

  // 渲染技能列表
  const renderSkillList = (category, icon, title) => {
    return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center">
          <FontAwesomeIcon icon={icon} className="mr-2 text-primary" /> {title}
        </h3>
        <button
          type="button"
          onClick={() => addSkill(category)}
          className="text-primary hover:text-primary/80"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="mr-1" /> 添加技能
        </button>
      </div>

      {formData[category].length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-md text-gray-500">
          点击上方"添加技能"按钮开始添加{title.toLowerCase()}
        </div>
      ) : (
        <div className="space-y-1">
          {formData[category].map((skill, index) => (
            <div key={index} className="bg-gray-50 p-1 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => reorderSkill(category, index, index - 1)}
                    disabled={index === 0}
                    className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:text-primary'}`}
                  >
                    <FontAwesomeIcon icon={faArrowUp} size="xs" />
                  </button>
                  <button
                    type="button"
                    onClick={() => reorderSkill(category, index, index + 1)}
                    disabled={index === formData[category].length - 1}
                    className={`p-1 rounded ${index === formData[category].length - 1 ? 'text-gray-300' : 'text-gray-600 hover:text-primary'}`}
                  >
                    <FontAwesomeIcon icon={faArrowDown} size="xs" />
                  </button>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkillName(category, index, e.target.value)}
                    className="flex-grow px-1 py-0.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="技能名称"
                  />
                  <button
                    type="button"
                    onClick={() => removeSkill(category, index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                  </button>
                </div>
                <span className="text-sm font-medium text-gray-600 w-12 text-right">
                  {skill.level || ""}
                </span>
              </div>
              <div className="pl-4 pr-2 flex items-center justify-end gap-2 flex-nowrap">
                <div className="text-xs text-gray-600 whitespace-nowrap">技能水平 (1-10)</div>
<input
                  type="number"
                  value={skill.level ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      updateSkillLevel(category, index, null);
                    } else {
                      const numValue = parseInt(value);
                      if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
                        updateSkillLevel(category, index, numValue);
                      }
                    }
                  }}
                  min="1"
                  max="10"
                  className="w-12 h-6 border border-gray-300 rounded-md px-2 text-center focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="技能等级输入"
                />
                    
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    );
  }


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">技能特长编辑</h2>
        <p className="text-gray-600 mb-6">添加您掌握的数据库技术和工具技能，并设置熟练度（1-10整数等级）</p>
      </div>

      <>
        {renderSkillList('databases', faDatabase, '数据库技术')}
        {renderSkillList('tools', faTools, '工具与技术')}
      </>

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
          {isSaving ? '保存中...' : '保存技能信息'}
        </button>
        {saveStatus === 'success' && (
          <div className="text-green-600 flex items-center">
            <i className="fa fa-check-circle mr-1"></i> 保存成功
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="text-red-600 flex items-center">
            <i className="fa fa-exclamation-circle mr-1"></i> 请确保所有技能都有名称
          </div>
        )}
      </div>
    </div>
  );
};


export default SkillsEditor;