'use client';

import '@docsearch/css';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const SearchIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="w-4 h-4"
    >
      <circle
        cx="11"
        cy="11"
        r="8"
        stroke="currentColor"
        fill="none"
      ></circle>
      <path
        d="m21 21-4.3-4.3"
        stroke="currentColor"
        fill="none"
      ></path>
    </svg>
  );
};

export default function BaseSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  // 启用键盘快捷键（如 ⌘K）
  useDocSearchKeyboardEvents({ isOpen, onOpen, onClose, searchButtonRef });

  return (
    <>
      <button
        className="px-3 py-[2px] cursor-pointer bg-gray h-9 rounded-[8px] flex items-center"
        ref={searchButtonRef}
        onClick={onOpen}
      >
        <span className="flex-center">
          <SearchIcon />
          <span className="pr-3 pl-2 text-[12px]">搜索文档</span>
        </span>
        <span className="flex flex-center gap-x-1 text-[12px] leading-3 border border-[#e2e2e3] rounded-[4px] py-1 px-[6px]">
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </span>
      </button>
      {isOpen &&
        createPortal(
          <DocSearchModal
            appId="E3I7BGNS49"
            apiKey="3845a7362184eec5fbf7f3e6703dbfbf"
            indexName="sitemap.xml"
            onClose={onClose}
            placeholder="输入关键词"
            initialScrollY={window.scrollY}
            hitComponent={({ hit, children }) => (
              <Link href={hit.url}>{children}</Link>
            )}
          />,
          document.body
        )}
    </>
  );
}
