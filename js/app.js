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
};

document.addEventListener("DOMContentLoaded", () => MYP.init());

/* Expose for inline onclick usage */
window.MYP = MYP;
