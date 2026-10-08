document.addEventListener('DOMContentLoaded', () => {
  // GSAP Setup
  gsap.registerPlugin(TextPlugin, ScrollTrigger);

  // Hydrate Dynamic Config
  const cfg = window.BIRTHDAY_CONFIG || {
    name: 'Ammu',
    dateStrFormatted: '07-10-2026',
    dateDisplay: 'October 7, 2026',
    senderName: 'TV'
  };

  const recipientNameEl = document.getElementById('recipient-name');
  if (recipientNameEl) recipientNameEl.textContent = cfg.name;

  const wishTitleEl = document.getElementById('wish-title');
  if (wishTitleEl) wishTitleEl.textContent = `Happy Birthday, ${cfg.name}!`;

  const loaderTextEl = document.getElementById('loader-text');
  if (loaderTextEl) loaderTextEl.textContent = `Preparing something special for ${cfg.name}...`;

  const signatureEl = document.getElementById('signature');
  if (signatureEl && cfg.senderName) signatureEl.textContent = cfg.senderName;

  const polaroidCaptionEl = document.getElementById('polaroid-caption');
  if (polaroidCaptionEl) polaroidCaptionEl.textContent = `${cfg.name} & Always 💖`;

  const endingTitleEl = document.getElementById('ending-title');
  if (endingTitleEl) endingTitleEl.textContent = `To Many More Years Together, ${cfg.name}...`;

  const birthdayDateDisplay = document.getElementById('birthday-date-display');
  if (birthdayDateDisplay) birthdayDateDisplay.textContent = cfg.dateStrFormatted || '07-10-2026';

  const badgeText = document.getElementById('badge-text');
  if (badgeText) badgeText.innerHTML = `${cfg.name}'s Birthday: <strong id="birthday-date-display">${cfg.dateStrFormatted || '07-10-2026'}</strong>`;

  // Constants & Elements
  const card = document.getElementById('card');
  const openBtn = document.getElementById('open');
  const closeBtn = document.getElementById('close');
  const loader = document.getElementById('loader');
  const musicBtn = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');
  const cursorLight = document.querySelector('.cursor-light');
  const endingScene = document.getElementById('ending-scene');
  const replayBtn = document.getElementById('replay-btn');
  const heartTrigger = document.getElementById('heart-trigger');
  const revealSurpriseBtn = document.getElementById('reveal-surprise-btn');
  const cardFront = document.getElementById('card-front');

  let isMusicPlaying = false;
  let isCardOpen = false;

  const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffc8dd', '#fb6f92'];

  // 1. LIVE COUNTDOWN TIMER
  function updateLiveTimer() {
    if (!window.getBirthdayCountdown) return;
    const countdown = window.getBirthdayCountdown();

    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-minutes');
    const secsEl = document.getElementById('timer-seconds');
    const statusEl = document.getElementById('birthday-status');

    if (countdown.isToday) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      if (statusEl) {
        statusEl.innerHTML = `🎉 <strong>HAPPY BIRTHDAY ${cfg.name.toUpperCase()}! TODAY IS THE DAY!</strong> 🎂🎈`;
        statusEl.classList.add('is-birthday-today');
      }
    } else if (countdown.isPast) {
      if (statusEl) statusEl.innerHTML = `💖 Celebrating ${cfg.name}'s Special Birthday Year! ✨`;
    } else {
      if (daysEl) daysEl.textContent = String(countdown.days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(countdown.hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(countdown.minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(countdown.seconds).padStart(2, '0');
      if (statusEl) statusEl.innerHTML = `Counting down to ${cfg.dateDisplay} (${cfg.dateStrFormatted}) ✨`;
    }
  }

  updateLiveTimer();
  setInterval(updateLiveTimer, 1000);

  // 2. LOADING SCREEN
  window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.to('.progress', { width: '100%', duration: 1.5, ease: 'power2.inOut' })
      .to(loader, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          loader.style.display = 'none';
          startEntranceAnimations();
        }
      });
  });

  function startEntranceAnimations() {
    gsap.timeline()
      .from('.countdown-widget', { y: -30, opacity: 0, duration: 1, ease: 'power3.out' })
      .from('.main-title', { y: 50, opacity: 0, duration: 1.2, ease: 'power4.out' }, "-=0.6")
      .from('.cake-container', { scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.7)' }, "-=0.8")
      .from('.card-controls', { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
      .from('.audio-player', { x: -20, opacity: 0, duration: 0.8 }, "-=0.8");
  }

  // 3. 3D INTERACTION
  const handleMove = (x, y) => {
    if (window.innerWidth < 1024) return; // Only for desktop
    if (!isCardOpen) {
      const rx = (window.innerHeight / 2 - y) / 50;
      const ry = (x - window.innerWidth / 2) / 50;
      gsap.to(card, {
        rotationX: rx,
        rotationY: ry,
        duration: 0.7,
        ease: 'power2.out'
      });
    } else {
      const rx = (window.innerHeight / 2 - y) / 100;
      const ry = (x - window.innerWidth / 2) / 100;
      gsap.to(card, {
        rotationX: rx + 5,
        rotationY: ry,
        duration: 0.7,
        ease: 'power2.out'
      });
    }

    gsap.to(cursorLight, { left: x, top: y, duration: 0.3 });
    gsap.to('.orb-1', { x: (x - window.innerWidth / 2) * 0.05, y: (y - window.innerHeight / 2) * 0.05, duration: 2 });
    gsap.to('.orb-2', { x: (window.innerWidth / 2 - x) * 0.05, y: (window.innerHeight / 2 - y) * 0.05, duration: 2 });
  };

  document.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));

  // Mobile Orientation
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (!isCardOpen) {
        const x = (e.gamma || 0) * 2;
        const y = (e.beta || 0) * 2;
        handleMove(window.innerWidth / 2 + x, window.innerHeight / 2 + y);
      }
    });
  }

  // 4. CARD OPEN/CLOSE
  const typingConfig = {
    lines: (cfg.messages && cfg.messages.cardLines) ? cfg.messages.cardLines : [
      `You've been with me through my best days and my hardest ones — and I can't imagine life without you, ${cfg.name}.`,
      `On your special day, ${cfg.dateDisplay || '07-10-2026'}, I just want you to feel how deeply loved and appreciated you truly are.`,
      "You deserve all the joy in the world, today and always! 💖"
    ],
    duration: 1.5,
    pauseBetweenLines: 0.4
  };

  function startTypingAnimation() {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(revealSurpriseBtn, {
          display: 'flex',
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        });
      }
    });

    typingConfig.lines.forEach((line, index) => {
      const elementId = `line-${index + 1}`;
      const el = document.getElementById(elementId);
      if (!el) return;

      tl.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
        .add(() => el.classList.add('typing-active'))
        .to(el, {
          duration: line.length * 0.04,
          text: line,
          ease: 'none'
        })
        .add(() => el.classList.remove('typing-active'), `+=${typingConfig.pauseBetweenLines}`);
    });

    return tl;
  }

  const openCard = () => {
    isCardOpen = true;
    card.classList.add('is-open');
    document.body.classList.add('card-is-open');

    const tl = gsap.timeline();

    tl.to(card, { scale: 1.1, duration: 1.4, ease: 'power3.inOut' }, 0);
    tl.to(cardFront, { rotationY: -180, duration: 1.4, ease: 'power4.inOut' }, 0);

    tl.fromTo('.wish-title',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      "-=0.4"
    );

    tl.add(() => {
      startTypingAnimation();
    }, "-=0.2");

    tl.fromTo('.signed',
      { opacity: 0, y: 10, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' },
      "-=0.2"
    ).add(() => {
      heartTrigger.classList.add('heart-pulse');
    });
  };

  const closeCard = () => {
    isCardOpen = false;
    card.classList.remove('is-open');
    document.body.classList.remove('card-is-open');
    gsap.to(card, { scale: 1, duration: 1.4, ease: 'power3.inOut' });
    gsap.to(cardFront, { rotationY: 0, duration: 1.4, ease: 'power3.inOut' });
  };

  openBtn.addEventListener('click', openCard);
  closeBtn.addEventListener('click', closeCard);

  // 5. MODAL INTERACTIONS (LoveFunCode)
  const funModal = document.getElementById('fun-modal');
  const launchBtn = document.getElementById('launch-fun');
  const closeModalBtn = document.getElementById('close-modal');

  launchBtn.addEventListener('click', () => {
    funModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeModalBtn.addEventListener('click', () => {
    funModal.classList.remove('active');
    document.body.style.overflow = '';
    const iframe = document.getElementById('fun-iframe');
    const src = iframe.src;
    iframe.src = '';
    iframe.src = src;
  });

  // 6. SCROLL REVEAL FOR SURPRISE SECTION
  const surpriseSection = document.getElementById('fun-surprise');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        surpriseSection.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  observer.observe(surpriseSection);

  // 7. MICRO-INTERACTIONS
  heartTrigger.addEventListener('click', () => {
    gsap.to(heartTrigger, {
      scale: 1.8,
      color: '#ff0000',
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        const msg = document.createElement('div');
        msg.innerText = `${cfg.name}, you are my everything! ✨💖`;
        msg.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; background: #ff4d6d; padding: 15px 30px; border-radius: 50px; z-index: 3000; font-weight: 600; box-shadow: 0 10px 25px rgba(255, 77, 109, 0.4);`;
        document.body.appendChild(msg);
        gsap.from(msg, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' });
        gsap.to(msg, { y: -40, opacity: 0, delay: 1.8, duration: 0.8, onComplete: () => msg.remove() });
      }
    });

    for (let i = 0; i < 15; i++) createSparkle(window.innerWidth / 2, window.innerHeight / 2);
  });

  revealSurpriseBtn.addEventListener('click', () => {
    window.location.href = 'bbd.html';
  });

  replayBtn.addEventListener('click', () => {
    endingScene.classList.remove('active');
  });

  // 8. DECORATIONS
  function createParticles() {
    const container = document.getElementById('particles-container');
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `position: absolute; width: ${Math.random() * 3 + 2}px; height: ${Math.random() * 3 + 2}px; background: white; opacity: ${Math.random() * 0.3 + 0.1}; border-radius: 50%; top: ${Math.random() * 100}%; left: ${Math.random() * 100}%; pointer-events: none;`;
      container.appendChild(p);
      animateParticle(p);
    }
  }

  function animateParticle(p) {
    gsap.to(p, {
      y: "-=150",
      x: `+=${Math.random() * 40 - 20}`,
      opacity: 0,
      duration: Math.random() * 5 + 3,
      onComplete: () => {
        p.style.top = '110%';
        p.style.left = `${Math.random() * 100}%`;
        p.style.opacity = Math.random() * 0.3 + 0.1;
        animateParticle(p);
      }
    });
  }

  function createSparkle(x, y) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    document.body.appendChild(s);
    const size = Math.random() * 6 + 4;
    gsap.set(s, { x, y, width: size, height: size, backgroundColor: colors[Math.floor(Math.random() * colors.length)], borderRadius: '50%', position: 'absolute', pointerEvents: 'none', zIndex: 9999 });
    gsap.to(s, { x: x + (Math.random() * 200 - 100), y: y + (Math.random() * 200 - 100), opacity: 0, scale: 0, duration: 1.2, ease: 'power2.out', onComplete: () => s.remove() });
  }

  createParticles();
  document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
      createSparkle(e.pageX, e.pageY);
    }
  });

  // Music
  musicBtn.addEventListener('click', () => {
    const text = musicBtn.querySelector('.music-text');
    if (!isMusicPlaying) {
      audio.play().catch(() => { });
      text.textContent = 'Pause Music';
      musicBtn.classList.add('playing');
      isMusicPlaying = true;
    } else {
      audio.pause();
      text.textContent = 'Play Music';
      musicBtn.classList.remove('playing');
      isMusicPlaying = false;
    }
  });
});
