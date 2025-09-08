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

### 下载项目
1. 克隆代码仓库：
   ```bash
git clone <repository-url> && cd person  # 将<repository-url>替换为实际仓库地址
   ```

### Docker单镜像部署

#### 构建前置条件
1. 在Linux主机安装Docker Engine:
   ```bash
   sudo apt-get update
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -aG docker $USER
   ```
2. 注销并重新登录以应用Docker用户组权限

#### 构建镜像
```bash
docker build -t resume-creator .
```

#### 运行容器
   ```bash
# After making code changes (e.g., port configuration), rebuild the image first:
docker build -t resume-creator:latest .

docker run -d -p 3000:3002 --name resume-app resume-creator
   ```

#### 配置防火墙
确保Linux主机开放3002端口：
   ```bash
   sudo ufw allow 3002/tcp
   sudo ufw reload
   ```

#### 验证访问
1. 检查容器运行状态：
   ```bash
docker ps | grep resume-app
   ```
2. 查看容器日志确认服务启动：
   ```bash
docker logs resume-app
   ```
3. 通过IP访问：http://10.186.65.40:3002
```bash
docker run -d -p 3002:3002 --name resume-app resume-creator
```

#### 访问应用
打开浏览器访问: http://localhost:3002

#### 停止容器
```bash
docker stop resume-app
docker rm resume-app
```

### Docker一键运行 (跨平台支持)

#### 通用前置条件
1. 安装Docker和Docker Compose:
   - Windows/Mac: 安装[Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Linux: 
     ```bash
     # Ubuntu/Debian示例
     sudo apt update && sudo apt install docker.io docker-compose -y
     sudo systemctl enable --now docker
     sudo usermod -aG docker $USER  # 允许当前用户管理Docker(需注销重登录)
     ```

#### 部署步骤
1. 获取项目代码:
   ```bash
   # 方式1: HTTPS克隆(推荐新手)
   git clone https://github.com/JerryAction/resume-creator.git
   
   # 方式2: SSH克隆(需配置SSH密钥)
   git clone git@github.com:JerryAction/resume-creator.git
   
   cd resume-creator
   ```

2. 构建并启动容器:
   ```bash
   docker-compose up -d
   ```

3. 访问应用:
   - 简历网站: `http://localhost:3002`
   - 管理后台: `http://localhost:3002/admin`

4. 停止服务:
   ```bash
   docker-compose down
   ```

#### 跨平台注意事项
- **Linux特有**: 确保防火墙开放3002端口或关闭防火墙
- **Windows特有**: Docker Desktop需启用WSL2后端
- **Mac特有**: 注意Docker资源配置(建议至少2GB内存)

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