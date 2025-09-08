import axios from 'axios';

// 配置API基础URL
const API_BASE_URL = '/api';

/**
 * 获取所有简历数据
 * @returns {Promise<Object>} 包含所有简历部分的数据对象
 */
export const fetchResumeData = async () => {
  try {
    // 并行获取所有数据部分
    const [
      personalInfoRes,
      skillsRes,
      experienceRes,
      projectsRes,
      educationRes,
      footerRes
    ] = await Promise.all([
      axios.get(`${API_BASE_URL}/personal-info`),
      axios.get(`${API_BASE_URL}/skills`),
      axios.get(`${API_BASE_URL}/experience`),
      axios.get(`${API_BASE_URL}/projects`),
      axios.get(`${API_BASE_URL}/education`),
      axios.get(`${API_BASE_URL}/footer`)
    ]);

    return {
      personalInfo: personalInfoRes.data,
      skills: skillsRes.data,
      experience: experienceRes.data,
      projects: projectsRes.data,
      education: educationRes.data,
      footer: footerRes.data
    };
  } catch (error) {
    console.error('Failed to fetch resume data:', error);
    throw new Error('获取简历数据失败，请刷新页面重试');
  }
};

/**
 * 保存简历数据到指定部分
 * @param {string} section - 要保存的部分名称 (personalInfo, skills, experience, projects, education, footer)
 * @param {Object|Array} data - 要保存的数据
 * @returns {Promise<Object>} 保存结果
 */
export const saveResumeData = async (section, data) => {
  if (!['personalInfo', 'skills', 'experience', 'projects', 'education', 'footer'].includes(section)) {
    throw new Error('无效的简历部分名称');
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/${section}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to save ${section} data:`, error);
    throw new Error(`保存${getSectionDisplayName(section)}数据失败，请重试`);
  }
};

/**
 * 获取部分名称的显示名称
 * @param {string} section - 部分名称
 * @returns {string} 显示名称
 */
function getSectionDisplayName(section) {
  const displayNames = {
    personalInfo: '个人信息',
    skills: '技能特长',
    experience: '工作经历',
    projects: '项目经验',
    education: '教育背景',
    footer: '页脚信息'
  };
  return displayNames[section] || section;
}