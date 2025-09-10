import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faPlusCircle, faTrashAlt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const EducationEditor = ({ data, onSave }) => {
  const [formData, setFormData] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // 初始化表单数据
  // 定义教育经历模板数据
  const templateData = [
    {
      school: "北京大学",
      degree: "计算机科学与技术 本科",
      period: "2016年9月 - 2020年6月",
      description: "主修计算机科学，辅修人工智能，GPA 3.8/4.0，获得优秀毕业生称号"
    },
    {
      school: "清华大学",
      degree: "软件工程 硕士",
      period: "2020年9月 - 2022年6月",
      description: "研究方向为前端工程化，发表2篇学术论文，参与国家自然科学基金项目"
    }
  ];

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      // 使用用户数据
      setFormData([...data]);
    } else {
      // 使用模板数据
      setFormData(templateData);
    }
  }, [data]);

  // 添加新教育经历
  const addEducation = () => {
    const newEducation = {
      school: '',
      degree: '',
      period: '',
      description: ''
    };
    setFormData([...formData, newEducation]);
    setSaveStatus(null);
  };

  // 删除教育经历
  const removeEducation = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
    setSaveStatus(null);
  };

  // 调整教育经历顺序
  const reorderEducation = (fromIndex, toIndex) => {
    const updatedEducations = [...formData];
    const [removed] = updatedEducations.splice(fromIndex, 1);
    updatedEducations.splice(toIndex, 0, removed);
    setFormData(updatedEducations);
    setSaveStatus(null);
  };

  // 更新教育经历字段
  const updateEducationField = (index, field, value) => {
    const updatedEducations = [...formData];
    updatedEducations[index][field] = value;
    setFormData(updatedEducations);
    setSaveStatus(null);
  };

  // 验证教育经历数据
  const validateEducationData = () => {
    for (const edu of formData) {
      if (!edu.school || !edu.degree || !edu.period) {
        return false;
      }
    }
    return true;
  };

  // 保存教育经历数据
  const handleSave = async () => {
    if (!validateEducationData()) {
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">教育背景编辑</h2>
        <p className="text-gray-600 mb-6">添加您的教育经历，包括学校名称、学位、时间段和描述</p>

        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> 添加教育经历
        </button>
      </div>

      {formData.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-md text-gray-500 mt-8">
          暂无教育经历
          <p className="mt-2">点击上方"添加教育经历"按钮开始添加</p>
        </div>
      ) : (
        <div className="space-y-8 mt-8">
          {formData.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faGraduationCap} className="text-primary mr-2" />
                  <span className="font-medium">教育经历 #{index + 1}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => reorderEducation(index, index - 1)}
                    disabled={index === 0}
                    className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:text-primary'}`}
                    title="上移"
                  >
                    <FontAwesomeIcon icon={faArrowUp} size="sm" />
                  </button>
                  <button
                    type="button"
                    onClick={() => reorderEducation(index, index + 1)}
                    disabled={index === formData.length - 1}
                    className={`p-1 rounded ${index === formData.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:text-primary'}`}
                    title="下移"
                  >
                    <FontAwesomeIcon icon={faArrowDown} size="sm" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">学校名称 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={edu.school || ''}
                      onChange={(e) => updateEducationField(index, 'school', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      placeholder="输入学校名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">专业 <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={edu.degree || ''}
                      onChange={(e) => updateEducationField(index, 'degree', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      placeholder="输入专业"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">时间段 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={edu.period || ''}
                    onChange={(e) => updateEducationField(index, 'period', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="例如：2016年9月 - 2020年6月"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                  <textarea
                    value={edu.description || ''}
                    onChange={(e) => updateEducationField(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    rows={3}
                    placeholder="描述您的学习经历、专业方向或主要成就"
                  ></textarea>
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
            {isSaving ? '保存中...' : '保存教育经历'}
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

export default EducationEditor;