# 个人简历网站

这是一个支持后台编辑的个人简历网站。用户可以通过管理后台编辑个人信息、工作经历、项目、技能和教育背景等内容，并实时预览简历网站的变化。

## 功能特点

- 响应式设计，适配各种设备
- 后台管理系统，方便编辑简历内容
- 现代化的UI设计
- 动画效果提升用户体验

## 快速开始

### 开发模式

1. 安装依赖:
   ```
   npm install
   ```

2. 启动开发服务器:
   ```
   npm start
   ```

3. 打开浏览器访问 `http://localhost:3000` 查看简历网站

4. 访问 `http://localhost:3000/admin` 进入管理后台编辑内容

### Docker一键运行 (离线模式)

1. 确保已安装Docker和Docker Compose
2. 构建并启动容器:
   ```
   docker-compose up -d
   ```
3. 打开浏览器访问 `http://localhost:3002` 查看简历网站
4. 停止容器:
   ```
   docker-compose down
   ```

## 项目结构

- `App.js`: 应用入口文件，配置路由
- `layout.js`: 页面布局组件，包含导航栏
- `pages/resume.html`: 简历页面组件
- `pages/admin.html`: 管理后台组件
- `components/resume/`: 简历各部分组件（hero, skills, experience, projects, education, footer）
- `entities/`: 数据模型定义

## 技术栈

- React
- React Router
- Framer Motion (动画效果)
- Lucide React (图标)
- Tailwind CSS (样式)