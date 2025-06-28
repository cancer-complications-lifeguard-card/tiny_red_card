# 小红卡 - 肿瘤患者并发症管理指引卡生成器

## 📋 项目简介

小红卡是一个专为肿瘤患者设计的并发症管理指引卡生成器，由小X宝社区开发并维护。该项目帮助患者生成个性化的紧急处理指南，涵盖消化道出血、肠梗阻、胆道梗阻、感染、腹水、血栓等6种主要并发症。

### 🌟 项目特色
- ✅ 专业医学指导，权威可靠
- ✅ 数据本地处理，隐私安全
- ✅ 个性化定制，精准匹配
- ✅ 免费公益服务，惠及患者
- ✅ 开源透明，社区共建

### 🔗 相关链接
- **项目地址**: https://github.com/PancrePal-xiaoyibao/tiny_red_card.git
- **在线体验**: https://shiny-platypus-2c16ce.netlify.app
- **微信公众号**: 小胰宝助手
- **联系微信**: Lazio724（请说明来意）
- **反馈邮箱**: service@xiaoyibao.com.cn

---

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn
- 现代浏览器（Chrome、Firefox、Safari、Edge）

### 本地运行
```bash
# 1. 克隆项目
git clone https://github.com/pancrePal-xiaoyibao/tiny_red_card.git
cd pancrePal-xiaoyibao

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问 http://localhost:5173
```

### 构建部署
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## 🗄️ 数据库配置详解

### Supabase 数据库设置

