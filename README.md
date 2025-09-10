# 个人简历网站

这是一个支持后台编辑的个人简历网站。用户可以通过管理后台编辑个人信息、工作经历、项目、技能和教育背景等内容，并实时预览简历网站的变化。

## 功能特点

- 响应式设计，适配各种设备
- 后台管理系统，方便编辑简历内容
- 现代化的UI设计
- 动画效果提升用户体验

## 快速开始

### 开发模式

这是一个前后端分离的项目，需要同时启动前端和后端服务器才能正常运行。

1. 安装依赖:
   ```
   npm install
   ```

2. 启动后端服务器（在一个终端中执行）:
   ```
   node server.js
   ```
   - 后端服务器会在 `http://localhost:13000` 启动
   - 负责提供API接口和管理 `db.json` 中的数据

3. 启动前端开发服务器（在另一个终端中执行）:
   ```
   npm start
   ```
   - 前端服务器会在 `http://localhost:3000` 启动
   - 通过代理配置访问后端API获取数据

4. 打开浏览器访问
   - 简历网站: `http://localhost:3000`
   - 管理后台: `http://localhost:3000/admin`

> **重要说明**：必须同时启动前端和后端服务器，否则无法正常显示和编辑简历数据。项目采用前后端分离架构，前端通过API从后端获取数据，后端负责数据的存储和提供。

### 一键Docker部署 (跨平台支持)

#### 前置条件
1. 安装Docker和Docker Compose:
   ```bash
   sudo apt update && sudo apt install docker.io docker-compose -y
   sudo systemctl enable --now docker
   sudo usermod -aG docker $USER
   ```

#### 一键部署步骤
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