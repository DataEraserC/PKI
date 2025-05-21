import { createRequire } from "module";
import { generateSitemap as sitemap } from "sitemap-ts";
import { PageData, defineConfig } from "vitepress";

const require = createRequire(import.meta.url);

export const shared = defineConfig({
  // Whether to get the last updated timestamp for each page using Git.
  lastUpdated: true,
  // remove trailing `.html`
  // https://vitepress.dev/guide/routing#generating-clean-url
  cleanUrls: true,
  metaChunk: true,
  base : "/PKI",

  // SEO Improvement - sitemap.xml & robots.txt
  buildEnd: async ({ outDir }) => {
    sitemap({
      hostname: "https://localhost:5137/",
      outDir: outDir,
      generateRobotsTxt: true,
    });
  },

  // SEO Improvement - JSON-LD
  transformPageData(pageData) {
    return {
      frontmatter: {
        ...pageData.frontmatter,
        head: [
          ["script", { type: "application/ld+json" }, getJSONLD(pageData)],
        ],
      },
    };
  },

  // markdown options
  markdown: {
    lineNumbers: true,

    config: (md) => {
      // add support for footnote
      md.use(require("markdown-it-footnote"));
      md.use(require("@searking/markdown-it-cjk-breaks"));
    },
  },

  head: [
    ["link", { rel: "icon", href: "/favicon-16x16.png", sizes: "16x16" }],
    ["link", { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32" }],
    // Google Search and Android Chrome
    ["link", { rel: "icon", href: "/favicon-96x96.png", sizes: "96x96" }],
    [
      "link",
      { rel: "icon", href: "/web-app-manifest-192x192.png", sizes: "192x192" },
    ],
    [
      "link",
      { rel: "icon", href: "/web-app-manifest-512x512.png", sizes: "512x512" },
    ],
    // For Apple iPhone/iPad
    [
      "link",
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],

    // site.manifest
    ["link", { rel: "manifest", href: "/site.webmanifest" }],

    ["meta", { name: "theme-color", content: "#5f67ee" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:site_name", content: "PKI of DataEraserC" }],
    [
      "meta",
      {
        name: "og:image",
        content:
          "https://localhost:5137/PKI.webp",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content:
          "https://localhost:5137/PKI.webp",
      },
    ],

    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-N90909Y4XL",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-N90909Y4XL');`,
    ],
  ],

  themeConfig: {
    footer: {
      message:
        'Licensed under <a href="http://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank">CC BY-SA 4.0</a>',
      copyright:
        'Copyright © 2025-present <a href="https://github.com/DataEraserC" target="_blank">DataEraserC</a>',
    },

    search: {
      provider: "local",
      // for debugging
      // options: {
      //   /**
      //    * @param {string} src
      //    * @param {import('vitepress').MarkdownEnv} env
      //    * @param {import('markdown-it')} md
      //    */
      //   _render(src, env, md) {
      //     console.log("start...")
      //     console.log("src", src)
      //     let out = md.render(src, env)
      //     console.log("success...")
      //     return out
      //   },
      // },

      // provider: 'algolia',
      // options: {
      //   appId: '747LJ10EI7',
      //   apiKey: '658db5f2bf056f83458cacf5dd58ec80',
      //   indexName: 'PKI'
      // }
    },

    editLink: {
      pattern:
        "https://github.com/DataEraserC/PKI/edit/main/docs/:path",
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/DataEraserC/PKI",
      },
    ],
  },
});

function getJSONLD(pageData: PageData) {
  if (pageData.relativePath === "index.md") {
    return `{
  "@context":"http://schema.org",
  "@type":"WebSite",
  "url":"https:\/\/localhost:5137\/",
  "inLanguage":"en",
  "description":"PKI of DataEraserC",
  "name":"${pageData.title}"
}`;
  } else if (pageData.relativePath === "zh/index.md") {
    return `{
  "@context":"http://schema.org",
  "@type":"WebSite",
  "url":"https:\/\/localhost:5137\/zh\/",
  "inLanguage":"zh-CN",
  "description":"DataEraserC的公钥基础设施",
  "name":"${pageData.title}"
}`;
  } else {
    let lang = pageData.relativePath.startsWith("zh/") ? "zh-CN" : "en";
    let url = `https:\/\/localhost:5137\/${pageData.relativePath
      .replace(/\.md$/, "")
      .replace(/\/index\$/, "/")}`;
    return `{
  "@context":"http://schema.org",
  "@type":"TechArticle",
  "headline":"${pageData.title} | PKI of DataEraserC",
  "inLanguage":"${lang}",
  "mainEntityOfPage":{
     "@type":"WebPage",
     "@id":"${url}"
  },
  "keywords":"PKI, CA",
  "url":"${url}"
}`;
  }
}
