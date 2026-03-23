/* ============================================================
   저스티드 공유 스크립트
   ============================================================ */

(function () {
  'use strict';

  /* === GSAP 플러그인 등록 === */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* === 스크롤 진행 바 === */
  var progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  /* === 네비 스크롤 상태 === */
  var siteHeader = document.getElementById('site-header');
  if (siteHeader && typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      start: 'top -80',
      onEnter: function () { siteHeader.classList.add('scrolled'); },
      onLeaveBack: function () { siteHeader.classList.remove('scrolled'); }
    });
  } else if (siteHeader) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 80) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* === 모바일 메뉴 === */
  var toggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileClose = document.getElementById('mobile-nav-close');

  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggle) toggle.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobileNav);
    });
  }

  /* ESC키로 모바일 메뉴 닫기 */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* === 내부 페이지 공통 Hero 입장 애니메이션 === */
  function initPageHero() {
    if (typeof gsap === 'undefined') return;

    var glow1 = document.querySelector('.page-hero-glow-1');
    var glow2 = document.querySelector('.page-hero-glow-2');
    var eyebrow = document.getElementById('page-eyebrow');
    var titles = document.querySelectorAll('.page-hero-title-inner');
    var tagline = document.getElementById('page-tagline');
    var desc = document.getElementById('page-desc');

    /* 초기 상태 */
    if (glow1) gsap.set(glow1, { scale: 0.6, opacity: 0 });
    if (glow2) gsap.set(glow2, { scale: 0.6, opacity: 0 });
    if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 18 });
    if (titles.length) gsap.set(titles, { y: '100%' });
    if (tagline) gsap.set(tagline, { opacity: 0, y: 14 });
    if (desc) gsap.set(desc, { opacity: 0, y: 14 });

    /* 네비 링크 */
    gsap.to('.nav-menu li', {
      opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.07, delay: 0.3
    });

    var tl = gsap.timeline({ delay: 0.1 });

    /* 글로우 블롭 */
    if (glow1) tl.to(glow1, { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' }, 0);
    if (glow2) tl.to(glow2, { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' }, 0.2);

    /* eyebrow */
    if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.35);

    /* 타이틀 커튼 리빌 */
    titles.forEach(function (el, i) {
      tl.to(el, { y: '0%', duration: 0.75, ease: 'power3.out' }, 0.55 + i * 0.16);
    });

    /* 태그라인 */
    if (tagline) tl.to(tagline, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.0);

    /* 설명 */
    if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.18);

    /* 앰비언트 루프 */
    if (glow1) {
      gsap.to(glow1, {
        scale: 1.3, opacity: 0.8, x: 40, y: -30,
        duration: 16, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5
      });
    }
    if (glow2) {
      gsap.to(glow2, {
        scale: 1.25, opacity: 0.7, x: -28, y: 40,
        duration: 20, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2
      });
    }
  }

  /* === 공통 ScrollTrigger 입장 애니메이션 === */
  var _scrollAnimInit = false;
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (_scrollAnimInit) return; /* 이중 호출 방지 */
    _scrollAnimInit = true;

    /* 섹션 레이블 */
    gsap.utils.toArray('.section-label').forEach(function (el) {
      if (el.hasAttribute('data-hero-anim')) return;
      gsap.fromTo(el,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true } }
      );
    });

    /* 섹션 타이틀 */
    gsap.utils.toArray('.section-title').forEach(function (el) {
      if (el.hasAttribute('data-hero-anim')) return;
      gsap.fromTo(el,
        { opacity: 0, y: 56 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power4.out', overwrite: 'auto',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true } }
      );
    });

    /* 섹션 설명 */
    gsap.utils.toArray('.section-desc').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true } }
      );
    });

    /* feature-card */
    ScrollTrigger.batch('.feature-card', {
      onEnter: function (elements) {
        gsap.fromTo(elements,
          { opacity: 0, y: 64, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power4.out', stagger: 0.12 }
        );
      },
      start: 'top 85%',
      once: true
    });

    /* research-card */
    ScrollTrigger.batch('.research-card', {
      onEnter: function (elements) {
        gsap.fromTo(elements,
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
        );
      },
      start: 'top 85%',
      once: true
    });

    /* trust-cert-card */
    ScrollTrigger.batch('.trust-cert-card', {
      onEnter: function (elements) {
        gsap.fromTo(elements,
          { opacity: 0, y: 56, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power4.out', stagger: 0.14 }
        );
      },
      start: 'top 86%',
      once: true
    });

    /* trust-patent-item */
    gsap.utils.toArray('.trust-patent-item').forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, x: -36 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 84%', once: true }
        }
      );
    });

    /* process-step */
    ScrollTrigger.batch('.process-step', {
      onEnter: function (elements) {
        gsap.fromTo(elements,
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }
        );
      },
      start: 'top 85%',
      once: true
    });

    /* platform-type-card */
    ScrollTrigger.batch('.platform-type-card', {
      onEnter: function (elements) {
        gsap.fromTo(elements,
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }
        );
      },
      start: 'top 85%',
      once: true
    });

    /* value-card */
    ScrollTrigger.batch('.value-card', {
      onEnter: function (elements) {
        gsap.fromTo(elements,
          { opacity: 0, y: 56, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power4.out', stagger: 0.14 }
        );
      },
      start: 'top 85%',
      once: true
    });

    /* patent-card */
    ScrollTrigger.batch('.patent-card', {
      onEnter: function (elements) {
        gsap.fromTo(elements,
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }
        );
      },
      start: 'top 85%',
      once: true
    });

    /* open-question-item */
    gsap.utils.toArray('.open-question-item').forEach(function (el, i) {
      gsap.fromTo(el,
        { opacity: 0, x: -32 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        }
      );
    });

    /* direction-card */
    ScrollTrigger.batch('.direction-card', {
      onEnter: function (elements) {
        gsap.fromTo(elements,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
        );
      },
      start: 'top 85%',
      once: true
    });

    /* trust-patents */
    var trustPatents = document.getElementById('trust-patents');
    if (trustPatents) {
      gsap.fromTo(trustPatents,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: trustPatents, start: 'top 84%', once: true }
        }
      );
    }

    /* contact / cta 라인 */
    var ctaLine = document.querySelector('.page-cta-line-top');
    if (ctaLine) {
      var ctaSection = ctaLine.closest('.page-cta');
      ScrollTrigger.create({
        trigger: ctaSection || ctaLine,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(ctaLine, { scaleX: 1, duration: 1.6, ease: 'power4.inOut' });
        }
      });
    }

    /* cta-grid */
    var ctaLeft = document.querySelector('.cta-left');
    var ctaRight = document.querySelector('.cta-right');
    if (ctaLeft) {
      gsap.fromTo(ctaLeft,
        { opacity: 0, x: -48, scale: 0.97 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1.0, ease: 'power4.out',
          scrollTrigger: { trigger: ctaLeft, start: 'top 80%', once: true }
        }
      );
    }
    if (ctaRight) {
      gsap.fromTo(ctaRight,
        { opacity: 0, x: 48, scale: 0.97 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1.0, ease: 'power4.out',
          scrollTrigger: { trigger: ctaRight, start: 'top 80%', once: true }
        }
      );
    }

    /* map-placeholder */
    var mapEl = document.querySelector('.map-placeholder');
    if (mapEl) {
      gsap.fromTo(mapEl,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: mapEl, start: 'top 84%', once: true }
        }
      );
    }

    /* location-table */
    var locationLeft = document.querySelector('.location-left');
    if (locationLeft) {
      gsap.fromTo(locationLeft,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: locationLeft, start: 'top 82%', once: true }
        }
      );
    }

    /* vision-slogan */
    var slogan = document.querySelector('.vision-slogan');
    if (slogan) {
      gsap.fromTo(slogan,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: slogan, start: 'top 82%', once: true }
        }
      );
    }
  }

  /* === 실행 === */
  window.addEventListener('load', function () {
    /* 내부 페이지 Hero — 페이지별 커스텀 스크립트가 없을 때만 공통 실행 */
    if (document.querySelector('.page-hero') && !window.__heroInit) {
      initPageHero();
    }
    initScrollAnimations();
  });

})();
