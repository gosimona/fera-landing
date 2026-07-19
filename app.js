/* ==========================================================================
   FERA — App logic (theming, dynamic content per gender, countdown, BOGO
   modal, FAQ, scroll reveal, toasts, sticky glass header)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     CONFIG — edita estos valores para tu operación real
  ------------------------------------------------------- */
  const CONFIG = {
    whatsappNumber: '573001234567', // número de WhatsApp del equipo de ventas (formato internacional, sin '+')
  };

  const html = document.documentElement;
  const currencyFmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

  /* -------------------------------------------------------
     Año dinámico en el footer
  ------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     CONTENIDO CAMALEÓN — todo lo que muta según HIM / HER
  ========================================================= */
  const CONTENT = {
    him: {
      hero: {
        title: 'Despierta su instinto animal. <span class="accent-text">Domina su atención</span> sin decir una sola palabra.',
        subtitle: 'Copulinas y feromonas puras suspendidas en un concentrado de aceite de alta fijación. Una señal directa a su cerebro reptiliano: la parte que decide, en segundos, si te mira dos veces o ni te registra.',
      },
      benefits: [
        {
          icon: '<path d="M12 2v6M12 16v6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M2 12h6M16 12h6M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2"/>',
          title: 'Copulinas &amp; Feromonas Puras',
          text: 'Señales químicas que hablan directo con su cerebro reptiliano. Sin pasar por la razón, sin pasar por el filtro social — solo instinto puro.',
          detail: 'En menos de 3 segundos de cercanía, su sistema límbico ya registró tu presencia como algo que quiere tener cerca. Así de rápido funciona.',
        },
        {
          icon: '<path d="M12 2C8 6 5 10 5 14a7 7 0 0014 0c0-4-3-8-7-12z"/>',
          title: 'Base en Aceite Concentrado',
          text: 'A diferencia del alcohol barato, el aceite se fija en tu piel y libera el aroma de forma progresiva. Rinde toda la noche, todas las noches.',
          detail: 'Ideal para <strong class="text-white/80">layering</strong>: aplícalo antes de tu perfume de siempre y deja que las feromonas hagan el trabajo mientras tu fragancia se lleva el crédito.',
        },
        {
          icon: '<path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z"/>',
          title: 'Dopamina en &lt;3 Segundos',
          text: 'El aroma dispara una respuesta de placer y urgencia inmediata en cualquier mujer que lo perciba: curiosidad, cercanía, ganas de acercarse más.',
          detail: 'No se trata de oler bien. Se trata de generar una reacción neuroquímica que ningún perfume de percha puede provocar por sí solo.',
        },
      ],
      packages: [
        {
          id: 1, units: 1, badge: null, name: 'El Probador', desc: '1 Frasco FERA FOR HIM · 15ml',
          price: 149900, original: 149900,
          features: [ ['✓', '1 Frasco de 15ml'], ['✓', 'Feromonas concentradas'], ['✗', 'Envío gratis', true], ['✗', 'Atomizador de bolsillo', true] ],
        },
        {
          id: 2, units: 2, badge: 'MÁS VENDIDO', featured: true, name: 'Compra 1, Lleva 2', desc: '2 Frascos FERA FOR HIM · 15ml c/u',
          price: 149900, original: 299800,
          features: [ ['✓', '2 Frascos de 15ml <span class="accent-text font-semibold">(1 GRATIS)</span>'], ['✓', 'Feromonas concentradas'], ['✓', 'Envío gratis a todo el país'], ['✓', 'Atomizador de bolsillo de regalo'] ],
        },
        {
          id: 4, units: 4, badge: null, name: 'El Arsenal Completo', desc: '4 Frascos FERA FOR HIM · 15ml c/u',
          price: 299800, original: 599600,
          features: [ ['✓', '4 Frascos de 15ml <span class="text-white/80 font-semibold">(2 GRATIS)</span>'], ['✓', 'Feromonas concentradas'], ['✓', 'Envío prioritario gratis'], ['✓', '2 Atomizadores de bolsillo'] ],
        },
      ],
      testimonials: [
        {
          initials: 'SR', name: 'Santiago R.',
          messages: [
            { from: 'in', text: 'Hermano en serio qué te echaste ayer en el bar 😭' },
            { from: 'in', text: 'las tres viejas de la mesa de al lado no dejaban de mirar para acá' },
            { from: 'out', text: 'jajaja el FERA parce, lo combiné con mi perfume de siempre', time: '9:41 p.m.' },
            { from: 'out', text: 'una se vino a sentar sola conmigo, ni le hablé primero', time: '9:42 p.m.' },
            { from: 'in', text: 'no puede ser 💀 me consigues uno ya' },
          ],
        },
        {
          initials: 'AM', name: 'Andrés M.',
          messages: [
            { from: 'out', text: 'parce me puse el FERA antes de ir por ella, primera cita', time: '8:02 p.m.' },
            { from: 'out', text: 'no me soltó la mirada en toda la cena, ella misma acercó la silla', time: '8:03 p.m.' },
            { from: 'in', text: 'jajaja eso es layering hermano, te lo dije' },
            { from: 'out', text: 'coroné parce, ya vamos por la segunda cita 😏', time: '11:47 p.m.' },
          ],
        },
        {
          initials: 'CV', name: 'Camilo V.',
          messages: [
            { from: 'out', text: 'llevo 6 años con mi esposa y el sábado combiné el FERA con mi loción de siempre', time: '11:20 p.m.' },
            { from: 'out', text: 'se me pegó toda la noche como cuando estábamos empezando jajaja', time: '11:21 p.m.' },
            { from: 'in', text: 'eso es exactamente lo que hace, dominio total' },
            { from: 'out', text: 'ya pedí el combo de 4, no me quedo sin esto nunca más', time: '11:23 p.m.' },
          ],
        },
      ],
    },

    her: {
      hero: {
        title: 'Haz que se vuelva loco por ti. <span class="accent-text">Literalmente incontrolable.</span>',
        subtitle: 'Copulinas y feromonas puras suspendidas en un concentrado de aceite de alta fijación. Una señal directa a su cerebro reptiliano: la parte que decide, en segundos, si no puede dejar de mirarte.',
      },
      benefits: [
        {
          icon: '<path d="M12 2v6M12 16v6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M2 12h6M16 12h6M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2"/>',
          title: 'Copulinas &amp; Feromonas Puras',
          text: 'Señales químicas que hablan directo con su cerebro reptiliano. Sin pasar por la razón, sin pasar por el filtro social — solo instinto puro.',
          detail: 'En menos de 3 segundos de cercanía, su sistema límbico ya te registró como alguien que no puede dejar de mirar. Así de rápido funciona.',
        },
        {
          icon: '<path d="M12 2C8 6 5 10 5 14a7 7 0 0014 0c0-4-3-8-7-12z"/>',
          title: 'Base en Aceite Concentrado',
          text: 'A diferencia del alcohol barato, el aceite se fija en tu piel y libera el aroma de forma progresiva. Aguanta toda la noche, toda la cita, toda la fiesta.',
          detail: 'Ideal para <strong class="text-white/80">layering</strong>: aplícalo antes de tu perfume de siempre y deja que las feromonas hagan el trabajo mientras tu fragancia se lleva el crédito.',
        },
        {
          icon: '<path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z"/>',
          title: 'Dopamina en &lt;3 Segundos',
          text: 'El aroma dispara una respuesta de placer y urgencia inmediata en cualquier hombre que lo perciba: curiosidad, cercanía, ganas de acercarse más.',
          detail: 'No se trata de oler bien. Se trata de generar una reacción neuroquímica que ningún perfume de percha puede provocar por sí solo.',
        },
      ],
      packages: [
        {
          id: 1, units: 1, badge: null, name: 'El Probador', desc: '1 Frasco FERA FOR HER · 15ml',
          price: 149900, original: 149900,
          features: [ ['✓', '1 Frasco de 15ml'], ['✓', 'Feromonas concentradas'], ['✗', 'Envío gratis', true], ['✗', 'Atomizador de bolsillo', true] ],
        },
        {
          id: 2, units: 2, badge: 'MÁS VENDIDO', featured: true, name: 'Compra 1, Lleva 2', desc: '2 Frascos FERA FOR HER · 15ml c/u',
          price: 149900, original: 299800,
          features: [ ['✓', '2 Frascos de 15ml <span class="accent-text font-semibold">(1 GRATIS)</span>'], ['✓', 'Feromonas concentradas'], ['✓', 'Envío gratis a todo el país'], ['✓', 'Atomizador de bolsillo de regalo'] ],
        },
        {
          id: 4, units: 4, badge: null, name: 'El Arsenal Completo', desc: '4 Frascos FERA FOR HER · 15ml c/u',
          price: 299800, original: 599600,
          features: [ ['✓', '4 Frascos de 15ml <span class="text-white/80 font-semibold">(2 GRATIS)</span>'], ['✓', 'Feromonas concentradas'], ['✓', 'Envío prioritario gratis'], ['✓', '2 Atomizadores de bolsillo'] ],
        },
      ],
      testimonials: [
        {
          initials: 'VG', name: 'Valentina G.',
          messages: [
            { from: 'in', text: 'amiga qué te pusiste ayer que el man no despegaba los ojos de ti 😭' },
            { from: 'in', text: 'literal te sacó a bailar antes de que tú dijeras nada' },
            { from: 'out', text: 'jajaja el FERA for her amiga, lo combiné con mi perfume de siempre', time: '10:15 p.m.' },
            { from: 'out', text: 'me agarró de la mano y no me soltó el resto de la noche', time: '10:16 p.m.' },
            { from: 'in', text: 'no puede ser 🔥 me consigues uno ya' },
          ],
        },
        {
          initials: 'DR', name: 'Daniela R.',
          messages: [
            { from: 'out', text: 'amiga me puse el FERA for her en la primera cita', time: '7:15 p.m.' },
            { from: 'out', text: 'el man no dejó de acercarse toda la noche, literal no soltaba mi mano', time: '7:16 p.m.' },
            { from: 'in', text: 'jaja te dije que funcionaba 🔥' },
            { from: 'out', text: 'me escribió hoy diciendo que no deja de pensar en cómo olía 😳', time: '10:03 a.m.' },
          ],
        },
        {
          initials: 'LM', name: 'Laura M.',
          messages: [
            { from: 'out', text: 'llevo 5 años con mi novio y el viernes combiné el FERA con mi perfume de siempre', time: '11:40 p.m.' },
            { from: 'out', text: 'se me pegó toda la noche como cuando estábamos empezando, no lo podía creer', time: '11:41 p.m.' },
            { from: 'in', text: 'eso es layering amiga, ese es el secreto' },
            { from: 'out', text: 'ya pedí el combo de 4, no me quedo sin esto nunca más', time: '11:43 p.m.' },
          ],
        },
      ],
    },
  };

  /* =========================================================
     RENDER — construcción de HTML dinámico por sección
  ========================================================= */
  const benefitsGrid = document.getElementById('benefits-grid');
  const packagesGrid = document.getElementById('packages-grid');
  const testimonialsGrid = document.getElementById('testimonials-grid');

  function benefitCardHtml(b, i, revealedNow = true) {
    return `
      <div class="benefit-card reveal${revealedNow ? ' revealed' : ''}" style="transition-delay:${i * 0.08}s">
        <div class="benefit-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${b.icon}</svg>
        </div>
        <h3 class="font-display font-bold text-lg mb-2">${b.title}</h3>
        <p class="text-white/50 text-sm leading-relaxed mb-3">${b.text}</p>
        <div class="benefit-detail">
          <p class="text-white/60 text-xs leading-relaxed pt-3 border-t border-white/10">${b.detail}</p>
        </div>
      </div>`;
  }

  function pkgCardHtml(p, i, revealedNow = true) {
    const featuredClass = p.featured ? ' pkg-featured' : '';
    const badgeHtml = p.badge ? `<span class="pkg-badge">${p.badge}</span>` : '';
    const priceHtml = p.original > p.price
      ? `<span class="text-white/30 text-sm line-through mr-2">${currencyFmt.format(p.original)}</span><span class="text-3xl md:text-4xl font-display font-black${p.featured ? ' accent-text' : ''}">${currencyFmt.format(p.price)}</span>`
      : `<span class="text-3xl font-display font-black">${currencyFmt.format(p.price)}</span>`;
    const featuresHtml = p.features.map(([mark, label, dim]) => `<li class="${dim ? 'text-white/25' : (p.featured ? 'text-white/60' : 'text-white/50')}">${mark} ${label}</li>`).join('');
    const btnClass = p.featured ? 'pkg-select-btn pkg-select-btn-featured w-full' : 'pkg-select-btn w-full';

    return `
      <article class="pkg-card${featuredClass} reveal${revealedNow ? ' revealed' : ''}" style="transition-delay:${i * 0.08}s"
        data-pkg="${p.id}" data-units="${p.units}" data-price="${p.price}" data-original="${p.original}" data-label="${p.desc.replace(/"/g, '&quot;')} (${p.name})">
        ${badgeHtml}
        <h3 class="font-display font-bold text-lg mb-1">${p.name}</h3>
        <p class="text-white/40 text-xs mb-6">${p.desc}</p>
        <div class="mb-6">
          ${priceHtml}
          <span class="block text-white/30 text-xs mt-1">COP · pago contra entrega</span>
        </div>
        <ul class="text-sm space-y-2 mb-8">${featuresHtml}</ul>
        <button class="${btnClass}">Elegir Este</button>
      </article>`;
  }

  function chatBubbleHtml(m) {
    const metaHtml = m.from === 'out' ? `<span class="wa-meta">${m.time} <span class="wa-check">✓✓</span></span>` : '';
    return `<div class="wa-bubble wa-${m.from}">${m.text}${metaHtml}</div>`;
  }

  function testimonialCardHtml(t, i, theme, revealedNow = true) {
    const avatarClass = theme === 'her' ? 'wa-avatar wa-avatar-her' : 'wa-avatar';
    return `
      <div class="wa-phone reveal${revealedNow ? ' revealed' : ''}" style="transition-delay:${i * 0.08}s">
        <div class="wa-header">
          <div class="${avatarClass}">${t.initials}</div>
          <div>
            <p class="wa-name">${t.name}</p>
            <p class="wa-status">en línea</p>
          </div>
        </div>
        <div class="wa-body">${t.messages.map(chatBubbleHtml).join('')}</div>
      </div>`;
  }

  function renderAll(theme) {
    const data = CONTENT[theme];
    benefitsGrid.innerHTML = data.benefits.map((b, i) => benefitCardHtml(b, i, false)).join('');
    packagesGrid.innerHTML = data.packages.map((p, i) => pkgCardHtml(p, i, false)).join('');
    testimonialsGrid.innerHTML = data.testimonials.map((t, i) => testimonialCardHtml(t, i, theme, false)).join('');
  }

  // Primer render — contenido inicial (HIM, por defecto en data-theme del <html>)
  renderAll(html.getAttribute('data-theme') || 'him');

  /* -------------------------------------------------------
     CROSSFADE — transición suave de contenido al cambiar tema
  ------------------------------------------------------- */
  function fadeSwap(container, renderFn) {
    if (!container) { renderFn(); return; }
    container.classList.add('content-fading');
    setTimeout(() => {
      renderFn();
      container.classList.remove('content-fading');
    }, 260);
  }

  /* -------------------------------------------------------
     SELECTOR DE TEMA: FOR HIM / FOR HER
  ------------------------------------------------------- */
  const themeBtns = document.querySelectorAll('[data-theme-btn]');
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');

  function setTheme(theme, { scroll = false } = {}) {
    if (html.getAttribute('data-theme') === theme) {
      if (scroll) document.getElementById('oferta').scrollIntoView({ behavior: 'smooth' });
      return;
    }

    html.setAttribute('data-theme', theme);

    themeBtns.forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.dataset.themeBtn === theme ? 'true' : 'false');
    });

    if (heroTitle && heroSubtitle && CONTENT[theme]) {
      heroTitle.style.opacity = '0';
      heroSubtitle.style.opacity = '0';
      setTimeout(() => {
        heroTitle.innerHTML = CONTENT[theme].hero.title;
        heroSubtitle.textContent = CONTENT[theme].hero.subtitle;
        heroTitle.style.opacity = '1';
        heroSubtitle.style.opacity = '1';
      }, 220);
    }

    fadeSwap(benefitsGrid, () => { benefitsGrid.innerHTML = CONTENT[theme].benefits.map(benefitCardHtml).join(''); });
    fadeSwap(packagesGrid, () => { packagesGrid.innerHTML = CONTENT[theme].packages.map(pkgCardHtml).join(''); });
    fadeSwap(testimonialsGrid, () => { testimonialsGrid.innerHTML = CONTENT[theme].testimonials.map((t, i) => testimonialCardHtml(t, i, theme)).join(''); });

    if (scroll) {
      setTimeout(() => document.getElementById('oferta').scrollIntoView({ behavior: 'smooth' }), 80);
    }
  }

  themeBtns.forEach((btn) => {
    btn.addEventListener('click', () => setTheme(btn.dataset.themeBtn, { scroll: true }));
  });

  /* -------------------------------------------------------
     STICKY HEADER — glassmorphism reactivo al scroll
  ------------------------------------------------------- */
  const header = document.getElementById('site-header');
  let lastScrollState = false;
  function updateHeaderState() {
    const scrolled = window.scrollY > 24;
    if (scrolled !== lastScrollState) {
      header.classList.toggle('header-scrolled', scrolled);
      lastScrollState = scrolled;
    }
  }
  updateHeaderState();
  window.addEventListener('scroll', () => requestAnimationFrame(updateHeaderState), { passive: true });

  /* -------------------------------------------------------
     SCROLL REVEAL (IntersectionObserver) — fade-in up premium
  ------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  function observeReveals(root = document) {
    root.querySelectorAll('.reveal:not(.revealed)').forEach((el) => revealObserver.observe(el));
  }
  observeReveals();

  /* -------------------------------------------------------
     BENEFIT CARDS — tap to reveal on touch devices (delegado)
  ------------------------------------------------------- */
  benefitsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.benefit-card');
    if (!card) return;
    const isActive = card.classList.contains('active');
    benefitsGrid.querySelectorAll('.benefit-card').forEach((c) => c.classList.remove('active'));
    if (!isActive) card.classList.add('active');
  });

  /* -------------------------------------------------------
     BOTTLE MOCKUP — tilt 3D con el mouse
  ------------------------------------------------------- */
  document.querySelectorAll('[data-tilt]').forEach((bottle) => {
    bottle.addEventListener('mousemove', (e) => {
      const rect = bottle.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      bottle.style.transform = `rotateY(${x * 26}deg) rotateX(${y * -18}deg) scale(1.05)`;
    });
    bottle.addEventListener('mouseleave', () => {
      bottle.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
  });

  /* -------------------------------------------------------
     COUNTDOWN — se reinicia automáticamente cada 24h
     (cuenta regresiva hasta la próxima medianoche local)
  ------------------------------------------------------- */
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const diff = nextMidnight - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMinutes) cdMinutes.textContent = pad(minutes);
    if (cdSeconds) cdSeconds.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* -------------------------------------------------------
     FAQ ACCORDION
  ------------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* -------------------------------------------------------
     OFERTA BOGO — selección de paquete + modal de pedido (delegado)
  ------------------------------------------------------- */
  const modal = document.getElementById('order-modal');
  const modalTitle = document.getElementById('modal-pkg-title');
  const modalDesc = document.getElementById('modal-pkg-desc');
  const modalTotal = document.getElementById('modal-total');
  const modalPkgField = document.getElementById('modal-pkg-field');
  const orderForm = document.getElementById('order-form');
  const orderFormView = document.getElementById('order-form-view');
  const orderSuccessView = document.getElementById('order-success-view');

  function openModal(pkgEl) {
    const label = pkgEl.dataset.label;
    const units = pkgEl.dataset.units;
    const price = Number(pkgEl.dataset.price);

    modalTitle.textContent = label;
    modalDesc.textContent = `${units} frasco${units > 1 ? 's' : ''} FERA · 15ml c/u`;
    modalTotal.textContent = currencyFmt.format(price);
    modalPkgField.value = label;

    orderFormView.classList.remove('hidden');
    orderSuccessView.classList.add('hidden');

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  packagesGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.pkg-select-btn');
    if (!btn) return;
    openModal(btn.closest('.pkg-card'));
  });

  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(orderForm);
    const nombre = formData.get('nombre');
    const telefono = formData.get('telefono');
    const ciudad = formData.get('ciudad');
    const direccion = formData.get('direccion');
    const paquete = formData.get('paquete');
    const total = modalTotal.textContent;

    // Muestra confirmación visual inmediata
    orderFormView.classList.add('hidden');
    orderSuccessView.classList.remove('hidden');

    // Abre WhatsApp con el pedido pre-armado para que el equipo de ventas confirme la entrega.
    // Reemplaza CONFIG.whatsappNumber arriba por el número real de tu operación.
    const message =
      `Hola FERA! Quiero confirmar mi pedido:%0A` +
      `Paquete: ${paquete}%0A` +
      `Total contra entrega: ${total}%0A` +
      `Nombre: ${nombre}%0A` +
      `Teléfono: ${telefono}%0A` +
      `Ciudad: ${ciudad}%0A` +
      `Dirección: ${direccion}`;

    if (CONFIG.whatsappNumber) {
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${message}`, '_blank');
    }

    orderForm.reset();
  });

  /* -------------------------------------------------------
     NOTIFICACIONES SOCIALES FLOTANTES (prueba social simulada)
  ------------------------------------------------------- */
  const toastContainer = document.getElementById('toast-container');

  const NAMES = ['Camila', 'Andrés', 'Valentina', 'Santiago', 'Laura', 'Julián', 'Mariana', 'Felipe', 'Daniela', 'Esteban'];
  const CITIES = ['Bucaramanga', 'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Pereira', 'Manizales', 'Cúcuta', 'Ibagué'];
  const PACKAGES = ['Combo 1+1 Gratis 🔥', 'El Arsenal Completo (2+2 Gratis)', 'FERA for Him', 'FERA for Her'];

  function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function showToast() {
    const name = randomFrom(NAMES);
    const city = randomFrom(CITIES);
    const pkg = randomFrom(PACKAGES);

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-dot"></span>
      <p><strong>${name}</strong> en <strong>${city}</strong> acaba de comprar el <strong>${pkg}</strong></p>
    `;

    toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 5000);
  }

  // Primera notificación a los 4s, luego cada 9-18s de forma aleatoria
  setTimeout(showToast, 4000);
  setInterval(() => showToast(), 9000 + Math.random() * 9000);

});
