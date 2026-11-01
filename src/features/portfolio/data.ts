import type {
  FooterContent,
  HeroContent,
  IntroData,
  SectionData,
} from "./types";

const examRegistrationImages = {
  desktop: [
    "/imgs/sp-pc-1.png",
    "/imgs/sp-pc-s1.png",
    "/imgs/sp-pc-s2.png",
    "/imgs/sp-pc-s3.png",
    "/imgs/sp-pc-s4.png",
  ],
  mobile: [
    "/imgs/sp-mb-1.png",
    "/imgs/sp-mb-s1.png",
    "/imgs/sp-mb-s2.png",
    "/imgs/sp-mb-s3.png",
    "/imgs/sp-mb-s4.png",
  ],
};

export const skillGroups = [
  {
    mark: "D",
    title: { zh: "產品設計", en: "Product Design" },
    description: {
      zh: "依使用者情境規劃清晰、一致的介面與操作流程",
      en: "Design clear, consistent interfaces and flows around user needs",
    },
    items: [
      "UI/UX",
      "User Flows",
      "Wireframes",
      "Prototyping",
      "Design Systems",
      "WCAG 2.1 AA",
      "RWD",
      "i18n",
    ],
  },
  {
    mark: "F",
    title: { zh: "前端工程", en: "Frontend" },
    description: {
      zh: "以 Vue 3 與 TypeScript 打造流暢、可維護的互動介面",
      en: "Build smooth, maintainable, and interactive user interfaces with Vue 3 and TypeScript",
    },
    items: [
      "Vue 3",
      "Pinia",
      "JavaScript (ES6+)",
      "TypeScript",
      "GSAP",
      "Motion",
      "jQuery",
    ],
  },
  {
    mark: "S",
    title: { zh: "介面樣式", en: "UI Styling" },
    description: {
      zh: "運用樣式工具製作響應式版面與視覺介面",
      en: "Create responsive layouts and visual interfaces with styling tools",
    },
    items: ["Tailwind CSS", "Bootstrap", "SCSS", "CSS3"],
  },
  {
    mark: "B",
    title: { zh: "後端與資料整合", en: "Backend & Data" },
    description: {
      zh: "串接 API、資料庫與 MVC 架構，協作完成產品功能",
      en: "Integrate APIs, databases, and MVC applications to deliver product features",
    },
    items: ["ASP.NET Core / C#", "RESTful API Integration", "SQL", "MVC"],
  },
];

export const supportingSkills = {
  tools: ["Git", "GitHub", "GitLab", "Visual Studio", "Rider", "VS Code"],
};

export const careerHistory = [
  {
    period: "2024 – 2026",
    title: {
      zh: "UI/UX 設計與前端協作",
      en: "UI/UX Design & Front-end Collaboration",
    },
    organization: {
      zh: "雲方科技",
      en: "Cloud Fun",
    },
  },
  {
    period: "2023 – 2024",
    title: { zh: "網頁設計師", en: "Web Designer" },
    organization: { zh: "駿成科技顧問", en: "Juncheng Technology Consulting" },
  },
];

export const footerContent: FooterContent = {
  copyright: "© 2026 All rights reserved.",
};

