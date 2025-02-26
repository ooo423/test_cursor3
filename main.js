// 登录页面的JavaScript代码
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

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
}

// 后台页面的JavaScript代码
function checkLogin() {
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) {
        window.location.href = '222.html';
        return;
    }
    return JSON.parse(userStr);
}

function initializePage() {
    const user = checkLogin();
    if (!user) return;

    document.getElementById('userInfo').textContent = `${user.username} (${user.role === 'manager' ? '经理' : '员工'})`;
    document.getElementById('profileUsername').textContent = user.username;
    document.getElementById('profileRole').textContent = user.role === 'manager' ? '经理' : '员工';

    const managerOnlyElements = document.getElementsByClassName('manager-only');
    for (let element of managerOnlyElements) {
        element.style.display = user.role === 'manager' ? 'block' : 'none';
    }
}

async function showContent(contentType) {
    const contents = ['dashboard-content', 'sales-content', 'profile-content'];
    contents.forEach(content => {
        document.getElementById(content).classList.add('hidden');
    });
    
    if (contentType === 'sales') {
        try {
            const response = await fetch('http://localhost:3000/api/sales');
            const salesData = await response.json();
            
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
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = '222.html';
}

// 页面加载时初始化
if (document.location.pathname.includes('dashboard')) {
    window.onload = initializePage;
} 