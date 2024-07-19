export class DraggableManager {
  constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.draggingElement = null;
  }

  init() {
      this.container.addEventListener('dragstart', this.handleDragStart.bind(this));
      this.container.addEventListener('dragover', this.handleDragOver.bind(this));
      this.container.addEventListener('dragleave', this.handleDragLeave.bind(this));
      this.container.addEventListener('drop', this.handleDrop.bind(this));
      this.container.addEventListener('dragend', this.handleDragEnd.bind(this));
  }

  handleDragStart(e) {
      if (e.target.classList.contains('card')) {
          this.draggingElement = e.target;
          e.target.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/html', e.target.innerHTML);
      }
  }

  handleDragOver(e) {
      if (e.preventDefault) {
          e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      return false;
  }

  handleDragLeave(e) {
      e.target.classList.remove('drag-over');
  }

  handleDrop(e) {
      if (e.stopPropagation) {
          e.stopPropagation();
      }

      if (this.draggingElement !== e.target && e.target.classList.contains('card')) {
          this.draggingElement.innerHTML = e.target.innerHTML;
          e.target.innerHTML = e.dataTransfer.getData('text/html');
          
          // 交换 id 和其他必要的属性
          const tempId = this.draggingElement.id;
          this.draggingElement.id = e.target.id;
          e.target.id = tempId;
      }

      return false;
  }

  handleDragEnd(e) {
      e.target.classList.remove('dragging');
      this.draggingElement = null;
  }
}