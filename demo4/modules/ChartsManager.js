export class ChartsManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.charts = {};
    this.chartContainers = {};
  }
  initCharts() {
    this.charts.sales = this.createLineChart('sales-chart', '销售趋势');
    this.charts.category = this.createPieChart('category-chart', '产品类别分布');
    this.charts.income = this.createBarChart('income-chart', '月度收入');
    this.charts.satisfaction = this.createDoughnutChart('satisfaction-chart', '客户满意度');

    // 存储图表容器引用
    ['sales', 'category', 'income', 'satisfaction'].forEach(chartName => {
        this.chartContainers[chartName] = document.getElementById(`${chartName}-chart`).closest('.chart-container');
    });

    this.updateCharts();
}

  createLineChart(canvasId, label) {
      const ctx = document.getElementById(canvasId).getContext('2d');
      return new Chart(ctx, {
          type: 'line',
          data: {
              labels: [],
              datasets: [{
                  label: label,
                  data: [],
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
              }]
          },
          options: {
              responsive: true,
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  }

  createPieChart(canvasId, label) {
      const ctx = document.getElementById(canvasId).getContext('2d');
      return new Chart(ctx, {
          type: 'pie',
          data: {
              labels: [],
              datasets: [{
                  label: label,
                  data: [],
                  backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)'
                  ]
              }]
          }
      });
  }

  createBarChart(canvasId, label) {
      const ctx = document.getElementById(canvasId).getContext('2d');
      return new Chart(ctx, {
          type: 'bar',
          data: {
              labels: [],
              datasets: [{
                  label: label,
                  data: [],
                  backgroundColor: 'rgb(75, 192, 192)'
              }]
          },
          options: {
              responsive: true,
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  }

  createDoughnutChart(canvasId, label) {
      const ctx = document.getElementById(canvasId).getContext('2d');
      return new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: [],
              datasets: [{
                  label: label,
                  data: [],
                  backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)'
                  ]
              }]
          }
      });
  }
  async updateCharts(filter = 'all') {
    // 显示加载动画
    Object.values(this.chartContainers).forEach(container => {
        container.classList.add('loading');
    });

    // 模拟数据加载延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    const data = this.dataManager.getData(filter);
    this.updateLineChart(this.charts.sales, data.sales);
    this.updatePieChart(this.charts.category, data.categories);
    this.updateBarChart(this.charts.income, data.income);
    this.updateDoughnutChart(this.charts.satisfaction, data.satisfaction);

    // 隐藏加载动画
    Object.values(this.chartContainers).forEach(container => {
        container.classList.remove('loading');
    });
}

updateLineChart(chart, data) {
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.values;
    chart.update({
        duration: 800,
        easing: 'easeOutQuart'
    });
}

updatePieChart(chart, data) {
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.values;
    chart.update({
        duration: 800,
        easing: 'easeOutQuart'
    });
}

updateBarChart(chart, data) {
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.values;
    chart.update({
        duration: 800,
        easing: 'easeOutQuart'
    });
}

updateDoughnutChart(chart, data) {
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.values;
    chart.update({
        duration: 800,
        easing: 'easeOutQuart'
    });
}
}