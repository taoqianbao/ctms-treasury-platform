
# 银河司库管理系统 (Galaxy Treasury System)

## 项目简介
本项目是专为大型乳品制造企业（如乳企、伊利）设计的企业级司库管理系统前端原型。系统基于 React + Tailwind CSS 构建，集成了 Google Gemini AI 模型，实现了从资金可视、融资管理到风险风控的 13 大核心业务模块。

## 技术栈
- **核心框架**: React 19, TypeScript
- **样式库**: Tailwind CSS
- **图表库**: Recharts
- **图标库**: Lucide React
- **AI 引擎**: Google Generative AI SDK (Gemini 2.5)

## 目录结构概览

```
/
├── index.html              # 入口 HTML
├── index.tsx               # 入口 JS
├── App.tsx                 # 主应用组件 (路由、全局状态、Mock数据源)
├── types.ts                # 全局 TypeScript 类型定义
├── services/
│   └── geminiService.ts    # AI 服务层 (Prompt管理、API调用)
├── components/             # 业务组件库
│   ├── Sidebar.tsx         # 侧边导航栏
│   ├── Dashboard.tsx       # 首页/驾驶舱
│   ├── TreasuryChat.tsx    # AI 智能助手悬浮窗
│   └── [业务模块组件]       # (详见 CODE_STRUCTURE.md)
└── docs/                   # 项目文档
    ├── CODE_STRUCTURE.md   # 代码结构与功能映射
    ├── DATA_MODEL.md       # 数据模型说明
    └── AI_INTEGRATION.md   # AI 集成说明
```

## 快速开始
1. 确保已配置 `API_KEY` (Google Gemini API)。
2. 系统使用 ES Modules 直接在浏览器运行 (通过 Scrimba/Vite 等环境)。
3. 所有业务数据目前为 Mock 数据，定义在 `App.tsx` 中。
