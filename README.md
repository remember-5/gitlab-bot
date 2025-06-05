# GitLab机器人

这是一个用于接收GitLab Webhooks事件并转发到钉钉等通知渠道的应用机器人

## 功能特点

- 支持GitLab多种事件类型：
    - 代码推送 (Push)
    - 合并请求 (Merge Request)
    - 议题 (Issue)
    - 流水线 (Pipeline)
    - 评论 (Comment/Note)
- 使用Nunjucks模板引擎格式化通知内容
- push-all-in-one支持, 暂时只做钉钉机器人, 后续会支持更多渠道
  - [ ] Server 酱(以及 Server 酱³)
  - [ ] 自定义邮件
  - [x] 钉钉机器人
  - [ ] 企业微信机器人
  - [ ] 企业微信应用
  - [ ] 飞书
  - [ ] pushplus
  - [ ] WxPusher
  - [ ] iGot 
  - [ ] Qmsg
  - [ ] 息知
  - [ ] PushDeer
  - [ ] Discord
  - [ ] OneBot
  - [ ] Telegram
  - [ ] ntfy 等多种推送方式
- 可部署到Vercel，无需服务器

## 技术栈
- Express.js
- Nunjucks (模板引擎)
- push-all-in-one (钉钉消息推送)
- Vercel (部署平台)
- gitlab-ce or gitlab-ee >= 17.x (低版本暂未测试)

# 使用

## 钉钉机器人配置
在钉钉群中添加自定义机器人：
- 进入钉钉群 -> 群设置 -> 智能群助手 -> 添加机器人 -> 自定义
- 机器人安全设置推荐选择"加签"方式
- 获取到`access_token`和`secret`填入环境变量

## 配置GitLab Webhook
- 在GitLab项目中，进入 Settings -> Webhooks
- 添加一个新的webhook
- URL填写 `https://your-vercel-app.vercel.app/api/v1/webhook?access_token=xxx`, 此处的access_token为钉钉机器人获取的`access_token`,请替换为你的钉钉机器人access_token
- 访问webhook接口时需要提供access_token参数(access_token为钉钉机器人的access_token)，系统会根据提供的access_token查找对应的secret，并使用这些凭据向钉钉发送通知。
- 选择需要接收的事件类型，如Push Events, Tag Push Events, Issues Events, Merge Request Events等
- 点击"Add webhook"保存

**注意**：为不同的项目或团队配置不同的钉钉机器人时，只需要更改URL中的access_token参数即可，无需修改代码或模板。



## 开发调试
### 1. Fork或Clone本仓库

```bash
git clone https://github.com/remember5-templates/gitlab-bot
cd gitlab-bot
```

### 2. 安装依赖

```bash
# npm
npm install

# pnpm
pnpm install
```

### 3. 配置环境变量

在项目根目录创建`.env.local`文件（本地开发使用）或在Vercel部署时配置环境变量：

```
# 启动端口
PORT=3000

# DINGTALK_SECRET, 格式DINGTALK_SECRET_${access_token}
DINGTALK_SECRET_610ee8faa4e5902b5b71896aa16e77f42b844b0c54d6a63e8e5e6eb8e7523d2f=
```

> 注意：项目中提供了`env.example`文件作为参考，您可以复制并重命名为`.env.local`使用。

### 4. 本地测试

```bash
# 开发环境运行
npm run dev
```

访问 `http://localhost:3000` 检查服务是否正常运行。


## 自定义模板

模板文件位于`src/templates/gitlab/`目录下，使用Nunjucks模板引擎语法。每种GitLab事件对应一个模板文件：

- `push.njk`: 代码推送事件模板
- `merge_request.njk`: 合并请求事件模板
- `issue.njk`: Issue事件模板
- `comment.njk`: 评论事件模板
- `pipeline.njk`: 流水线事件模板
- `tag_push.njk`: 标签推送事件模板
- `release.njk`: 版本发布事件模板

可以根据需要修改这些模板或添加新的模板。

这些模板文件只需渲染Markdown格式的文本内容，无需包含完整的JSON结构。通知服务会自动处理标题和消息类型。

示例模板（push.njk）:
```
## 📌 代码推送通知
**项目**: {{ project_name }}
**分支**: {{ ref | replace('refs/heads/', '') }}
**提交者**: {{ user_name }}
**时间**: {{ event_time | date('YYYY-MM-DD HH:mm:ss') }}

### 提交信息
{% for commit in commits %}
- {{ commit.message | truncate(50) }} ([{{ commit.id | slice(0, 8) }}]({{ commit.url }}))
{% endfor %}

[查看更多]({{ project_url }}/-/commits/{{ ref | replace('refs/heads/', '') }})
```

通知服务会根据事件类型自动生成适当的标题，并使用push-all-in-one插件发送通知。



## API接口

