const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../src/app').default;

// 测试用例目录
const TEST_DIR = path.join(__dirname, 'gitlab-hooks');

// 动态加载所有测试用例
describe('POST /api/v1/gitlab/test', () => {
  // 获取所有测试用例文件
  const testFiles = fs.readdirSync(TEST_DIR)
    .filter(file => file.endsWith('.js'))
    .sort();

  // 为每个测试用例创建测试
  // eslint-disable-next-line no-restricted-syntax
  testFiles.forEach(file => {
    const testCase = require(path.join(TEST_DIR, file));
    const eventType = testCase.body.object_kind;

    it(`renders ${eventType} template from ${file} correctly`, async () => {
      const response = await request(app)
        .post('/api/v1/gitlab/test')
        .set(testCase.headers)
        .send(testCase.body)
        .expect('Content-Type', /json/)
        .expect(200);

      // 验证响应包含必要的字段
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('content');
      expect(response.body).toHaveProperty('templatePath');
      expect(response.body).toHaveProperty('event_type', eventType);

      // 验证内容不为空
      expect(response.body.content).toBeTruthy();
      console.log(response.body.title);
      console.log(response.body.content);
      console.log('------------------');
    });
  });

  // 测试无效的请求
  it('returns 400 for invalid request body', async () => {
    await request(app)
      .post('/api/v1/gitlab/test')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400);
  });
});
