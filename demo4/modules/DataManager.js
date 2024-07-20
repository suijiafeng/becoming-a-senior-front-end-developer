export class DataManager {
  constructor() {
      this.data = this.generateRandomData();
  }

  getData(filter = 'all') {
      // 在实际应用中，这里应该根据 filter 参数从服务器获取数据
      // 现在我们只是返回随机生成的数据
      return this.data;
  }

  refreshData() {
      this.data = this.generateRandomData();
  }

  generateRandomData() {
      return {
          sales: {
              labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
              values: Array.from({length: 6}, () => Math.floor(Math.random() * 1000))
          },
          categories: {
              labels: ['电子产品', '服装', '食品'],
              values: Array.from({length: 3}, () => Math.floor(Math.random() * 100))
          },
          income: {
              labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
              values: Array.from({length: 6}, () => Math.floor(Math.random() * 10000))
          },
          satisfaction: {
              labels: ['非常满意', '满意', '一般', '不满意'],
              values: Array.from({length: 4}, () => Math.floor(Math.random() * 100))
          }
      };
  }
}