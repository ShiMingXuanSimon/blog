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

  // 遍历.md，提取标题和链接
  sidebarItems = mdFiles.map(file => {
    const filePath = path.join(postsDir, file)    // 文件的完整路径
    const content = fs.readFileSync(filePath, 'utf-8') // 读取文件内容（同步读取）
    const { data } = matter(content)                 // 使用gray-matter解析frontmatter并返回一个对象，data属性即frontmatter的键值对
    const title = data.title || file.replace(/\.md$/, '') // 获取标题，如果没写 title 则回退到文件名（去掉 .md）
    const link = `/posts/${file.replace(/\.md$/, '')}`    // 生成链接路径（去掉 .md 后缀，VitePress 会自动处理）

    // 处理日期：有date字段，转为时间戳；否则为0
    let dateValue = 0
    if (data.date) {
      const parsedDate = new Date(data.date)
      // 确保解析成功（避免无效日期）
      if (!isNaN(parsedDate)) {
        dateValue = parsedDate.getTime()
      }
      } else {
        console.warn(`警告：文件 ${file} 中的日期格式无效：${data.date}`)
      }
    
    // 返回侧边栏项对象，包含日期信息
    return { text: title, link, date: dateValue, rawDate: data.date }
  })


  // 调试：在终端输出每篇文章的标题和日期值
  console.log('文章列表（调试信息）：')
  sidebarItems.forEach(item => {
    console.log(`  ${item.text} => date: ${item.date} (原始: ${item.rawDate})`)
  })

  // 4. 排序：按文件名（包含日期）倒序
  // 假设文件名以 YYYY-MM-DD 开头，例如 "2026-02-26-我的第一篇文章.md"
  // sidebarItems.sort((a, b) => {
  //   // a.link 是 /posts/2026-02-26-xxx 这样的格式，提取文件名部分
  //   const aName = a.link.replace('/posts/', '')
  //   const bName = b.link.replace('/posts/', '')
  //   // 字符串倒序比较（最新的日期大，因为 2026-02-26 > 2026-02-25）
  //   return bName.localeCompare(aName)
  // })

  // 4. 排序：按 frontmatter 中的 date 字段排序
  sidebarItems.sort((a, b) => {
    // 如果两者都有有效日期（>0）
    if (a.date > 0 && b.date > 0) {
      return b.date - a.date
    }
    // 只有a有日期，排前面
    if (a.date > 0 && b.date === 0) return -1
    // 只有b有日期，排前面
    if (a.date === 0 && b.date > 0) return 1
    // 都无日期，保持原顺序
    return 0
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