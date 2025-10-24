import { useEffect } from 'react';
import {
	createdBundledHighlighter,
	createSingletonShorthands,
	type ShorthandsBundle
} from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

class ShikiManager {
	private static instance: ShikiManager | null = null;

	private shikiInstance: {
		codeToHtml: ShorthandsBundle<string, string>['codeToHtml'];
	} | null = null;

	static getInstance(): ShikiManager {
		if (!ShikiManager.instance) {
			ShikiManager.instance = new ShikiManager();
		}
		return ShikiManager.instance;
	}

	public getShiki() {
		if (this.shikiInstance) return this.shikiInstance;

		const highlighterFactory = createdBundledHighlighter({
			langs: {
				js: () => import('shiki/dist/langs/js.mjs'),
				javascript: () => import('shiki/dist/langs/javascript.mjs'),
				ts: () => import('shiki/dist/langs/ts.mjs'),
				typescript: () => import('shiki/dist/langs/typescript.mjs'),
				html: () => import('shiki/dist/langs/html.mjs'),
				css: () => import('shiki/dist/langs/css.mjs'),
				json: () => import('shiki/dist/langs/json.mjs'),
				less: () => import('shiki/dist/langs/less.mjs'),
				jsx: () => import('shiki/dist/langs/jsx.mjs'),
				tsx: () => import('shiki/dist/langs/tsx.mjs'),
				vue: () => import('shiki/dist/langs/vue.mjs'),
				python: () => import('shiki/dist/langs/python.mjs'),
				java: () => import('shiki/dist/langs/java.mjs'),
				xml: () => import('shiki/dist/langs/xml.mjs'),
				markdown: () => import('shiki/dist/langs/markdown.mjs'),
				json5: () => import('shiki/dist/langs/json5.mjs'),
				docker: () => import('shiki/dist/langs/docker.mjs'),
				dockerfile: () => import('shiki/dist/langs/dockerfile.mjs'),
				shell: () => import('shiki/dist/langs/shell.mjs')
			},
			themes: {
				'vitesse-light': () => import('shiki/dist/themes/vitesse-light.mjs'),
				'vitesse-dark': () => import('shiki/dist/themes/vitesse-dark.mjs')
			},
			engine: () => createOnigurumaEngine(import('shiki/wasm'))
		});

		const { codeToHtml } = createSingletonShorthands(highlighterFactory);

		this.shikiInstance = {
			codeToHtml
		};
		return this.shikiInstance;
	}

	public dispose() {
		this.shikiInstance = null;
		ShikiManager.instance = null;
	}
}

export const useShiki = () => {
	let instance: ShikiManager | null = null;

	if (!instance) {
		instance = ShikiManager.getInstance();
	}

	useEffect(() => {
		return () => {
			instance?.dispose();
			instance = null;
		};
	}, []);

	return instance.getShiki();
};
