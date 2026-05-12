// main.js — vanilla interactions for the GEO landing page.

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ───── NAV — scroll state + on-dark detection ───── */
  const nav = $('#nav');
  const hero = $('.hero');
  const ctaSection = $('#form');
  const darkSections = $$('.section--dark');

  function updateNav() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 24);
    // determine if nav is over a dark section
    const navBottom = nav.getBoundingClientRect().bottom;
    const darkZones = [hero, ctaSection, ...darkSections].filter(Boolean);
    const overDark = darkZones.some(el => {
      const r = el.getBoundingClientRect();
      return r.top < navBottom && r.bottom > navBottom;
    });
    nav.classList.toggle('on-dark', overDark);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav);
  updateNav();

  /* ───── reveal on scroll ───── */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('[data-reveal]').forEach(el => io.observe(el));

  /* ───── hero chat typing animation ───── */
  (function heroChat() {
    const typedEl = document.getElementById('aiTyped');
    const ranksEl = document.getElementById('aiRanks');
    if (!typedEl || !ranksEl) return;
    const fullText = '강남 지역에서 리프팅 시술로 평이 좋은 곳을 정리해드릴게요.';
    typedEl.textContent = '';
    typedEl.classList.add('typing');
    let i = 0;
    let started = false;

    function start() {
      if (started) return;
      started = true;
      const step = () => {
        if (i <= fullText.length) {
          typedEl.textContent = fullText.slice(0, i);
          i++;
          setTimeout(step, 32 + Math.random() * 24);
        } else {
          typedEl.classList.remove('typing');
          ranksEl.style.display = 'flex';
          const items = ranksEl.querySelectorAll('.chat-rank__item');
          items.forEach((it, idx) => {
            it.style.opacity = 0;
            it.style.transform = 'translateY(8px)';
            it.style.transition = 'opacity 420ms ease, transform 420ms cubic-bezier(.2,.7,.2,1)';
            setTimeout(() => {
              it.style.opacity = 1;
              it.style.transform = 'translateY(0)';
            }, 140 * idx);
          });
        }
      };
      setTimeout(step, 700);
    }

    // start a bit after page load
    if (document.readyState === 'complete') setTimeout(start, 400);
    else window.addEventListener('load', () => setTimeout(start, 400));
  })();

  /* ───── FAQ accordion ───── */
  $$('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-item__q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      $$('.faq-item.open').forEach(el => el !== item && el.classList.remove('open'));
      item.classList.toggle('open', !isOpen);
    });
  });

  /* ───── lead form submit (no backend; stub) ───── */
  window.__submitLead = function (e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type=submit]');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '신청 처리 중…';
    setTimeout(() => {
      btn.innerHTML = '신청 완료 ✓ 카톡으로 안내드릴게요';
      btn.style.background = 'var(--accent)';
      btn.style.color = 'var(--accent-ink)';
      form.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
    }, 900);
    return false;
  };

  /* ───── smooth scroll for anchor links ───── */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ───── parallax on hero chat mock ───── */
  (function parallax() {
    const mock = document.getElementById('chatMock');
    if (!mock) return;
    let ticking = false;
    function update() {
      const y = window.scrollY;
      const max = window.innerHeight;
      const p = Math.min(y / max, 1);
      mock.style.transform = `translateY(${-y * 0.06}px) scale(${1 - p * 0.04})`;
      mock.style.opacity = `${1 - p * 0.6}`;
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
  })();

})();
