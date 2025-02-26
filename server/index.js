/**
 * @file index.js
 * @description 后端服务器入口文件，提供登录和销售数据API
 * @database MySQL
 * @api_endpoints 
 * - POST /api/login - 用户登录
 * - GET /api/sales - 获取销售记录
 */

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// 启用跨域请求和请求体解析
app.use(cors());
app.use(bodyParser.json());

/**
 * @description 数据库连接配置
 * @config {Object} 数据库连接参数
 */
const db = mysql.createConnection({
    host: '127.0.0.1',     // 数据库主机地址
    user: 'newuser',     // 使用新创建的用户
    password: 'password', // 新用户的密码
    database: 'login_db'  // 数据库名
});

/**
 * @description 建立数据库连接
 * @event 连接成功或失败时输出日志
 */
db.connect((err) => {
    if (err) {
        console.error('数据库连接失败：', err);
        return;
    }
    console.log('数据库连接成功！');
});

/**
 * @api POST /api/login
 * @description 处理用户登录请求
 * @param {Object} req.body 
 * @param {string} req.body.username - 用户名
 * @param {string} req.body.password - 密码
 * @returns {Object} 登录结果
 * - success: boolean
 * - user: {username: string, role: string} | null
 */
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            res.status(500).json({ error: '服务器错误' });
            return;
        }
        
        if (results.length > 0) {
            res.json({
                success: true,
                user: {
                    username: results[0].username,
                    role: results[0].role
                }
            });
        } else {
            res.json({ success: false, message: '用户名或密码错误' });
        }
    });
});

/**
 * @api GET /api/sales
 * @description 获取销售记录
 * @permission 需要manager角色
 * @returns {Array<Object>} 销售记录列表
 */
app.get('/api/sales', (req, res) => {
    const query = 'SELECT * FROM sales_records';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: '服务器错误' });
            return;
        }
        res.json(results);
    });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
}); 