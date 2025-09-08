import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 初始化Express应用
const app = express();
const PORT = 13000;

// 配置中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

// 初始化LowDB数据库
const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, {
  personalInfo: {},
  skills: [],
  experience: [],
  projects: [],
  education: [],
  footer: {}
});

// 初始化数据库连接
async function initDB() {
  await db.read();
  db.data ||= { 
  personalInfo: { name: '张三', title: '前端开发工程师', email: 'example@mail.com', phone: '13800138000', address: '北京市海淀区' }, 
  skills: { databases: [{ name: 'MySQL', level: 8 }, { name: 'MongoDB', level: 6 }], tools: [{ name: 'React', level: 9 }, { name: 'Node.js', level: 8 }] }, 
  experience: [{ company: '科技有限公司', position: '前端开发', startDate: '2020-01', endDate: '至今', description: '负责前端开发工作' }], 
  projects: [{ name: '个人博客', description: '使用React构建的个人博客系统' }], 
  education: { school: '北京大学', major: '计算机科学', degree: '本科', graduation: '2019' }, 
  footer: { copyright: '© 2023 个人简历' } 
};
  
  // 数据迁移：将旧的0-100等级转换为1-10等级
  const migrateLevel = (skillsArray) => {
    return skillsArray.map(skill => {
      if (skill.level && skill.level > 10) {
        // 将0-100转换为1-10整数
        return { ...skill, level: Math.min(10, Math.max(1, skill.level)) };
      }
      return skill;
    });
  };
  
  if (db.data.skills.databases) {
    db.data.skills.databases = migrateLevel(db.data.skills.databases);
  }
  if (db.data.skills.tools) {
    db.data.skills.tools = migrateLevel(db.data.skills.tools);
  }
  
  await db.write();
}

// API路由 - 个人信息
app.get('/api/personal-info', async (req, res) => {
  await db.read();
  res.json(db.data.personalInfo);
});

app.post('/api/personal-info', async (req, res) => {
  await db.read();
  db.data.personalInfo = req.body;
  await db.write();
  res.json({ success: true, data: db.data.personalInfo });
});

// API路由 - 技能信息
app.get('/api/skills', async (req, res) => {
  await db.read();
  res.json(db.data.skills);
});

app.post('/api/skills', async (req, res) => {
  await db.read();
  const skills = req.body;
  
  // 验证技能等级必须是1-10之间的整数
  const validateLevel = (category) => {
    if (!Array.isArray(category)) return false;
    return category.every(skill => {
      return typeof skill.level === 'number' && skill.level >= 1 && skill.level <= 10 && Number.isInteger(skill.level);
    });
  };
  
  if (!validateLevel(skills.databases) || !validateLevel(skills.tools)) {
    return res.status(400).json({ success: false, error: '技能等级必须是1-10之间的整数' });
  }
  
  db.data.skills = skills;
  await db.write();
  res.json({ success: true, data: db.data.skills });
});

// API路由 - 工作经历
app.get('/api/experience', async (req, res) => {
  await db.read();
  res.json(db.data.experience);
});

app.post('/api/experience', async (req, res) => {
  await db.read();
  db.data.experience = req.body;
  await db.write();
  res.json({ success: true, data: db.data.experience });
});

// API路由 - 项目经历
app.get('/api/projects', async (req, res) => {
  await db.read();
  res.json(db.data.projects);
});

app.post('/api/projects', async (req, res) => {
  await db.read();
  db.data.projects = req.body;
  await db.write();
  res.json({ success: true, data: db.data.projects });
});

// API路由 - 教育背景
app.get('/api/education', async (req, res) => {
  await db.read();
  res.json(db.data.education);
});

app.post('/api/education', async (req, res) => {
  await db.read();
  db.data.education = req.body;
  await db.write();
  res.json({ success: true, data: db.data.education });
});

// API路由 - 页脚信息
app.get('/api/footer', async (req, res) => {
  await db.read();
  res.json(db.data.footer);
});

app.post('/api/footer', async (req, res) => {
  await db.read();
  db.data.footer = req.body;
  await db.write();
  res.json({ success: true, data: db.data.footer });
});

// 处理根路径请求
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 初始化服务器
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});