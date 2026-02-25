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
    sidebar: [
      {
        text: '首页',
        link: '/'
      },
    {
        text: '关于',
        link: '/about'
      },
      {
        text: '最新文章',
        items: [
          { text: '我在控制台输入的一堆令人无语的命令', link: '/posts/silly-bash.md' },    
          { text: '我的第一篇文章', link: '/posts/first-post' },   
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ShiMingXuanSimon' }
    ]
  }
}