import { getThemeConfig, defineConfig } from '@sugarat/theme/node'

const blogTheme = getThemeConfig({
  // 文章默认作者
  author: '纷雪',
  hotArticle:{
    title: '😭 加深印象',
    nextText: '换一组',
    pageSize: 3,
    empty: '暂无精选内容'
  }
})

export default defineConfig({
  lang: 'zh-cmn-Hans',
  title: '纷雪的学习笔记',
  description: '纷雪的学习博客，基于 vitepress 实现',
  vite: {
    optimizeDeps: {
      include: ['element-plus'],
      exclude: ['@sugarat/theme']
    }
  },
  themeConfig: {
    ...blogTheme,
    lastUpdatedText: '上次更新于',
    footer: {
      message: '不知道写啥的底部',
      copyright:
        '有问题请打开<a>https://chat.openai.com/chat</a>'
    },
    logo: '/logo.png',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ATQQ/sugar-blog/tree/master/packages/theme'
      }
    ]
  }
})
