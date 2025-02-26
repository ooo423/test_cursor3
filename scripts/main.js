/**
 * @file main.js
 * @description 前端主要逻辑文件，包含登录和后台管理功能
 */

import { checkLoginStatus, logout, checkPermission } from './utils/auth.js';
import { login, getSales } from './api/index.js';

// 导出logout函数供HTML直接使用
window.logout = logout;

/**
 * @function handleLogin
 * @description 处理登录表单提交
 * @param {Event} event - 表单提交事件
 */
window.handleLogin = async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const data = await login({ username, password });
        if (data.success) {
            sessionStorage.setItem('currentUser', JSON.stringify(data.user));
            window.location.href = 'dashboard.html';
        } else {
            errorMessage.style.display = 'block';
            errorMessage.textContent = data.message || '用户名或密码错误！';
        }
    } catch (error) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = '服务器连接失败，请稍后重试！';
    }
};

/**
 * @function showContent
 * @description 显示不同的内容区域
 * @param {string} contentType - 要显示的内容类型
 */
window.showContent = async function(contentType) {
    const contents = ['dashboard-content', 'sales-content', 'profile-content'];
    contents.forEach(content => {
        document.getElementById(content).classList.add('hidden');
    });
    
    if (contentType === 'sales' && checkPermission('manager')) {
        try {
            const salesData = await getSales();
            const tbody = document.querySelector('#sales-content table tbody');
            tbody.innerHTML = salesData.map(sale => `
                <tr>
                    <td>${sale.order_id}</td>
                    <td>${sale.product_name}</td>
                    <td>¥${sale.amount}</td>
                    <td>${new Date(sale.sale_date).toLocaleDateString()}</td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('获取销售记录失败：', error);
        }
    }
    
    document.getElementById(`${contentType}-content`).classList.remove('hidden');
};

// 页面加载时初始化
if (document.location.pathname.includes('dashboard')) {
    window.onload = function() {
        const user = checkLoginStatus();
        if (!user) return;

        document.getElementById('userInfo').textContent = 
            `${user.username} (${user.role === 'manager' ? '经理' : '员工'})`;
        document.getElementById('profileUsername').textContent = user.username;
        document.getElementById('profileRole').textContent = 
            user.role === 'manager' ? '经理' : '员工';

        const managerOnlyElements = document.getElementsByClassName('manager-only');
        for (let element of managerOnlyElements) {
            element.style.display = user.role === 'manager' ? 'block' : 'none';
        }
    };
} 