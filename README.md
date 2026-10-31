# Personal Portfolio

個人作品集網站，用來展示相關作品。

線上預覽：[runadu.github.io](https://runadu.github.io/)

## Tech Stack

- `Vite`
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `Motion`
- `Lucide React`

## Features

- 中英文切換
- 深淺色模式
- 響應式版面
- 作品分類導覽與展示
- 圖片 lightbox 預覽
- 顯示設定：文字縮放、背景開關、游標效果開關

## Getting Started

```sh
npm install
npm run dev
```

開啟 http://localhost:3000。

## 檢查與建置

```sh
npm run lint          # TypeScript 型別檢查
npm run format:check  # 格式檢查
npm run build         # 建置至 docs/
npm run preview       # 預覽建置結果
```

## 專案結構

- `src/App.tsx`：頁面組合與全站設定。
- `src/features/portfolio/`：作品資料、區塊與作品內頁。
- `src/config/navigation.ts`：分類導覽設定。
- `src/index.css`：主題與共用樣式。
- `public/imgs/`：專案圖片。

`docs/` 為自動產生的建置輸出，請勿直接修改。
