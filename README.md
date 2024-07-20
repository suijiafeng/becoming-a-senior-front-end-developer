# becoming-a-senior-front-end-developer

要运行这个项目，将所有文件放在相应的目录结构中，

然后使用本地服务器（如 Python 的 http.server 或 Node.js 的 http-server）

来提供这些文件。


## 深入学习 HTML、CSS 和 JavaScript 的高阶用法
我将通过示例来展示，内容不分先后。
### HTML5 高阶特性：

语义化标签：如 `<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>`等。
增强的表单控件：如 email, url, date, color, range 等新的 input 类型。
多媒体标签：`<audio`> 和 `<video> `用于嵌入多媒体内容。
图形和绘图：`<canvas> `用于 JavaScript 绘图，`<svg> `用于可缩放矢量图形。

### CSS 高阶特性：

- CSS 变量（自定义属性）

- Flexbox 和 Grid 布局
- CSS 动画和过渡
- 响应式设计（媒体查询）
- 高级选择器和伪类/伪元素
- CSS 滤镜和转换
- CSS Grid 模板区域
- calc() 函数用于动态计算


### JavaScript 高阶特性：

- ES6+ 语法（解构赋值、箭头函数、模板字符串等）

- Promise 和 async/await 用于异步编程
- 类和继承
- 模块化
- 高阶函数
- 生成器函数
- 代理和反射
- Web Workers 用于并行处理
- 观察者模式
- IndexedDB 用于客户端存储
- Intersection Observer 用于检测元素可见性
- requestAnimationFrame 用于优化动画

## demo1 高级待办事项列表 
这个待办事项列表应用展示了更多的HTML、CSS和JavaScript概念:

HTML:

- 使用了语义化的标签如 <form> 和 <ul>

- 使用了 id 属性来选择特定元素
- Web Components

CSS:

- 使用了更复杂的选择器和样式

- 实现了响应式设计（使用 max-width 和 flex）
- 运用了一些简单的动画效果（如按钮的 hover 效果）

JavaScript:

- 使用了事件监听器（比如表单提交和按钮点击）

- 动态创建和删除 DOM 元素
- 使用了函数来组织代码


## demo2 高级图片库

包含以下特性：

- 使用 CSS Grid 创建响应式布局。

- 实现图片懒加载，提高页面加载性能。
- 使用 Intersection Observer 检测图片何时进入视口。
- 应用 CSS 变量来控制布局。
- 实现渐进式图片加载，先显示模糊的占位图，然后加载完整图片。


## demo3 智能家居控制面板

高级版本的待办事项列表应用引入了许多新概念和最佳实践：

- 模块化 JavaScript:
  我们将 JavaScript 代码分割成了多个模块（TodoList 和 ThemeManager），这有助于代码的组织和维护。
- CSS 变量和主题切换:
  使用 CSS 变量（--primary-color 等）使得主题切换变得简单。我们添加了一个主题切换按钮，可以在浅色和深色主题之间切换。
  高级 CSS 技巧:
- 使用 CSS transitions 为各种交互添加了平滑的动画效果。
  利用 CSS transforms 创建了删除待办事项时的滑出动画。

- 状态管理:
  待办事项现在有了完成状态，可以标记为已完成或未完成。
  过滤功能:
  添加了过滤按钮，可以显示全部、未完成或已完成的待办事项。
- 本地存储:
  （在 TodoList 模块中实现）使用 localStorage 来保存待办事项，使其在页面刷新后仍然存在。
- 事件委托:
  （在 TodoList 模块中实现）使用事件委托来处理待办事项的点击事件，提高了性能。

## demo4 高级待办事项管理器
项目将包含以下特性：

- 拖拽排序功能
- 本地存储
- 动画效果
- 主题切换（黑暗模式/浅色模式）
- 自定义元素（Web Components）
- 模块化 JavaScript



