import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import nunjucks from 'nunjucks';
import path from 'path';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();

// 配置nunjucks
const nunjucksEnv = nunjucks.configure(path.join(__dirname, 'templates'), {
  // 防止 XSS 攻击，自动转义 HTML
  autoescape: true,
  // 绑定到 Express 应用
  express: app,
  watch: process.env.NODE_ENV === 'development',
});

// 添加日期格式化过滤器
nunjucksEnv.addFilter('date', function (str, format) {
  if (!str) return '';
  const date = new Date(str);
  
  // 简单的日期格式化实现
  const formatMap: Record<string, string> = {
    'YYYY': date.getFullYear().toString(),
    'MM': (date.getMonth() + 1).toString().padStart(2, '0'),
    'DD': date.getDate().toString().padStart(2, '0'),
    'HH': date.getHours().toString().padStart(2, '0'),
    'mm': date.getMinutes().toString().padStart(2, '0'),
    'ss': date.getSeconds().toString().padStart(2, '0'),
  };
  
  let result = format || 'YYYY-MM-DD HH:mm:ss';
  Object.keys(formatMap).forEach(key => {
    result = result.replace(key, formatMap[key]);
  });
  
  return result;
});

// 添加字符串截取过滤器
nunjucksEnv.addFilter('slice', function (input, start, end) {
  if (!input) return '';
  
  // 处理字符串
  if (typeof input === 'string') {
    return String(input).slice(start, end);
  }
  
  // 处理数组
  if (Array.isArray(input)) {
    return input.slice(start, end);
  }
  
  return input;
});

// 添加字符串截断过滤器
nunjucksEnv.addFilter('truncate', function (str, length) {
  if (!str) return '';
  str = String(str);
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
});

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

// 添加根路径健康检查路由
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
