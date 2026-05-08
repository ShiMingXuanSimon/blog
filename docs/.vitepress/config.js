const { getPosts } = require('./lib/posts')

// 获取文章数据（此时已经按日期排序）
const posts = getPosts()

// 转换成侧边栏格式
const sidebarItems = posts.map(post => ({
  text: post.title,
  link: post.link
}))

// 导出 VitePress 配置
export default {
  title: 'SMXS 的博客',
  description: 'ShiMingXuanSimon 的博客',
  head: [
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ['link', { rel: 'alternate icon', href: '/favicon.png', sizes: '32x32' }]
],
  themeConfig: {
    docsFooter: {
      prev: false,
      next: false
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about' },
      { text: 'SMXS 的主页', link: 'https://smx-s.com' }
    ],
    
    // 侧边栏使用动态生成的数组
    sidebar: [
      {
        text: '文章',
        items: sidebarItems
      }
    ],
    
    vite: {
      server: {
        watch: {
          // 使用轮询方式监听文件变化（适用于某些文件系统）
          usePolling: true,
        },
      },
    },
  
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ShiMingXuanSimon' }
    ]
  }
}