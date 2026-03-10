<template>
  <div id="waline-container"></div>
</template>

<script setup>
import { useRoute } from 'vitepress'
import { init } from '@waline/client'
import '@waline/client/style'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const route = useRoute() // 获取当前路由对象
const walineInstance = ref(null) // 保存实例

// 初始化或重新初始化的函数
const initWaline = (path) => {
  if (walineInstance.value) {
    walineInstance.value.destroy()
  }
  walineInstance.value = init({
    el: '#waline-container',
    serverURL: 'https://blog-comments.smx-s.com/',
    path: path,
    lang: 'zh-CN',
    dark: 'auto',
    comment: true,
  })
}

onMounted(() => {
  initWaline(route.path) // 首次加载
})

// 监听路由路径变化
watch(() => route.path, (newPath) => {
  initWaline(newPath)
})

onBeforeUnmount(() => {
  if (walineInstance.value) {
    walineInstance.value.destroy()
  }
})
</script>