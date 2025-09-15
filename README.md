# スネークゲーム (TypeScript + React + Storybook)

React 18とTypeScript、Atomic Designパターンで構築されたスネークゲームアプリケーションです。

## デモプレイ
https://yunbow.github.io/react-game-snake/demo/

## 主要機能

### ゲーム機能
- 蛇の移動制御（キーボード・タッチ対応）
- 食べ物を食べて成長
- 壁・自分の体との衝突判定
- スコア・ハイスコア管理
- 一時停止/再開機能

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - 型安全性
- **Storybook 7** - コンポーネント開発・ドキュメント
- **CSS Modules** - スタイリング
- **Vite** - ビルドツール

## ゲーム仕様

- **キャンバスサイズ**: 400x400px
- **グリッドサイズ**: 20px
- **初期速度**: 7FPS
- **最大速度**: 15FPS
- **速度上昇**: 5点ごとに+1FPS
- **ハイスコア保存**: localStorage

## プロジェクト構造

```
src/
├── components/
│   ├── atoms/          # 基本コンポーネント
│   ├── molecules/      # 機能単位コンポーネント
│   └── organisms/      # 画面領域コンポーネント
├── hooks/              # カスタムフック
├── stories/            # Storybook用ストーリー
├── types/              # TypeScript型定義
├── utils/              # ユーティリティ関数
├── Config.ts           # 設定値
├── App.tsx             # メインアプリ
└── main.tsx            # エントリーポイント
```

## Atomic Design構成

### Atoms（基本コンポーネント）
- `Button` - 操作ボタン
- `Text` - テキスト表示
- `Canvas` - ゲーム描画領域

### Molecules（機能単位）
- `ScoreDisplay` - スコア表示
- `GameHeader` - ゲームヘッダー（タイトル・スコア）
- `GameControls` - ゲーム制御ボタン
- `GameInstructions` - 操作説明
- `GameOverScreen` - ゲームオーバー画面

### Organisms（画面領域）
- `SnakeGame` - ゲーム全体

## カスタムフック

- `useSnakeGame` - ゲーム状態管理
- `useKeyboardControls` - キーボード入力制御
- `useTouchControls` - タッチ入力制御
- `useGameRenderer` - ゲーム描画

## スクリプト

```bash
# セットアップ
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# Storybook起動
npm run storybook

# Storybook ビルド
npm run build-storybook
```

## ライセンス

MIT License