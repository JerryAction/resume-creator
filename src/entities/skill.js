const skills = [
  {
    id: 1,
    name: 'React',
    category: 'frontend',
    level: 9,
    years_experience: 4
  },
  {
    id: 2,
    name: 'Vue.js',
    category: 'frontend',
    level: 8,
    years_experience: 3
  },
  {
    id: 3,
    name: 'JavaScript',
    category: 'frontend',
    level: 9,
    years_experience: 5
  },
  {
    id: 4,
    name: 'HTML/CSS',
    category: 'frontend',
    level: 9,
    years_experience: 5
  },
  {
    id: 5,
    name: 'Node.js',
    category: 'backend',
    level: 7,
    years_experience: 3
  },
  {
    id: 6,
    name: 'Python',
    category: 'backend',
    level: 6,
    years_experience: 2
  },
  {
    id: 7,
    name: 'MySQL',
    category: 'database',
    level: 7,
    years_experience: 3
  },
  {
    id: 8,
    name: 'MongoDB',
    category: 'database',
    level: 6,
    years_experience: 2
  },
  {
    id: 9,
    name: 'Git',
    category: 'tools',
    level: 8,
    years_experience: 4
  },
  {
    id: 10,
    name: 'Webpack',
    category: 'tools',
    level: 7,
    years_experience: 3
  }
];

class Skill {
  static async list(orderBy = 'category') {
    // 模拟异步操作
    return new Promise(resolve => {
      setTimeout(() => {
        // 简单排序实现
        const sorted = [...skills].sort((a, b) => {
          if (orderBy === 'category') {
            return a.category.localeCompare(b.category);
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
        const newSkill = {
          ...data,
          id: skills.length + 1
        };
        skills.push(newSkill);
        resolve(newSkill);
      }, 100);
    });
  }

  static async update(id, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = skills.findIndex(s => s.id === id);
        if (index !== -1) {
          skills[index] = { ...skills[index], ...data };
          resolve(skills[index]);
        } else {
          throw new Error('Skill not found');
        }
      }, 100);
    });
  }
}

export default Skill;