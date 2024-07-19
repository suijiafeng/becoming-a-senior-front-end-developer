// modules/auth.js
export class AuthManager {
  constructor() {
      this.user = null;
  }

  async init() {
      const token = localStorage.getItem('authToken');
      if (token) {
          try {
              this.user = await this.verifyToken(token);
          } catch (error) {
              console.error('Token verification failed:', error);
              localStorage.removeItem('authToken');
          }
      }
  }

  isAuthenticated() {
      return this.user !== null;
  }

  async login(username, password) {
      // 在实际应用中，这里应该发送请求到服务器进行验证
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              if (username === 'demo' && password === 'password') {
                  const token = 'fake-jwt-token';
                  localStorage.setItem('authToken', token);
                  this.user = { username, name: 'Demo User' };
                  resolve(this.user);
              } else {
                  reject(new Error('Invalid credentials'));
              }
          }, 1000);
      });
  }

  logout() {
      localStorage.removeItem('authToken');
      this.user = null;
  }

  async verifyToken(token) {
      // 在实际应用中，这里应该发送请求到服务器验证token
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve({ username: 'demo', name: 'Demo User' });
          }, 500);
      });
  }
}