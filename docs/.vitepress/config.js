// 1. 引入 Node.js 核心模块和第三方模块
const fs = require('fs')          // 文件系统模块，用来读取目录和文件
const path = require('path')      // 路径模块，用来处理文件路径
const matter = require('gray-matter') // 用于解析 Markdown 文件的 frontmatter

// 2. 确定文章存放的目录（绝对路径）
const postsDir = path.resolve(__dirname, '../posts')  // __dirname 是当前文件 (config.js) 所在的目录，即 .vitepress，然后向上一级进入 posts 目录

// 3. 检查posts是否存在，不存在则设为空数组
let sidebarItems = []
if (fs.existsSync(postsDir)) {
  const files = fs.readdirSync(postsDir)                       // 读取posts下所有文件
  const mdFiles = files.filter(file => file.endsWith('.md'))   // 保留.md
  sidebarItems = mdFiles.map(file => {         // 遍历.md，提取标题和链接
    const filePath = path.join(postsDir, file)    // 文件的完整路径
    const content = fs.readFileSync(filePath, 'utf-8') // 读取文件内容（同步读取）
    const { data } = matter(content)                 // 使用gray-matter解析frontmatter并返回一个对象，data属性即frontmatter的键值对
    const title = data.title || file.replace(/\.md$/, '') // 获取标题，如果没写 title 则回退到文件名（去掉 .md）
    const link = `/posts/${file.replace(/\.md$/, '')}`    // 生成链接路径（去掉 .md 后缀，VitePress 会自动处理）
    // 返回侧边栏项对象
    return { text: title, link }
  })

  // 4. 排序：可以按文件名（包含日期）倒序，或者按 frontmatter 中的 date 字段排序
  // 这里假设文件名以 YYYY-MM-DD 开头，例如 "2026-02-26-我的第一篇文章.md"
  // 这样按文件名倒序就能让最新文章排在前面
  sidebarItems.sort((a, b) => {
    // a.link 是 /posts/2026-02-26-xxx 这样的格式，提取文件名部分
    const aName = a.link.replace('/posts/', '')
    const bName = b.link.replace('/posts/', '')
    // 字符串倒序比较（最新的日期大，因为 2026-02-26 > 2026-02-25）
    return bName.localeCompare(aName)
  })
} else {
  console.warn('警告：posts 目录不存在，侧边栏将为空')
}

// 5. 导出 VitePress 配置
export default {
  title: 'SMXS 的博客',
  description: 'ShiMingXuanSimon 的博客',
  head: [
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ['link', { rel: 'alternate icon', href: '/favicon.png', sizes: '32x32' }]
],
  themeConfig: {
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
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ShiMingXuanSimon' }
    ]
  }
}