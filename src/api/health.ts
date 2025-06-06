import express from 'express';
import os from 'os';

interface HealthResponse {
  status: string;
  uptime: number;
  timestamp: string;
  version: string;
  memory: {
    total: number;
    free: number;
    used: number;
    usage: string;
  };
  cpu: {
    model: string;
    cores: number;
    loadAvg: number[];
  };
}

const router = express.Router();
const startTime = Date.now();

// 获取应用版本
const appVersion = process.env.npm_package_version || require('../../package.json').version;

/**
 * @api {get} /health 健康检查
 * @apiName GetHealth
 * @apiGroup Health
 * @apiVersion 1.0.0
 * @apiDescription 获取应用健康状态和系统信息
 *
 * @apiSuccess {String} status 应用状态
 * @apiSuccess {Number} uptime 运行时间(毫秒)
 * @apiSuccess {String} timestamp 当前时间
 * @apiSuccess {String} version 应用版本
 * @apiSuccess {Object} memory 内存使用情况
 * @apiSuccess {Number} memory.total 总内存(MB)
 * @apiSuccess {Number} memory.free 可用内存(MB)
 * @apiSuccess {Number} memory.used 已用内存(MB)
 * @apiSuccess {String} memory.usage 内存使用率
 * @apiSuccess {Object} cpu CPU信息
 * @apiSuccess {String} cpu.model CPU型号
 * @apiSuccess {Number} cpu.cores CPU核心数
 * @apiSuccess {Array} cpu.loadAvg CPU负载
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "ok",
 *       "uptime": 3600000,
 *       "timestamp": "2023-06-01T12:00:00.000Z",
 *       "version": "1.0.0",
 *       "memory": {
 *         "total": 8192,
 *         "free": 4096,
 *         "used": 4096,
 *         "usage": "50%"
 *       },
 *       "cpu": {
 *         "model": "Intel(R) Core(TM) i7-9750H",
 *         "cores": 12,
 *         "loadAvg": [1.5, 1.2, 1.0]
 *       }
 *     }
 */
router.get<{}, HealthResponse>('/', (req, res) => {
  // 计算内存使用情况
  const totalMem = Math.round(os.totalmem() / (1024 * 1024));
  const freeMem = Math.round(os.freemem() / (1024 * 1024));
  const usedMem = totalMem - freeMem;
  const memUsage = Math.round((usedMem / totalMem) * 100);

  // 获取CPU信息
  const cpuInfo = os.cpus();
  const cpuModel = cpuInfo.length > 0 ? cpuInfo[0].model.trim() : 'Unknown';
  const cpuCores = cpuInfo.length;
  const loadAvg = os.loadavg();

  // 构建响应
  const response: HealthResponse = {
    status: 'ok',
    uptime: Date.now() - startTime,
    timestamp: new Date().toISOString(),
    version: appVersion,
    memory: {
      total: totalMem,
      free: freeMem,
      used: usedMem,
      usage: `${memUsage}%`,
    },
    cpu: {
      model: cpuModel,
      cores: cpuCores,
      loadAvg: loadAvg,
    },
  };

  res.json(response);
});

export default router; 