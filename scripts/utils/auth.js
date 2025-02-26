/**
 * @file auth.js
 * @description 用户认证相关工具函数
 */

/**
 * @function checkLoginStatus
 * @description 检查用户是否已登录
 * @returns {Object|null} 用户信息或null
 */
export function checkLoginStatus() {
    const userStr = sessionStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

/**
 * @function logout
 * @description 用户登出
 */
export function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = '/views/login.html';
}

/**
 * @function checkPermission
 * @description 检查用户权限
 * @param {string} role - 需要的角色
 * @returns {boolean} 是否有权限
 */
export function checkPermission(role) {
    const user = checkLoginStatus();
    return user && user.role === role;
} 