const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// 启用 CORS 和 body-parser
app.use(cors());
app.use(bodyParser.json());

// 数据库连接配置
const db = mysql.createConnection({
    host: '127.0.0.1',     // 数据库主机地址
    user: 'newuser',     // 使用新创建的用户
    password: 'password', // 新用户的密码
    database: 'login_db'  // 数据库名
});

// 连接数据库
db.connect((err) => {
    if (err) {
        console.error('数据库连接失败：', err);
        return;
    }
    console.log('数据库连接成功！');
});

// 登录API
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

// 获取销售记录API
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

let phoneReg=/^1[3-9]\d{9}$/;

console.log(phoneReg.test("13800138000"));
console.log(phoneReg.test("138001380001"));
console.log(phoneReg.test("1380013800"));
console.log(phoneReg.test("138001380000"));
console.log(phoneReg.test("1380013800000"));
console.log(phoneReg.test("13800138000000"));
console.log(phoneReg.test("138001380000000"));
console.log(phoneReg.test("1380013800000000"));
console.log(phoneReg.test("13800138000000000"));
console.log(phoneReg.test("138001380000000000"));

// 快速排序实现
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)]; // 选择中间元素作为基准
    const left = [];
    const right = [];
    const equal = [];
    
    // 分区
    for (let element of arr) {
        if (element < pivot) {
            left.push(element);
        } else if (element > pivot) {
            right.push(element);
        } else {
            equal.push(element);
        }
    }
    
    // 递归排序并合并结果
    return [...quickSort(left), ...equal, ...quickSort(right)];
}

// 测试用例
const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
console.log("原始数组:", arr);
console.log("排序后:", quickSort(arr));


