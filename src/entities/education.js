const education = [
  {
    id: 1,
    school: '北京大学',
    degree: '计算机科学与技术',
    major: '计算机科学与技术',
    start_date: '2016-09-01',
    end_date: '2020-06-30',
    gpa: '3.8/4.0',
    description: '主修计算机科学与技术，学习了数据结构、算法、操作系统、数据库等核心课程。'
  },
  {
    id: 2,
    school: '清华大学',
    degree: '软件工程',
    major: '软件工程',
    start_date: '2020-09-01',
    end_date: '2022-06-30',
    gpa: '3.9/4.0',
    description: '研究生阶段专注于软件工程领域，研究前端性能优化和用户体验设计。'
  }
];

class Education {
  static async list(orderBy = '-start_date') {
    // 模拟异步操作
    return new Promise(resolve => {
      setTimeout(() => {
        // 简单排序实现
        const sorted = [...education].sort((a, b) => {
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
        const newEducation = {
          ...data,
          id: education.length + 1
        };
        education.push(newEducation);
        resolve(newEducation);
      }, 100);
    });
  }

  static async update(id, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = education.findIndex(e => e.id === id);
        if (index !== -1) {
          education[index] = { ...education[index], ...data };
          resolve(education[index]);
        } else {
          throw new Error('Education not found');
        }
      }, 100);
    });
  }
}

export default Education;