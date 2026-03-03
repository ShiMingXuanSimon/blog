// 1. 引入 Node.js 核心模块和第三方模块
const fs = require('fs')          // 文件系统模块，用来读取目录和文件
const path = require('path')      // 路径模块，用来处理文件路径
const matter = require('gray-matter') // 用于解析 Markdown 文件的 frontmatter

// 获取文章列表的函数（返回排序后的数组）
function getPosts() {
  // 2. 确定文章存放的目录（绝对路径）
  const postsDir = path.resolve(__dirname, '../../posts')

  if (!fs.existsSync(postsDir)) {
    console.warn('警告：posts 目录不存在，侧边栏将为空')
    return []
}

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))// 读取posts下所有文件,保留.md

  // 遍历.md，提取标题和链接
  const posts = files.map(file => {
    const filePath = path.join(postsDir, file)    // 文件的完整路径
    const content = fs.readFileSync(filePath, 'utf-8') // 读取文件内容（同步读取）
    const { data } = matter(content)                 // 使用gray-matter解析frontmatter并返回一个对象，data属性即frontmatter的键值对

    const title = data.title || file.replace(/\.md$/, '') // 获取标题，如果没写 title 则回退到文件名（去掉 .md）
    const link = `/posts/${file.replace(/\.md$/, '')}`    // 生成链接路径（去掉 .md 后缀，VitePress 会自动处理）

    // 处理日期：转换为时间戳，无效日期设为 0
    let dateValue = 0
    if (data.date) {
      const parsedDate = new Date(data.date)
      if (!isNaN(parsedDate)) {                 // 确保解析成功（避免无效日期）
        dateValue = parsedDate.getTime()
      } else {
        console.warn(`文件 ${file} 中的日期格式无效：${data.date}`)
      }
    }

    // 返回文章对象
    return {
      title,
      link,
      date: dateValue,
      dateStr: data.date || '',
    }
  })

  // 按日期降序排序（最新的在前），无日期的排在最后
  posts.sort((a, b) => {
    // 如果两者都有有效日期（>0）
    if (a.date > 0 && b.date > 0) return b.date - a.date
    // 只有a有日期，排前面
    if (a.date > 0 && b.date === 0) return -1
    // 只有b有日期，排前面
    if (a.date === 0 && b.date > 0) return 1
    // 都无日期，保持原顺序
    return 0
  })

  // 返回文章数组
  return posts
}

module.exports = { getPosts }