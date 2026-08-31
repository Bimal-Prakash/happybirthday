/**
 * 💖 Happy Birthday Interactive Controller
 * -------------------------------------------------------------
 * Powers romantic particles, Web Audio synthesizer melody,
 * interactive candle blow-out, 3D envelope, polaroid lightbox,
 * and confetti explosions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initWebsiteContent();
  initAmbientCanvas();
  initFloatingHearts();
  initAudioPlayer();
  initCakeCeremony();
  initLetterEnvelope();
  initConfettiCannons();
  initInteractiveClickHearts();
  initSmoothScroll();
});

function getConfig() {
  if (typeof BIRTHDAY_CONFIG !== 'undefined') return BIRTHDAY_CONFIG;
  if (typeof window !== 'undefined' && window.BIRTHDAY_CONFIG) return window.BIRTHDAY_CONFIG;
  return {};
}

/* =============================================================
   1. POPULATE DYNAMIC CONTENT FROM CONFIG.JS
   ============================================================= */
function initWebsiteContent() {
  const config = getConfig();

  // Names & Dates
  const recipientName = config.recipientName || "My Love";
  const nickname = config.nickname || "Cutie Pie ✨";
  const bdayDate = config.birthdayDate || "Special Day";

  setText('navRecipientName', recipientName);
  setText('displayNickname', nickname);
  setText('displayBirthdayDate', bdayDate);
  setText('footerRecipient', recipientName);
  if (config.music && config.music.title) setText('musicTitle', config.music.title);

  // Hero Section
  if (config.hero) {
    if (config.hero.badge) setText('badgeText', config.hero.badge);
    if (config.hero.headline) {
      document.getElementById('heroHeadline').innerHTML = `
        Happy Birthday, <br>
        <span class="gradient-text">${recipientName}!</span>
      `;
    }
    if (config.hero.subheadline) setText('heroSubheadline', config.hero.subheadline);
    if (config.hero.ctaButton) setText('ctaBtnText', config.hero.ctaButton);
    
    const heroImg = document.getElementById('heroImage');
    if (heroImg && config.hero.image) {
      heroImg.src = config.hero.image;
      heroImg.onerror = () => {
        heroImg.src = config.hero.placeholderFallback || 'assets/hero-placeholder.svg';
      };
    }
  }

  // Cake Section
  if (config.cake) {
    if (config.cake.title) setText('cakeTitle', config.cake.title);
    if (config.cake.subtitle) setText('cakeSubtitle', config.cake.subtitle);
    if (config.cake.blownMessage) setText('cakeBlownMessage', config.cake.blownMessage);
  }

  // Love Letter
  if (config.letter) {
    if (config.letter.tag) setText('letterTag', config.letter.tag);
    if (config.letter.title) setText('letterTitle', config.letter.title);
    if (config.letter.date) setText('letterDate', config.letter.date);
    if (config.letter.signature) setText('letterSignature', config.letter.signature);

    const letterBody = document.getElementById('letterBody');
    if (letterBody && config.letter.paragraphs) {
      letterBody.innerHTML = config.letter.paragraphs.map(p => `<p>${p}</p>`).join('');
    }
  }

  // Reasons Why I Love You
  const reasonsGrid = document.getElementById('reasonsGrid');
  if (reasonsGrid && config.reasons && config.reasons.length) {
    reasonsGrid.innerHTML = '';
    config.reasons.forEach((r, idx) => {
      const card = document.createElement('div');
      card.className = 'reason-card-3d';
      card.innerHTML = `
        <div class="reason-card-inner">
          <div class="reason-card-front">
            <span class="reason-icon">${r.icon || '💖'}</span>
            <h3 class="reason-front-title">${r.title}</h3>
            <span class="reason-tap-hint">Tap / Hover to Flip ✨</span>
          </div>
          <div class="reason-card-back">
            <p class="reason-desc">${r.description}</p>
          </div>
        </div>
      `;

      // Touch friendly flip toggle
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });

      reasonsGrid.appendChild(card);
    });
  }
}

function setText(elementId, text) {
  const el = document.getElementById(elementId);
  if (el && text) el.textContent = text;
}

