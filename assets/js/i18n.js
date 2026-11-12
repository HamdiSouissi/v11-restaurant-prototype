/** BRACE — i18n module */
(function () {
  'use strict';
  const LANGS = ['it', 'en'];
  let currentLang = (window.I18N && window.I18N.default) || 'it';

  function setLang(lang) {
    if (!LANGS.includes(lang)) return;
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    sessionStorage.setItem('brace_lang', lang);
    const dict = (window.I18N && window.I18N[lang]) || {};

    // data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    // data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });

    // data-i18n-tagline (hero subtitle)
    document.querySelectorAll('[data-i18n-tagline]').forEach(el => {
      const l = el.getAttribute('data-i18n-tagline');
      el.hidden = (l !== lang);
    });

    // data-i18n-cottura-it / en
    document.querySelectorAll('.brace__step[data-cottura]').forEach(el => {
      const key = el.getAttribute('data-cottura');
      const label = el.getAttribute(lang === 'it' ? 'data-i18n-cottura-it' : 'data-i18n-cottura-en');
      if (label) el.querySelector('span').textContent = label;
    });

    // builder
    document.querySelectorAll('.builder__opt[data-group]').forEach(el => {
      const it = el.getAttribute('data-i18n-builder-it');
      const en = el.getAttribute('data-i18n-builder-en');
      const span = el.querySelector('span');
      if (span && (it || en)) span.textContent = lang === 'it' ? it : en;
    });

    // booking occasion
    document.querySelectorAll('#b-occasion option').forEach(opt => {
      const it = opt.getAttribute('data-i18n-occ-it');
      const en = opt.getAttribute('data-i18n-occ-en');
      if (it) opt.textContent = lang === 'it' ? it : en;
    });

    // gallery captions
    document.querySelectorAll('.gallery__caption').forEach(el => {
      const it = el.getAttribute('data-i18n-cap-it');
      const en = el.getAttribute('data-i18n-cap-en');
      el.textContent = lang === 'it' ? it : en;
    });

    // reviews
    document.querySelectorAll('.reviews__text').forEach(el => {
      const it = el.getAttribute('data-i18n-review-it');
      const en = el.getAttribute('data-i18n-review-en');
      el.textContent = lang === 'it' ? it : en;
    });

    // dispatch event for other modules to react
    document.dispatchEvent(new CustomEvent('brace:lang', { detail: { lang } }));
  }

  function getLang() { return currentLang; }

  // Init
  const saved = sessionStorage.getItem('brace_lang');
  if (saved && LANGS.includes(saved)) currentLang = saved;
  setLang(currentLang);

  document.getElementById('lang-switch')?.addEventListener('click', () => {
    setLang(currentLang === 'it' ? 'en' : 'it');
  });

  window.BRACE_I18N = { getLang, setLang };
})();
