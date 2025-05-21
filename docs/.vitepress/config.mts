import { defineConfig } from "vitepress";
import { shared } from "./shared.mts";
import { en } from "./en.mts";
import { zh } from "./zh.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...shared,
  title: "PKI of DataEraserC",

  rewrites: {
    "en/:rest*": ":rest*",
  },
  locales: {
    root: {
      label: "English",
      ...en,
    },
    zh: {
      label: "简体中文",
      ...zh,
    },
  },
});