- `POST /api/v1/gitlab/webhook?access_token=YOUR_ACCESS_TOKEN`: 接收GitLab webhook事件的接口
    - `access_token`: 必填参数，用于查找对应的钉钉机器人secret
    - 接受来自GitLab的JSON格式事件数据

## 通知渠道

当前使用`push-all-in-one`库支持发送通知到钉钉机器人。

钉钉通知的格式为Markdown消息，包括：
- 标题：自动根据事件类型生成，如"GitLab推送通知"、"GitLab合并请求通知"等
- 内容：由Nunjucks模板渲染的Markdown格式文本

如需支持其他通知渠道，可以修改`src/services/notificationService.ts`文件，添加对应的发送方法。

## 自定义通知内容

您可以通过修改`src/templates/gitlab/`目录下的模板文件来自定义通知内容。模板使用Nunjucks语法，可以访问GitLab事件的所有字段。

### 可用的自定义过滤器

模板中可以使用以下自定义过滤器来格式化数据：

1. **date**：格式化日期
   ```
   {{ created_at | date('YYYY-MM-DD HH:mm:ss') }}
   ```

2. **slice**：截取字符串的一部分
   ```
   {{ commit.id | slice(0, 8) }}  // 获取提交ID的前8个字符
   ```

3. **truncate**：截断长文本并添加省略号
   ```
   {{ commit.message | truncate(50) }}  // 将消息截断为50个字符
   ```

这些过滤器帮助您在模板中更灵活地处理和格式化GitLab事件数据。

## 开发与扩展

### 添加新的事件类型支持

1. 在`src/interfaces/GitLabEvent.ts`中定义新的事件接口
2. 在`src/templates/gitlab/`目录下创建对应的模板文件
3. 在`src/services/notificationService.ts`的`getTemplatePathForEvent`函数中添加新的事件类型映射

### 添加新的通知渠道

在`src/services/notificationService.ts`中添加新的发送方法，并在`processGitLabEvent`函数中调用。

## 故障排除

### 模板渲染错误

如果遇到模板渲染错误，请检查以下几点：

1. **数据结构不匹配**：确保模板中引用的字段与GitLab事件数据结构匹配。可以在处理webhook时先打印出事件数据进行检查：
   ```typescript
   console.log(JSON.stringify(event, null, 2));
   ```

2. **过滤器问题**：确保使用的过滤器已在`app.ts`中正确定义。当前支持的过滤器有：
    - `date`：日期格式化
    - `slice`：字符串截取
    - `truncate`：文本截断

3. **模板语法错误**：检查模板中的Nunjucks语法是否正确，特别是控制结构（if, for等）的开闭标签是否匹配。

如需添加新的过滤器，请在`src/app.ts`文件中的nunjucks配置部分添加。



# 部署到Vercel

## Vercel部署指南

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/remember-5/gitlab-bot&project-name=gitlab-bot&repository-name=gitlab-bot)


### 使用Vercel Dashboard部署

1. 登录[Vercel](https://vercel.com)控制台
2. 点击"New Project"导入您的Git仓库
3. 配置项目：
   - Framework Preset: 选择"Other"
   - Build Command: 留空（Vercel会自动处理）
   - Output Directory: 留空
   - Install Command: `npm install`

4. 在"Environment Variables"部分添加所需的环境变量：
   ```
   DINGTALK_SECRET_xxxxxxxx=SECxxxxxxxx
   # 添加其他所需的环境变量
   ```

5. 点击"Deploy"开始部署

### 部署后配置

1. 部署成功后，您可以在Vercel控制台查看项目详情和访问URL
2. 更新GitLab Webhook URL为：
   ```
   https://your-vercel-app.vercel.app/api/v1/gitlab/webhook?access_token=xxxxxxxx
   ```
   请将`your-vercel-app`替换为您的实际项目URL，`xxxxxxxx`替换为您的钉钉机器人access_token

### 验证部署

1. 使用以下URL测试API是否正常工作：
   ```
   https://your-vercel-app.vercel.app/api/v1
   ```
   应该返回一个包含欢迎信息的JSON响应

2. 在GitLab中配置webhook并触发测试事件，检查钉钉是否收到通知

### 注意事项

1. Vercel的免费计划有一些限制，如果您的webhook流量较大，可能需要升级到付费计划
2. Vercel函数有执行时间限制（通常为10秒），确保您的webhook处理逻辑在此时间内完成
3. 如果遇到问题，可以在Vercel控制台的"Deployments"部分查看日志信息
4. 部署请选择亚洲地区(hkg1) dashboard -> Settings -> Functions -> Advanced Settings -> Function Regions 修改为Asia Pacific Hong Kong

## 贡献
- 感谢[w3cj](https://github.com/w3cj)提供模版 https://github.com/w3cj/express-api-starter-ts
- https://github.com/vercel/examples/tree/main/solutions/express
## 许可证
MIT 
