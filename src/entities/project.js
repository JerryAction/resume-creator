class Project {
  static get projects() { return [
    {
    id: 1,
    name: '电商平台前端重构',
    description: '负责公司核心电商平台的前端重构工作，使用React技术栈构建高性能的用户界面。',
    technologies: ['React', 'Redux', 'Webpack', 'TailwindCSS'],
    link: 'https://example.com/project1',
    github: 'https://github.com/zhangsan/project1',
    image_url: '',
    featured: true,
    start_date: '2023-01-01',
    end_date: '2023-12-31',
    team_size: 5,
    role: '前端技术负责人',
    achievements: [
      '优化前端性能，页面加载速度提升40%',
      '重构核心组件库，提高代码复用率和维护性',
      '实现响应式设计，支持多端访问'
    ],
    }
  ]; }

  static async list(orderBy = 'start_date') {
    return new Promise(resolve => {
      setTimeout(() => {
        const sorted = [...Project.projects].sort((a, b) => {
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
        const newProject = {
          ...data,
          id: Project.projects.length + 1
        };
        Project.projects.push(newProject);
        resolve(newProject);
      }, 100);
    });
  }

  static async update(id, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = Project.projects.findIndex(p => p.id === id);
        if (index !== -1) {
          Project.projects[index] = { ...Project.projects[index], ...data };
          resolve(Project.projects[index]);
        } else {
          throw new Error('Project not found');
        }
      }, 100);
    });
  }

  static async delete(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = Project.projects.findIndex(p => p.id === id);
        if (index !== -1) {
          Project.projects.splice(index, 1);
          resolve();
        } else {
          throw new Error('Project not found');
        }
      }, 100);
    });
  }
}

export default Project;