# API文档

## 认证接口

### 登录
- **URL**: `/api/login`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **响应**:
  ```json
  {
    "success": "boolean",
    "user": {
      "username": "string",
      "role": "string"
    }
  }
  ```

## 销售记录接口

### 获取销售记录
- **URL**: `/api/sales`
- **方法**: `GET`
- **权限**: 需要manager角色
- **响应**: 销售记录数组 