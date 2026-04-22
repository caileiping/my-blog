# GitHub Pages 部署指南

## 第一步：创建 GitHub 仓库

1. 登录 https://github.com
2. 点击右上角 "+" → "New repository"
3. 仓库名称填写：`my-blog`（或你喜欢的名字）
4. 选择 "Public"（公开）
5. 点击 "Create repository"

## 第二步：上传代码

### 方法 A：使用 Git 命令行

```bash
# 进入博客目录
cd blog

# 初始化 git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 关联远程仓库（把 YOUR_USERNAME 换成你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/my-blog.git

# 推送
git branch -M main
git push -u origin main
```

### 方法 B：直接网页上传（更简单）

1. 在新建的仓库页面，点击 "uploading an existing file"
2. 把 blog 文件夹里的所有文件拖进去
3. 点击 "Commit changes"

## 第三步：启用 GitHub Pages

1. 在你的仓库页面，点击顶部的 "Settings"（设置）
2. 左侧菜单点击 "Pages"
3. "Source" 部分选择 "GitHub Actions"
4. 等待几分钟，刷新页面
5. 会看到提示："Your site is live at https://yourusername.github.io/my-blog/"

## 第四步：验证部署

1. 点击上面的链接访问你的博客
2. 如果看到页面，说明部署成功！

## 常见问题

### Q: 页面显示 404？
A: 等待 2-3 分钟，GitHub Pages 部署需要时间。如果还是 404，检查：
- 仓库是否是 Public
- Settings > Pages 中是否正确启用了 GitHub Actions

### Q: 样式没有加载？
A: 检查浏览器控制台（F12）是否有报错。通常是路径问题，但我们的代码使用的是相对路径，应该没问题。

### Q: 如何更新博客内容？
A: 修改代码后重新 push 到 GitHub，会自动重新部署。

## 自定义域名（可选）

1. 在仓库根目录创建文件 `CNAME`，内容是你的域名，如：`blog.yourdomain.com`
2. 在你的域名 DNS 设置中添加 CNAME 记录，指向 `yourusername.github.io`
3. 在 Settings > Pages 中配置自定义域名

## 需要帮助？

如果遇到问题，告诉我具体的错误信息，我来帮你解决。
