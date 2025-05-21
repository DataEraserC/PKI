import { defineConfig } from "vitepress";

export const en = defineConfig({
  lang: "en-US",
  description: "Public Key Infrastructure of DataEraserC",

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
      {
        text: "Subordinate CA",
        items: [
          { text: "DataEraserC Subordinate CAs", link: "/subordinate-cas" },
          { text: "DataEraserC Subordinate ED25519", link: "/subordinate-ca-ed25519" },
          { text: "DataEraserC Subordinate RSA4096", link: "/subordinate-ca-rsa4096" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/DataEraserC/PKI" },
    ],
  },
});
