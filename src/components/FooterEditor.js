import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faEnvelope, faPhone, faGlobe, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const FooterEditor = ({ data, onSave }) => {
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // 初始化表单数据
  useEffect(() => {
    if (data) {
      setFormData({
        contactInfo: data.contactInfo || '',
        socialLinks: data.socialLinks || {
          github: '',
          linkedin: '',
          twitter: '',
          website: ''
        },
        copyright: data.copyright || ''
      });
    }
  }, [data]);

  // 更新字段
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaveStatus(null);
  };

  // 更新社交媒体链接
  const updateSocialLink = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }));
    setSaveStatus(null);
  };

  // 验证数据
  const validateData = () => {
    return formData.copyright && formData.contactInfo;
  };

  // 保存数据
  const handleSave = async () => {
    if (!validateData()) {
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">页脚信息编辑</h2>
        <p className="text-gray-600 mb-6">编辑您的页脚信息，包括联系方式、社交媒体链接和版权声明</p>
      </div>

      <div className="space-y-6 border border-gray-200 rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FontAwesomeIcon icon={faAddressCard} className="mr-2 text-primary" /> 联系信息
          </label>
          <textarea
            value={formData.contactInfo || ''}
            onChange={(e) => updateField('contactInfo', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            rows={2}
            placeholder="输入联系信息，如地址、电话、邮箱等"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <FontAwesomeIcon icon={faGlobe} className="mr-2 text-primary" /> 社交媒体链接
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faGithub} className="text-gray-700 mr-3" />
              <input
                type="text"
                value={formData.socialLinks?.github || ''}
                onChange={(e) => updateSocialLink('github', e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="GitHub URL"
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLinkedin} className="text-blue-600 mr-3" />
              <input
                type="text"
                value={formData.socialLinks?.linkedin || ''}
                onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="LinkedIn URL"
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faTwitter} className="text-blue-400 mr-3" />
              <input
                type="text"
                value={formData.socialLinks?.twitter || ''}
                onChange={(e) => updateSocialLink('twitter', e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Twitter URL"
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faGlobe} className="text-green-600 mr-3" />
              <input
                type="text"
                value={formData.socialLinks?.website || ''}
                onChange={(e) => updateSocialLink('website', e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="个人网站 URL"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <FontAwesomeIcon icon={faCopyright} className="text-gray-500 mr-3" />
          <input
            type="text"
            value={formData.copyright || ''}
            onChange={(e) => updateField('copyright', e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            placeholder="版权信息，如 © 2023 您的姓名. 保留所有权利."
          />
        </div>
      </div>

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
          {isSaving ? '保存中...' : '保存页脚信息'}
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
    </div>
  );
};

export default FooterEditor;