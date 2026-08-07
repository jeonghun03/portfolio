// ---------- 전역 상태 (인메모리, localStorage 미사용) ----------
window.__theme = window.__theme || 'light';

function applyTheme(t){
  window.__theme = t;
  document.documentElement.setAttribute('data-theme', t);
  const btn = document.querySelector('.theme-toggle');
  if(btn) btn.setAttribute('aria-pressed', t === 'dark');
}

function initTheme(){
  applyTheme(window.__theme);
  const btn = document.querySelector('.theme-toggle');
  if(btn){
    btn.addEventListener('click', () => {
      applyTheme(window.__theme === 'light' ? 'dark' : 'light');
    });
  }
}

// ---------- 모바일 메뉴 ----------
function initMobileNav(){
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if(!menuBtn || !navLinks) return;
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));

  // 모바일에서 드롭다운 탭으로 열기
  document.querySelectorAll('.has-dropdown > a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      if(window.innerWidth <= 960){
        e.preventDefault();
        a.parentElement.classList.toggle('open');
      }
    });
  });
}

// ---------- 현재 페이지 nav 활성화 ----------
function markActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.nav-links a[href]').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });
}

// ---------- 스크롤 reveal ----------
function initReveal(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    els.forEach(el=>el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:.15, rootMargin:'0px 0px -40px 0px'});
  els.forEach(el=>io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  markActiveNav();
  initReveal();
});
