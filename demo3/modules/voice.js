// modules/voice.js
export class VoiceControl {
  constructor() {
      this.recognition = null;
  }

  init() {
      if ('webkitSpeechRecognition' in window) {
          this.recognition = new webkitSpeechRecognition();
          this.recognition.continuous = false;
          this.recognition.lang = 'zh-CN';

          this.recognition.onresult = this.handleResult.bind(this);
          this.setupVoiceButton();
      } else {
          console.log('浏览器不支持语音识别');
      }
  }

  setupVoiceButton() {
      const button = document.getElementById('voice-control-btn');
      button.addEventListener('click', () => {
          this.recognition.start();
          button.textContent = '正在聆听...';
      });

      this.recognition.onend = () => {
          button.textContent = '开始语音控制';
      };
  }

  handleResult(event) {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.trim();

      const voiceEvent = new CustomEvent('voiceCommand', {
          detail: { command }
      });
      document.dispatchEvent(voiceEvent);
  }
}