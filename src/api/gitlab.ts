import express from 'express';
import { GitLabEvent } from '../interfaces/GitLabEvent';
import { processGitLabEvent } from '../services/notificationService';

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

export default router;
