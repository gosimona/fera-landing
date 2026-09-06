/* ==========================================================================
   FERA — App logic (buybox/bundles, carousels, FAQ, reveal, toasts, modal)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     CONFIG — edita estos valores para tu operación real
  ------------------------------------------------------- */
  const CONFIG = {
    whatsappNumber: '573001234567', // número de WhatsApp del equipo de ventas (formato internacional, sin '+')
  };

  const currencyFmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

  /* -------------------------------------------------------
     Año dinámico en el footer
  ------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     DATOS — paquetes/bundle, testimonios, reseñas placeholder
  ========================================================= */
  const BUNDLES = [
    {
      id: 1, units: 1, badge: null, name: 'Comprar 1', desc: '1 Frasco FERA For Him · 15ml',
      price: 149900, original: 169900, perks: [],
    },
    {
      id: 2, units: 2, badge: null, name: 'Compra 1, Lleva 1 Gratis', desc: '2 Frascos FERA For Him · 15ml c/u',
      price: 149900, original: 299800, perks: ['+Frasco Sorpresa Gratis'],
    },
    {
      id: 4, units: 4, badge: 'MÁS POPULAR', featured: true, name: 'Compra 2, Lleva 2 Gratis', desc: '4 Frascos FERA For Him · 15ml c/u',
      price: 299800, original: 599600, perks: ['+Envío Gratis', '+Frasco Sorpresa Gratis'],
    },
    {
      id: 5, units: 5, badge: 'MEJOR OFERTA', name: 'Compra 3, Lleva 2 Gratis', desc: '5 Frascos FERA For Him · 15ml c/u',
      price: 449700, original: 749500, perks: ['+Envío Gratis', '+Frasco Sorpresa Gratis'],
    },
  ];

  const VIDEO_TESTIMONIALS = [
    { name: 'Santiago R.', quote: 'En serio no sé qué me eché, pero las viejas de la mesa de al lado no dejaban de mirar para acá.', tags: ['Más Atención', 'Efecto Inmediato'] },
    { name: 'Andrés M.', quote: 'Primera cita y no me soltó la mirada en toda la cena. Ella misma acercó la silla.', tags: ['Coroné', 'Layering'] },
    { name: 'Camilo V.', quote: 'Seis años con mi esposa y el sábado se me pegó toda la noche como al principio.', tags: ['Reencendió la Chispa'] },
    { name: 'Julián P.', quote: 'Me lo puse para ir a la oficina solo por probar. Una hasta me preguntó qué loción uso.', tags: ['Más Atención', 'En la Oficina'] },
    { name: 'Mateo S.', quote: 'No di abasto en la discoteca, las viejas literal hacían fila para hablarme.', tags: ['Dominó la Rumba'] },
  ];

  const QUOTE_TESTIMONIALS = [
    { name: 'Diego F.', quote: 'Primera cita después de hacer match. Se puso el FERA combinado con su perfume y ella no se despegó de él.', tags: ['Coroné', 'Primera Cita'] },
    { name: 'Nicolás R.', quote: 'Llevaba meses intentando que mi compañera de trabajo me parara bolas. El mismo día me escribió preguntando si quería salir.', tags: ['Confianza', 'Más Atención'] },
    { name: 'Sebastián T.', quote: 'Me encontré a mi ex en una fiesta con el FERA puesto. Terminamos hablando toda la noche como si nada.', tags: ['Reencendió la Chispa'] },
    { name: 'Felipe A.', quote: 'Es sutil pero potente. Tengo más contacto visual, más sonrisas, y siento que domino la situación.', tags: ['Cumplidos', 'Más Atención'] },
    { name: 'Esteban G.', quote: 'No es solo cómo reaccionan ellas — es cómo me siento yo. Más seguro, más tranquilo, más magnético.', tags: ['Confianza', 'Magnetismo'] },
  ];

  const FB_REVIEWS = [
    'Captura reseña Facebook — reacción de su pareja',
    'Captura reseña Facebook — antes/después de confianza',
    'Captura reseña Instagram — comentario destacado',
    'Captura reseña Facebook — comparación de resultados',
    'Captura reseña Facebook — mensaje de agradecimiento',
    'Captura reseña Instagram — historia destacada',
  ];

  /* =========================================================
     BUYBOX — bundle selector, add to cart, floating bar
  ========================================================= */
  const bundleOptionsEl = document.getElementById('bundle-options');
  let selectedPackage = null;

  function bundleOptionHtml(p) {
    const badgeHtml = p.badge ? `<span class="bundle-badge">${p.badge}</span>` : '';
    const perksHtml = p.perks.length ? `<div class="bundle-perks">${p.perks.join(' · ')}</div>` : '';
    const priceHtml = p.original > p.price
      ? `<span class="bundle-price-original">${currencyFmt.format(p.original)}</span><span class="bundle-price accent-text">${currencyFmt.format(p.price)}</span>`
      : `<span class="bundle-price">${currencyFmt.format(p.price)}</span>`;
    const savings = p.original - p.price;

    return `
      <label class="bundle-option${p.featured ? ' selected' : ''}" data-pkg="${p.id}" data-units="${p.units}" data-price="${p.price}" data-original="${p.original}" data-label="${p.desc.replace(/"/g, '&quot;')} (${p.name})">
        ${badgeHtml}
        <div class="bundle-main">
          <span class="bundle-radio"><span class="bundle-radio-dot"></span></span>
          <div>
            <div class="bundle-name">${p.name}</div>
            <div class="bundle-save">${p.units} frasco${p.units > 1 ? 's' : ''}${savings > 0 ? ` · ahorras ${currencyFmt.format(savings)}` : ''}</div>
            ${perksHtml}
          </div>
        </div>
        <div class="text-right">${priceHtml}</div>
      </label>`;
  }

  function renderBundles() {
    bundleOptionsEl.innerHTML = BUNDLES.map(bundleOptionHtml).join('');
  }
  renderBundles();

  function pkgDataFromOption(optionEl) {
    return {
      label: optionEl.dataset.label,
      units: Number(optionEl.dataset.units),
      price: Number(optionEl.dataset.price),
    };
  }

  function setSelectedPackage(optionEl) {
    bundleOptionsEl.querySelectorAll('.bundle-option').forEach((o) => o.classList.remove('selected'));
    optionEl.classList.add('selected');
    selectedPackage = pkgDataFromOption(optionEl);
    updateFloatingBar();
  }

  bundleOptionsEl.addEventListener('click', (e) => {
    const option = e.target.closest('.bundle-option');
    if (!option) return;
    setSelectedPackage(option);
  });

  // Selección inicial = paquete destacado (MÁS POPULAR)
  const initialFeatured = bundleOptionsEl.querySelector('.bundle-option.selected') || bundleOptionsEl.querySelector('.bundle-option');
  if (initialFeatured) selectedPackage = pkgDataFromOption(initialFeatured);

  /* -------------------------------------------------------
     TOGGLE DE SUSCRIPCIÓN (visual)
  ------------------------------------------------------- */
  const subscriptionToggle = document.getElementById('subscription-toggle');
  let isSubscribed = true;
  if (subscriptionToggle) {
    subscriptionToggle.addEventListener('click', () => {
      isSubscribed = !isSubscribed;
      subscriptionToggle.textContent = isSubscribed
        ? 'COMPRAR UNA VEZ — SIN DESCUENTO →'
        : '← SUSCRIBIRSE Y AHORRAR MÁS';
    });
  }

  /* -------------------------------------------------------
     GALERÍA — swap de placeholder principal al hacer clic en thumbs
  ------------------------------------------------------- */
  const pdpThumbs = document.getElementById('pdp-thumbs');
  const pdpMainLabel = document.getElementById('pdp-main-image-label');
  if (pdpThumbs && pdpMainLabel) {
    pdpThumbs.addEventListener('click', (e) => {
      const thumb = e.target.closest('.pdp-thumb');
      if (!thumb) return;
      pdpThumbs.querySelectorAll('.pdp-thumb').forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
      pdpMainLabel.textContent = `Reemplazar: ${thumb.dataset.label}`;
    });
  }

  /* -------------------------------------------------------
     STOCK BADGE — ciclo de urgencia
  ------------------------------------------------------- */
  const stockBadgeEl = document.getElementById('stock-badge');
  const stockBadgeTextEl = document.getElementById('stock-badge-text');
  const STOCK_STATES = [
    { text: 'STOCK BAJO — SE ESTÁ AGOTANDO', available: false },
    { text: 'CASI AGOTADO', available: false },
    { text: 'DISPONIBLE POR TIEMPO LIMITADO', available: true },
  ];
  let stockStateIndex = 0;
  if (stockBadgeEl && stockBadgeTextEl) {
    setInterval(() => {
      stockStateIndex = (stockStateIndex + 1) % STOCK_STATES.length;
      const state = STOCK_STATES[stockStateIndex];
      stockBadgeTextEl.textContent = state.text;
      stockBadgeEl.classList.toggle('is-available', state.available);
    }, 4500);
  }

  /* =========================================================
     CARRUSELES — video testimonios, quotes, reseñas FB
  ========================================================= */
  function starsHtml() { return '★★★★★'; }

  function videoCardHtml(t) {
    return `
      <div class="video-card">
        <div class="ph ph-video video-card-media">
          <div class="video-play-btn"><span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></div>
          <span class="ph-label">Reemplazar: video testimonio</span>
        </div>
        <div class="video-card-stars">${starsHtml()}</div>
        <p class="video-card-quote">"${t.quote}"</p>
        <p class="video-card-name">${t.name} <span class="text-white/30 font-normal">| Cliente Verificado</span></p>
        <div class="video-card-tags">${t.tags.map((tag) => `<span class="video-card-tag">${tag}</span>`).join('')}</div>
      </div>`;
  }

  function quoteCardHtml(t) {
    return `
      <div class="quote-card">
        <div class="video-card-stars">${starsHtml()}</div>
        <p class="video-card-quote">"${t.quote}"</p>
        <p class="video-card-name">${t.name} <span class="text-white/30 font-normal">| Cliente Verificado</span></p>
        <div class="video-card-tags">${t.tags.map((tag) => `<span class="video-card-tag">${tag}</span>`).join('')}</div>
      </div>`;
  }

  function fbReviewCardHtml(label) {
    return `
      <div class="fb-review-card">
        <div class="ph ph-portrait">
          <svg class="ph-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>
          <span class="ph-label">${label}</span>
        </div>
      </div>`;
  }

  function setupCarousel(trackEl, dotsEl, items, cardFn) {
    if (!trackEl) return;
    trackEl.innerHTML = items.map(cardFn).join('');
    if (!dotsEl) return;

    dotsEl.innerHTML = items.map((_, i) => `<span class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}"></span>`).join('');
    const cards = [...trackEl.children];
    const dots = [...dotsEl.children];

    dotsEl.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (!dot) return;
      const card = cards[Number(dot.dataset.index)];
      if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    });

    const dotObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = cards.indexOf(entry.target);
          dots.forEach((d) => d.classList.remove('active'));
          if (dots[idx]) dots[idx].classList.add('active');
        }
      });
    }, { root: trackEl, threshold: 0.6 });
    cards.forEach((c) => dotObserver.observe(c));
  }

  setupCarousel(document.getElementById('video-track'), document.getElementById('video-dots'), VIDEO_TESTIMONIALS, videoCardHtml);
  setupCarousel(document.getElementById('quote-track'), document.getElementById('quote-dots'), QUOTE_TESTIMONIALS, quoteCardHtml);

  const fbTrack = document.getElementById('fb-review-track');
  if (fbTrack) {
    const doubled = FB_REVIEWS.concat(FB_REVIEWS);
    fbTrack.innerHTML = doubled.map(fbReviewCardHtml).join('');
  }

  /* -------------------------------------------------------
     RESEÑAS — grid placeholder (simula widget tipo Loox)
  ------------------------------------------------------- */
  const reviewsWidgetPh = document.getElementById('reviews-widget-ph');
  if (reviewsWidgetPh) {
    const names = ['Camilo R.', 'Andrés F.', 'Julián T.', 'Santiago M.', 'Diego P.', 'Nicolás V.'];
    reviewsWidgetPh.innerHTML = names.map((name) => `
      <div class="review-card-ph">
        <div class="stars">★★★★★</div>
        <p>Reemplazar: reseña real de cliente (widget de reseñas verificadas)</p>
        <p class="name">${name}</p>
      </div>`).join('');
  }

  /* -------------------------------------------------------
     CONTADORES — animación de conteo al hacer scroll
  ------------------------------------------------------- */
  const counterEls = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * progress);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  counterEls.forEach((el) => counterObserver.observe(el));

  /* -------------------------------------------------------
     SCROLL REVEAL (IntersectionObserver) — fade-in up
  ------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* -------------------------------------------------------
     FAQ ACCORDION (buybox + sección principal)
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
     MODAL DE PEDIDO — WhatsApp checkout
  ------------------------------------------------------- */
  const modal = document.getElementById('order-modal');
  const modalTitle = document.getElementById('modal-pkg-title');
  const modalDesc = document.getElementById('modal-pkg-desc');
  const modalTotal = document.getElementById('modal-total');
  const modalPkgField = document.getElementById('modal-pkg-field');
  const orderForm = document.getElementById('order-form');
  const orderFormView = document.getElementById('order-form-view');
  const orderSuccessView = document.getElementById('order-success-view');

  function openModal(pkgData) {
    const { label, units, price } = pkgData;
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

  const addToCartBtn = document.getElementById('add-to-cart-btn');
  addToCartBtn.addEventListener('click', () => {
    if (selectedPackage) openModal(selectedPackage);
  });

  document.querySelectorAll('[data-close-modal]').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(orderForm);
    const nombre = formData.get('nombre');
    const telefono = formData.get('telefono');
    const ciudad = formData.get('ciudad');
    const direccion = formData.get('direccion');
    const paquete = formData.get('paquete');
    const total = modalTotal.textContent;

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
     BARRA FLOTANTE INTELIGENTE
  ------------------------------------------------------- */
  const floatingBar = document.getElementById('floating-bar');
  const floatingBarName = document.getElementById('floating-bar-name');
  const floatingBarPrice = document.getElementById('floating-bar-price');
  const floatingBarBtn = document.getElementById('floating-bar-btn');

  function updateFloatingBar() {
    if (!selectedPackage || !floatingBarName || !floatingBarPrice) return;
    floatingBarName.textContent = selectedPackage.label;
    floatingBarPrice.textContent = currencyFmt.format(selectedPackage.price);
  }
  updateFloatingBar();

  floatingBarBtn.addEventListener('click', () => { if (selectedPackage) openModal(selectedPackage); });

  const heroSection = document.getElementById('inicio');
  function updateFloatingBarVisibility() {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    floatingBar.classList.toggle('show', heroBottom < 0);
  }
  updateFloatingBarVisibility();
  window.addEventListener('scroll', () => requestAnimationFrame(updateFloatingBarVisibility), { passive: true });

  /* -------------------------------------------------------
     NEWSLETTER — confirmación simulada
  ------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('¡Gracias por suscribirte! Revisa tu correo para confirmar.');
      newsletterForm.reset();
    });
  }

  /* -------------------------------------------------------
     NOTIFICACIONES SOCIALES FLOTANTES (prueba social simulada)
  ------------------------------------------------------- */
  const toastContainer = document.getElementById('toast-container');
  const NAMES = ['Camila', 'Andrés', 'Valentina', 'Santiago', 'Laura', 'Julián', 'Mariana', 'Felipe', 'Daniela', 'Esteban'];
  const CITIES = ['Bucaramanga', 'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Pereira', 'Manizales', 'Cúcuta', 'Ibagué'];
  const PACKAGES = ['Compra 2, Lleva 2 Gratis 🔥', 'Compra 1, Lleva 1 Gratis', 'FERA For Him'];

  function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function showToast(customHtml) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    if (customHtml) {
      toast.innerHTML = `<span class="toast-dot"></span><p>${customHtml}</p>`;
    } else {
      const name = randomFrom(NAMES);
      const city = randomFrom(CITIES);
      const pkg = randomFrom(PACKAGES);
      toast.innerHTML = `<span class="toast-dot"></span><p><strong>${name}</strong> en <strong>${city}</strong> acaba de comprar el <strong>${pkg}</strong></p>`;
    }

    toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 5000);
  }

  setTimeout(() => showToast(), 4000);
  setInterval(() => showToast(), 9000 + Math.random() * 9000);

});
