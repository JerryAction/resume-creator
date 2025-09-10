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

### Docker单镜像部署

#### 前置条件
1. 安装Docker Engine:
   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io -y
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -aG docker $USER
   ```

#### 部署步骤
1. 克隆代码并构建镜像:
   ```bash
   git clone https://gitee.com/leiting923356588/resume-creator.git && cd resume-creator
   docker build -t resume-creator:latest .
   ```

2. 启动容器:
   ```bash
   docker run -d -p 3000:13000 --name resume-app resume-creator:latest
   ```

3. 访问应用:
   - 简历网站: http://docker主机IP:3000
   - 管理后台: http://docker主机IP:3000/admin

4. 停止容器:
   ```bash
   docker stop resume-app && docker rm resume-app
   ```

### 一键Docker部署 (跨平台支持)

## 前置条件
1. 安装Docker和Docker Compose:
   ```bash
   sudo apt update && sudo apt install docker.io docker-compose -y
   sudo systemctl enable --now docker
   sudo usermod -aG docker $USER
   ```

## 一键部署步骤
1. 获取项目代码:
   ```bash
   git clone https://gitee.com/leiting923356588/resume-creator.git
   cd resume-creator
   ```

2. 一键构建并启动服务:
   ```bash
   docker-compose up -d --build
   ```

3. 访问应用:
   - 简历网站: `http://docker主机IP:3000`
   - 管理后台: `http://docker主机IP:3000/admin`

4. 停止服务:
   ```bash
   docker-compose down
   ```

## 项目结构

- `App.js`: 应用入口文件，配置路由
- `layout.js`: 页面布局组件，包含导航栏
- `src/pages/resume.js`: 简历页面组件
- `src/pages/admin.js`: 管理后台组件
- `components/resume/`: 简历各部分组件（hero, skills, experience, projects, education, footer）
- `entities/`: 数据模型定义

## 技术栈

- React
- React Router
- Framer Motion (动画效果)
- Lucide React (图标)
- Tailwind CSS (样式)