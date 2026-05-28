(function () {
  const STORAGE_KEY = "homeLanguage";
  const THEME_STORAGE_KEY = "homeTheme";
  const API_BASE = (window.API_BASE || document.documentElement.getAttribute("data-api-base") || "").trim();
  const API_ROOT = API_BASE ? API_BASE.replace(/\/$/, "") : "";

  function buildApiUrl(path) {
    if (!path) {
      return API_ROOT || "";
    }
    if (!API_ROOT) {
      return path.startsWith("/") ? path : `/${path}`;
    }
    return path.startsWith("/") ? `${API_ROOT}${path}` : `${API_ROOT}/${path}`;
  }
  const translations = {
    en: {
      pageTitle: "Xin Suhan | Computer Science Undergraduate",
      metaDescription: "Xin Suhan - Computer Science undergraduate focused on AI, mathematical modeling, web development, and project practice.",
      navAbout: "About",
      navSkills: "Skills",
      navAcademic: "Academic",
      navProjects: "Projects",
      navContact: "Contact",
      navGitHub: "GitHub",
      heroEyebrow: "Computer Science Undergraduate",
      heroTitle: "Building with code, mathematics, and AI.",
      heroIntro:
        "I am a Computer Science undergraduate interested in artificial intelligence, mathematical modeling, web development, and practical software projects. This website collects my academic highlights, project practice, and browser-based experiments.",
      buttonViewProjects: "View Projects",
      buttonAcademicHighlights: "Academic Highlights",
      buttonViewGitHub: "GitHub",
      buttonEmailMe: "Email Me",
      profileDescription:
        "A computer science learner exploring AI, practical software projects, and clean web experiences.",
      profileStatCs: "Programming foundations",
      profileStatAi: "Models and applications",
      profileStatWeb: "HTML, CSS, JavaScript",
      profileStatPractice: "Projects and coursework",
      aboutTitle: "About Me",
      aboutBody:
        "I am currently building my foundation in computer science through coursework, competitions, and hands-on projects. My interests include AI, mathematical modeling, data analysis, web development, and open-source learning.",
      skillsTitle: "Tech Stack",
      skillsDescription: "Tools and topics I am building confidence with.",
      skillPython: "Python",
      skillCpp: "C++",
      skillHtml: "HTML",
      skillCss: "CSS",
      skillJavaScript: "JavaScript",
      skillLatex: "LaTeX",
      skillGit: "Git / GitHub",
      skillModeling: "Mathematical Modeling",
      skillMl: "Machine Learning",
      skillData: "Data Analysis",
      skillWeb: "Web Development",
      academicTitle: "Academic Highlights",
      academicDescription:
        "Selected academic achievements and coursework outcomes from modeling, mathematics, and applied research practice.",
      mcmTag: "MCM / ICM",
      mcmTitle: "2026 MCM/ICM — Honorable Mention",
      mcmDescription:
        "Honorable Mention in the 2026 Mathematical Contest in Modeling (MCM/ICM), recognizing outstanding modeling work.",
      mcmKeywords: "Mathematical Modeling · Fairness Analysis · Vote Reconstruction",
      buttonViewCertificate: "View Certificate",
      buttonReadPaper: "Read Paper",
      courseworkTag: "Coursework",
      calculusTitle: "Calculus I — Perfect Score",
      calculusSubtitle: "Only full score among all computer science freshmen",
      calculusDescription: "Achieved 100/100 in Calculus I during freshman year at Sichuan University.",
      gamesTitle: "Projects & Games",
      gamesDescription:
        "Academic projects, web experiments, and browser games collected under this personal site.",
      projectTagModeling: "Mathematical Modeling",
      projectTagFairness: "Fairness Analysis",
      projectTagVote: "Vote Reconstruction",
      projectTagReplay: "Counterfactual Replay",
      mcmProjectTitle: "Vote Reconstruction & Fairness Analysis",
      mcmProjectDescription:
        "Reconstructing latent fan votes, comparing aggregation rules, and evaluating fairness in a hybrid voting system.",
      dachuangTagInnovation: "Student Innovation",
      dachuangTagMedical: "Medical Image Analysis",
      dachuangTagGranular: "Granular-Ball Learning",
      dachuangTagAnomaly: "Anomaly Detection",
      dachuangTagVision: "Computer Vision",
      dachuangTagHealthcare: "AI for Healthcare",
      dachuangTitle: "Medical Image Anomaly Detection with Granular-Ball Representation Learning",
      dachuangType: "Student Innovation Training Program",
      dachuangRole: "Role: Core Team Member",
      dachuangDescription:
        "A student innovation project exploring medical image anomaly detection based on granular-ball representation learning. The project aims to improve efficiency, robustness, and interpretability in the detection–segmentation–diagnosis pipeline by using adaptive granular-ball representation, graph construction, and neural network models.",
      buttonViewRedacted: "View Proposal",
      playableTag: "Playable",
      game2048Title: "2048 Game",
      game2048Description:
        "The original 2048 browser game is preserved here with keyboard controls, scoring, best score, and restart support.",
      path2048: "Path: /2048",
      buttonPlay2048: "Play 2048",
      snakeTitle: "Snake",
      snakeDescription:
        "A classic grid movement game integrated from patorjk/JavaScript-Snake, with upstream credits and MIT license notices preserved.",
      pathSnake: "Path: /snake",
      buttonPlaySnake: "Play Snake",
      minesweeperTitle: "Minesweeper",
      minesweeperDescription:
        "A classic minesweeper puzzle integrated from sergiss/minesweeper, with upstream credits and MIT license notices preserved.",
      pathMinesweeper: "Path: /minesweeper",
      buttonPlayMinesweeper: "Play Minesweeper",
      hextrisTitle: "Hextris",
      hextrisDescription:
        "A fast browser puzzle game integrated from Hextris/hextris, with upstream credits and GPL license notices preserved.",
      pathHextris: "Path: /hextris",
      buttonPlayHextris: "Play Hextris",
      darkRoomTitle: "A Dark Room",
      darkRoomDescription:
        "A minimalist text adventure integrated from doublespeakgames/adarkroom, with upstream credits and MPL license notices preserved.",
      pathDarkRoom: "Path: /dark-room",
      buttonPlayDarkRoom: "Play A Dark Room",
      aiTitle: "AI Q&A Assistant",
      aiDescription: "Ask a quick question about this site, projects, and learning notes.",
      aiWelcome: "Hi, I can answer questions about this website and its projects.",
      aiPlaceholder: "Ask something about this site...",
      aiSend: "Send",
      aiAttachFile: "Attach .txt / .md",
      aiFileReady: "Attached: {name}",
      aiFileTooLarge: "File is too large. Please upload a .txt or .md file under 1MB.",
      aiFileUnsupported: "Only .txt and .md files are supported.",
      aiFileReadError: "Could not read this file. Please try another .txt or .md file.",
      aiAttachImage: "OCR Image",
      aiOcrReading: "Running OCR...",
      aiOcrDone: "OCR completed: {name}",
      aiOcrPreview: "Recognized text preview: {preview}",
      aiOcrFailed: "OCR failed: {detail}",
      aiImageTooLarge: "Image is too large. Please upload a PNG, JPG, JPEG, or WEBP image under 5MB.",
      aiImageUnsupported: "Only PNG, JPG, JPEG, and WEBP images are supported for OCR.",
      aiThinking: "Thinking...",
      aiThinkingReading: "Reading your question...",
      aiThinkingContext: "Organizing context...",
      aiThinkingCalling: "Calling the AI...",
      aiThinkingGenerating: "Generating the answer, please wait...",
      aiThinkingUploads: "Organizing uploaded content...",
      aiThinkingElapsed: "Waiting {seconds}s",
      aiError: "The AI service is temporarily unavailable. Please try again later.",          contactTitle: "Contact",
      contactDescription: "Reach me through email, GitHub, or this personal website.",
      contactNote: "Open to learning projects, collaboration, and technical discussions.",
      contactEmailLabel: "Email",
      contactGitHubLabel: "GitHub",
      contactWebsiteLabel: "Website",
      footerText: "© 2026 Xin Suhan. Built with plain HTML and CSS."
    },
    zh: {
      pageTitle: "辛苏涵 | 计算机科学本科生",
      metaDescription: "辛苏涵 - 计算机科学本科生，关注 AI、数学建模、Web 开发与项目实践。",
      navAbout: "关于我",
      navSkills: "技能",
      navAcademic: "学术",
      navProjects: "项目",
      navContact: "联系",
      navGitHub: "GitHub",
      heroEyebrow: "计算机科学本科生",
      heroTitle: "用代码、数学和 AI 构建自己的作品。",
      heroIntro:
        "我是计算机科学本科生，关注人工智能、数学建模、Web 开发和软件项目实践。这个网站用于展示我的学术成果、项目实践和一些浏览器实验。",
      buttonViewProjects: "查看项目",
      buttonAcademicHighlights: "学术亮点",
      buttonViewGitHub: "GitHub",
      buttonEmailMe: "联系我",
      profileDescription: "计算机科学学习者，探索 AI、实用软件项目与简洁的 Web 体验。",
      profileStatCs: "编程基础",
      profileStatAi: "模型与应用",
      profileStatWeb: "HTML、CSS、JavaScript",
      profileStatPractice: "项目与课程",
      aboutTitle: "关于我",
      aboutBody:
        "我正在通过课程学习、竞赛实践和项目开发夯实计算机科学基础。我的兴趣方向包括人工智能、数学建模、数据分析、Web 开发和开源学习。",
      skillsTitle: "技术栈",
      skillsDescription: "正在持续夯实的工具与方向。",
      skillPython: "Python",
      skillCpp: "C++",
      skillHtml: "HTML",
      skillCss: "CSS",
      skillJavaScript: "JavaScript",
      skillLatex: "LaTeX",
      skillGit: "Git / GitHub",
      skillModeling: "数学建模",
      skillMl: "机器学习",
      skillData: "数据分析",
      skillWeb: "Web 开发",
      academicTitle: "学术亮点",
      academicDescription: "来自建模、数学与应用研究实践的学术成果与课程表现。",
      mcmTag: "MCM / ICM",
      mcmTitle: "2026 MCM/ICM — 优秀奖",
      mcmDescription:
        "在 2026 年美国大学生数学建模竞赛中获得优秀奖，表彰建模成果。",
      mcmKeywords: "数学建模 · 公平性分析 · 投票重构",
      buttonViewCertificate: "查看证书",
      buttonReadPaper: "阅读论文",
      courseworkTag: "课程",
      calculusTitle: "微积分 I — 满分",
      calculusSubtitle: "全计算机新生中唯一满分",
      calculusDescription: "在四川大学大一学年取得微积分 I 100/100。",
      gamesTitle: "项目与游戏",
      gamesDescription: "个人站点收录的学术项目、Web 实验与浏览器小游戏。",
      projectTagModeling: "数学建模",
      projectTagFairness: "公平性分析",
      projectTagVote: "投票重构",
      projectTagReplay: "反事实重放",
      mcmProjectTitle: "投票重构与公平性分析",
      mcmProjectDescription:
        "重构潜在粉丝投票、比较不同聚合规则，并评估混合投票体系中的公平性。",
      dachuangTagInnovation: "大创项目",
      dachuangTagMedical: "医学图像分析",
      dachuangTagGranular: "粒球表示学习",
      dachuangTagAnomaly: "异常检测",
      dachuangTagVision: "计算机视觉",
      dachuangTagHealthcare: "医疗 AI",
      dachuangTitle: "基于粒球表示学习的医学图像异常检测技术",
      dachuangType: "大学生创新训练计划项目",
      dachuangRole: "角色：核心成员",
      dachuangDescription:
        "一个基于粒球表示学习的医学图像异常检测大创项目，目标是通过自适应粒球表示、图结构构建和神经网络模型，提升医学图像“检测—分割—诊断”流程的效率、鲁棒性和可解释性。",
      buttonViewRedacted: "查看脱敏申报书",
      playableTag: "可游玩",
      game2048Title: "2048 游戏",
      game2048Description: "保留原版 2048 浏览器游戏，支持键盘操控、计分、最高分与重开。",
      path2048: "路径：/2048",
      buttonPlay2048: "开始 2048",
      snakeTitle: "贪吃蛇",
      snakeDescription:
        "集成自 patorjk/JavaScript-Snake 的经典网格移动游戏，保留上游署名与 MIT 许可声明。",
      pathSnake: "路径：/snake",
      buttonPlaySnake: "开始贪吃蛇",
      minesweeperTitle: "扫雷",
      minesweeperDescription:
        "集成自 sergiss/minesweeper 的经典扫雷游戏，保留上游署名与 MIT 许可声明。",
      pathMinesweeper: "路径：/minesweeper",
      buttonPlayMinesweeper: "开始扫雷",
      hextrisTitle: "Hextris",
      hextrisDescription:
        "集成自 Hextris/hextris 的高速益智游戏，保留上游署名与 GPL 许可声明。",
      pathHextris: "路径：/hextris",
      buttonPlayHextris: "开始 Hextris",
      darkRoomTitle: "A Dark Room",
      darkRoomDescription:
        "集成自 doublespeakgames/adarkroom 的极简文字冒险游戏，保留上游署名与 MPL 许可声明。",
      pathDarkRoom: "路径：/dark-room",
      buttonPlayDarkRoom: "开始 A Dark Room",
      aiTitle: "AI 问答助手",
      aiDescription: "可以快速提问这个网站、项目和学习记录相关的问题。",
      aiWelcome: "你好，我可以回答关于这个网站和项目的问题。",
      aiPlaceholder: "输入你想问的问题...",
      aiSend: "发送",
      aiAttachFile: "上传 .txt / .md",
      aiFileReady: "已上传：{name}",
      aiFileTooLarge: "文件太大，请上传 1MB 以内的 .txt 或 .md 文件。",
      aiFileUnsupported: "目前只支持 .txt 和 .md 文件。",
      aiFileReadError: "无法读取该文件，请换一个 .txt 或 .md 文件。",
      aiAttachImage: "图片 OCR",
      aiOcrReading: "正在 OCR...",
      aiOcrDone: "OCR 完成：{name}",
      aiOcrPreview: "识别预览：{preview}",
      aiOcrFailed: "OCR 失败：{detail}",
      aiImageTooLarge: "图片太大，请上传 5MB 以内的 PNG、JPG、JPEG 或 WEBP 图片。",
      aiImageUnsupported: "图片 OCR 仅支持 PNG、JPG、JPEG 和 WEBP。",
      aiThinking: "正在思考...",
      aiThinkingReading: "正在读取问题...",
      aiThinkingContext: "正在整理上下文...",
      aiThinkingCalling: "正在调用 AI...",
      aiThinkingGenerating: "正在生成回答，请稍等...",
      aiThinkingUploads: "正在整理上传内容...",
      aiThinkingElapsed: "已等待 {seconds} 秒",
      aiError: "AI 服务暂时不可用，请稍后再试。",          contactTitle: "联系",
      contactDescription: "可通过邮件、GitHub 或个人网站联系我。",
      contactNote: "欢迎交流学习项目、合作想法和技术问题。",
      contactEmailLabel: "邮箱",
      contactGitHubLabel: "GitHub",
      contactWebsiteLabel: "网站",
      footerText: "© 2026 辛苏涵。使用原生 HTML 与 CSS 构建。"
    }
  };

  const buttons = Array.from(document.querySelectorAll("[data-lang-option]"));
  const themeButton = document.getElementById("theme-toggle");
  const projectSearch = {
    root: document.querySelector(".project-search"),
    input: document.getElementById("project-search-input"),
    submitButton: document.getElementById("project-search-submit"),
    clearButton: document.getElementById("project-search-clear"),
    count: document.getElementById("project-search-count"),
    empty: document.getElementById("project-search-empty"),
    cards: Array.from(document.querySelectorAll("#projects .project-card")),
    items: [],
    matches: []
  };
  const giscusThread = document.getElementById("giscus-thread");
  let isGiscusLoaded = false;
  const systemThemeQuery = typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : { matches: false };

  function getStoredTheme() {
    try {
      const value = localStorage.getItem(THEME_STORAGE_KEY);
      return value === "dark" || value === "light" ? value : "";
    } catch (error) {
      return "";
    }
  }

  function getPreferredTheme() {
    return getStoredTheme() || (systemThemeQuery.matches ? "dark" : "light");
  }

  function setTheme(theme, persist) {
    const normalized = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", normalized);

    if (persist) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, normalized);
      } catch (error) {
        console.warn("Could not save theme preference:", error);
      }
    }

    if (themeButton) {
      const nextTheme = normalized === "dark" ? "light" : "dark";
      const label = normalized === "dark" ? "Switch to light theme" : "Switch to dark theme";
      themeButton.setAttribute("aria-label", label);
      themeButton.setAttribute("title", label);
      themeButton.setAttribute("aria-pressed", normalized === "dark" ? "true" : "false");
      themeButton.dataset.themeTarget = nextTheme;
    }

    syncGiscusTheme(normalized);
  }

  function initializeTheme() {
    setTheme(getPreferredTheme(), false);

    if (themeButton) {
      themeButton.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        setTheme(currentTheme === "dark" ? "light" : "dark", true);
      });
    }

    const syncSystemTheme = () => {
      if (!getStoredTheme()) {
        setTheme(systemThemeQuery.matches ? "dark" : "light", false);
      }
    };

    if (typeof systemThemeQuery.addEventListener === "function") {
      systemThemeQuery.addEventListener("change", syncSystemTheme);
    } else if (typeof systemThemeQuery.addListener === "function") {
      systemThemeQuery.addListener(syncSystemTheme);
    }
  }

  function normalizeSearchText(value) {
    return String(value || "")
      .normalize("NFKC")
      .trim()
      .toLocaleLowerCase();
  }

  function getElementText(element, selector) {
    return Array.from(element.querySelectorAll(selector))
      .map((node) => node.textContent || "")
      .join(" ");
  }

  function buildProjectSearchIndex() {
    projectSearch.items = projectSearch.cards.map((card) => {
      const title = getElementText(card, "h3");
      const description = getElementText(card, "p");
      const tags = getElementText(card, ".tag");
      const haystack = normalizeSearchText([title, description, tags].join(" "));
      return { card, title, description, tags, haystack };
    });
  }

  function filterProjects() {
    if (!projectSearch.input) {
      return;
    }

    const query = normalizeSearchText(projectSearch.input.value);
    const matches = [];
    projectSearch.items.forEach((item) => {
      const isVisible = !query || item.haystack.includes(query);
      item.card.hidden = !isVisible;
      if (isVisible) {
        matches.push(item);
      }
    });

    projectSearch.matches = query ? matches : [];

    if (projectSearch.root) {
      projectSearch.root.classList.toggle("has-query", Boolean(query));
    }
    if (projectSearch.count) {
      projectSearch.count.textContent = query
        ? `${matches.length} / ${projectSearch.items.length} projects`
        : `${projectSearch.items.length} projects`;
    }
    if (projectSearch.empty) {
      projectSearch.empty.hidden = !query || matches.length > 0;
    }
  }

  function handleProjectSearchSubmit() {
    if (!projectSearch.input) {
      return;
    }

    const query = projectSearch.input.value.trim();
    if (!query) {
      return;
    }

    filterProjects();
    if (!projectSearch.matches.length) {
      return;
    }

    const firstMatch = projectSearch.matches[0].card;
    if (projectSearch.matches.length === 1) {
      const primaryLink = firstMatch.querySelector(".button.primary, a");
      if (primaryLink && primaryLink.href) {
        window.location.href = primaryLink.href;
        return;
      }
    }

    firstMatch.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearProjectSearch() {
    if (!projectSearch.input) {
      return;
    }
    projectSearch.input.value = "";
    filterProjects();
    projectSearch.input.focus();
  }

  function initializeProjectSearch() {
    if (!projectSearch.input || !projectSearch.cards.length) {
      return;
    }

    buildProjectSearchIndex();
    projectSearch.input.addEventListener("input", filterProjects);
    projectSearch.input.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && projectSearch.input.value) {
        event.preventDefault();
        clearProjectSearch();
        return;
      }
      if (event.key === "Enter" && projectSearch.input.value) {
        event.preventDefault();
        handleProjectSearchSubmit();
      }
    });

    if (projectSearch.submitButton) {
      projectSearch.submitButton.addEventListener("click", handleProjectSearchSubmit);
    }

    if (projectSearch.clearButton) {
      projectSearch.clearButton.addEventListener("click", clearProjectSearch);
    }

    filterProjects();
  }

  function getGiscusTheme(theme) {
    return theme === "dark" ? "dark" : "light";
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function syncGiscusTheme(theme) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) {
      return;
    }

    iframe.contentWindow.postMessage({
      giscus: {
        setConfig: {
          theme: getGiscusTheme(theme)
        }
      }
    }, "https://giscus.app");
  }

  function loadGiscus() {
    if (!giscusThread || isGiscusLoaded) {
      return;
    }

    isGiscusLoaded = true;
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", giscusThread.dataset.repo || "");
    script.setAttribute("data-repo-id", giscusThread.dataset.repoId || "");
    script.setAttribute("data-category", giscusThread.dataset.category || "");
    script.setAttribute("data-category-id", giscusThread.dataset.categoryId || "");
    script.setAttribute("data-mapping", giscusThread.dataset.mapping || "pathname");
    script.setAttribute("data-strict", giscusThread.dataset.strict || "0");
    script.setAttribute("data-reactions-enabled", giscusThread.dataset.reactionsEnabled || "1");
    script.setAttribute("data-emit-metadata", giscusThread.dataset.emitMetadata || "0");
    script.setAttribute("data-input-position", giscusThread.dataset.inputPosition || "bottom");
    script.setAttribute("data-theme", getGiscusTheme(currentTheme()));
    script.setAttribute("data-lang", giscusThread.dataset.lang || "zh-CN");
    script.setAttribute("data-loading", "lazy");
    giscusThread.appendChild(script);
  }

  function initializeGiscus() {
    if (!giscusThread) {
      return;
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadGiscus();
          observer.disconnect();
        }
      }, { rootMargin: "240px 0px" });
      observer.observe(giscusThread);
      return;
    }

    loadGiscus();
  }

  function normalizeLang(value) {
    return value === "zh" ? "zh" : "en";
  }

  function currentLang() {
    return document.documentElement.lang === "zh-CN" ? "zh" : "en";
  }

  function t(key) {
    const dictionary = translations[currentLang()] || translations.en;
    return dictionary[key] || translations.en[key] || "";
  }
  function applyTranslations(lang) {
    const dictionary = translations[lang] || translations.en;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const text = dictionary[key];
      if (!text) {
        return;
      }
      if (element.tagName === "META") {
        element.setAttribute("content", text);
      } else {
        element.textContent = text;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      const text = dictionary[key];
      if (text) {
        element.setAttribute("placeholder", text);
      }
    });
    buttons.forEach((button) => {
      const isActive = button.getAttribute("data-lang-option") === lang;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
    buildProjectSearchIndex();
    filterProjects();
  }

  function setLanguage(lang, persist) {
    const normalized = normalizeLang(lang);
    applyTranslations(normalized);
    if (persist) {
      localStorage.setItem(STORAGE_KEY, normalized);
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  const browserLang = (navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
  const initialLang = stored ? normalizeLang(stored) : browserLang;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.getAttribute("data-lang-option"), true);
    });
  });

  initializeTheme();
  initializeProjectSearch();
  initializeGiscus();

  const chat = document.getElementById("ai-chat");
  const form = document.getElementById("ai-form");
  const input = document.getElementById("ai-input");
  const sendButton = document.getElementById("ai-send");
  const fileInput = document.getElementById("ai-file");
  const imageInput = document.getElementById("ai-image");
  const fileStatus = document.getElementById("ai-file-status");
  const conversationMessages = [];
  const MAX_HISTORY_MESSAGES = 10;
  const MAX_HISTORY_MESSAGE_CHARS = 1200;
  const MAX_FILE_SIZE_BYTES = 1024 * 1024;
  const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
  const MAX_FILE_CONTEXT_CHARS = 4000;
  const ALLOWED_HISTORY_ROLES = new Set(["user", "assistant"]);
  let fileContext = null;
  let thinkingTimerId = null;
  let thinkingStartTime = 0;
  let thinkingMessage = null;

  function trimConversationHistory() {
    if (conversationMessages.length > MAX_HISTORY_MESSAGES) {
      conversationMessages.splice(0, conversationMessages.length - MAX_HISTORY_MESSAGES);
    }
  }

  function sanitizeHistory(history) {
    if (!Array.isArray(history)) {
      return [];
    }

    const sanitized = history
      .map((item) => {
        if (!item || typeof item !== "object") {
          return null;
        }

        const role = item.role;
        if (!ALLOWED_HISTORY_ROLES.has(role)) {
          return null;
        }

        const content = typeof item.content === "string" ? item.content.trim() : "";
        if (!content) {
          return null;
        }

        const limited = content.length > MAX_HISTORY_MESSAGE_CHARS
          ? content.slice(0, MAX_HISTORY_MESSAGE_CHARS)
          : content;

        return { role, content: limited };
      })
      .filter(Boolean);

    if (sanitized.length > MAX_HISTORY_MESSAGES) {
      return sanitized.slice(-MAX_HISTORY_MESSAGES);
    }

    return sanitized;
  }

  function sanitizeFileContext(context) {
    if (!context || typeof context !== "object" || Array.isArray(context)) {
      return null;
    }

    const sourceType = context.sourceType === "ocr" ? "ocr" : "text";
    const filename = typeof context.filename === "string" ? context.filename.trim() : "";
    const content = typeof context.content === "string"
      ? context.content.trim().slice(0, MAX_FILE_CONTEXT_CHARS)
      : "";

    if (!filename || !content) {
      return null;
    }

    return { sourceType, filename, content };
  }

  function setFileStatus(text, isError) {
    if (!fileStatus) {
      return;
    }
    fileStatus.textContent = text || "";
    fileStatus.style.color = isError ? "var(--error-text)" : "";
  }

  function isSupportedTextFile(file) {
    return /\.(txt|md)$/i.test(file.name);
  }

  function isSupportedImageFile(file) {
    return /\.(png|jpe?g|webp)$/i.test(file.name) && /^image\/(png|jpeg|webp)$/.test(file.type);
  }

  function loadImage(dataUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", reject);
      image.src = dataUrl;
    });
  }

  async function preprocessImageForOcr(dataUrl) {
    const image = await loadImage(dataUrl);
    const longestSide = Math.max(image.naturalWidth, image.naturalHeight);
    const scale = longestSide > 1600 ? 1600 / longestSide : 1;
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Could not compress image"));
        }
      }, "image/jpeg", 0.85);
    });

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(String(reader.result || "")));
      reader.addEventListener("error", reject);
      reader.readAsDataURL(blob);
    });
  }

  function cleanOcrText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function hasReadableOcrText(text) {
    if (text.length < 5) {
      return false;
    }
    return /[\p{L}\p{N}]/u.test(text);
  }

  function ocrErrorMessage(detail) {
    return t("aiOcrFailed").replace("{detail}", detail || "Unknown error");
  }

  function renderMessageContent(text) {
    return String(text || "");
  }

  function applyMathRender(target) {
    if (!target || typeof window.renderMathInElement !== "function") {
      return;
    }
    try {
      window.renderMathInElement(target, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    } catch (error) {
      console.warn("KaTeX render failed:", error);
    }
  }

  function setMessageContent(message, text, shouldRender) {
    const safeText = renderMessageContent(text);
    message.textContent = safeText;
    if (shouldRender) {
      applyMathRender(message);
    }
  }

  function addMessage(text, type, shouldRender) {
    const message = document.createElement("p");
    message.className = `ai-message ${type || ""}`.trim();
    message.textContent = renderMessageContent(text);
    chat.appendChild(message);
    if (shouldRender) {
      applyMathRender(message);
    }
    chat.scrollTop = chat.scrollHeight;
    return message;
  }

  function getThinkingStage(elapsedSeconds) {
    if (fileContext && fileContext.content) {
      return t("aiThinkingUploads");
    }
    if (elapsedSeconds < 1) {
      return t("aiThinkingReading");
    }
    if (elapsedSeconds < 3) {
      return t("aiThinkingContext");
    }
    if (elapsedSeconds < 6) {
      return t("aiThinkingCalling");
    }
    return t("aiThinkingGenerating");
  }

  function updateThinkingStatus() {
    if (!thinkingMessage) {
      return;
    }
    const elapsedSeconds = (Date.now() - thinkingStartTime) / 1000;
    const stage = getThinkingStage(elapsedSeconds);
    const elapsedText = t("aiThinkingElapsed").replace("{seconds}", elapsedSeconds.toFixed(1));
    thinkingMessage.textContent = `${stage}\n${elapsedText}`;
  }

  function startThinkingStatus() {
    stopThinkingStatus();
    thinkingStartTime = Date.now();
    thinkingMessage = addMessage("", "thinking");
    updateThinkingStatus();
    thinkingTimerId = window.setInterval(updateThinkingStatus, 100);
    return thinkingMessage;
  }

  function stopThinkingStatus() {
    if (thinkingTimerId) {
      window.clearInterval(thinkingTimerId);
      thinkingTimerId = null;
    }
    thinkingStartTime = 0;
    thinkingMessage = null;
  }

  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const file = fileInput.files && fileInput.files[0];
      fileContext = null;
      setFileStatus("");

      if (!file) {
        return;
      }

      if (!isSupportedTextFile(file)) {
        fileInput.value = "";
        setFileStatus(t("aiFileUnsupported"), true);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        fileInput.value = "";
        setFileStatus(t("aiFileTooLarge"), true);
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const content = String(reader.result || "").slice(0, MAX_FILE_CONTEXT_CHARS);
        fileContext = {
          sourceType: "text",
          filename: file.name,
          content
        };
        setFileStatus(t("aiFileReady").replace("{name}", file.name), false);
      });
      reader.addEventListener("error", () => {
        fileContext = null;
        fileInput.value = "";
        setFileStatus(t("aiFileReadError"), true);
      });
      reader.readAsText(file);
    });
  }

  if (imageInput) {
    imageInput.addEventListener("change", () => {
      const file = imageInput.files && imageInput.files[0];
      fileContext = null;
      setFileStatus("");

      if (!file) {
        return;
      }

      if (!isSupportedImageFile(file)) {
        imageInput.value = "";
        setFileStatus(t("aiImageUnsupported"), true);
        return;
      }

      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        imageInput.value = "";
        setFileStatus(t("aiImageTooLarge"), true);
        return;
      }

      setFileStatus(t("aiOcrReading"), false);
      const reader = new FileReader();
      reader.addEventListener("load", async () => {
        try {
          const originalDataUrl = String(reader.result || "");
          const processedDataUrl = await preprocessImageForOcr(originalDataUrl);
          const response = await fetch(buildApiUrl("/api/vision-ocr"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ image: processedDataUrl })
          });

          const data = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(data.detail || data.error || "OCR request failed");
          }

          const cleaned = cleanOcrText(data.text);
          if (!hasReadableOcrText(cleaned)) {
            throw new Error("OCR did not recognize readable text.");
          }

          const limited = cleaned.slice(0, MAX_FILE_CONTEXT_CHARS);
          console.log("OCR preview:", limited);
          fileContext = {
            sourceType: "ocr",
            filename: file.name,
            content: limited
          };
          setFileStatus(`${t("aiOcrDone").replace("{name}", file.name)}\n${t("aiOcrPreview").replace("{preview}", limited.slice(0, 200))}`, false);
        } catch (error) {
          fileContext = null;
          imageInput.value = "";
          setFileStatus(ocrErrorMessage(error.message), true);
        }
      });
      reader.addEventListener("error", () => {
        fileContext = null;
        imageInput.value = "";
        setFileStatus(ocrErrorMessage("Could not read image"), true);
      });
      reader.readAsDataURL(file);
    });
  }

  if (form && chat && input && sendButton) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = input.value.trim();
      if (!message) {
        return;
      }

      addMessage(message, "user", false);
      input.value = "";
      input.disabled = true;
      sendButton.disabled = true;
      const thinking = startThinkingStatus();
      const history = sanitizeHistory(conversationMessages);
      const sanitizedFileContext = sanitizeFileContext(fileContext);

      try {
        const response = await fetch(buildApiUrl("/api/chat"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message, history, fileContext: sanitizedFileContext })
        });

        if (!response.ok) {
          throw new Error("Chat request failed");
        }

        const data = await response.json();
        if (!data.reply) {
          throw new Error("Empty chat response");
        }

        stopThinkingStatus();
        setMessageContent(thinking, data.reply, true);
        conversationMessages.push(
          { role: "user", content: message },
          { role: "assistant", content: data.reply }
        );
        trimConversationHistory();
      } catch (error) {
        stopThinkingStatus();
        setMessageContent(thinking, t("aiError"), false);
        thinking.classList.add("error");
      } finally {
        input.disabled = false;
        sendButton.disabled = false;
        input.focus();
      }
    });
  }
  setLanguage(initialLang, false);
})();
