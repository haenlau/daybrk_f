---
title: Fuwari 主题自定义记录四
published: 2024-05-17
description:  在 Fuwari 主题中添加内部链接页面
image: "https://726627.xyz/file/h/1767151065276_137680111_p0.webp"
tags: [Fuwari]
category: BLog
draft: false
---

创建一个名为“链接”的内部页面，该页面的内容由一个独立的 Markdown 文件管理，并且在导航栏中可以访问。

步骤
1. 创建 Markdown 内容文件

在 src/content/spec/ 目录下创建 links.md 文件（如果 spec 目录不存在，请先创建）。

```markdown
<!-- src/content/spec/links.md -->
```

title: "我的链接" # (可选) 页面标题，可在 Astro 页面中获取
description: "这里是我的一些常用链接" # (可选) 页面描述
layout: "@/layouts/MarkdownOnlyLayout.astro" # (可选) 指定布局
```
我的链接
技术博客
[Astro 官网](https://astro.build/)
[MDN Web Docs](https://developer.mozilla.org/zh-CN/)
工具网站
[Can I Use](https://caniuse.com/)
[GitHub](https://github.com/)
```
2. 创建 Astro 页面文件

在 src/pages/ 目录下创建 links.astro 文件。

```astro

// src/pages/links.astro
import { getEntry, render } from "astro:content";
import Markdown from "@components/misc/Markdown.astro";
import I18nKey from "../i18n/i18nKey"; // 如果需要国际化
import { i18n } from "../i18n/translation"; // 如果需要国际化
import MainGridLayout from "../layouts/MainGridLayout.astro";

// 获取 spec 集合中的 "links" 条目
const linksPost = await getEntry("spec", "links");

if (!linksPost) {
throw new Error("Links page content (src/content/spec/links.md) not found");
}

// 渲染 Markdown 内容
const { Content } = await render(linksPost);

// 设置页面标题和描述
const pageTitle = linksPost.data.title '我的链接'; // 优先使用 Markdown 文件中的 title
const pageDescription = linksPost.data.description '这里是我的一些常用链接'; // 优先使用 Markdown 文件中的 description

<MainGridLayout title={pageTitle} description={pageDescription}>
<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32">
<div class="card-base z-10 px-9 py-6 relative w-full ">
<Markdown class="mt-2">
<Content />
</Markdown>
</div>
</div>
</MainGridLayout>
```

说明：
```
getEntry("spec", "links")：从 src/content/spec/ 目录下查找名为 links.md 的文件。
render(linksPost)：将 links.md 中的 Markdown 内容转换为 HTML。
<Content />：渲染转换后的 HTML 内容。
<Markdown>：确保 Markdown 语法被正确解析和应用样式。
MainGridLayout：使用与 about.astro 等页面相同的布局，保持风格一致。
```
3. 修改导航栏配置

打开你的导航栏配置文件（通常是 src/config/navBarConfig.ts 或类似路径），在 links 数组中添加一个新的对象。

```typescript
// 假设你的配置文件是 navBarConfig.ts
export const navBarConfig: NavBarConfig = {
links: [
LinkPreset.Home,
LinkPreset.Archive,
LinkPreset.About,
// ... 其他现有链接
{
name: "链接", // 导航栏上显示的文字
url: "/links/", // 指向内部的 links.astro 页面，注意尾部斜杠
// external: false // 默认为 false，表示内部链接，可以省略
},
// ... 其他现有链接
],
};
```

说明：
```
name: 显示在导航栏上的文本。
url: 指向你创建的 Astro 页面的 URL。由于页面文件是 src/pages/links.astro，其对应的 URL 是 /links/（或 /links，取决于 astro.config.mjs 中的 trailingSlash 配置）。如果 trailingSlash 设置为 always，则 URL 必须以 / 结尾。
external: 设置为 false 或省略，表示这是一个内部链接。
```

完成以上三个步骤后：

1. 创建了一个独立的 Markdown 文件 src/content/spec/links.md 来管理链接内容。
2. 创建了一个 Astro 页面 src/pages/links.astro 来渲染这个 Markdown 文件。
3. 更新了导航栏配置 navBarConfig.ts，使其包含指向该页面的链接。

现在，网站导航栏上应该会出现一个“链接”按钮，点击它就会跳转到你创建的链接页面，页面内容完全由 links.md 文件控制。