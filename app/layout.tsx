'use client';
import BaseHeader from '@/components/base-header';
import '../styles/globals.css';
import { createContext, useState } from 'react';

export const ThemeContext = createContext({
	theme: 'light',
	setTheme: (theme: 'light' | 'dark') => {}
});

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	// 在 Provider 的父组件中管理状态
	const [currentValue, setCurrentValue] = useState('light');

	return (
		<html lang="zh-CN">
			<body>
				<ThemeContext.Provider
					value={{ theme: currentValue, setTheme: setCurrentValue }}
				>
					<BaseHeader />
					<main className="px-7 pb-10 flex justify-center">{children}</main>
				</ThemeContext.Provider>
			</body>
		</html>
	);
}
