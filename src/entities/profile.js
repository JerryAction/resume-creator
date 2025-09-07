const profiles = [
  {
    id: 1,
    name: '张三',
    title: '高级前端工程师',
    email: 'zhangsan@example.com',
    phone: '138-0000-0000',
    location: '北京',
    bio: '5年前端开发经验，专注于React和Vue.js技术栈，熟悉现代前端工程化和性能优化。',
    avatar_url: '',
    linkedin: 'https://linkedin.com/in/zhangsan',
    github: 'https://github.com/zhangsan',
    website: 'https://zhangsan.dev',
    created_date: '2024-01-01'
  }
];

class Profile {
  static async list(orderBy = '-created_date') {
    // 模拟异步操作
    return new Promise(resolve => {
      setTimeout(() => {
        // 简单排序实现
        const sorted = [...profiles].sort((a, b) => {
          if (orderBy === '-created_date') {
            return new Date(b.created_date) - new Date(a.created_date);
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
        const newProfile = {
          ...data,
          id: profiles.length + 1,
          created_date: new Date().toISOString().split('T')[0]
        };
        profiles.push(newProfile);
        resolve(newProfile);
      }, 100);
    });
  }static async update(id, data) {
      return new Promise(resolve => {
        setTimeout(() => {
          const index = profiles.findIndex(p => p.id === id);
          if (index !== -1) {
            profiles[index] = { ...profiles[index], ...data };
            resolve(profiles[index]);
          } else {
            resolve(null);
          }
        }, 100);
      });
    }
  }

export default Profile;