const sectionData: SectionData[] = [
  {
    id: "web-dev",
    title: {
      zh: "Web Development",
      en: "Web Development",
    },
    items: [
      {
        id: "dev-1",
        title: {
          zh: "石化產業媒合平台",
          en: "Petrochemical Industry Matching Platform",
        },
        subtitle: {
          zh: "前端重構・無障礙優化",
          en: "Front-end Refactoring · Accessibility",
        },
        year: "2025",
        description: {
          zh: "在既有架構下進行前端重構，拆分耦合 UI 與邏輯、重整互動流程，導入語意化 HTML 與鍵盤操作支援，修復弱點掃描問題，並通過 WCAG 2.1 AA 無障礙標章。",
          en: "Refactored the front end within an existing SSR architecture by decoupling UI from business logic, restructuring interaction flows, and introducing semantic HTML with full keyboard support. Addressed security vulnerabilities identified in scans and achieved WCAG 2.1 AA compliance.",
        },
        caseStudy: {
          role: {
            zh: "介面重構、操作流程改善、無障礙優化",
            en: "Interface refactoring, flow improvements, and accessibility",
          },
          problem: {
            zh: "既有介面中 UI 與邏輯耦合，且需要改善操作流程與鍵盤可及性。",
            en: "The existing interface coupled UI and logic, with interaction flows and keyboard accessibility needing improvement.",
          },
          approach: {
            zh: "拆分 UI 與邏輯、整理操作流程，導入語意化 HTML 與鍵盤操作支援，並處理弱點掃描發現的問題。",
            en: "Separated UI from application logic, refined interaction flows, added semantic HTML and keyboard support, and addressed issues found in security scans.",
          },
          outcome: {
            zh: "完成 WCAG 2.1 AA 無障礙改善並取得 AA 標章。",
            en: "Completed WCAG 2.1 AA accessibility improvements and achieved the AA certification.",
          },
        },
        tags: {
          zh: [
            "ASP.NET Core MVC（SSR）",
            "前端重構",
            "無障礙（WCAG 2.1 AA）",
            "語意化 HTML",
            "鍵盤操作支援",
            "UI/UX 改善",
          ],
          en: [
            "ASP.NET Core MVC (SSR)",
            "Front-end Refactoring",
            "Accessibility (WCAG 2.1 AA)",
            "Semantic HTML",
            "Keyboard Accessibility",
            "UI/UX Improvements",
          ],
        },
        images: ["/imgs/dev-3.webp"],
        links: [
          {
            label: { zh: "查看網站", en: "View Site" },
            url: "https://sdd.nat.gov.tw/sps",
          },
        ],
      },
      {
        id: "dev-2",
        title: {
          zh: "台灣鑄造學會",
          en: "Taiwan Foundry Society",
        },
        subtitle: {
          zh: "前後台整合・購物與會員流程",
          en: "CMS Integration · Shopping & Membership Flows",
        },
        year: "2025",
        description: {
          zh: "在 ASP.NET Core MVC（SSR）架構下進行前端開發並串接後台 CMS。設計並實作購物車、結帳與會員流程，處理跨頁狀態與流程整合，確保不同操作情境下的一致性。同時實作多語系（i18n），對應不同語系內容與介面。",
          en: "Built the front end within an ASP.NET Core MVC (SSR) architecture and integrated it with a CMS. Designed and implemented cart, checkout, and membership workflows, managing cross-page state and ensuring consistent behavior across user scenarios. Implemented internationalization (i18n) to support localized content and interfaces.",
        },
        caseStudy: {
          role: {
            zh: "前端介面開發、CMS 串接、會員與訂單流程",
            en: "Front-end UI, CMS integration, membership and order flows",
          },
          problem: {
            zh: "購物車、結帳與會員操作跨越多個頁面，需要維持狀態與流程的一致性，並支援多語系內容。",
            en: "Cart, checkout, and membership tasks span multiple pages and require consistent state and flow, alongside localized content.",
          },
          approach: {
            zh: "在 ASP.NET Core MVC（SSR）下串接 CMS，規劃並實作購物車、結帳與會員流程，處理跨頁狀態，並建立 i18n 介面。",
            en: "Integrated the CMS within ASP.NET Core MVC (SSR), implemented cart, checkout, and membership flows, handled cross-page state, and added i18n interfaces.",
          },
          outcome: {
            zh: "完成購物車、結帳、會員與多語系介面，並維持不同操作情境下的流程一致性。",
            en: "Delivered cart, checkout, membership, and localized interfaces with consistent behavior across user scenarios.",
          },
        },
        tags: {
          zh: [
            "ASP.NET Core MVC（SSR）",
            "前端工程",
            "CMS 串接",
            "RWD",
            "購物車 / 結帳流程",
            "跨頁狀態管理",
            "多語系（i18n）",
          ],
          en: [
            "ASP.NET Core MVC (SSR)",
            "Front-end Engineering",
            "CMS Integration",
            "Responsive Design",
            "Cart & Checkout Flow",
            "Cross-page State Management",
            "Internationalization (i18n)",
          ],
        },
        images: ["/imgs/dev-2.webp"],
        links: [
          {
            label: { zh: "查看網站", en: "View Site" },
            url: "https://www.foundry.org.tw/",
          },
        ],
      },
      {
        id: "dev-3",
        title: {
          zh: "承鋒鑄造",
          en: "Cheng Feng Casting Factory",
        },
        subtitle: {
          zh: "型錄網站開發・多語系整合",
          en: "Catalog Website Development · Localization",
        },
        year: "2025",
        description: {
          zh: "依據架構規劃進行前端實作，於 ASP.NET Core MVC（SSR）架構下開發前台並串接後台 CMS，建構型錄網站。依據內容層級設計可重用元件，並實作多語系（i18n），確保版型與資料結構一致，提升開發效率與維護性。",
          en: "Implemented the front end within an ASP.NET Core MVC (SSR) architecture based on predefined structural guidelines, integrating with a CMS to deliver a catalog-style website. Developed reusable components aligned with content hierarchy and implemented internationalization (i18n), ensuring consistency between layout and data structure while improving maintainability.",
        },
        caseStudy: {
          role: {
            zh: "型錄網站介面實作、共用元件、多語系",
            en: "Catalog interface, reusable components, and localization",
          },
          problem: {
            zh: "型錄內容需要清楚呈現不同層級，並讓多語系版型與資料結構保持一致。",
            en: "Catalog content needed a clear hierarchy, with consistent layouts and data structures across languages.",
          },
          approach: {
            zh: "依內容層級建立可重用元件，在 ASP.NET Core MVC（SSR）下串接 CMS，並實作 i18n。",
            en: "Created reusable components around the content hierarchy, integrated the CMS in ASP.NET Core MVC (SSR), and implemented i18n.",
          },
          outcome: {
            zh: "完成具一致內容層級、多語系與可維護共用元件的型錄網站。",
            en: "Delivered a catalog website with consistent content hierarchy, localization, and maintainable reusable components.",
          },
        },
        tags: {
          zh: [
            "ASP.NET Core MVC（SSR）",
            "前端開發",
            "元件化設計",
            "多語系（i18n）",
            "CMS 串接",
            "RWD",
          ],
          en: [
            "ASP.NET Core MVC (SSR)",
            "Front-end Engineering",
            "Component-based Architecture",
            "Internationalization (i18n)",
            "CMS Integration",
            "Responsive Design",
          ],
        },
        images: ["/imgs/dev-1.webp"],
        links: [
          {
            label: { zh: "查看網站", en: "View Site" },
            url: "https://www.chengfeng.com.tw/",
          },
        ],
      },
      {
        id: "dev-4",
        title: {
          zh: "臺藝大推廣教育中心",
          en: "NTUA Extension Education Center",
        },
        year: "2026",
        subtitle: {
          zh: "無障礙優化",
          en: "Accessibility Improvements",
        },
        description: {
          zh: "負責該網站的無障礙優化，改善網站的可及性與操作體驗，完成 WCAG 2.1 AA 無障礙改善並取得 AA 標章。",
          en: "Improved accessibility and usability for the National Taiwan University of Arts Extension Education Center website, completing WCAG 2.1 AA accessibility improvements and achieving the AA certification.",
        },
        caseStudy: {
          role: {
            zh: "網站無障礙優化",
            en: "Website accessibility improvements",
          },
          problem: {
            zh: "既有網站需符合 WCAG 2.1 AA 無障礙要求，在維持原有內容與功能的前提下，改善使用者存取資訊與操作介面時的障礙。",
            en: "The existing website needed to meet WCAG 2.1 AA accessibility requirements while preserving its content and functionality and reducing barriers to accessing information and using the interface.",
          },
          approach: {
            zh: "依 WCAG 2.1 AA 要求進行無障礙優化，調整既有介面並修正可及性問題，兼顧網站原有功能與使用體驗，完成取得 AA 標章所需的改善。",
            en: "Improved the existing interface and addressed accessibility issues against WCAG 2.1 AA requirements, preserving website functionality and usability while completing the improvements required for AA certification.",
          },
          outcome: {
            zh: "完成 WCAG 2.1 AA 無障礙改善並取得 AA 標章。",
            en: "Completed WCAG 2.1 AA accessibility improvements and achieved the AA certification.",
          },
        },
        tags: {
          zh: ["無障礙（WCAG 2.1 AA）", "使用體驗優化"],
          en: ["Accessibility (WCAG 2.1 AA)", "Usability Improvements"],
        },
        links: [
          {
            label: { zh: "查看網站", en: "View Site" },
            url: "https://eec.ntua.edu.tw/",
          },
        ],
      },
      {
        id: "dev-5",
        title: {
          zh: "能源與設備管理系統",
          en: "Energy & Equipment Management Systems",
        },
        year: "2023–2024",
        subtitle: {
          zh: "網站介面設計・前端切版",
          en: "Web Interface Design · Front-end Layout Implementation",
        },
        description: {
          zh: "彙整兩個實際工作專案的網站介面設計與前端切版成果，涵蓋設備狀態總覽、歷史資料查詢、妥善率統計及管理列表，將不同資訊層級整理為清楚的卡片、圖表與表格介面。",
          en: "Interface design and front-end layout work from two professional projects, covering equipment status overviews, historical data queries, availability statistics, and management lists. Organized different levels of information into clear card, chart, and table layouts.",
        },
        caseStudy: {
          role: {
            zh: "兩個工作專案的網站介面設計與前端切版",
            en: "Interface design and front-end layout implementation for two professional projects",
          },
          problem: {
            zh: "設備狀態、統計數據與管理資料具有不同的資訊密度，需要在各自的操作情境中建立清楚的層級，方便瀏覽狀態、查詢紀錄與閱讀列表。",
            en: "Equipment status, statistics, and management data have different information densities. Each context required a clear hierarchy for reviewing status, querying records, and reading lists.",
          },
          approach: {
            zh: "依頁面用途規劃設備卡片、狀態色彩、查詢表單、統計圖表與管理表格，完成介面設計與前端切版。四張畫面依序呈現設備總覽、歷史查詢、妥善率統計及管理列表。",
            en: "Designed and implemented layouts for equipment cards, status colors, query forms, statistical charts, and management tables. The four screens show equipment overviews, historical queries, availability statistics, and management lists in sequence.",
          },
        },
        images: [
          "/imgs/dev-4-1.webp",
          "/imgs/dev-4-2.webp",
          "/imgs/dev-4-3.webp",
          "/imgs/dev-4-4.webp",
        ],
        tags: {
          zh: ["介面設計", "前端切版", "管理後台", "資料視覺化"],
          en: [
            "UI Design",
            "Front-end Layout Implementation",
            "Admin Interface",
            "Data Visualization",
          ],
        },
      },
    ],
  },
  {
    id: "side-projects",
    title: {
      zh: "Side Projects",
      en: "Side Projects",
    },
    items: [
      {
        id: "project-1",
        title: {
          zh: "Pull Request 工作區",
          en: "Pull Request Dashboard",
        },
        subtitle: {
          zh: "跨專案 PR 整合・審查流程設計",
          en: "Cross-repository PR Integration · Review Workflow Design",
        },
        year: "2026",
        description: {
          zh: "規劃並開發 GitHub Review Workspace，將跨 repo 的 PR triage 與 review context 整合至單一介面，提升協作效率，並降低 reviewer 在多個 GitHub 頁面之間切換的操作成本。",
          en: "Planned and developed a GitHub Review Workspace that consolidates cross-repository PR triage and review context into a single interface, improving collaboration efficiency and reducing the operational overhead for reviewers switching between multiple GitHub pages.",
        },
        tags: {
          zh: [
            "Next.js 16 (App Router)",
            "React 19",
            "TypeScript",
            "Tailwind",
            "NextAuth",
            "Redux Toolkit",
            "Vitest",
          ],
          en: [
            "Next.js 16 (App Router)",
            "React 19",
            "TypeScript",
            "Tailwind",
            "NextAuth",
            "Redux Toolkit",
            "Vitest",
          ],
        },
        images: ["/imgs/side-project-1.webp"],
        links: [
          {
            label: { zh: "查看 GitHub Repo", en: "View GitHub Repo" },
            url: "https://github.com/runadu/pr-dashboard",
          },
        ],
      },
      {
        id: "project-2",
        title: {
          zh: "全端後台管理系統",
          en: "Full-Stack Admin Dashboard",
        },
        subtitle: {
          zh: "身份驗證・權限與資料整合",
          en: "Authentication · Access Control & Data Integration",
        },
        year: "2026",
        description: {
          zh: "開發全端後台系統，實作會員註冊登入、JWT 驗證、路由權限控管與受保護頁面，串接 Massive（Polygon）股票 API 建立資料列表介面，並以 Docker 建置本機開發環境與資料庫服務。",
          en: "Built a full-stack admin dashboard, implementing user registration/login, JWT authentication, route-based access control, protected pages, and data listing views powered by Massive (Polygon) stock APIs. Used Docker to set up the local development environment and database services.",
        },
        tags: {
          zh: [
            "FastAPI",
            "Vue 3",
            "TypeScript",
            "SQL Server",
            "Docker",
            "Massive (Polygon)",
          ],
          en: [
            "FastAPI",
            "Vue 3",
            "TypeScript",
            "SQL Server",
            "Docker",
            "Massive (Polygon)",
          ],
        },
        images: ["/imgs/side-project-2.webp"],
        links: [
          {
            label: { zh: "查看 GitHub Repo", en: "View GitHub Repo" },
            url: "https://github.com/runadu/full-stack-admin",
          },
          // {
          //   label: { zh: "查看 Demo 影片", en: "View Demo Video" },
          //   url: "https://youtu.be/rHkOYng-cGI",
          // },
        ],
      },
      {
        id: "project-3",
        title: {
          zh: "節奏遊戲 UI 設計",
          en: "Rhythm Game UI Design",
        },
        subtitle: {
          zh: "Game UI 概念設計・視覺規範",
          en: "Game UI Concept · Visual Guidelines",
        },
        year: "2024",
        description: {
          zh: "《Rhythm One 韻律一號》以外星與音樂節奏為主題的自主遊戲介面設計，結合扁平化與輕科技感的視覺風格。規劃標誌、配色、字體、角色與 UI 元件，延伸至主選單、選曲、遊玩、暫停及結算等畫面，建立一致的遊戲視覺體驗。",
          en: "Rhythm One is a self-initiated game UI concept combining alien and musical rhythm themes with a flat, lightly futuristic visual style. Developed the logo, color palette, typography, character, and UI elements, extending them across home, stage selection, gameplay, pause, and results screens for a consistent visual experience.",
        },
        caseStudy: {
          role: {
            zh: "遊戲介面設計、視覺規範、圖示與角色概念設計",
            en: "Game interface design, visual guidelines, icons, and character concepts",
          },
          problem: {
            zh: "將外星、唱片與節奏元素轉化為一致的介面語言，並在選單、遊玩與結算等不同情境中，清楚區分操作入口、狀態資訊與遊戲回饋。",
            en: "Translate alien, vinyl record, and rhythm motifs into a consistent interface language, distinguishing actions, status information, and game feedback across menus, gameplay, and results screens.",
          },
          approach: {
            zh: "以深色背景搭配黃橙色重點，透過網格、波形與幾何元素建立輕科技感。先定義字體、配色與圖示風格，再拆解狀態列、按鈕、關卡卡片與評級等元件，延伸至各個遊戲畫面。",
            en: "Paired dark backgrounds with yellow and orange accents, using grids, waveforms, and geometric elements for a lightly futuristic style. Defined typography, colors, and icon styles, then developed status bars, buttons, stage cards, and ratings for use across game screens.",
          },
          outcome: {
            zh: "完成視覺規範、角色概念、UI 元件與主要遊戲畫面的概念設計，呈現從開始介面到遊玩結算的視覺延伸。",
            en: "Created visual guidelines, character concepts, UI elements, and key game screen designs, demonstrating visual continuity from the start screen through gameplay and results.",
          },
        },
        tags: {
          zh: ["遊戲介面設計", "視覺規範", "圖示設計", "角色概念", "自主作品"],
          en: [
            "Game UI Design",
            "Visual Guidelines",
            "Icon Design",
            "Character Concept",
            "Personal Project",
          ],
        },
        images: [
          "/imgs/game-ui-1.webp",
          "/imgs/game-ui-2.webp",
          "/imgs/game-ui-3.webp",
          "/imgs/game-ui-4.webp",
          "/imgs/game-ui-5.webp",
        ],
      },
    ],
  },
  {
    id: "ui-ux",
    title: {
      zh: "UI/UX Design",
      en: "UI/UX Design",
    },
    items: [
      {
        id: "arch-1",
        title: {
          zh: "元件系統規劃",
          en: "Component System Design",
        },
        subtitle: {
          zh: "操作流程設計・介面規範建立",
          en: "User Flow Design · Interface Guidelines",
        },
        year: "2025",
        description: {
          zh: "依使用情境設計操作流程與視覺介面，建立可重用元件及版面規範，讓使用體驗與開發實作保持一致。",
          en: "Designed user flows and visual interfaces around user scenarios, with reusable components and layout guidelines to align the user experience with implementation.",
        },
        tags: {
          zh: ["介面設計", "使用者體驗", "元件系統", "設計系統", "版面規則"],
          en: [
            "UI Design",
            "User Experience",
            "Component System",
            "Design System",
            "Layout Rules",
          ],
        },
        images: ["/imgs/ui-1-1.webp", "/imgs/ui-1-2.webp", "/imgs/ui-1-3.webp"],
      },
      {
        id: "arch-2",
        title: {
          zh: "資訊架構規劃",
          en: "Information Architecture Design",
        },
        subtitle: {
          zh: "內容層級梳理・響應式介面設計",
          en: "Content Hierarchy · Responsive Interface Design",
        },
        year: "2025",
        description: {
          zh: "整合網站資訊架構、瀏覽動線與介面設計，梳理內容層級及頁面配置，透過響應式版面提供清楚、一致的使用體驗。",
          en: "Designed the website’s information architecture, navigation flows, and interfaces, organizing content hierarchy and page layouts to provide a clear, consistent experience across screen sizes.",
        },
        tags: {
          zh: ["介面設計", "使用者體驗", "資訊架構", "內容結構", "響應式版面"],
          en: [
            "UI Design",
            "User Experience",
            "Information Architecture",
            "Content Structure",
            "Responsive Layout",
          ],
        },
        images: [
          "/imgs/ui-2-pc-1.webp",
          "/imgs/ui-2-pc-2.webp",
          "/imgs/ui-2-pc-3.webp",
          "/imgs/ui-2-mobile-1.webp",
          "/imgs/ui-2-mobile-2.webp",
          "/imgs/ui-2-mobile-3.webp",
        ],
      },
      {
        id: "arch-3",
        title: {
          zh: "一頁式網站設計",
          en: "One-Page Website Design",
        },
        subtitle: {
          zh: "瀏覽動線設計・行動入口規劃",
          en: "Browsing Flow Design · Calls to Action",
        },
        year: "2025",
        description: {
          zh: "依據網站目標與使用情境，規劃一頁式網站的資訊架構與瀏覽動線，安排內容層級、區塊順序及主要行動入口。透過介面與響應式版面設計，讓使用者在不同裝置上都能清楚掌握資訊並完成操作。",
          en: "Planned the information architecture and browsing flow of a one-page website around its goals and user scenarios, defining content hierarchy, section order, and primary calls to action. Designed the interface and responsive layouts to help users understand the content and complete tasks across devices.",
        },
        tags: {
          zh: ["網站介面與體驗設計", "資訊架構"],
          en: ["Web UI/UX", "Information Architecture"],
        },
        images: ["/imgs/ui-3-1.webp"],
      },
      {
        id: "arch-4",
        title: {
          zh: "考試報名網站設計",
          en: "Exam Registration Website Design",
        },
        subtitle: {
          zh: "多步驟報名流程・響應式介面",
          en: "Multi-step Registration · Responsive Interfaces",
        },
        description: {
          zh: "規劃考試資訊首頁與線上報名介面，將個資聲明、考生資料、付款及報名完成拆分為四個步驟。透過進度提示、資料摘要與明確的行動入口，整理報名過程的資訊層級，並設計桌面與手機版面，讓不同裝置保有一致的操作脈絡。",
          en: "Designed an exam information homepage and online registration interfaces, organizing privacy consent, candidate details, payment, and confirmation into four steps. Used progress indicators, data summaries, and clear calls to action to structure the registration experience across desktop and mobile layouts.",
        },
        tags: {
          zh: ["介面設計", "使用者體驗", "報名流程", "表單設計", "響應式版面"],
          en: [
            "UI Design",
            "User Experience",
            "Registration Flow",
            "Form Design",
            "Responsive Layout",
          ],
        },
        note: {
          zh: "圖片 01–05 為桌面版，06–10 為對應手機版，依序展示首頁、個資聲明、考生資料、付款與報名完成畫面。",
          en: "Images 01–05 show desktop layouts; 06–10 show the corresponding mobile layouts. Each set covers the homepage, privacy consent, candidate details, payment, and confirmation.",
        },
        caseStudy: {
          role: {
            zh: "網站介面設計、報名流程規劃、桌面與手機版面設計",
            en: "Website interface design, registration flow planning, and desktop and mobile layouts",
          },
          problem: {
            zh: "網站同時承載考試資訊與線上報名，需要區分資訊瀏覽與報名操作。報名過程包含多位考生資料、費用與付款資訊，也需要在手機較窄的畫面中維持清楚的層級與步驟提示。",
            en: "The website combines exam information with online registration, requiring a clear distinction between browsing and registering. Multiple candidate records, fees, and payment information also needed clear hierarchy and step indicators on narrow mobile screens.",
          },
          approach: {
            zh: "首頁以區塊整理最新消息、考程、常見問題與考場資訊；報名頁以四步驟進度列標示目前位置及已完成步驟。桌面版使用表格呈現考生與費用，手機版將次要資料收進展開區域，並將付款表單與費用摘要改為上下排列。",
            en: "Organized the homepage into news, schedules, FAQs, and exam locations. Added a four-step indicator to distinguish the current and completed registration steps. Used tables for candidate details and fees on desktop, while placing secondary details in expandable areas and stacking payment forms and fee summaries on mobile.",
          },
          outcome: {
            zh: "完成首頁與四個報名步驟的桌面、手機介面設計，共 10 張畫面，呈現同一流程在不同寬度下的資訊重組與視覺一致性。",
            en: "Created ten screen designs covering the homepage and four registration steps across desktop and mobile, demonstrating responsive information layouts and a consistent visual language.",
          },
        },
        images: [
          ...examRegistrationImages.desktop,
          ...examRegistrationImages.mobile,
        ],
      },
    ],
  },
];

export const sections: SectionData[] = ["web-dev", "ui-ux", "side-projects"]
  .map((id) => sectionData.find((section) => section.id === id))
  .filter((section): section is SectionData => section !== undefined);
