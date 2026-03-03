const { getPosts } = require('../lib/posts')

module.exports = {
  watch: ['./posts/**/*.md'],
  load() {
    // 直接调用公共函数，返回文章数据
    return getPosts()
  }
}