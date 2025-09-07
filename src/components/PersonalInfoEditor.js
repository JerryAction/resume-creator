import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const PersonalInfoEditor = ({ data, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    socialLinks: [
      { platform: 'linkedin', url: '', icon: 'linkedin' },
      { platform: 'github', url: '', icon: 'github' },
      { platform: 'blog', url: '', icon: 'blog' }
    ],
    avatarUrl: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // 初始化表单数据
  useEffect(() => {
    if (data) {
      setFormData(prev => ({
        ...prev,
        ...data,
        socialLinks: data.socialLinks || prev.socialLinks
      }));
    }
  }, [data]);

  // 处理表单输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaveStatus(null);
  };

  // 处理社交链接变化
  const handleSocialLinkChange = (index, e) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index].url = e.target.value;
    setFormData(prev => ({ ...prev, socialLinks: updatedLinks }));
    setSaveStatus(null);
  };

  // 获取社交图标
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin': return <FontAwesomeIcon icon={faLinkedin} className="text-blue-600" />;
      case 'github': return <FontAwesomeIcon icon={faGithub} className="text-gray-800" />;
      case 'blog': return <FontAwesomeIcon icon={faGlobe} className="text-green-600" />;
      default: return null;
    }
  };

  // 保存表单数据
  const handleSave = async () => {
    setIsSaving(true);
    const success = await onSave(formData);
    setSaveStatus(success ? 'success' : 'error');
    setIsSaving(false);

    // 3秒后清除保存状态提示
    if (success) {
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">个人信息编辑</h2>
        <p className="text-gray-600 mb-6">编辑您的基本信息、联系方式和社交媒体链接</p>
      </div>

      {/* 基本信息表单 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="您的姓名"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">职位</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="您的职位"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="您的邮箱"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="您的电话"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">所在地</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="您的所在地"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">个人网站</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="您的个人网站"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">头像URL</label>
            <input
              type="text"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              placeholder="头像图片URL"
            />
            {formData.avatarUrl && (
              <div className="mt-2 p-2 border border-gray-200 rounded-md inline-block">
                <img
                  src={formData.avatarUrl}
                  alt="预览"
                  className="w-32 h-32 object-cover rounded-md"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/128'}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">社交媒体链接</label>
            <div className="space-y-3">
              {formData.socialLinks.map((link, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="p-2 bg-gray-100 rounded-md">
                    {getSocialIcon(link.platform)}
                  </div>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => {
                      const updatedLinks = [...formData.socialLinks];
                      updatedLinks[index].url = e.target.value;
                      setFormData(prev => ({ ...prev, socialLinks: updatedLinks }));
                      setSaveStatus(null);
                    }}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder={`${link.platform} URL`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
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
          {isSaving ? '保存中...' : '保存个人信息'}
        </button>
        {saveStatus === 'success' && (
          <div className="text-green-600 flex items-center">
            <i className="fa fa-check-circle mr-1"></i> 保存成功
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="text-red-600 flex items-center">
            <i className="fa fa-exclamation-circle mr-1"></i> 保存失败，请重试
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoEditor;