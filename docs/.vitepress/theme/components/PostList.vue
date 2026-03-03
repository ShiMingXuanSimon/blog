<template>
  <div class="post-list">
    <h2>最新文章</h2>
    <ul>
      <li v-for="post in posts" :key="post.link">
        <a :href="post.link">{{ post.title }}</a>
        <span v-if="post.dateStr" class="post-date">{{ formatDate(post.dateStr) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
// 导入文章数据
import { data } from '../posts.data.js'

export default {
  setup() {
    // 定义日期格式化函数
    const formatDate = (dateStr) => {
      // 如果 dateStr 是 YYYY-MM-DD 格式，直接返回；否则尝试解析后格式化
      if (dateStr && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return dateStr
      }
      // 如果不是标准格式，尝试用 Date 对象格式化
      try {
        const d = new Date(dateStr)
        if (!isNaN(d)) {
          return d.toISOString().slice(0, 10) // 输出 YYYY-MM-DD
        }
      } catch (e) {}
      return ''
    }

    return {
      posts: data, // 将数据传递给模板
      formatDate
    }
  }
}
</script>

<style scoped>
.post-list {
  margin-top: 2rem;
}
.post-list ul {
  list-style: none;
  padding: 0;
}
.post-list li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}
.post-list a {
  color: #42b883;
  text-decoration: none;
  font-size: 1.1rem;
}
.post-list a:hover {
  text-decoration: underline;
}
.post-date {
  margin-left: 1rem;
  color: #666;
  font-size: 0.9rem;
}
</style>