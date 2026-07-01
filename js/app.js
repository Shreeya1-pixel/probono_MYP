/* ───────────────────────────────────────────────
   MYP – Mark Your Presence  |  app.js
─────────────────────────────────────────────── */
const MYP = {
  electionDate: new Date("2029-04-15T00:00:00"),

  init() {
    this.initCountdown();
    this.initMobileMenu();
    this.initAccordions();
    this.initScrollAnimations();
    this.highlightActiveNav();
    this.initModals();
    this.initNewsletterPopup();
    this.initToastContainer();
    this.initStatsCTA();
    this.initPressWidget();
    this.initPressPage();
  },

  /* ── Election countdown ── */
  initCountdown() {
    const container = document.getElementById("election-countdown");
    if (!container) return;
    const daysEl = container.querySelector("[data-days]");
    const hrsEl  = container.querySelector("[data-hrs]");
    const minsEl = container.querySelector("[data-mins]");
    const secsEl = container.querySelector("[data-secs]");
    const tick = () => {
      const diff = Math.max(0, this.electionDate - new Date());
      if (daysEl) daysEl.textContent = String(Math.floor(diff / 864e5)).padStart(2, "0");
      if (hrsEl)  hrsEl.textContent  = String(Math.floor((diff / 36e5)  % 24)).padStart(2, "0");
      if (minsEl) minsEl.textContent = String(Math.floor((diff / 6e4)   % 60)).padStart(2, "0");
      if (secsEl) secsEl.textContent = String(Math.floor((diff / 1e3)   % 60)).padStart(2, "0");
    };
    tick();
    setInterval(tick, 1000);
  },

  /* ── Mobile slide-in menu ── */
  initMobileMenu() {
    const toggle  = document.getElementById("menu-toggle");
    const close   = document.getElementById("menu-close");
    const menu    = document.getElementById("mobile-menu");
    const overlay = document.getElementById("menu-overlay");
    if (!toggle || !menu) return;
    const open = () => { menu.classList.add("open"); overlay?.classList.remove("hidden"); document.body.style.overflow = "hidden"; };
    const shut = () => { menu.classList.remove("open"); overlay?.classList.add("hidden"); document.body.style.overflow = ""; };
    toggle.addEventListener("click", open);
    close?.addEventListener("click", shut);
    overlay?.addEventListener("click", shut);
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", shut));
  },

  /* ── Accordion FAQ ── */
  initAccordions() {
    document.querySelectorAll("[data-accordion]").forEach(btn => {
      btn.addEventListener("click", () => {
        const panel = btn.nextElementSibling;
        const arrow = btn.querySelector(".arrow");
        const isOpen = !panel.classList.contains("hidden");
        document.querySelectorAll("[data-accordion-panel]").forEach(p => p.classList.add("hidden"));
        document.querySelectorAll("[data-accordion] .arrow").forEach(a => a.classList.remove("rotate-180"));
        if (!isOpen) { panel.classList.remove("hidden"); arrow?.classList.add("rotate-180"); }
      });
    });
  },

  /* ── Scroll-triggered fade-in ── */
  initScrollAnimations() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));
  },

  /* ── Active nav link ── */
  highlightActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav]").forEach(link => {
      if (link.getAttribute("href") === path || (path === "" && link.getAttribute("href") === "index.html")) {
        link.classList.add("text-primary", "font-bold");
        link.classList.remove("text-on-surface-variant");
      }
    });
  },

  /* ─────────────────────────────────────
     MODAL SYSTEM
  ───────────────────────────────────── */
  initModals() {
    // Open via data-modal-open="modalId"
    document.querySelectorAll("[data-modal-open]").forEach(trigger => {
      trigger.addEventListener("click", () => this.openModal(trigger.dataset.modalOpen));
    });
    // Close via backdrop click or close button
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", e => {
        if (e.target === backdrop) this.closeModal(backdrop.id);
      });
    });
    document.querySelectorAll(".modal-close").forEach(btn => {
      btn.addEventListener("click", () => this.closeModal(btn.closest(".modal-backdrop").id));
    });
    // ESC key
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") document.querySelectorAll(".modal-backdrop.open").forEach(m => this.closeModal(m.id));
    });
  },

  openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add("open");
    document.body.style.overflow = "hidden";
  },

  closeModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove("open");
    document.body.style.overflow = "";
  },

  /* ─────────────────────────────────────
     TOAST NOTIFICATIONS
  ───────────────────────────────────── */
  initToastContainer() {
    if (!document.getElementById("toast-container")) {
      const c = document.createElement("div");
      c.id = "toast-container";
      document.body.appendChild(c);
    }
  },

  showToast(msg, type = "success", duration = 3500) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const icon = type === "success" ? "check_circle" : "info";
    const t = document.createElement("div");
    t.className = `toast toast-${type}`;
    t.innerHTML = `<span class="material-symbols-outlined" style="font-size:18px">${icon}</span>${msg}`;
    container.appendChild(t);
    setTimeout(() => {
      t.classList.add("removing");
      setTimeout(() => t.remove(), 300);
    }, duration);
  },

  /* ─────────────────────────────────────
     NEWSLETTER POPUP
  ───────────────────────────────────── */
  initNewsletterPopup() {
    const popup   = document.getElementById("newsletter-popup");
    const trigger = document.getElementById("newsletter-trigger");
    const closeBtn= document.getElementById("newsletter-close");
    const form    = document.getElementById("newsletter-form");
    if (!popup) return;

    // Auto-show after 8 s (first visit only)
    if (!sessionStorage.getItem("nl-seen")) {
      setTimeout(() => { popup.classList.add("open"); sessionStorage.setItem("nl-seen","1"); }, 8000);
    }
    trigger?.addEventListener("click", () => popup.classList.add("open"));
    closeBtn?.addEventListener("click", () => popup.classList.remove("open"));

    form?.addEventListener("submit", e => {
      e.preventDefault();
      popup.classList.remove("open");
      this.showToast("You're subscribed! Welcome to MYP.", "success");
    });
  },

  /* ── Stats clickable ── */
  initStatsCTA() {
    document.querySelectorAll("[data-stat-link]").forEach(el => {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => window.location = el.dataset.statLink);
    });
  },

  /* ─────────────────────────────────────
     PRESS CORNER WIDGET (all pages)
  ───────────────────────────────────── */
  initPressWidget() {
    const articles = window.MYP_PRESS;
    if (!articles?.length || document.getElementById("press-widget")) return;

    const featured = articles.filter(a => a.featured);
    const tickerItems = featured.length ? featured : articles.slice(0, 6);

    const widget = document.createElement("div");
    widget.id = "press-widget";
    widget.className = "press-widget";
    widget.innerHTML = `
      <div id="press-panel" class="press-panel" aria-hidden="true">
        <div class="press-panel-header">
          <div>
            <span class="press-diana-badge">🏆 Diana Award</span>
            <h3 class="press-panel-title">In the Press</h3>
            <p class="press-panel-sub">${articles.length}+ stories on MYP &amp; Chaitanya Prabhu</p>
          </div>
          <button type="button" id="press-panel-close" class="press-panel-close" aria-label="Close">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="press-panel-list">
          ${tickerItems.map(a => `
            <a href="${a.url}" target="_blank" rel="noopener" class="press-panel-item">
              <span class="press-panel-outlet">${a.outlet}</span>
              <span class="press-panel-headline">${a.title}</span>
              <span class="material-symbols-outlined press-panel-arrow">open_in_new</span>
            </a>
          `).join("")}
        </div>
        <a href="press.html" class="press-panel-cta">View all coverage →</a>
      </div>
      <button type="button" id="press-trigger" class="press-trigger" aria-expanded="false" aria-controls="press-panel">
        <span class="press-trigger-icon material-symbols-outlined">newspaper</span>
        <span class="press-trigger-body">
          <span class="press-trigger-label">In the Press</span>
          <span class="press-ticker" id="press-ticker"></span>
        </span>
        <span class="press-trigger-pulse"></span>
      </button>
    `;
    document.body.appendChild(widget);

    const panel = document.getElementById("press-panel");
    const trigger = document.getElementById("press-trigger");
    const closeBtn = document.getElementById("press-panel-close");
    const ticker = document.getElementById("press-ticker");

    let tickIdx = 0;
    const showTick = () => {
      if (!ticker || panel.classList.contains("open")) return;
      ticker.style.opacity = "0";
      setTimeout(() => {
        ticker.textContent = `${tickerItems[tickIdx].outlet}: ${tickerItems[tickIdx].title}`;
        ticker.style.opacity = "1";
        tickIdx = (tickIdx + 1) % tickerItems.length;
      }, 280);
    };
    showTick();
    setInterval(showTick, 4200);

    const open = () => {
      panel.classList.add("open");
      panel.setAttribute("aria-hidden", "false");
      trigger.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    };
    const shut = () => {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
      trigger.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    };

    trigger.addEventListener("click", () => panel.classList.contains("open") ? shut() : open());
    closeBtn?.addEventListener("click", shut);
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && panel.classList.contains("open")) shut();
    });

    if (!sessionStorage.getItem("press-hint")) {
      setTimeout(() => {
        trigger.classList.add("hint-bounce");
        setTimeout(() => trigger.classList.remove("hint-bounce"), 1200);
        sessionStorage.setItem("press-hint", "1");
      }, 3500);
    }
  },

  /* ── Press page filters ── */
  initPressPage() {
    const grid = document.getElementById("press-grid");
    const preview = document.getElementById("resources-press-preview");
    if (!window.MYP_PRESS) return;

    const cardHtml = (a) => `
      <a href="${a.url}" target="_blank" rel="noopener" class="press-card bento-card animate-on-scroll">
        <div class="press-card-top">
          <span class="press-card-cat">${window.MYP_PRESS_CATEGORIES[a.category] || a.category}</span>
          <span class="press-card-year">${a.year}</span>
        </div>
        <h3 class="press-card-title card-heading">${a.title}</h3>
        <p class="press-card-outlet">${a.outlet}</p>
        <span class="press-card-link">Read article <span class="material-symbols-outlined text-sm">arrow_forward</span></span>
      </a>
    `;

    if (grid) {
      const tabs = document.querySelectorAll("[data-press-filter]");
      const render = (cat) => {
        const list = cat === "all" ? window.MYP_PRESS : window.MYP_PRESS.filter(a => a.category === cat);
        grid.innerHTML = list.map(cardHtml).join("");
        grid.querySelectorAll(".animate-on-scroll").forEach(el => {
          requestAnimationFrame(() => el.classList.add("visible"));
        });
      };
      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
          tabs.forEach(t => {
            t.classList.remove("bg-primary", "text-on-primary", "font-bold");
            t.classList.add("bg-surface-container", "text-on-surface-variant");
          });
          tab.classList.add("bg-primary", "text-on-primary", "font-bold");
          tab.classList.remove("bg-surface-container", "text-on-surface-variant");
          render(tab.dataset.pressFilter);
        });
      });
      render("all");
    }

    if (preview) {
      const featured = window.MYP_PRESS.filter(a => a.featured).slice(0, 6);
      preview.innerHTML = featured.map(cardHtml).join("");
      preview.querySelectorAll(".animate-on-scroll").forEach(el => {
        requestAnimationFrame(() => el.classList.add("visible"));
      });
    }

    const marquee = document.getElementById("press-marquee");
    if (marquee) {
      const seen = new Set();
      const picks = [];
      for (const article of window.MYP_PRESS) {
        if (seen.has(article.outlet)) continue;
        seen.add(article.outlet);
        const fromOutlet = window.MYP_PRESS.filter(a => a.outlet === article.outlet);
        const best = fromOutlet.find(a => a.featured) || fromOutlet[0];
        picks.push(best);
        if (picks.length >= 14) break;
      }
      marquee.innerHTML = picks.map(a => {
        const title = a.title.replace(/"/g, "&quot;");
        return `<a href="${a.url}" target="_blank" rel="noopener" title="${title}" class="whitespace-nowrap font-bold text-sm px-md py-xs rounded-full bg-white border border-outline-variant/50 hover:border-primary hover:bg-white/90 transition-colors" style="color:#B52A1A">${a.outlet}</a>`;
      }).join("");
    }
  },
};

document.addEventListener("DOMContentLoaded", () => MYP.init());

/* Expose for inline onclick usage */
window.MYP = MYP;