/* =============================================================
   2. AMBIENT STAR & GLOW PARTICLES CANVAS
   ============================================================= */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  const starCount = Math.min(80, Math.floor((width * height) / 12000));

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.3 ? '#ffffff' : (Math.random() > 0.5 ? '#ffd166' : '#ff758c')
    });
  }

  function renderStars() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(renderStars);
  }

  renderStars();
}

/* =============================================================
   3. FLOATING HEART BUBBLE PARTICLES
   ============================================================= */
function initFloatingHearts() {
  const container = document.getElementById('heartsContainer');
  if (!container) return;

  const heartIcons = ['💖', '🌸', '✨', '💕', '🌷', '💫'];

  function createHeart() {
    if (document.hidden) return;
    const heart = document.createElement('span');
    heart.className = 'floating-bg-heart';
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    
    const size = Math.random() * 18 + 12;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 8 + 7;
    const sway = (Math.random() - 0.5) * 80;

    heart.style.cssText = `
      position: absolute;
      left: ${startX}px;
      bottom: -40px;
      font-size: ${size}px;
      opacity: ${Math.random() * 0.45 + 0.15};
      transition: transform ${duration}s linear, opacity ${duration}s ease-in;
      pointer-events: none;
      z-index: 1;
    `;

    container.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = `translate(${sway}px, -${window.innerHeight + 100}px) rotate(${sway * 2}deg)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  setInterval(createHeart, 800);
}

/* =============================================================
   4. ROMANTIC MUSIC PLAYER & ENTRANCE GATE
   ============================================================= */
let isPlayingMelody = false;
let audioPlayerElement = null;
let userManuallyPaused = false;

function initAudioPlayer() {
  const toggleBtn = document.getElementById('musicToggleBtn');
  const vinylDisc = document.getElementById('vinylDisc');
  const musicStatus = document.getElementById('musicStatus');
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  const enterSurpriseBtn = document.getElementById('enterSurpriseBtn');

  if (!toggleBtn) return;

  const config = getConfig();
  const musicSrc = config.music && config.music.src ? config.music.src : 'assets/song.mp3';
  
  audioPlayerElement = new Audio();
  audioPlayerElement.src = musicSrc;
  audioPlayerElement.loop = true;
  audioPlayerElement.preload = 'auto';

  // Toggle button on vinyl disc (Pause / Play)
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlayingMelody) {
      userManuallyPaused = true;
      stopMusic();
    } else {
      userManuallyPaused = false;
      startMusic();
    }
  });

  function startMusic() {
    isPlayingMelody = true;
    vinylDisc.classList.add('playing');
    toggleBtn.classList.add('is-playing');
    musicStatus.textContent = "Now Playing: " + (config.music?.title || "Tainu Khabar Nahi 🎵");

    return audioPlayerElement.play().catch((err) => {
      isPlayingMelody = false;
      vinylDisc.classList.remove('playing');
      toggleBtn.classList.remove('is-playing');
      musicStatus.textContent = "Click to play song 🎵";
      throw err;
    });
  }

  function stopMusic() {
    isPlayingMelody = false;
    vinylDisc.classList.remove('playing');
    toggleBtn.classList.remove('is-playing');
    musicStatus.textContent = "Paused (Click to play 🎵)";

    if (audioPlayerElement) audioPlayerElement.pause();
  }

  // Welcome Entrance Surprise Button (Always greets her first!)
  function openSurpriseEntrance() {
    if (welcomeOverlay) {
      welcomeOverlay.classList.add('dismissed');
    }
    userManuallyPaused = false;
    startMusic().catch(() => {});
    fireRomanticConfetti();
  }

  if (enterSurpriseBtn) {
    enterSurpriseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openSurpriseEntrance();
    });
  }

  if (welcomeOverlay) {
    welcomeOverlay.addEventListener('click', () => {
      openSurpriseEntrance();
    });
  }
}

/* =============================================================
   5. INTERACTIVE BIRTHDAY CAKE & CANDLE CEREMONY
   ============================================================= */
function initCakeCeremony() {
  const cakeWrapper = document.getElementById('cakeWrapper');
  const candleFlame = document.getElementById('candleFlame');
  const candleSmoke = document.getElementById('candleSmoke');
  const blowCandleBtn = document.getElementById('blowCandleBtn');
  const blowBtnText = document.getElementById('blowBtnText');
  const wishRevealCard = document.getElementById('wishRevealCard');
  const relightCandleBtn = document.getElementById('relightCandleBtn');
  const wishModal = document.getElementById('wishModal');
  const wishModalCloseBtn = document.getElementById('wishModalCloseBtn');
  const wishModalBackdrop = document.getElementById('wishModalBackdrop');

  let isCandleBlown = false;

  function blowOutCandle() {
    if (isCandleBlown) return;
    isCandleBlown = true;

    // Extinguish Flame
    candleFlame.classList.add('extinguished');
    candleSmoke.classList.add('active');

    // Button state
    blowCandleBtn.style.opacity = '0.6';
    blowBtnText.textContent = "✨ Candle Blown! Wish Sent! ✨";

    // Trigger Confetti Explosion
    fireRomanticConfetti();

    // Show wish card & modal
    setTimeout(() => {
      wishRevealCard.classList.add('show');
      openWishModal();
    }, 600);
  }

  function relightCandle() {
    isCandleBlown = false;
    candleFlame.classList.remove('extinguished');
    candleSmoke.classList.remove('active');
    blowCandleBtn.style.opacity = '1';
    blowBtnText.textContent = "Click Candle or Tap Here to Blow!";
    wishRevealCard.classList.remove('show');
  }

  if (cakeWrapper) cakeWrapper.addEventListener('click', blowOutCandle);
  if (blowCandleBtn) blowCandleBtn.addEventListener('click', blowOutCandle);
  if (relightCandleBtn) relightCandleBtn.addEventListener('click', relightCandle);

  function openWishModal() {
    const config = getConfig();
    const textEl = document.getElementById('modalWishText');
    if (textEl && config.cake?.blownMessage) {
      textEl.textContent = config.cake.blownMessage;
    }
    wishModal.classList.add('active');
  }

  function closeWishModal() {
    wishModal.classList.remove('active');
  }

  if (wishModalCloseBtn) wishModalCloseBtn.addEventListener('click', closeWishModal);
  if (wishModalBackdrop) wishModalBackdrop.addEventListener('click', closeWishModal);
}

/* =============================================================
   6. 3D WAX-SEAL LOVE LETTER INTERACTION
   ============================================================= */
function initLetterEnvelope() {
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('waxSeal');
  const closeLetterBtn = document.getElementById('closeLetterBtn');

  if (!envelope || !waxSeal) return;

  function openLetter() {
    envelope.classList.add('open');
    fireMiniHeartConfetti();
  }

  function closeLetter(e) {
    e.stopPropagation();
    envelope.classList.remove('open');
  }

  waxSeal.addEventListener('click', openLetter);
  waxSeal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLetter();
    }
  });

  if (closeLetterBtn) {
    closeLetterBtn.addEventListener('click', closeLetter);
  }
}

/* =============================================================
   7. CONFETTI CANNONS & FIREWORKS
   ============================================================= */
function initConfettiCannons() {
  const showerBtn = document.getElementById('confettiCannonBtn');
  const grandBtn = document.getElementById('grandConfettiBtn');

  if (showerBtn) {
    showerBtn.addEventListener('click', () => fireRomanticConfetti());
  }

  if (grandBtn) {
    grandBtn.addEventListener('click', () => fireGrandCelebrationFireworks());
  }
}

function fireRomanticConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff758c', '#ff7eb3', '#ffd166', '#ffffff', '#ff4d6d']
    });

    // Second wave
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#ff758c', '#ffd166', '#c8b6ff']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#ff758c', '#ffd166', '#c8b6ff']
      });
    }, 250);
  }
}

function fireMiniHeartConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#ff758c', '#e63946', '#ffffff']
    });
  }
}

function fireGrandCelebrationFireworks() {
  if (typeof confetti === 'function') {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff758c', '#ffd166', '#ff4d6d', '#ffffff']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff758c', '#ffd166', '#c8b6ff', '#fb6f92']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}

/* =============================================================
   9. INTERACTIVE CLICK SPARKS & HEARTS
   ============================================================= */
function initInteractiveClickHearts() {
  const heartIcons = ['💖', '✨', '💕', '🌸', '❤️'];

  window.addEventListener('click', (e) => {
    // Avoid spawning over buttons directly if unwanted
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1200);
  });
}

/* =============================================================
   10. SMOOTH SCROLL & ACTIVE LINK HIGHLIGHTING
   ============================================================= */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
