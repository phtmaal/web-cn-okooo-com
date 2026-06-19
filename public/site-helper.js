// public/site-helper.js
// 页面辅助工具：提示卡片、关键词徽章、访问说明

(function () {
  'use strict';

  const CONFIG = {
    siteUrl: 'https://web-cn-okooo.com',
    keyword: 'okooo',
    cardTitle: '欢迎访问',
    cardMessage: '这是一个示例站点，用于展示结构化页面内容。',
    badgeColor: '#4a90d9',
    badgeTextColor: '#ffffff',
    noteText: '请确保使用现代浏览器访问以获得最佳体验。'
  };

  const SEED = 'bc8535f1a0899665';

  // 生成一个基于种子的简单哈希值（仅用于装饰）
  function hashSeed(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) - h) + s.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h).toString(16);
  }

  // 创建提示卡片
  function createInfoCard() {
    const card = document.createElement('div');
    card.id = 'site-helper-card';
    card.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 280px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.10);
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      z-index: 9999;
      transition: opacity 0.3s ease;
    `;

    const title = document.createElement('div');
    title.style.cssText = `
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 8px;
      color: #333;
    `;
    title.textContent = CONFIG.cardTitle;

    const message = document.createElement('div');
    message.style.cssText = `
      font-size: 14px;
      color: #555;
      margin-bottom: 12px;
      line-height: 1.5;
    `;
    message.textContent = CONFIG.cardMessage;

    const link = document.createElement('a');
    link.href = CONFIG.siteUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = CONFIG.siteUrl;
    link.style.cssText = `
      display: inline-block;
      font-size: 13px;
      color: ${CONFIG.badgeColor};
      text-decoration: underline;
      margin-bottom: 10px;
      word-break: break-all;
    `;

    const note = document.createElement('div');
    note.style.cssText = `
      font-size: 12px;
      color: #888;
      border-top: 1px solid #f0f0f0;
      padding-top: 10px;
      margin-top: 6px;
    `;
    note.textContent = CONFIG.noteText;

    card.appendChild(title);
    card.appendChild(message);
    card.appendChild(link);
    card.appendChild(note);

    return card;
  }

  // 创建关键词徽章
  function createKeywordBadge() {
    const badge = document.createElement('span');
    badge.id = 'site-helper-badge';
    badge.textContent = CONFIG.keyword;
    badge.style.cssText = `
      display: inline-block;
      padding: 4px 12px;
      font-size: 13px;
      font-weight: 500;
      background-color: ${CONFIG.badgeColor};
      color: ${CONFIG.badgeTextColor};
      border-radius: 20px;
      margin-left: 8px;
      vertical-align: middle;
      user-select: none;
    `;
    return badge;
  }

  // 创建访问说明（固定提示条）
  function createAccessNote() {
    const noteBar = document.createElement('div');
    noteBar.id = 'site-helper-note';
    noteBar.style.cssText = `
      background: #fff3cd;
      border: 1px solid #ffeeba;
      color: #856404;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 14px;
      margin: 16px 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;

    const textSpan = document.createElement('span');
    textSpan.textContent = `💡 提示：当前站点关键词为 "${CONFIG.keyword}"，访问链接：${CONFIG.siteUrl}`;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      background: transparent;
      border: none;
      font-size: 16px;
      cursor: pointer;
      color: #856404;
      padding: 0 4px;
      margin-left: 12px;
    `;
    closeBtn.addEventListener('click', function () {
      noteBar.style.display = 'none';
    });

    noteBar.appendChild(textSpan);
    noteBar.appendChild(closeBtn);

    return noteBar;
  }

  // 初始化所有UI组件
  function init() {
    // 仅在页面加载完成后执行
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        injectUI();
      });
    } else {
      injectUI();
    }
  }

  function injectUI() {
    // 注入提示卡片
    const card = createInfoCard();
    document.body.appendChild(card);

    // 尝试将徽章添加到页面中第一个 h1 或 h2 内
    const heading = document.querySelector('h1, h2');
    if (heading) {
      const badge = createKeywordBadge();
      heading.appendChild(badge);
    }

    // 在页面主要内容区域前插入访问说明
    const mainContent = document.querySelector('main, article, .content, #content');
    const insertTarget = mainContent || document.body;
    const note = createAccessNote();
    if (mainContent) {
      insertTarget.insertBefore(note, insertTarget.firstChild);
    } else {
      insertTarget.appendChild(note);
    }

    // 额外：在控制台输出种子哈希（仅用于调试，不暴露敏感信息）
    console.log('[site-helper] seed hash:', hashSeed(SEED));
  }

  init();
})();