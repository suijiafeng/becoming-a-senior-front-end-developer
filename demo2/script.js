// 图片URL数组
const imageUrls = [];

// 生成本地图片URL数组
for (let i = 1; i <= 18; i++) {
    imageUrls.push(`images/image${i}.jpg`);
}

// 获取图片库容器元素
const gallery = document.querySelector('.gallery');

/**
 * 创建单个图片元素
 * @param {string} url - 图片的URL
 * @returns {HTMLElement} - 创建的图片元素
 */
function createImageElement(imageUrl) {
    const imageItem = document.createElement('div');
    imageItem.className = 'gallery-item loading';
    
    const image = document.createElement('img');
    image.dataset.sourceUrl = imageUrl;
    
    imageItem.appendChild(image);
    return imageItem;
}

/**
 * 加载图片
 * @param {HTMLElement} item - 包含图片的容器元素
 */
function loadImage(item) {
    const img = item.querySelector('img');
    img.src = img.dataset.sourceUrl;  // 设置图片源，开始加载
    img.onload = () => {
        item.classList.remove('loading');  // 图片加载完成后移除loading类
    };
}

/**
 * 处理图片元素进入/离开视口的逻辑
 * @param {IntersectionObserverEntry[]} entries - 被观察元素的信息
 * @param {IntersectionObserver} observer - 观察器实例
 */
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {  // 如果图片进入视口
            loadImage(entry.target);
            observer.unobserve(entry.target);  // 停止观察这个元素
        }
    });
}

// 创建交叉观察器
const observer = new IntersectionObserver(handleIntersection, {
    root: null,  // 使用视口作为根
    rootMargin: '0px',  // 视口边缘
    threshold: 0.3  // 当10%的元素可见时触发
});

// 为每个图片URL创建元素并添加到图片库
imageUrls.forEach(url => {
    const item = createImageElement(url);
    gallery.appendChild(item);
    observer.observe(item);  // 开始观察这个元素
});