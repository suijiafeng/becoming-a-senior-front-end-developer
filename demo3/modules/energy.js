export class EnergyUsage {
  constructor(canvasId, dataService) {
      this.canvas = document.getElementById(canvasId);
      this.dataService = dataService;
      this.chart = null;
      this.data = Array(6).fill(0).map(() => Math.random() * 5 + 1);
  }

  init() {
      const ctx = this.canvas.getContext('2d');
      this.chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: ['5分钟前', '4分钟前', '3分钟前', '2分钟前', '1分钟前', '现在'],
              datasets: [{
                  label: '能源使用量 (kW)',
                  data: this.data,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
              }]
          },
          options: {
              responsive: true,
              scales: {
                  y: {
                      beginAtZero: true,
                      max: 10
                  }
              }
          }
      });
  }

  updateData(energyData) {
      this.data.shift();
      this.data.push(energyData.currentUsage);
      this.chart.data.datasets[0].data = this.data;
      this.chart.update();
  }
}