#### 1. 创建 Supabase 项目
1. 访问 [Supabase官网](https://supabase.com)
2. 注册账号并登录
3. 点击 "New Project" 创建新项目
4. 填写项目信息：
   - **Name**: xiaohongka-db（或其他名称）
   - **Database Password**: 设置强密码（请记住）
   - **Region**: 选择 Northeast Asia (Tokyo) 或其他就近区域
5. 等待项目创建完成（约2-3分钟）

#### 2. 获取数据库连接信息
项目创建完成后，在项目设置页面获取以下信息：

1. 进入 **Settings** → **API**
2. 复制以下信息：
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### 3. 配置环境变量
在项目根目录创建 `.env` 文件：

```env
# Supabase 配置
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 以下为内部使用，不需要在前端配置
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **重要提醒**：
- 请将 `your-project-id` 替换为实际的项目ID
- `service_role key` 具有管理员权限，请妥善保管
- 不要将 `.env` 文件提交到版本控制系统

#### 4. 数据库表结构设置

项目使用以下数据表：

##### 4.1 site_stats（网站统计表）
```sql
CREATE TABLE site_stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_visits INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

##### 4.2 daily_visits（每日访问统计表）
```sql
CREATE TABLE daily_visits (
  id SERIAL PRIMARY KEY,
  visit_date TEXT UNIQUE NOT NULL,
  visit_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

##### 4.3 visit_logs（访问日志表）
```sql
CREATE TABLE visit_logs (
  id SERIAL PRIMARY KEY,
  visit_date TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

##### 4.4 online_users（在线用户表）
```sql
CREATE TABLE online_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  user_agent TEXT,
  last_seen TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### 5. 执行数据库迁移

在 Supabase 控制台的 **SQL Editor** 中依次执行以下文件：

1. `supabase/migrations/20250628093150_sunny_unit.sql`
2. `supabase/migrations/20250628094132_throbbing_valley.sql`
3. `supabase/migrations/20250628094229_violet_coast.sql`

或者使用 Supabase CLI：
```bash
# 安装 Supabase CLI
npm install -g supabase

# 登录 Supabase
supabase login

# 链接到项目
supabase link --project-ref your-project-id

# 执行迁移
supabase db push
```

#### 6. 配置 Edge Functions

项目使用以下 Edge Functions：

##### 6.1 increment-visit（访问计数）
- **路径**: `supabase/functions/increment-visit/index.ts`
- **功能**: 记录用户访问，更新统计数据
- **调用**: `POST /functions/v1/increment-visit`

##### 6.2 get-visit-stats（获取统计）
- **路径**: `supabase/functions/get-visit-stats/index.ts`
- **功能**: 获取访问统计数据
- **调用**: `GET /functions/v1/get-visit-stats`

##### 6.3 update-online-status（在线状态）
- **路径**: `supabase/functions/update-online-status/index.ts`
- **功能**: 更新用户在线状态
- **调用**: `POST /functions/v1/update-online-status`

部署 Edge Functions：
```bash
# 部署所有函数
supabase functions deploy

# 或单独部署
supabase functions deploy increment-visit
supabase functions deploy get-visit-stats
supabase functions deploy update-online-status
```

---

## 🔧 常见问题与解决方案

### 问题1：Supabase 连接失败

**错误信息**：
```
TypeError: Failed to fetch
Calling Supabase Edge Function failed: undefined
```

**解决步骤**：

1. **检查环境变量**
   ```bash
   # 确认 .env 文件存在且配置正确
   cat .env
   ```

2. **验证 Supabase 项目状态**
   - 登录 Supabase 控制台
   - 确认项目状态为 "Active"
   - 检查项目 URL 和 API Keys 是否正确

3. **测试数据库连接**
   ```bash
   # 使用 curl 测试 API
   curl -X GET "https://your-project-id.supabase.co/rest/v1/site_stats" \
     -H "apikey: your-anon-key" \
     -H "Authorization: Bearer your-anon-key"
   ```

4. **检查网络和防火墙**
   - 确认网络可以访问 supabase.co
   - 检查是否有防火墙阻止连接

### 问题2：Edge Functions 部署失败

**错误信息**：
```
Error deploying function: Permission denied
```

**解决步骤**：

1. **确认 CLI 登录状态**
   ```bash
   supabase status
   ```

2. **重新登录**
   ```bash
   supabase logout
   supabase login
   ```

3. **检查项目链接**
   ```bash
   supabase projects list
   supabase link --project-ref your-project-id
   ```

4. **手动部署函数**
   - 在 Supabase 控制台进入 **Edge Functions**
   - 点击 "Create a new function"
   - 复制对应的函数代码

### 问题3：数据库表不存在

**错误信息**：
```
relation "site_stats" does not exist
```

**解决步骤**：

1. **检查表是否创建**
   ```sql
   -- 在 SQL Editor 中执行
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

2. **手动创建表**
   ```sql
   -- 复制 migrations 文件中的 SQL 语句执行
   CREATE TABLE IF NOT EXISTS site_stats (
     id INTEGER PRIMARY KEY DEFAULT 1,
     total_visits INTEGER DEFAULT 0,
     updated_at TIMESTAMPTZ DEFAULT now()
   );
   ```

3. **重新执行迁移**
   ```bash
   supabase db reset
   supabase db push
   ```

### 问题4：RLS（行级安全）权限问题

**错误信息**：
```
new row violates row-level security policy
```

**解决步骤**：

1. **检查 RLS 策略**
   ```sql
   -- 查看现有策略
   SELECT * FROM pg_policies WHERE tablename = 'site_stats';
   ```

2. **重新创建策略**
   ```sql
   -- 删除现有策略
   DROP POLICY IF EXISTS "Anyone can read site stats" ON site_stats;
   
   -- 重新创建策略
   CREATE POLICY "Anyone can read site stats"
     ON site_stats
     FOR SELECT
     TO anon, authenticated
     USING (true);
   ```

### 问题5：本地开发环境配置

**问题描述**：本地开发时无法连接数据库

**解决步骤**：

1. **使用本地 Supabase**
   ```bash
   # 启动本地 Supabase
   supabase start
   
   # 获取本地连接信息
   supabase status
   ```

2. **配置本地环境变量**
   ```env
   # .env.local
   VITE_SUPABASE_URL=http://localhost:54321
   VITE_SUPABASE_ANON_KEY=local-anon-key
   ```

3. **降级处理**
   - 项目已内置降级机制
   - 无数据库时自动使用本地存储
   - 显示模拟数据确保功能正常

---

## 📊 监控与维护

### 数据库监控

1. **访问统计监控**
   ```sql
   -- 查看总访问量
   SELECT total_visits FROM site_stats WHERE id = 1;
   
   -- 查看每日访问趋势
   SELECT visit_date, visit_count 
   FROM daily_visits 
   ORDER BY visit_date DESC 
   LIMIT 30;
   
   -- 查看在线用户数
   SELECT COUNT(*) as online_users 
   FROM online_users 
   WHERE last_seen > now() - interval '2 minutes';
   ```

2. **性能监控**
   - 在 Supabase 控制台查看 **Reports** 页面
   - 监控 API 请求量和响应时间
   - 关注数据库连接数和查询性能

### 定期维护任务

1. **清理过期数据**
   ```sql
   -- 清理30天前的访问日志
   DELETE FROM visit_logs 
   WHERE created_at < now() - interval '30 days';
   
   -- 清理过期在线用户记录
   DELETE FROM online_users 
   WHERE last_seen < now() - interval '5 minutes';
   ```

2. **备份重要数据**
   ```bash
   # 导出数据
   supabase db dump --data-only > backup.sql
   
   # 定期备份到云存储
   # 建议设置自动化脚本
   ```

### 错误日志查看

1. **Supabase 日志**
   - 控制台 → **Logs** → **API Logs**
   - 查看 Edge Functions 执行日志
   - 监控错误率和异常情况

2. **前端错误监控**
   - 浏览器开发者工具 → **Console**
   - 查看网络请求失败情况
   - 监控 JavaScript 错误

---

## 🔄 部署指南

### Netlify 部署（推荐）

1. **连接 GitHub 仓库**
   - 登录 [Netlify](https://netlify.com)
   - 点击 "New site from Git"
   - 选择 GitHub 并授权
   - 选择项目仓库

2. **配置构建设置**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **设置环境变量**
   - 进入 Site settings → Environment variables
   - 添加以下变量：
     ```
     VITE_SUPABASE_URL=https://your-project-id.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **自动部署**
   - 推送代码到 main 分支自动触发部署
   - 查看部署日志确认成功

### Vercel 部署

1. **导入项目**
   - 登录 [Vercel](https://vercel.com)
   - 点击 "New Project"
   - 导入 GitHub 仓库

2. **配置环境变量**
   - 在项目设置中添加环境变量
   - 与 Netlify 配置相同

### 自定义服务器部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **配置 Web 服务器**
   ```nginx
   # Nginx 配置示例
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

---

## 🛠️ 开发指南

### 项目结构
```
xiaohongka/
├── src/
│   ├── components/          # React 组件
│   │   ├── AboutPage.tsx    # 关于页面
│   │   ├── CardPreview.tsx  # 卡片预览
│   │   ├── VisitCounter.tsx # 访问统计
│   │   └── ...
│   ├── hooks/              # 自定义 Hooks
│   │   └── useOnlineUsers.ts
│   ├── data/               # 数据文件
│   │   ├── complications.ts # 并发症数据
│   │   └── *.md            # 模板文件
│   ├── types/              # TypeScript 类型
│   ├── utils/              # 工具函数
│   └── App.tsx             # 主应用组件
├── supabase/
│   ├── functions/          # Edge Functions
│   └── migrations/         # 数据库迁移
├── public/                 # 静态资源
└── package.json
```

### 添加新的并发症类型

1. **更新数据文件**
   ```typescript
   // src/data/complications.ts
   export const complications = [
     // ... 现有并发症
     {
       id: 'new-complication',
       name: '新并发症',
       icon: '🆕',
       description: '新并发症的描述',
       warnings: ['警告1', '警告2'],
       emergencySignals: ['紧急信号1', '紧急信号2'],
       prohibitions: ['禁忌1', '禁忌2']
     }
   ];
   ```

2. **创建模板文件**
   ```markdown
   <!-- src/data/新并发症急症处理指引卡片模板.md -->
   # 新并发症急症处理指引卡
   
   ## 🚨 紧急情况识别
   ...
   ```

3. **测试功能**
   - 重启开发服务器
   - 测试新并发症的选择和预览
   - 确认生成的指引卡内容正确

### 自定义样式

项目使用 Tailwind CSS，可以通过以下方式自定义：

1. **修改配置文件**
   ```javascript
   // tailwind.config.js
   module.exports = {
     theme: {
       extend: {
         colors: {
           'custom-red': '#your-color',
         }
       }
     }
   }
   ```

2. **添加自定义 CSS**
   ```css
   /* src/index.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   .custom-class {
     /* 自定义样式 */
   }
   ```

---

## 🤝 贡献指南

### 参与方式

1. **报告问题**
   - 在 GitHub Issues 中报告 Bug
   - 提供详细的错误信息和复现步骤

2. **功能建议**
   - 提交 Feature Request
   - 说明功能的必要性和实现思路

3. **代码贡献**
   ```bash
   # 1. Fork 项目
   # 2. 创建功能分支
   git checkout -b feature/new-feature
   
   # 3. 提交更改
   git commit -m "Add new feature"
   
   # 4. 推送分支
   git push origin feature/new-feature
   
   # 5. 创建 Pull Request
   ```

### 代码规范

1. **TypeScript 类型**
   - 所有组件和函数都要有明确的类型定义
   - 避免使用 `any` 类型

2. **组件规范**
   - 使用函数式组件和 Hooks
   - 组件名使用 PascalCase
   - 文件名与组件名保持一致

3. **提交信息**
   ```
   feat: 添加新功能
   fix: 修复问题
   docs: 更新文档
   style: 代码格式调整
   refactor: 代码重构
   test: 添加测试
   ```

---

## 📞 技术支持

### 获取帮助

1. **社区支持**
   - 微信公众号：小胰宝助手
   - 个人微信：Lazio724（请说明来意）
   - 邮箱：service@xiaoyibao.com.cn

2. **在线资源**
   - [社区介绍](https://hi.xiao-x-bao.com.cn)
   - [加入社区](https://iamin.xiao-x-bao.com.cn)
   - [任务中心](https://task.xiaoyibao.com.cn)

3. **技术文档**
   - [Supabase 文档](https://supabase.com/docs)
   - [React 文档](https://react.dev)
   - [Tailwind CSS 文档](https://tailwindcss.com/docs)

### 紧急联系

如遇到紧急技术问题影响线上服务：
1. 立即发送邮件到 service@xiaoyibao.com.cn
2. 微信联系 Lazio724
3. 在 GitHub Issues 中标记为 `urgent`

---

## 📄 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

感谢所有为小红卡项目和小X宝社区贡献力量的朋友们：

- 医学专家团队：提供专业医学指导
- 护理专家团队：完善护理流程
- 技术开发团队：系统架构和开发
- 小X宝社区志愿者：内容创作和测试
- 患者家属群体：需求提供和验证
- 天工开物基金会：项目管理和支持

---

**小红卡项目 © 2024-2025 小X宝社区 · 天工开物基金会**

*专业医疗指引，用心服务患者 | 用爱心连接，用技术服务，用开源共建*