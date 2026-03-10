// 引入默认主题
import DefaultTheme from 'vitepress/theme'
// 引入你的自定义组件
import PostList from './components/PostList.vue'
// 引入 Waline 评论组件
import WalineComment from './components/WalineComment.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('PostList', PostList)
    app.component('WalineComment', WalineComment)
  }
}