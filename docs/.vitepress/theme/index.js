// 引入默认主题
import DefaultTheme from 'vitepress/theme'
// 引入你的自定义组件
import PostList from './components/PostList.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件，这样在 Markdown 中就可以直接使用 <PostList />
    app.component('PostList', PostList)
  }
}