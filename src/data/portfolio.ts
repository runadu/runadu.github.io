import type {
  FooterContent,
  HeroContent,
  IntroData,
  NavItem,
  SectionData,
} from "../types";


export const navItems: NavItem[] = [
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#web-dev",
    label: "Web",
    subLabel: "Frontend builds & product work",
  },
  {
    href: "#ux-arch",
    label: "UX Architecture",
    subLabel: "UX systems & design thinking",
  },
];

export const intro: IntroData = {
  description: {
    zh: "專注於打造穩定且易維護的前端體驗。",
    en: "Focused on building reliable and maintainable frontend experiences.",
  },
};

export const heroContent: HeroContent = {
  title: {
    zh: "打造穩定且易維護的前端體驗",
    en: "Building reliable and maintainable frontend experiences",
  },
  description: {
    zh: "專注於網站開發，將設計轉化為可重用的元件與頁面，並在開發過程中持續優化效能與使用體驗。",
    en: "Focused on web development, translating designs into reusable components and pages while continuously improving performance and user experience.",
  },
  cta: {
    zh: "查看專案",
    en: "View Projects",
  },
  sectionLabel: {
    zh: "About",
    en: "About",
  },
  skills: [
    "JavaScript (ES6+)",
    "TypeScript",
    "Vue 3",
    "HTML5 & CSS3",
    "SCSS",
    "RESTful API Integration",
    "Accessibility (a11y)",
  ],
  backendSkills: [
    "C# (ASP.NET MVC)",
  ],
};

export const footerContent: FooterContent = {
  copyright: "© 2026 All rights reserved.",
};

export const sections: SectionData[] = [
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
        year: "2025",
        description: {
          zh: "在既有架構下進行前端重構，拆分耦合 UI 與邏輯、重整互動流程，導入語意化 HTML 與鍵盤操作支援，修復弱點掃描問題，並通過 WCAG 2.1 AA 無障礙標章。",
          en: "Refactored the front end within an existing SSR architecture by decoupling UI from business logic, restructuring interaction flows, and introducing semantic HTML with full keyboard support. Addressed security vulnerabilities identified in scans and achieved WCAG 2.1 AA compliance.",
        },
        tags: {
          zh: [
            "ASP.NET MVC（SSR）",
            "前端重構",
            "無障礙（WCAG 2.1 AA）",
            "語意化 HTML",
            "鍵盤操作支援",
            "UI/UX 改善"
          ],
          en: [
            "ASP.NET MVC (SSR)",
            "Front-end Refactoring",
            "Accessibility (WCAG 2.1 AA)",
            "Semantic HTML",
            "Keyboard Accessibility",
            "UI/UX Improvements"
          ],
        },
        images: ["/imgs/dev-3.png"],
        links: [
          {
            label: { zh: "查看網站", en: "View Site" },
            url: "https://sps.isafe.org.tw/",
          },
        ],
      },
      {
        id: "dev-2",
        title: {
          zh: "台灣鑄造學會",
          en: "Taiwan Foundry Society",
        },
        year: "2025",
        description: {
          zh: "在 ASP.NET MVC（SSR）架構下進行前端開發並串接後台 CMS。設計並實作購物車、結帳與會員流程，處理跨頁狀態與流程整合，確保不同操作情境下的一致性。同時實作多語系（i18n），對應不同語系內容與介面。",
          en: "Built the front end within an ASP.NET MVC (SSR) architecture and integrated it with a CMS. Designed and implemented cart, checkout, and membership workflows, managing cross-page state and ensuring consistent behavior across user scenarios. Implemented internationalization (i18n) to support localized content and interfaces.",
        },
        tags: {
          zh: [
            "ASP.NET MVC（SSR）",
            "前端工程",
            "CMS 串接",
            "RWD",
            "購物車 / 結帳流程",
            "跨頁狀態管理",
            "多語系（i18n）"
          ],
          en: [
            "ASP.NET MVC (SSR)",
            "Front-end Engineering",
            "CMS Integration",
            "Responsive Design",
            "Cart & Checkout Flow",
            "Cross-page State Management",
            "Internationalization (i18n)"
          ]
        },
        images: ["/imgs/dev-2.png"],
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
          en: "Cheng Feng Casting Factory"
        },
        year: "2025",
        description: {
          zh: "依據架構規劃進行前端實作，於 ASP.NET MVC（SSR）架構下開發前台並串接後台 CMS，建構型錄網站。依據內容層級設計可重用元件，並實作多語系（i18n），確保版型與資料結構一致，提升開發效率與維護性。",
          en: "Implemented the front end within an ASP.NET MVC (SSR) architecture based on predefined structural guidelines, integrating with a CMS to deliver a catalog-style website. Developed reusable components aligned with content hierarchy and implemented internationalization (i18n), ensuring consistency between layout and data structure while improving maintainability.",
        },
        tags: {
          zh: [
            "ASP.NET MVC（SSR）",
            "前端開發",
            "元件化設計",
            "多語系（i18n）",
            "CMS 串接",
            "RWD",
          ],
          en: [
            "ASP.NET MVC (SSR)",
            "Front-end Engineering",
            "Component-based Architecture",
            "Internationalization (i18n)",
            "CMS Integration",
            "Responsive Design",
          ]
        },
        images: ["/imgs/dev-1.png"],
        links: [
          {
            label: { zh: "查看網站", en: "View Site" },
            url: "https://www.chengfeng.com.tw/"
          }
        ]
      },
    ],
  },
  {
    id: "ux-arch",
    title: {
      zh: "UX Architecture",
      en: "UX Architecture",
    },
    items: [
      {
        id: "arch-1",
        title: {
          zh: "元件系統規劃",
          en: "Component System Design",
        },
        year: "2025",
        description: {
          zh: "建立前端元件系統，定義可重用元件與 layout 規則，提升介面一致性並降低重複開發成本。",
          en: "Established a front-end component system by defining reusable components and layout rules, improving UI consistency and reducing duplication in development.",
        },
        tags: {
          zh: [
            "元件系統",
            "UI 架構",
            "Design System",
            "Layout 規則"
          ],
          en: [
            "Component System",
            "UI Architecture",
            "Design System",
            "Layout Rules"
          ],
        },
        images: ["/imgs/ui-1-1.png", "/imgs/ui-1-2.png", "/imgs/ui-1-3.png"],
      },
      {
        id: "arch-2",
        title: {
          zh: "資訊架構規劃",
          en: "Information Architecture Design"
        },
        year: "2025",
        description: {
          zh: "規劃網站資訊架構與內容層級，定義頁面結構與內容組成，建立可擴展的版型基礎，以支援長期維護。",
          en: "Defined the website’s information architecture and content hierarchy, structuring pages and content composition. Built a scalable layout foundation to support long-term maintenance and extensibility.",
        },
        tags: {
          zh: [
            "資訊架構（IA）",
            "內容結構",
            "頁面層級",
            "元件系統",
            "RWD"
          ],
          en: [
            "Information Architecture (IA)",
            "Content Structure",
            "Page Hierarchy",
            "Component System",
            "Responsive Layout"
          ]
        },
        images: [
          "/imgs/ui-2-pc-1.png",
          "/imgs/ui-2-pc-2.png",
          "/imgs/ui-2-pc-3.png",
          "/imgs/ui-2-mobile-1.png",
          "/imgs/ui-2-mobile-2.png",
          "/imgs/ui-2-mobile-3.png"
        ]
      }
    ],
  }
];