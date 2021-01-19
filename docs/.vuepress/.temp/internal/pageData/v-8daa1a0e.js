export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "Home",
  "frontmatter": {
    "home": true,
    "title": "Home",
    "heroImage": "/hero.png",
    "actions": [
      {
        "text": "Get Started",
        "link": "/guide/getting-started.html",
        "type": "primary"
      },
      {
        "text": "Introduction",
        "link": "/guide/",
        "type": "secondary"
      }
    ],
    "features": [
      {
        "title": "Simplicity First",
        "details": "Minimal setup with markdown-centered project structure helps you focus on writing."
      },
      {
        "title": "Vue-Powered",
        "details": "Enjoy the dev experience of Vue, use Vue components in markdown, and develop custom themes with Vue."
      },
      {
        "title": "Performant",
        "details": "VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded."
      }
    ],
    "footer": "MIT Licensed | Copyright © 2018-present Evan You"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 3,
      "title": "As Easy as 1, 2, 3",
      "slug": "as-easy-as-1-2-3",
      "children": []
    }
  ],
  "filePathRelative": "README.md",
  "git": {
    "updatedTime": null,
    "contributors": []
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  __VUE_HMR_RUNTIME__.updatePageData(data)
}
