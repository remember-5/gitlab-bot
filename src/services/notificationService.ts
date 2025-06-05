import nunjucks from 'nunjucks';
import { GitLabEvent } from '../interfaces/GitLabEvent';
import { Dingtalk } from 'push-all-in-one';

/**
 * 获取GitLab事件对应的模板文件和标题
 */
function getTemplateInfo(event: GitLabEvent): { templatePath: string | null; title: string } {
  const { object_kind: objectKind } = event;

  switch (objectKind) {
    case 'push':
      return {
        templatePath: 'gitlab/push.njk',
        title: 'GitLab推送通知',
      };
    case 'merge_request':
      return {
        templatePath: 'gitlab/merge_request.njk',
        title: `GitLab合并请求${event.action || ''}通知`,
      };
    case 'issue':
      return {
        templatePath: 'gitlab/issue.njk',
        title: `GitLab议题${event.action || ''}通知`,
      };
    case 'pipeline':
      return {
        templatePath: 'gitlab/pipeline.njk',
        title: 'GitLab流水线通知',
      };
    case 'note':
      return {
        templatePath: 'gitlab/comment.njk',
        title: 'GitLab评论通知',
      };
    case 'release':
      return {
        templatePath: 'gitlab/release.njk',
        title: 'GitLab发布通知',
      };
    default:
      console.warn(`未知的GitLab事件类型: ${objectKind}`);
      return {
        templatePath: null,
        title: `GitLab ${objectKind || '未知'}事件通知`,
      };
  }
}

/**
 * 渲染通知内容
 */
function renderNotification(event: GitLabEvent): { content: string | null; title: string } {
  const { templatePath, title } = getTemplateInfo(event);

  if (!templatePath) {
    return { content: null, title };
  }

  try {
    const content = nunjucks.render(templatePath, event);
    return { content, title };
  } catch (error) {
    console.error(`渲染模板失败: ${error}`);
    return { content: null, title };
  }
}

/**
 * 发送通知到钉钉
 */
async function sendToDingTalk(accessToken: string, dingtalkSecret: string, title: string, content: string): Promise<boolean> {
  try {
    const dingtalk = new Dingtalk({
      DINGTALK_ACCESS_TOKEN: accessToken,
      DINGTALK_SECRET: dingtalkSecret,
    });
    dingtalk.send(title, content, { msgtype: 'markdown', at: { atMobiles: [], atUserIds: [], isAtAll: false } });
    return true;
  } catch (error) {
    console.error(`发送钉钉通知失败: ${error}`);
    return false;
  }
}

/**
 * 处理GitLab webhook事件并发送通知
 */
export async function processGitLabEvent(event: GitLabEvent, accessToken: string, dingtalkSecret: string): Promise<boolean> {
  const { content, title } = renderNotification(event);

  if (!content) {
    return false;
  }

  return sendToDingTalk(accessToken, dingtalkSecret, title, content);
}
