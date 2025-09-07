// Removed incomplete array declaration
const experiencesData = [
    {
        id: 1,
        company: 'ABC科技有限公司',
        position: '高级前端工程师',
        start_date: '2022-01-01',
        end_date: '2024-01-01',
        is_current: false,
        description: '负责公司核心产品的前端开发工作，使用React技术栈构建高性能的用户界面。',
        achievements: [
            '优化前端性能，页面加载速度提升40%',
            '重构核心组件库，提高代码复用率和维护性',
            '带领3人前端团队完成多个重要项目'
        ],
        location: '北京'
    },

    {
        id: 2,
        company: 'XYZ互联网公司',
        position: '前端工程师',
        start_date: '2020-01-01',
        end_date: '2021-12-31',
        is_current: false,
        description: '参与公司多个项目的前端开发工作，使用Vue.js技术栈。',
        achievements: [
            '开发并维护公司官网和产品展示页面',
            '优化移动端用户体验，提高用户留存率20%',
            '与设计团队紧密合作，实现高质量的UI效果'
        ],
        location: '上海'
    }
];


class Experience {
  

  static async list(orderBy = '-start_date') {
    return new Promise(resolve => {
      setTimeout(() => {
        const sorted = [...experiencesData].sort((a, b) => {
          if (orderBy === '-start_date') {
            return new Date(b.start_date) - new Date(a.start_date);
          }
          return 0;
        });
        resolve(sorted);
      }, 100);
    });
  }

  static async create(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newExperience = {
          ...data,
          id: experiencesData.length + 1
        };
        experiencesData.push(newExperience);
        resolve(newExperience);
      }, 100);
    });
  }

  static async update(id, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = experiencesData.findIndex(e => e.id === id);
        if (index !== -1) {
          experiencesData[index] = { ...experiencesData[index], ...data };
          resolve(experiencesData[index]);
        } else {
          throw new Error('Experience not found');
        }
      }, 100);
    });
  }
}

export default Experience;