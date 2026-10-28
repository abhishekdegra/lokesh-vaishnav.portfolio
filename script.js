/* ==========================================================================
   LOKESH VAISHNAV — HIGH-END CREATIVE STUDIO JAVASCRIPT
   WebGL 3D Sculpture, Custom Cursor, Magnetic Buttons, Editorial Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  // --------------------------------------------------------------------------
  // FEATURE 01: CINEMATIC PAGE LOADER & EXIT SHUTTERS
  // --------------------------------------------------------------------------
  initPageLoader();

  // --------------------------------------------------------------------------
  // 00. THEME TOGGLE — DAY / NIGHT PREMIUM SWITCH
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeLabel = themeToggleBtn?.querySelector('.theme-toggle-label');
  const htmlEl = document.documentElement;

  // Restore saved preference
  const savedTheme = localStorage.getItem('lv-theme') || 'night';
  if (savedTheme === 'day') {
    htmlEl.setAttribute('data-theme', 'day');
    if (themeLabel) themeLabel.textContent = 'NIGHT';
  } else {
    htmlEl.removeAttribute('data-theme');
    if (themeLabel) themeLabel.textContent = 'DAY';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDay = htmlEl.getAttribute('data-theme') === 'day';

      // Add a brief transition flash class
      htmlEl.classList.add('theme-switching');

      if (isDay) {
        // Switch to night
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('lv-theme', 'night');
        if (themeLabel) themeLabel.textContent = 'DAY';
      } else {
        // Switch to day
        htmlEl.setAttribute('data-theme', 'day');
        localStorage.setItem('lv-theme', 'day');
        if (themeLabel) themeLabel.textContent = 'NIGHT';
      }

      // Remove flash class
      setTimeout(() => htmlEl.classList.remove('theme-switching'), 700);
    });
  }

  // --------------------------------------------------------------------------
  // 01. THREE.JS 3D HERO CENTERPIECE — PRISMATIC CREATIVE CORE & FLUID WAVE
  // --------------------------------------------------------------------------
  initHero3D();

  function initHero3D() {
    const canvas = document.getElementById('hero-webgl-canvas');
    const container = document.getElementById('hero-3d-wrapper');
    const fallback = document.getElementById('hero-fallback-visual');

    if (!canvas || !container || typeof THREE === 'undefined') {
      if (fallback) fallback.style.display = 'block';
      if (canvas) canvas.style.display = 'none';
      return;
    }

    try {
      const scene = new THREE.Scene();

      // Camera setup with optimized FOV for dramatic perspective
      const fov = 42;
      const aspect = (container.clientWidth || window.innerWidth) / (container.clientHeight || window.innerHeight);
      const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
      camera.position.set(0, 0, 7.8);

      // WebGL Renderer with antialiasing and high performance profile
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);

      // Master 3D Group
      const masterGroup = new THREE.Group();
      scene.add(masterGroup);

      // ----------------------------------------------------------------------
      // STUDIO LIGHTING SUITE (Cyan Key + Solar Gold Fill + Velvet Violet Rim)
      // ----------------------------------------------------------------------
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      scene.add(ambientLight);

      // Key Light: Hyper Aquamarine / Electric Cyan
      const cyanLight = new THREE.PointLight(0x00f5d4, 4.8, 50);
      cyanLight.position.set(5.8, 4.2, 4.5);
      scene.add(cyanLight);

      // Fill Light: Solar Amber / Gold
      const amberLight = new THREE.PointLight(0xff9f1c, 4.6, 50);
      amberLight.position.set(-5.8, -3.5, 3.8);
      scene.add(amberLight);

      // Rim Light: Cosmic Velvet Violet (Deep Chromatic Backlight)
      const violetLight = new THREE.PointLight(0x8338ec, 4.2, 45);
      violetLight.position.set(0, 5.5, -3.5);
      scene.add(violetLight);

      // Cursor Glint Light (Tracks mouse dynamically with soft caustic specular highlight)
      const mouseGlintLight = new THREE.PointLight(0x70fff0, 3.4, 35);
      mouseGlintLight.position.set(0, 0, 4.5);
      scene.add(mouseGlintLight);

      // ----------------------------------------------------------------------
      // 1. CENTERPIECE: FACETED PRISMATIC CREATIVE GEMSTONE (NO EARTH GLOBE)
      // ----------------------------------------------------------------------
      const crystalGroup = new THREE.Group();
      masterGroup.add(crystalGroup);

      // Primary Faceted Crystal Jewel (Faceted Icosahedron Jewel)
      const primaryGeo = new THREE.IcosahedronGeometry(1.68, 0);
      const primaryMat = new THREE.MeshStandardMaterial({
        color: 0x0a101d,
        roughness: 0.08,
        metalness: 0.95,
        flatShading: true,
        emissive: 0x00f5d4,
        emissiveIntensity: 0.16
      });
      const primaryMesh = new THREE.Mesh(primaryGeo, primaryMat);
      crystalGroup.add(primaryMesh);

      // Sharp Luminous Crystal Edge Wireframe
      const wireGeo = new THREE.IcosahedronGeometry(1.71, 0);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00f5d4,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      crystalGroup.add(wireMesh);

      // Inner Rotating Solar Geometric Core (Octahedron Core Jewel)
      const innerCoreGeo = new THREE.OctahedronGeometry(0.88, 0);
      const innerCoreMat = new THREE.MeshStandardMaterial({
        color: 0xffb703,
        roughness: 0.18,
        metalness: 0.9,
        emissive: 0xff9f1c,
        emissiveIntensity: 0.45,
        flatShading: true
      });
      const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
      crystalGroup.add(innerCoreMesh);

      // ----------------------------------------------------------------------
      // 2. ORBITING FACETED CRYSTALLINE SHARDS (Creative Geometric Fragments)
      // ----------------------------------------------------------------------
      const shardsCount = 8;
      const shards = [];
      const shardColors = [0x00f5d4, 0xff9f1c, 0x8338ec, 0x70fff0];

      for (let i = 0; i < shardsCount; i++) {
        const radius = 2.4 + (i % 3) * 0.55;
        const angle = (i / shardsCount) * Math.PI * 2;
        const elevation = ((i % 4) - 1.5) * 0.9;
        const shardSize = 0.22 + (i % 3) * 0.07;

        const shardGeo = (i % 2 === 0)
          ? new THREE.OctahedronGeometry(shardSize, 0)
          : new THREE.TetrahedronGeometry(shardSize * 1.1, 0);

        const shardMat = new THREE.MeshStandardMaterial({
          color: 0x0d1424,
          roughness: 0.12,
          metalness: 0.92,
          flatShading: true,
          emissive: shardColors[i % shardColors.length],
          emissiveIntensity: 0.3
        });

        const shard = new THREE.Mesh(shardGeo, shardMat);
        shard.position.set(
          Math.cos(angle) * radius,
          elevation,
          Math.sin(angle) * radius
        );

        shard.userData = {
          baseRadius: radius,
          baseAngle: angle,
          elevation: elevation,
          speed: 0.35 + (i % 3) * 0.25,
          rotSpeedX: (Math.random() - 0.5) * 0.02,
          rotSpeedY: (Math.random() - 0.5) * 0.025
        };

        crystalGroup.add(shard);
        shards.push(shard);
      }

      // ----------------------------------------------------------------------
      // 3. FLUID KINETIC WAVE FIELD (Audio/Motion Timeline Wave Ribbon)
      // ----------------------------------------------------------------------
      const waveCols = 38;
      const waveRows = 24;
      const waveGeo = new THREE.PlaneGeometry(12.5, 7.5, waveCols - 1, waveRows - 1);
      const wavePositions = waveGeo.attributes.position;
      const initialZ = new Float32Array(wavePositions.count);

      for (let i = 0; i < wavePositions.count; i++) {
        initialZ[i] = wavePositions.getZ(i);
      }

      const waveMat = new THREE.MeshBasicMaterial({
        color: 0x00f5d4,
        wireframe: true,
        transparent: true,
        opacity: 0.24
      });

      const waveMesh = new THREE.Mesh(waveGeo, waveMat);
      waveMesh.position.set(0.6, -0.8, -1.9);
      waveMesh.rotation.x = -Math.PI / 3.1;
      waveMesh.rotation.z = Math.PI / 9;
      masterGroup.add(waveMesh);

      // ----------------------------------------------------------------------
      // 4. FLOATING CREATIVE STARDUST / COLOR PARTICLES (220 particles)
      // ----------------------------------------------------------------------
      const particleCount = 220;
      const particlePositions = new Float32Array(particleCount * 3);
      const particleVelocities = [];

      for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 15;
        particlePositions[i + 1] = (Math.random() - 0.5) * 13;
        particlePositions[i + 2] = (Math.random() - 0.5) * 10;
        particleVelocities.push({
          x: (Math.random() - 0.5) * 0.003,
          y: (Math.random() - 0.5) * 0.003,
          z: (Math.random() - 0.5) * 0.002
        });
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x00f5d4,
        size: 0.045,
        transparent: true,
        opacity: 0.72
      });
      const particlePoints = new THREE.Points(particleGeo, particleMat);
      scene.add(particlePoints);

      // ----------------------------------------------------------------------
      // 5. INTERACTION & ART DIRECTION CONTROLS
      // ----------------------------------------------------------------------
      let mouseX = 0;
      let mouseY = 0;
      let targetRotX = 0;
      let targetRotY = 0;
      let currentVibe = 'prismatic'; // 'prismatic' | 'cyber' | 'flare'
      let isVisible = true;

      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseX = x * 0.5;
        mouseY = y * 0.5;

        // Dynamic 3D specular light smoothly tracks cursor position
        mouseGlintLight.position.x = x * 5.2;
        mouseGlintLight.position.y = y * 4.8;
      }, { passive: true });

      // Theme Synchronization (Day vs Night Palette)
      function updateThemeColors() {
        const isDay = document.documentElement.getAttribute('data-theme') === 'day';
        if (isDay) {
          cyanLight.color.setHex(0xff3b14); // Fiery Crimson
          amberLight.color.setHex(0xff8c00); // Solar Amber
          violetLight.color.setHex(0xb21800); // Deep Crimson Rim
          mouseGlintLight.color.setHex(0xff6b00);
          waveMat.color.setHex(0xff3b14);
          waveMat.opacity = 0.28;
          wireMat.color.setHex(0xff4500);
          particleMat.color.setHex(0xff6b00);
        } else {
          cyanLight.color.setHex(0x00f5d4); // Electric Cyan
          amberLight.color.setHex(0xff9f1c); // Solar Gold
          violetLight.color.setHex(0x8338ec); // Velvet Violet
          mouseGlintLight.color.setHex(0x70fff0);
          waveMat.color.setHex(0x00f5d4);
          waveMat.opacity = 0.24;
          wireMat.color.setHex(0x00f5d4);
          particleMat.color.setHex(0x00f5d4);
        }
      }

      // Observe theme changes
      const themeObserver = new MutationObserver(updateThemeColors);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      updateThemeColors();

      // Expose Vibe Switcher globally for UI control
      window.switchHeroVibe = function(vibe) {
        currentVibe = vibe;
        const isDay = document.documentElement.getAttribute('data-theme') === 'day';

        if (vibe === 'cyber') {
          waveMat.opacity = isDay ? 0.45 : 0.42;
          waveMesh.scale.set(1.2, 1.2, 1.2);
          primaryMat.emissiveIntensity = 0.35;
        } else if (vibe === 'flare') {
          waveMat.opacity = 0.18;
          primaryMat.emissiveIntensity = 0.55;
          amberLight.intensity = 6.5;
        } else {
          // Default Prismatic
          waveMat.opacity = isDay ? 0.28 : 0.24;
          waveMesh.scale.set(1, 1, 1);
          primaryMat.emissiveIntensity = 0.16;
          amberLight.intensity = 4.6;
        }

        // Update active button state in UI
        document.querySelectorAll('.vibe-btn').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-vibe') === vibe);
        });
      };

      // Resize listener
      function onWindowResize() {
        if (!container) return;
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
      window.addEventListener('resize', onWindowResize, { passive: true });

      // Intersection Observer to save resources when hero is scrolled past
      const heroSection = document.getElementById('hero');
      if (heroSection && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            isVisible = entry.isIntersecting;
          });
        }, { threshold: 0.05 });
        io.observe(heroSection);
      }

      // ----------------------------------------------------------------------
      // HIGH-PRECISION KINETIC ANIMATION LOOP (60+ FPS)
      // ----------------------------------------------------------------------
      const clock = new THREE.Clock();

      function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return; // Zero GPU burn when scrolled away

        const elapsedTime = clock.getElapsedTime();
        const vibeSpeedMult = currentVibe === 'flare' ? 1.6 : (currentVibe === 'cyber' ? 1.25 : 1.0);

        // 1. Centerpiece Crystal Rotations (Opposing Geometric Spins)
        primaryMesh.rotation.y += 0.0042 * vibeSpeedMult;
        primaryMesh.rotation.x += 0.0028 * vibeSpeedMult;
        wireMesh.rotation.y = primaryMesh.rotation.y;
        wireMesh.rotation.x = primaryMesh.rotation.x;

        innerCoreMesh.rotation.y -= 0.009 * vibeSpeedMult;
        innerCoreMesh.rotation.z += 0.006 * vibeSpeedMult;

        // 2. Orbiting Shard Dynamics
        shards.forEach((shard) => {
          const u = shard.userData;
          const currentAngle = u.baseAngle + elapsedTime * u.speed * 0.45 * vibeSpeedMult;
          shard.position.x = Math.cos(currentAngle) * u.baseRadius;
          shard.position.z = Math.sin(currentAngle) * u.baseRadius;
          shard.position.y = u.elevation + Math.sin(elapsedTime * 1.5 + u.baseAngle) * 0.28;

          shard.rotation.x += u.rotSpeedX;
          shard.rotation.y += u.rotSpeedY;
        });

        // 3. Fluid Kinetic Wave Mesh Undulation
        const pArray = wavePositions.array;
        const waveFreq = currentVibe === 'cyber' ? 2.4 : 1.5;
        const waveAmp = currentVibe === 'cyber' ? 0.48 : 0.32;

        for (let i = 0; i < wavePositions.count; i++) {
          const idx = i * 3;
          const vx = pArray[idx];
          const vy = pArray[idx + 1];

          // Harmonic Sine + Ripple interference pattern
          const ripple = Math.sin(vx * 0.65 + elapsedTime * waveFreq) *
                         Math.cos(vy * 0.75 + elapsedTime * (waveFreq * 0.85)) * waveAmp;

          // Mouse proximity wave disturbance
          const distToMouse = Math.hypot(vx - mouseX * 6, vy - mouseY * 4);
          const mouseDisturb = Math.max(0, (1.8 - distToMouse) * 0.25);

          pArray[idx + 2] = ripple + mouseDisturb;
        }
        wavePositions.needsUpdate = true;

        // 4. Gentle Stardust Wave Drift
        particlePoints.rotation.y = elapsedTime * 0.018;
        particlePoints.rotation.x = Math.sin(elapsedTime * 0.35) * 0.04;

        // 5. Smooth Lerping Inertia for Mouse Parallax
        targetRotX += (mouseY * 0.45 - targetRotX) * 0.055;
        targetRotY += (mouseX * 0.55 - targetRotY) * 0.055;

        crystalGroup.rotation.x = targetRotX;
        crystalGroup.rotation.y = targetRotY + elapsedTime * 0.04;

        // Scroll responsive vertical parallax
        const scrollFraction = Math.min(window.scrollY / window.innerHeight, 1.5);
        masterGroup.position.y = -scrollFraction * 1.2;
        masterGroup.position.z = -scrollFraction * 0.8;

        renderer.render(scene, camera);
      }

      animate();

    } catch (err) {
      console.warn('Three.js initialization notice:', err);
      if (fallback) fallback.style.display = 'block';
      if (canvas) canvas.style.display = 'none';
    }
  }


  // --------------------------------------------------------------------------
  // 02. CLEAN NATIVE CURSOR & HOVER INTERACTIONS (Instant 100% Control)
  // --------------------------------------------------------------------------
  // Provide instant, zero-latency feedback on interactive elements
  const interactiveEls = document.querySelectorAll('a, button, input, textarea, .filter-tab, .project-showcase-item');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });


  // --------------------------------------------------------------------------
  // 04. SITE HEADER, SCROLL COMPACT & ACTIVE NAV
  // --------------------------------------------------------------------------
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Compact navbar
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });


  // --------------------------------------------------------------------------
  // 05. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (navToggle && mobileDrawer) {
    function toggleDrawer() {
      const isOpen = mobileDrawer.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      mobileDrawer.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    navToggle.addEventListener('click', toggleDrawer);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileDrawer.classList.contains('open')) {
          toggleDrawer();
        }
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleDrawer();
      }
    });
  }


  // --------------------------------------------------------------------------
  // 06. PORTRAIT 3D TILT EFFECT & SPECULAR HOLOGRAPHIC SHINE
  // --------------------------------------------------------------------------
  const portraitWrapper = document.getElementById('portrait-wrapper');
  if (portraitWrapper && isFinePointer) {
    const card = portraitWrapper.querySelector('.portrait-card');
    portraitWrapper.addEventListener('mousemove', (e) => {
      const rect = portraitWrapper.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const x = mouseX - rect.width / 2;
      const y = mouseY - rect.height / 2;
      const rotY = (x / (rect.width / 2)) * 12;
      const rotX = -(y / (rect.height / 2)) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;
      card.style.setProperty('--shine-x', `${mouseX}px`);
      card.style.setProperty('--shine-y', `${mouseY}px`);
    });

    portraitWrapper.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // --------------------------------------------------------------------------
  // SCROLL PROGRESS BAR TRACKER
  // --------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scroll-progress');
  if (scrollProgressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgressBar.style.width = `${progress}%`;
    }, { passive: true });
  }


  // --------------------------------------------------------------------------
  // 07. EDITORIAL PROJECT FILTERING (Multi-Category & Smooth Transitions)
  // --------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-showcase-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active states
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterVal = tab.getAttribute('data-filter');

      projectCards.forEach((card, index) => {
        const categoryAttr = card.getAttribute('data-category') || '';
        const categories = categoryAttr.toLowerCase().split(/\s+/);
        const isMatch = filterVal === 'all' || categories.includes(filterVal);

        if (isMatch) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.transition = `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.04}s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.04}s`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          });
        } else {
          card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            const currentActiveTab = document.querySelector('.filter-tab.active');
            const currentFilter = currentActiveTab ? currentActiveTab.getAttribute('data-filter') : 'all';
            const currCats = (card.getAttribute('data-category') || '').toLowerCase().split(/\s+/);
            if (currentFilter !== 'all' && !currCats.includes(currentFilter)) {
              card.style.display = 'none';
            }
          }, 260);
        }
      });
    });
  });


  // --------------------------------------------------------------------------
  // 08. PROJECT CARD HOVER INTERACTIONS (Cursor Parallax & Soft Light Sheen)
  // --------------------------------------------------------------------------
  if (isFinePointer) {
    projectCards.forEach(card => {
      const img = card.querySelector('.project-media-img');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Set cursor coordinates for soft radial spotlight
        card.style.setProperty('--cursor-x', `${mouseX}px`);
        card.style.setProperty('--cursor-y', `${mouseY}px`);

        // Subtle cursor parallax on image
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const percentX = (mouseX - centerX) / centerX;
        const percentY = (mouseY - centerY) / centerY;

        if (img) {
          img.style.transform = `scale(1.05) translate(${percentX * 6}px, ${percentY * 6}px)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (img) {
          img.style.transform = '';
        }
      });
    });
  }


  // --------------------------------------------------------------------------
  // 09. CASE STUDY & ARTWORK LIGHTBOX MODAL
  // --------------------------------------------------------------------------
  const lightbox = document.getElementById('lightbox');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxMediaWrap = document.getElementById('lightbox-media-wrap');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxVerified = document.getElementById('lightbox-verified');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxTools = document.getElementById('lightbox-tools');

  function openProjectModal(card) {
    if (!card) return;

    const img = card.querySelector('.project-media-img');
    const mediaWrap = card.querySelector('.project-media-wrap');
    const title = card.querySelector('.project-title')?.textContent || 'Project Showcase';
    const category = card.querySelector('.project-category-tag')?.textContent || 'Creative';
    const desc = card.querySelector('.project-desc')?.textContent || '';
    const toolChips = card.querySelectorAll('.tool-chip');
    const isOriginal = card.hasAttribute('data-is-original') || card.classList.contains('original-work-item');

    if (lightboxImg && img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || title;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCategory) lightboxCategory.textContent = category.toUpperCase();
    if (lightboxDesc) lightboxDesc.textContent = desc;

    // Handle Original Work Exhibition Gallery Canvas
    if (lightboxMediaWrap) {
      if (isOriginal) {
        lightboxMediaWrap.classList.add('is-original-artwork');
        const customBg = mediaWrap ? window.getComputedStyle(mediaWrap).backgroundColor : '#f7f7f7';
        lightboxMediaWrap.style.backgroundColor = customBg || '#f7f7f7';
        if (lightboxVerified) lightboxVerified.style.display = 'inline-flex';
      } else {
        lightboxMediaWrap.classList.remove('is-original-artwork');
        lightboxMediaWrap.style.backgroundColor = '';
        if (lightboxVerified) lightboxVerified.style.display = 'none';
      }
    }

    if (lightboxTools) {
      lightboxTools.innerHTML = '';
      toolChips.forEach(chip => {
        const clone = document.createElement('span');
        clone.className = 'tool-chip';
        clone.textContent = chip.textContent;
        lightboxTools.appendChild(clone);
      });
    }

    openLightbox();
  }

  // Trigger on button clicks or card media clicks
  const projectTriggers = document.querySelectorAll('.project-view-btn, .project-inline-action');
  projectTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = trigger.closest('.project-showcase-item');
      if (card) openProjectModal(card);
    });
  });

  function openLightbox() {
    if (!lightbox) return;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });


  // --------------------------------------------------------------------------
  // 09. STAT COUNTERS ANIMATION (IntersectionObserver)
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => counterObserver.observe(stat));

  function animateStat(element) {
    const target = parseInt(element.getAttribute('data-target'), 10) || 0;
    const duration = 1800;
    const start = performance.now();

    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }


  // --------------------------------------------------------------------------
  // 10. SCROLL REVEALS & INTERSECTION OBSERVER
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // --------------------------------------------------------------------------
  // 11. INQUIRY CONTACT FORM & VALIDATION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      if (!nameVal || !emailVal || !messageVal) {
        showStudioNotification('Please complete all fields to initiate your project inquiry.', 'error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        showStudioNotification('Please provide a valid email address.', 'error');
        return;
      }

      // Tactile Loading State
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <span class="btn-text">Transmitting Inquiry...</span>
      `;
      submitBtn.disabled = true;

      // Realistic asynchronous transmission delay
      await new Promise(resolve => setTimeout(resolve, 1400));

      submitBtn.innerHTML = `
        <span class="btn-text">✓ Inquiry Received</span>
      `;
      submitBtn.style.background = 'linear-gradient(135deg, #00f0ff 0%, #6366f1 100%)';

      showStudioNotification('Thank you! Your project inquiry has been delivered. Lokesh will respond within 24 hours.', 'success');

      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 4000);
    });
  }

  function showStudioNotification(message, type) {
    const existing = document.getElementById('studio-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'studio-notification';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      max-width: 420px;
      padding: 1.1rem 1.6rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 500;
      z-index: 10002;
      box-shadow: 0 20px 45px rgba(0,0,0,0.6);
      transform: translateY(30px);
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      ${type === 'error'
        ? 'background: #1a0f14; color: #fca5a5; border: 1px solid rgba(244, 63, 94, 0.4);'
        : 'background: #0d161d; color: #93c5fd; border: 1px solid rgba(0, 240, 255, 0.4);'
      }
      backdrop-filter: blur(16px);
      font-family: 'Plus Jakarta Sans', sans-serif;
      line-height: 1.5;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }


  // --------------------------------------------------------------------------
  // 12. BACK TO TOP & SMOOTH ANCHORS
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ==========================================================================
  // FEATURE 01 CONTROLLER: CINEMATIC PAGE LOADER & MONOGRAM
  // ==========================================================================
  function initPageLoader() {
    const loader = document.getElementById('page-loader');
    const progressBar = document.getElementById('loader-progress-bar');
    const percentText = document.getElementById('loader-percent');

    if (!loader) {
      document.body.classList.remove('loading');
      initTextScramble();
      return;
    }

    let isCompleted = false;
    let progress = 0;
    const startTime = performance.now();
    const duration = 1000; // Smooth 1.0s intro

    function completeLoader() {
      if (isCompleted) return;
      isCompleted = true;
      if (progressBar) progressBar.style.width = '100%';
      if (percentText) percentText.textContent = '100%';
      loader.classList.add('loaded');
      document.body.classList.remove('loading');
      initTextScramble();
      setTimeout(() => {
        loader.style.display = 'none';
      }, 750);
    }

    // Dismiss loader immediately if user scrolls or presses key
    window.addEventListener('wheel', completeLoader, { once: true, passive: true });
    window.addEventListener('keydown', completeLoader, { once: true, passive: true });
    window.addEventListener('pointerdown', completeLoader, { once: true, passive: true });

    function updateLoader(now) {
      if (isCompleted) return;
      const elapsed = now - startTime;
      progress = Math.min(Math.round((elapsed / duration) * 100), 100);

      if (progressBar) progressBar.style.width = `${progress}%`;
      if (percentText) percentText.textContent = `${progress}%`;

      if (progress < 100) {
        requestAnimationFrame(updateLoader);
      } else {
        setTimeout(completeLoader, 120);
      }
    }

    requestAnimationFrame(updateLoader);
  }


  // ==========================================================================
  // FEATURE 03: MONUMENTAL TEXT SCRAMBLE / DECIPHER EFFECT
  // ==========================================================================
  function initTextScramble() {
    const scrambleEls = document.querySelectorAll('[data-scramble]');
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789✦#%@&*';

    scrambleEls.forEach(el => {
      const targetText = el.getAttribute('data-scramble') || el.textContent.trim();
      let frame = 0;
      let animId = null;

      function runScramble() {
        if (animId) cancelAnimationFrame(animId);
        el.classList.add('is-scrambling');
        frame = 0;
        const totalFrames = 30;

        function update() {
          frame++;
          let output = '';
          const progress = frame / totalFrames;

          for (let i = 0; i < targetText.length; i++) {
            if (i / targetText.length < progress) {
              output += targetText[i];
            } else {
              output += glyphs[Math.floor(Math.random() * glyphs.length)];
            }
          }

          el.textContent = output;

          if (frame < totalFrames) {
            animId = requestAnimationFrame(update);
          } else {
            el.textContent = targetText;
            el.classList.remove('is-scrambling');
            animId = null;
          }
        }

        update();
      }

      runScramble();

      el.addEventListener('mouseenter', () => {
        if (!animId) runScramble();
      });
    });
  }


  // ==========================================================================
  // FEATURE 04: SKILLS SECTION INTERACTIVE PROFICIENCY BARS
  // ==========================================================================
  function initSkillBars() {
    const skillBars = document.querySelectorAll('.tool-skill-bar');
    if (!skillBars.length) return;

    const barObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetPct = parseInt(bar.getAttribute('data-pct'), 10) || 85;
          const fill = bar.querySelector('.tool-skill-fill');
          const pctText = bar.parentElement?.querySelector('.tool-skill-pct');

          if (fill) {
            fill.style.width = `${targetPct}%`;
          }

          if (pctText) {
            const duration = 1300;
            const start = performance.now();
            function updateCounter(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const current = Math.round((1 - Math.pow(1 - progress, 3)) * targetPct);
              pctText.textContent = `${current}%`;
              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                pctText.textContent = `${targetPct}%`;
              }
            }
            requestAnimationFrame(updateCounter);
          }

          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.25 });

    skillBars.forEach(bar => barObserver.observe(bar));
  }


  // ==========================================================================
  // FEATURE 05: PROJECT CARDS 3D PERSPECTIVE TILT
  // ==========================================================================
  function initProjectCardsTilt() {
    if (!isFinePointer) return;
    const cards = document.querySelectorAll('.project-showcase-item');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const percentX = (mouseX - centerX) / centerX;
        const percentY = (mouseY - centerY) / centerY;

        const rotX = -percentY * 7.5;
        const rotY = percentX * 7.5;

        card.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.018, 1.018, 1.018)`;
        card.style.setProperty('--cursor-x', `${mouseX}px`);
        card.style.setProperty('--cursor-y', `${mouseY}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }


  // ==========================================================================
  // FEATURE 08: LIGHTWEIGHT GLOWING PARTICLE TRAIL (0ms Lag, Non-Blocking)
  // ==========================================================================
  function initCursorTrail() {
    if (!isFinePointer) return;
    const canvas = document.getElementById('cursor-trail-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particles = [];
    const maxParticles = 24;
    let animActive = false;

    window.addEventListener('mousemove', (e) => {
      const isDay = document.documentElement.getAttribute('data-theme') === 'day';
      const colors = isDay
        ? ['#ef4444', '#f97316', '#eab308']
        : ['#00f0ff', '#00f5d4', '#8338ec'];

      if (particles.length < maxParticles) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.3,
          size: Math.random() * 2.2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.75,
          decay: 0.03
        });
      }

      if (!animActive) {
        animActive = true;
        requestAnimationFrame(renderTrail);
      }
    }, { passive: true });

    function renderTrail() {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size *= 0.95;

        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (particles.length > 0) {
        requestAnimationFrame(renderTrail);
      } else {
        ctx.clearRect(0, 0, width, height);
        animActive = false;
      }
    }
  }


  // ==========================================================================
  // FEATURE 10: EDITORIAL FLOATING SECTION NUMBERS PARALLAX
  // ==========================================================================
  function initFloatingSectionNumbers() {
    const numbers = document.querySelectorAll('.section-floating-num');
    if (!numbers.length) return;

    window.addEventListener('scroll', () => {
      const vh = window.innerHeight;
      numbers.forEach(num => {
        const parent = num.closest('section');
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < vh) {
          const centerOffset = (rect.top + rect.height / 2 - vh / 2) * 0.11;
          num.style.transform = `translateY(${centerOffset.toFixed(1)}px)`;
        }
      });
    }, { passive: true });
  }


  // ==========================================================================
  // FEATURE 11: HERO 3D VIBE SELECTOR
  // ==========================================================================
  function initHeroVibeControls() {
    const vibeBtns = document.querySelectorAll('.vibe-btn');
    vibeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const vibe = btn.getAttribute('data-vibe');
        if (typeof window.switchHeroVibe === 'function') {
          window.switchHeroVibe(vibe);
          showStudioNotification(`Visual Mode: ${btn.textContent.trim()} Activated ✦`, 'success');
        }
      });
    });
  }


  // ==========================================================================
  // FEATURE 12: VIDEO COLOR GRADING COMPARISON SLIDER (RAW LOG vs 4K MASTER)
  // ==========================================================================
  function initVideoGradingSlider() {
    const sliders = document.querySelectorAll('.grading-slider-container');
    sliders.forEach(container => {
      const handle = container.querySelector('.grading-slider-handle');
      const gradedLayer = container.querySelector('.grading-layer-graded');
      if (!handle || !gradedLayer) return;

      let isDragging = false;

      function updateSlider(clientX) {
        const rect = container.getBoundingClientRect();
        let offsetX = clientX - rect.left;
        offsetX = Math.max(0, Math.min(offsetX, rect.width));
        const pct = (offsetX / rect.width) * 100;

        handle.style.left = `${pct}%`;
        gradedLayer.style.clipPath = `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)`;
      }

      container.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSlider(e.clientX);
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX);
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
      });

      // Touch support
      container.addEventListener('touchstart', (e) => {
        isDragging = true;
        if (e.touches[0]) updateSlider(e.touches[0].clientX);
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (!isDragging || !e.touches[0]) return;
        updateSlider(e.touches[0].clientX);
      }, { passive: true });

      window.addEventListener('touchend', () => {
        isDragging = false;
      });

      // Quick toggle buttons if present
      const toggleBtns = container.parentElement.querySelectorAll('.grading-mode-btn');
      toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const mode = btn.getAttribute('data-grade-mode');
          if (mode === 'log') {
            handle.style.left = '0%';
            gradedLayer.style.clipPath = 'polygon(0 0, 0% 0, 0% 100%, 0 100%)';
          } else if (mode === 'graded') {
            handle.style.left = '100%';
            gradedLayer.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
          } else {
            // Split 50%
            handle.style.left = '50%';
            gradedLayer.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
          }
        });
      });
    });
  }


  // ==========================================================================
  // FEATURE 13: BRAND PALETTE SWATCHES & HEX COPY TO CLIPBOARD
  // ==========================================================================
  function initBrandSwatchesCopy() {
    const swatches = document.querySelectorAll('.brand-swatch');
    swatches.forEach(swatch => {
      swatch.addEventListener('click', async (e) => {
        e.stopPropagation();
        const hex = swatch.getAttribute('data-hex') || swatch.textContent.trim();
        try {
          await navigator.clipboard.writeText(hex);
          showStudioNotification(`Copied ${hex} to clipboard! ✦`, 'success');
          swatch.classList.add('copied');
          setTimeout(() => swatch.classList.remove('copied'), 1500);
        } catch (err) {
          showStudioNotification(`Color: ${hex}`, 'info');
        }
      });
    });
  }


  // ==========================================================================
  // FEATURE 14: CONTACT FORM SERVICE PILLS SELECTOR & WHATSAPP
  // ==========================================================================
  function initContactServicePills() {
    const servicePills = document.querySelectorAll('.contact-service-pill');
    const messageInput = document.getElementById('form-message');

    servicePills.forEach(pill => {
      pill.addEventListener('click', () => {
        pill.classList.toggle('selected');
        const selected = Array.from(document.querySelectorAll('.contact-service-pill.selected'))
          .map(p => p.getAttribute('data-service'));

        if (messageInput && selected.length > 0) {
          const currentVal = messageInput.value.replace(/\[Interested in: [^\]]+\]\s*/g, '');
          messageInput.value = `[Interested in: ${selected.join(', ')}]\n${currentVal.trimStart()}`;
        }
      });
    });

    // Direct WhatsApp send button
    const waBtn = document.getElementById('btn-whatsapp-chat');
    if (waBtn) {
      waBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('form-name');
        const name = nameInput ? nameInput.value.trim() : '';
        const selected = Array.from(document.querySelectorAll('.contact-service-pill.selected'))
          .map(p => p.getAttribute('data-service'));

        let text = 'Hi Lokesh, I came across your creative portfolio!';
        if (name) text += ` My name is ${name}.`;
        if (selected.length > 0) text += ` I'm interested in collaborating on: ${selected.join(', ')}.`;

        const waUrl = `https://wa.me/919358991311?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }


  // Initialize all studio features
  initSkillBars();
  initProjectCardsTilt();
  initCursorTrail();
  initFloatingSectionNumbers();
  initHeroVibeControls();
  initVideoGradingSlider();
  initBrandSwatchesCopy();
  initContactServicePills();

});
