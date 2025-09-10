import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faTools, faCode, faServer, faPlusCircle, faTrashAlt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slider';

const SkillsEditor = ({ data, onSave }) => {
  const getCategoryIcon = (index) => {
    const icons = [faDatabase, faTools, faCode, faServer];
    return icons[index] || faServer;
  };

  const getCategoryColor = (index) => {
    const colors = ['#8b5cf6', '#10b981', '#3b82f6', '#f59e0b'];
    return colors[index] || '#6b7280';
  };

  const [formData, setFormData] = useState({
  categories: [
    { name: "数据库技术", skills: [] },
    { name: "工具与技术", skills: [] }
  ]
});
  // 移除tempCategoryNames状态，直接编辑formData
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // 初始化表单数据
  useEffect(() => {
  if (data && data.categories) {
    setFormData({
      categories: data.categories.map(cat => ({ name: cat.name, skills: cat.skills || [] }))
    });
  } else if (data) {
    // 兼容旧数据格式
    setFormData({
      categories: [
        { name: data.categoryNames?.databases || "数据库技术", skills: data.databases || [] },
        { name: data.categoryNames?.tools || "工具与技术", skills: data.tools || [] }
      ]
    });
  }
}, [data]);

  // 添加新技能
  const addSkill = (index) => {
    const newSkill = { name: '', level: 5 };
  setFormData(prev => ({
      ...prev,
      categories: prev.categories.map((cat, i) => i === index ? {...cat, skills: [...cat.skills, newSkill]} : cat)
    }));
    setSaveStatus(null);
  };

  // 删除技能
  const removeSkill = (categoryIndex, skillIndex) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.map((cat, i) => i === categoryIndex ? {...cat, skills: cat.skills.filter((_, i) => i !== skillIndex)} : cat)
    }));
    setSaveStatus(null);
  };

  // 更新技能名称
  const updateSkillName = (categoryIndex, skillIndex, name) => {
    const updatedSkills = [...formData.categories[categoryIndex].skills];
    updatedSkills[skillIndex].name = name;
    setFormData(prev => ({
      ...prev,
      categories: formData.categories.map((cat, i) => i === categoryIndex ? {...cat, skills: updatedSkills} : cat)
    }));
    setSaveStatus(null);
  };

  // 更新技能熟练度
  const updateSkillLevel = (categoryIndex, skillIndex, level) => {
    const updatedSkills = [...formData.categories[categoryIndex].skills];
    updatedSkills[skillIndex].level = level;
    setFormData(prev => ({
      ...prev,
      categories: formData.categories.map((cat, i) => i === categoryIndex ? {...cat, skills: updatedSkills} : cat)
    }));
    setSaveStatus(null);
  };

  // 删除分类
  const removeCategory = (index) => {
    if (formData.categories.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));
    setSaveStatus(null);
  };

  // 调整技能顺序
  const reorderSkill = (categoryIndex, fromIndex, toIndex) => {
    const updatedSkills = [...formData.categories[categoryIndex].skills];
    const [removed] = updatedSkills.splice(fromIndex, 1);
    updatedSkills.splice(toIndex, 0, removed);
    setFormData(prev => ({
      ...prev,
      categories: formData.categories.map((cat, i) => i === categoryIndex ? {...cat, skills: updatedSkills} : cat)
    }));
    setSaveStatus(null);
  };

  // 保存技能数据
  const handleSave = async () => {
    // 验证所有技能都有名称
    setIsSaving(true);
    // 先更新分类名称
    const updatedFormData = {
  categories: formData.categories
};
    const success = await onSave(updatedFormData);
    setSaveStatus(success ? 'success' : 'error');
    setIsSaving(false);

    if (success) {
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // 渲染技能列表
  const renderSkillList = (index, icon, title) => {
    return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
      <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <FontAwesomeIcon icon={icon} style={{ color: getCategoryColor(index) }} className="mr-2" />
            <input
                type="text"
                value={formData.categories[index].name}
                onChange={(e) => {
  setFormData(prev => ({
    ...prev,
    categories: prev.categories.map((cat, i) => 
      i === index ? { ...cat, name: e.target.value.trim() } : cat
    )
  }));
}}
                className="border-b border-gray-300 focus:border-primary focus:outline-none text-lg font-semibold text-gray-700"
                style={{ minWidth: '120px' }}
              />
              <span className="ml-2 text-sm text-gray-500">(可自定义)</span>
              <button
                type="button"
                onClick={() => removeCategory(index)}
                disabled={formData.categories.length <= 1}
                className={`ml-2 p-1 rounded ${formData.categories.length <= 1 ? 'text-gray-300' : 'text-red-500 hover:text-red-700'}`}
                title="删除分类"
              >
                <FontAwesomeIcon icon={faTrashAlt} size="sm" />
              </button>
          </h3>
          <button
            type="button"
            onClick={() => addSkill(index)}
            className="text-primary hover:text-primary/80"
          >
            <FontAwesomeIcon icon={faPlusCircle} className="mr-1" /> 添加技能
          </button>
      </div>

      {formData.categories[index].skills.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-md text-gray-500">
          点击上方"添加技能"按钮开始添加{title.toLowerCase()}
        </div>
      ) : (
        <div className="space-y-1">
          {formData.categories[index].skills.map((skill, skillIndex) => (
            <div key={index} className="bg-gray-50 p-1 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => reorderSkill(index, skillIndex, skillIndex - 1)}
                    disabled={skillIndex === 0}
                    className={`p-1 rounded ${skillIndex === 0 ? 'text-gray-300' : 'text-gray-600 hover:text-primary'}`}
                  >
                    <FontAwesomeIcon icon={faArrowUp} size="xs" />
                  </button>
                  <button
                    type="button"
                    onClick={() => reorderSkill(index, skillIndex, skillIndex + 1)}
                    disabled={skillIndex === formData.categories[index].skills.length - 1}
                    className={`p-1 rounded ${skillIndex === formData.categories[index].skills.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:text-primary'}`}
                  >
                    <FontAwesomeIcon icon={faArrowDown} size="xs" />
                  </button>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkillName(index, skillIndex, e.target.value)}
                    className="flex-grow px-1 py-0.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="技能名称"
                  />
                  <button
                    type="button"
                    onClick={() => removeSkill(index, skillIndex)}
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
                      updateSkillLevel(index, skillIndex, null);
                    } else {
                      const numValue = parseInt(value);
                      if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
                        updateSkillLevel(index, skillIndex, numValue);
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
        <p className="text-gray-600 mb-6">添加您掌握的技能，并设置熟练度（1-10整数等级）</p>
      </div>

      <>{
  formData.categories.map((category, index) => (
    renderSkillList(index, getCategoryIcon(index), category.name)
  ))
}
{formData.categories.length < 4 && (
  <button
    type="button"
    onClick={() => setFormData(prev => ({
      ...prev,
      categories: [...prev.categories, { name: `新分类${prev.categories.length + 1}`, skills: [] }]
    }))}
    className="mt-4 text-primary hover:text-primary/80"
  >
    <FontAwesomeIcon icon={faPlusCircle} className="mr-1" /> 添加分类
  </button>
)}</>

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
            <i className="fa fa-exclamation-circle mr-1"></i> 请确保分类名称和技能名称不为空
          </div>
        )}
      </div>
    </div>
  );
};


export default SkillsEditor;