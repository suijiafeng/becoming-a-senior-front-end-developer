export class AutomationRules {
  constructor() {
      this.rules = [
          {
              condition: { type: 'temperature', room: 'living-room', threshold: 26 },
              action: { type: 'turnOnAC', room: 'living-room' }
          },
          {
              condition: { type: 'lighting', room: 'bedroom', state: true },
              action: { type: 'closeBlind', room: 'bedroom' }
          }
      ];
  }

  init() {
      // 初始化工作（如果需要的话）
  }

  checkRules(type, data) {
      this.rules.forEach(rule => {
          if (this.conditionMet(rule.condition, type, data)) {
              this.triggerAction(rule.action);
          }
      });
  }

  conditionMet(condition, type, data) {
      if (condition.type !== type) return false;
      if (condition.room !== data.room) return false;

      switch (type) {
          case 'temperature':
              return parseFloat(data.temperature) >= condition.threshold;
          case 'lighting':
              return data.state === condition.state;
          default:
              return false;
      }
  }

  triggerAction(action) {
      console.log(`自动化规则触发: ${action.type} in ${action.room}`);
      // 在实际应用中，这里可能会触发其他模块的操作
  }
}