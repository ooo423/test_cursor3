/**
 * @file index.js
 * @description API请求封装
 */

const API_BASE_URL = 'http://localhost:3000';

/**
 * @function login
 * @description 用户登录
 * @param {Object} credentials - 登录凭证
 * @returns {Promise<Object>} 登录结果
 */
export async function login(credentials) {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    return response.json();
}

/**
 * @function getSales
 * @description 获取销售记录
 * @returns {Promise<Array>} 销售记录列表
 */
export async function getSales() {
    const response = await fetch(`${API_BASE_URL}/api/sales`);
    return response.json();
} 