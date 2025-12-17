// src/plugins/remark-reading-time.mjs
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

/**
 * remark 插件：计算文章字数与阅读时间，但 **不写入 frontmatter**，
 * 避免在页面上显示“字 | 分钟”等残留内容。
 */
export function remarkReadingTime() {
	return (tree, { data }) => {
		const textOnPage = toString(tree);
		const readingTime = getReadingTime(textOnPage);
		
		// 🔴 已注释：禁止写入 frontmatter
		// data.astro.frontmatter.minutes = Math.max(1, Math.round(readingTime.minutes));
		// data.astro.frontmatter.words = readingTime.words;
		
		// 插件保持加载状态，但无副作用
	};
}