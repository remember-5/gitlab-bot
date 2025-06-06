# GitLab机器人

这是一个用于接收GitLab Webhooks事件并转发到钉钉等通知渠道的应用机器人

## 功能特点

- 支持GitLab多种事件类型：
  - [x] Push events 代码推送
  - [x] Tag push events
  - [x] Comments 评论
  - [ ] Confidential comments
  - [x] Issue events 议题
  - [ ] Confidential issue events
  - [x] Merge request events 合并请求
  - [ ] Job events
  - [x] Pipeline events 流水线
  - [ ] Wiki page events
  - [ ] Deployment events
  - [ ] Feature flag events
  - [x] Releases events
  - [ ] Emoji events
  - [ ] Project or group access token events
  - [ ] Vulnerability events
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

## 模式支持

### 接口入参模式
动态参数, push所需的参数均有接口提供，不同推送源的接口路径不同, 此项目只做`json to markdown`和`push`，

例如gitlab webhook配置dingtalk机器人: https://xxxx.com/api/v1/webhook/dingtalk?access_token=xxx&secret=xxx

例如gitlab webhook配置飞书机器人:  https://xxxx.com/api/v1/webhook/feishu?access_token=xxx&secret=xxx

如上access_token和secret均需要由url传入

优点:
- 适用于做公共平台，提供公共接口,
- 支持多项目模式(不同仓库不同的webhook)

缺点:
- 不支持多推送源
- 安全性差

ps: 考虑和研究单接口多推送源的可能性。

### 环境变量模式
gitlab webhook只需配置次项目url即可，不需加任何参数，参数全部读取环境变量。 适用于私有化部署，安全性强

例如gitlab webhook配置dingtalk机器人: https://xxxx.com/api/v1/webhook?channel=dingtalk

例如gitlab webhook配置飞书机器人: https://xxxx.com/api/v1/webhook?channel=feishu

如上access_token和secret均不需要传入, 会从环境变量中读取

优点:
- 适用于私有化部署，安全性强
- 支持多推送源

缺点:
- 需要自己部署
- 不够灵活
- 不支持多项目模式(不同仓库不同的webhook)

### secret模式

url中只传入access_token，secret从环境变量中读取。

例如gitlab webhook配置dingtalk机器人: https://xxxx.com/api/v1/webhook?channel=dingtalk&access_token=xxx

例如gitlab webhook配置飞书机器人: https://xxxx.com/api/v1/webhook?channel=feishu&access_token=xxx

如上access_token需要传入，secret不需要传入, 会从环境变量中读取。secret配置方式为`DINGTALK_SECRET_`拼接ACCESS_TOKEN

优点:
- 适用于共有部署和私有化部署，安全性强
- 支持多项目模式(不同仓库不同的webhook)

缺点:
- 不支持多推送源
- 配置复杂

```env
DINGTALK_SECRET_${ACCESS_TOKEN}=xxxxxx
```


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

- `POST /api/v1/gitlab/test`: 测试GitLab事件模板渲染的接口
    - 接受与webhook相同格式的GitLab事件数据
    - 只渲染模板，不发送实际通知
    - 返回渲染结果，包含标题、内容和模板路径
    - 用于开发和调试模板

- `GET /health`: 简单的健康检查接口
    - 返回服务状态和当前时间戳
    - 用于监控系统检查服务是否正常运行

- `GET /api/v1/health`: 详细的健康检查接口
    - 返回服务状态、运行时间、版本信息
    - 包含系统资源信息（内存使用、CPU信息等）
    - 用于监控和诊断系统状态

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
4. 部署请选择亚洲地区(hkg1) Dashboard -> Settings -> Functions -> Advanced Settings -> Function Regions 修改为Asia Pacific Hong Kong
5. 国内直接访问vercel会出现超时,需要在vercel挂一个国内的域名才可以。Dashboard -> Settings -> Domains -> Add Domain 添加一个国内域名

## 贡献

### 贡献者

- 感谢[w3cj](https://github.com/w3cj)提供模版 https://github.com/w3cj/express-api-starter-ts
- https://github.com/vercel/examples/tree/main/solutions/express

### 贡献指南

我们欢迎并感谢任何形式的贡献！以下是贡献此项目的步骤：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

### PR提交流程

在提交PR之前，请确保完成以下步骤：

1. 确保代码符合项目的编码规范：
   ```bash
   npm run lint
   ```

2. 确保所有模板测试用例通过：
   ```bash
   # 先启动本地服务
   npm run dev

   # 新开一个终端，运行模板测试
   npm run test
   ```

3. 如果你添加了新的模板或修改了现有模板，请添加或更新相应的测试用例：
   - 在 `test/gitlab-hooks/` 目录下创建新的测试用例文件
   - 测试用例文件应该导出一个包含 `header` 和 `body` 的对象
   - 确保测试用例覆盖了你的更改

4. 在PR描述中，请详细说明：
   - 你做了哪些更改
   - 为什么做这些更改
   - 如何测试这些更改

### 测试用例格式

每个测试用例文件应该包含以下结构：

```javascript
module.exports = {
  headers: {
    'Content-Type': 'application/json',
    'X-Gitlab-Event': 'Push Hook',
    // 其他HTTP头
  },
  reqeust: {
    "object_kind": "push", // 事件类型
    // GitLab webhook事件的完整JSON数据
  }
};
```

测试脚本会将这些测试用例发送到模板测试接口，并验证渲染结果。

### 运行测试

```bash
# 启动本地服务
npm run dev

# 在另一个终端运行模板测试
npm run test:templates

# 如果需要指定不同的测试接口
TEST_ENDPOINT=http://your-server.com/api/v1/gitlab/test npm run test:templates
```

测试脚本会输出每个测试用例的渲染结果，以及测试是否通过。所有测试必须通过才能提交PR。

## 参与项目
拉取代码,提交PR，欢迎加入[GitLab Bot](https://github.com/remember-5/gitlab-bot/-/issues)

提交PR前请请运行测试，确保测试通过。

测试流程....

保证test/gitlab-hoos目录下的全部能输出即可

## 许可证
MIT 
