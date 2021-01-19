export const siteData = {
  "base": "/",
  "lang": "en-US",
  "title": "",
  "description": "",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/logo.png"
      }
    ]
  ],
  "locales": {
    "/": {
      "lang": "en-US",
      "title": "VuePress",
      "description": "Vue-powered Static Site Generator"
    },
    "/zh/": {
      "lang": "zh-CN",
      "title": "VuePress",
      "description": "Vue 驱动的静态网站生成器"
    }
  },
  "themeConfig": {
    "logo": "/hero.png",
    "repo": "vuepress/vuepress-next",
    "docsDir": "docs",
    "locales": {
      "/": {
        "navbar": [
          {
            "text": "Guide",
            "link": "/guide/"
          },
          {
            "text": "Reference",
            "children": [
              {
                "text": "VuePress",
                "children": [
                  {
                    "text": "CLI",
                    "link": "/reference/cli.html"
                  },
                  "/reference/config.md",
                  "/reference/frontmatter.md",
                  "/reference/components.md",
                  "/reference/plugin-api.md",
                  "/reference/theme-api.md"
                ]
              },
              {
                "text": "Bundlers",
                "children": [
                  "/reference/bundler/webpack.md",
                  "/reference/bundler/vite.md"
                ]
              },
              {
                "text": "Default Theme",
                "children": [
                  "/reference/default-theme/config.md",
                  "/reference/default-theme/frontmatter.md",
                  "/reference/default-theme/components.md",
                  "/reference/default-theme/markdown.md"
                ]
              },
              {
                "text": "Official Plugins",
                "link": "/reference/plugin/",
                "children": []
              }
            ]
          },
          {
            "text": "Learn More",
            "children": [
              {
                "text": "Advanced",
                "children": [
                  "/guide/advanced/markdown.md",
                  "/guide/advanced/theme.md",
                  "/guide/advanced/plugin.md"
                ]
              },
              {
                "text": "Resources",
                "children": [
                  "/contributing.md",
                  {
                    "text": "Changelog",
                    "link": "https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md"
                  },
                  {
                    "text": "Awesome VuePress",
                    "link": "https://github.com/vuepress/awesome-vuepress"
                  },
                  {
                    "text": "v1 docs",
                    "link": "https://v1.vuepress.vuejs.org"
                  },
                  {
                    "text": "v0 docs",
                    "link": "https://v0.vuepress.vuejs.org"
                  }
                ]
              }
            ]
          }
        ],
        "sidebar": {
          "/guide/": [
            {
              "isGroup": true,
              "text": "Guide",
              "children": [
                "/guide/README.md",
                "/guide/getting-started.md",
                "/guide/configuration.md",
                "/guide/page.md",
                "/guide/markdown.md",
                "/guide/assets.md",
                "/guide/i18n.md",
                "/guide/deployment.md",
                "/guide/theme.md",
                "/guide/plugin.md",
                "/guide/bundler.md"
              ]
            }
          ],
          "/guide/advanced/": [
            {
              "isGroup": true,
              "text": "Advanced",
              "children": [
                "/guide/advanced/markdown.md",
                "/guide/advanced/theme.md",
                "/guide/advanced/plugin.md"
              ]
            }
          ],
          "/reference/": [
            {
              "isGroup": true,
              "text": "VuePress Reference",
              "children": [
                "/reference/cli.md",
                "/reference/config.md",
                "/reference/frontmatter.md",
                "/reference/components.md",
                "/reference/plugin-api.md",
                "/reference/theme-api.md"
              ]
            }
          ],
          "/reference/bundler/": [
            {
              "isGroup": true,
              "text": "Bundlers Reference",
              "children": [
                "/reference/bundler/webpack.md",
                "/reference/bundler/vite.md"
              ]
            }
          ],
          "/reference/default-theme/": [
            {
              "isGroup": true,
              "text": "Default Theme Reference",
              "children": [
                "/reference/default-theme/config.md",
                "/reference/default-theme/frontmatter.md",
                "/reference/default-theme/components.md",
                "/reference/default-theme/markdown.md"
              ]
            }
          ],
          "/reference/plugin/": [
            {
              "isGroup": true,
              "text": "Official Plugins Reference",
              "children": [
                "/reference/plugin/active-header-links.md",
                "/reference/plugin/back-to-top.md",
                "/reference/plugin/container.md",
                "/reference/plugin/debug.md",
                "/reference/plugin/docsearch.md",
                "/reference/plugin/git.md",
                "/reference/plugin/google-analytics.md",
                "/reference/plugin/medium-zoom.md",
                "/reference/plugin/nprogress.md",
                "/reference/plugin/palette-stylus.md",
                "/reference/plugin/pwa.md",
                "/reference/plugin/pwa-popup.md"
              ]
            }
          ]
        },
        "editLinkText": "Edit this page on GitHub",
        "selectLanguageName": "English",
        "danger": "WARNING"
      },
      "/zh/": {
        "navbar": [
          {
            "text": "指南",
            "link": "/zh/guide/"
          },
          {
            "text": "参考",
            "children": [
              {
                "text": "VuePress",
                "children": [
                  "/zh/reference/cli.md",
                  "/zh/reference/config.md",
                  "/zh/reference/frontmatter.md",
                  "/zh/reference/components.md",
                  "/zh/reference/plugin-api.md",
                  "/zh/reference/theme-api.md"
                ]
              },
              {
                "text": "打包工具",
                "children": [
                  "/zh/reference/bundler/webpack.md",
                  "/zh/reference/bundler/vite.md"
                ]
              },
              {
                "text": "默认主题",
                "children": [
                  "/zh/reference/default-theme/config.md",
                  "/zh/reference/default-theme/frontmatter.md",
                  "/zh/reference/default-theme/components.md",
                  "/zh/reference/default-theme/markdown.md"
                ]
              },
              {
                "text": "官方插件",
                "link": "/zh/reference/plugin/",
                "children": []
              }
            ]
          },
          {
            "text": "了解更多",
            "children": [
              {
                "text": "深入",
                "children": [
                  "/zh/guide/advanced/markdown.md",
                  "/zh/guide/advanced/theme.md",
                  "/zh/guide/advanced/plugin.md"
                ]
              },
              {
                "text": "其他资源",
                "children": [
                  "/zh/contributing.md",
                  {
                    "text": "更新日志",
                    "link": "https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md"
                  },
                  {
                    "text": "Awesome VuePress",
                    "link": "https://github.com/vuepress/awesome-vuepress"
                  },
                  {
                    "text": "v1 文档",
                    "link": "https://v1.vuepress.vuejs.org/zh/"
                  },
                  {
                    "text": "v0 文档",
                    "link": "https://v0.vuepress.vuejs.org/zh/"
                  }
                ]
              }
            ]
          }
        ],
        "selectLanguageName": "简体中文",
        "selectLanguageText": "选择语言",
        "selectLanguageAriaLabel": "选择语言",
        "sidebar": {
          "/zh/guide/": [
            {
              "isGroup": true,
              "text": "指南",
              "children": [
                "/zh/guide/README.md",
                "/zh/guide/getting-started.md",
                "/zh/guide/configuration.md",
                "/zh/guide/page.md",
                "/zh/guide/markdown.md",
                "/zh/guide/assets.md",
                "/zh/guide/i18n.md",
                "/zh/guide/deployment.md",
                "/zh/guide/theme.md",
                "/zh/guide/plugin.md",
                "/zh/guide/bundler.md"
              ]
            }
          ],
          "/zh/guide/advanced/": [
            {
              "isGroup": true,
              "text": "深入",
              "children": [
                "/zh/guide/advanced/markdown.md",
                "/zh/guide/advanced/theme.md",
                "/zh/guide/advanced/plugin.md"
              ]
            }
          ],
          "/zh/reference/": [
            {
              "isGroup": true,
              "text": "VuePress 参考",
              "children": [
                "/zh/reference/cli.md",
                "/zh/reference/config.md",
                "/zh/reference/frontmatter.md",
                "/zh/reference/components.md",
                "/zh/reference/plugin-api.md",
                "/zh/reference/theme-api.md"
              ]
            }
          ],
          "/zh/reference/bundler/": [
            {
              "isGroup": true,
              "text": "打包工具参考",
              "children": [
                "/zh/reference/bundler/webpack.md",
                "/zh/reference/bundler/vite.md"
              ]
            }
          ],
          "/zh/reference/default-theme/": [
            {
              "isGroup": true,
              "text": "默认主题参考",
              "children": [
                "/zh/reference/default-theme/config.md",
                "/zh/reference/default-theme/frontmatter.md",
                "/zh/reference/default-theme/components.md",
                "/zh/reference/default-theme/markdown.md"
              ]
            }
          ],
          "/zh/reference/plugin/": [
            {
              "isGroup": true,
              "text": "官方插件参考",
              "children": [
                "/zh/reference/plugin/active-header-links.md",
                "/zh/reference/plugin/back-to-top.md",
                "/zh/reference/plugin/container.md",
                "/zh/reference/plugin/debug.md",
                "/zh/reference/plugin/docsearch.md",
                "/zh/reference/plugin/git.md",
                "/zh/reference/plugin/google-analytics.md",
                "/zh/reference/plugin/medium-zoom.md",
                "/zh/reference/plugin/nprogress.md",
                "/zh/reference/plugin/palette-stylus.md",
                "/zh/reference/plugin/pwa.md",
                "/zh/reference/plugin/pwa-popup.md"
              ]
            }
          ]
        },
        "editLinkText": "在 GitHub 上编辑此页",
        "lastUpdatedText": "上次更新",
        "contributorsText": "贡献者",
        "tip": "提示",
        "warning": "注意",
        "danger": "警告",
        "notFound": [
          "这里什么都没有",
          "我们怎么到这来了？",
          "这是一个 404 页面",
          "看起来我们进入了错误的链接"
        ],
        "backToHome": "返回首页",
        "openInNewWindow": "在新窗口打开"
      }
    },
    "navbar": [],
    "selectLanguageText": "Languages",
    "selectLanguageAriaLabel": "Select language",
    "sidebar": "auto",
    "editLink": true,
    "editLinkText": "Edit this page",
    "lastUpdated": true,
    "lastUpdatedText": "Last Updated",
    "contributors": true,
    "contributorsText": "Contributors",
    "notFound": [
      "There's nothing here.",
      "How did we get here?",
      "That's a Four-Oh-Four.",
      "Looks like we've got some broken links."
    ],
    "backToHome": "Take me home",
    "openInNewWindow": "open in new window"
  }
}
