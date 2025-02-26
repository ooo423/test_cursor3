# 项目设置说明

## 环境要求
- Node.js >= 12.0.0
- MySQL >= 5.7

## 数据库设置
1. 创建数据库：
```sql
CREATE DATABASE login_db;
USE login_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE sales_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    sale_date DATETIME NOT NULL
);
```

2. 插入测试数据：
```sql
INSERT INTO users (username, password, role) VALUES
('manager', 'manager123', 'manager'),
('employee', 'employee123', 'employee');

INSERT INTO sales_records (order_id, product_name, amount, sale_date) VALUES
('001', '产品A', 1000.00, '2024-03-20'),
('002', '产品B', 2000.00, '2024-03-21');
```

## 项目启动
1. 安装依赖：
```bash
npm install
```

2. 启动服务器：
```bash
npm run dev
```

3. 访问系统：
打开浏览器访问 `http://localhost:3000/views/login.html` 