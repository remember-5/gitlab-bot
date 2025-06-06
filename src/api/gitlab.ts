import express from 'express';
import { GitLabEvent } from '../interfaces/GitLabEvent';
import { processGitLabEvent, testGitLabEventTemplate } from '../services/notificationService';

const router = express.Router();

// GitLab webhook接收端点
router.post('/webhook', async (req, res) => {
  const event = req.body as GitLabEvent;

  // @ts-ignore
  const accessToken: string = req.query.access_token;
  if (!accessToken) {
    return res.status(400).json({
      success: false,
      message: '缺少access_token参数',
    });
  }
  const dingtalkSecret = process.env[`DINGTALK_SECRET_${accessToken}`];
  if (!dingtalkSecret) {
    return res.status(400).json({
      success: false,
      message: '无效的access_token',
    });
  }

  if (!event || !event.object_kind) {
    return res.status(400).json({
      success: false,
      message: '无效的GitLab事件数据',
    });
  }

  console.log(`接收到GitLab ${event.object_kind}事件`);

  try {
    const success = await processGitLabEvent(event, accessToken, dingtalkSecret);

    if (success) {
      return res.status(200).json({
        success: true,
        message: `成功处理${event.object_kind}事件并发送通知`,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: `处理${event.object_kind}事件失败`,
      });
    }
  } catch (error) {
    console.error('处理GitLab事件时发生错误:', error);
    return res.status(500).json({
      success: false,
      message: '处理GitLab事件时发生错误',
    });
  }
});


// GitLab模板测试接口
router.post('/test', (req, res) => {
  const event = req.body as GitLabEvent;

  if (!event || !event.object_kind) {
    return res.status(400).json({
      success: false,
      message: '无效的GitLab事件数据',
    });
  }

  console.log(`测试GitLab ${event.object_kind}事件模板渲染`);

  try {
    // 使用测试函数，不发送实际通知
    const result = testGitLabEventTemplate(event);
    
    return res.status(200).json({
      ...result,
      event_type: event.object_kind,
    });
  } catch (error) {
    console.error('测试GitLab事件模板时发生错误:', error);
    return res.status(500).json({
      success: false,
      message: '测试GitLab事件模板时发生错误',
      error: String(error),
    });
  }
});


export default router;
