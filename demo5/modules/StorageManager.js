export class StorageManager {
  saveCode(language, code) {
      localStorage.setItem(`code_${language}`, code);
  }

  getCode(language) {
      return localStorage.getItem(`code_${language}`) || '';
  }
}