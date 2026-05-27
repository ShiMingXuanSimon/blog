import { defineConfig } from 'vitepress'
import markdownItKatex from 'markdown-it-katex'
const customElements = [
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml'
]

// const { getPosts } = require('./lib/posts')
import { getPosts } from './lib/posts.js'

// 获取文章数据（此时已经按日期排序）
const posts = getPosts()

// 转换成侧边栏格式
const sidebarItems = posts.map(post => ({
  text: post.title,
  link: post.link
}))

// 导出 VitePress 配置
export default {
  lang: 'zh-cn',
  title: 'SMXS 的博客',
  description: 'ShiMingXuanSimon 的博客',
  head: [
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ['link', { rel: 'alternate icon', href: '/favicon.png', sizes: '32x32' }]
],

  markdown: {
    config: (md) => {
      md.use(markdownItKatex)
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag)
      }
    }
  },

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