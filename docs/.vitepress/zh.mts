import { defineConfig } from "vitepress";

export const zh = defineConfig({
  lang: "zh-CN",
  description: "DataEraserC的公钥基础设施",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
    ],

    sidebar: [
      {
        text: "Root CA",
        items: [
          { text: "DataEraserC Root CAs", link: "/root-cas" },
          { text: "DataEraserC Root ED25519", link: "/root-ca-ed25519" },
          { text: "DataEraserC Root RSA4096", link: "/root-ca-rsa4096" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/DataEraserC/PKI" },
    ],
  },
});
