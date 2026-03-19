/**
 * kagenti.io — site script
 * 1. Banner dismiss (session-persistent)
 * 2. Left-tab switching — .left-tabs components (capabilities stack)
 * 3. Horizontal tab switching — .htabs components (code section)
 * 4. Demo carousel — .demo-carousel (use cases section)
 * 5. Demo request CTA tracking (gtag stubs)
 */

/* --------------------------------------------------------------------------
   1. Banner dismiss
   -------------------------------------------------------------------------- */
function dismissBanner() {
  var banner = document.getElementById('event-banner');
  if (!banner) return;
  banner.classList.add('hidden');
  try { sessionStorage.setItem('kagenti-banner-dismissed', '1'); } catch (e) {}
}

(function () {
  try {
    if (sessionStorage.getItem('kagenti-banner-dismissed') === '1') {
      var banner = document.getElementById('event-banner');
      if (banner) banner.classList.add('hidden');
    }
  } catch (e) {}
})();

/* --------------------------------------------------------------------------
   2. Left-tab switching — .left-tabs components (capabilities stack)
   -------------------------------------------------------------------------- */
document.querySelectorAll('.left-tabs').forEach(function (tabs) {
  tabs.querySelectorAll('.left-tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = this.dataset.tab;

      tabs.querySelectorAll('.left-tab-btn').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabs.querySelectorAll('.left-tab-panel').forEach(function (p) {
        p.classList.remove('active');
        p.setAttribute('hidden', '');
      });

      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      var panel = tabs.querySelector('[data-panel="' + id + '"]');
      if (panel) {
        panel.classList.add('active');
        panel.removeAttribute('hidden');
      }
    });
  });
});

/* --------------------------------------------------------------------------
   3. Horizontal tab switching — .htabs components (code section)
   -------------------------------------------------------------------------- */
document.querySelectorAll('.htabs').forEach(function (tabs) {
  tabs.querySelectorAll('.htab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = this.dataset.tab;

      tabs.querySelectorAll('.htab-btn').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabs.querySelectorAll('.htab-panel').forEach(function (p) {
        p.classList.remove('active');
        p.setAttribute('hidden', '');
      });

      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      var panel = tabs.querySelector('[data-panel="' + id + '"]');
      if (panel) {
        panel.classList.add('active');
        panel.removeAttribute('hidden');
      }
    });
  });
});

/* --------------------------------------------------------------------------
   4. Demo carousel — .demo-carousel
   -------------------------------------------------------------------------- */
document.querySelectorAll('.demo-carousel').forEach(function (carousel) {
  carousel.querySelectorAll('.demo-nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = this.dataset.slide;

      carousel.querySelectorAll('.demo-nav-btn').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      carousel.querySelectorAll('.demo-slide').forEach(function (s) {
        s.classList.remove('active');
        s.setAttribute('hidden', '');
      });

      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      var slide = carousel.querySelector('.demo-slide[data-slide="' + id + '"]');
      if (slide) {
        slide.classList.add('active');
        slide.removeAttribute('hidden');
      }
    });
  });
});

/* --------------------------------------------------------------------------
   5. Demo request CTA tracking
   Wire up gtag events once Google Analytics is added:
     gtag('event', 'request_demo_click', { event_category: 'cta' });
   -------------------------------------------------------------------------- */
document.querySelectorAll('[data-track="request-demo"]').forEach(function (el) {
  el.addEventListener('click', function () {
    // TODO: gtag('event', 'request_demo_click', { event_category: 'cta' });
  });
});

/* --------------------------------------------------------------------------
   6. KubeCon outbound link tracking
   Wire up gtag events once Google Analytics is added:
     gtag('event', 'kubecon_link_click', { event_category: 'outbound', event_label: label });
   -------------------------------------------------------------------------- */
document.querySelectorAll('a[href*="sched.com"]').forEach(function (el) {
  el.addEventListener('click', function () {
    var label = (this.textContent || '').trim().replace(/\s+/g, ' ');
    // TODO: gtag('event', 'kubecon_link_click', { event_category: 'outbound', event_label: label });
  });
});

/* --------------------------------------------------------------------------
   7. Cookie consent — GA4 Consent Mode v2
   Reads/writes 'kagenti-cookie-consent' in localStorage ('granted'|'denied').
   Calls gtag('consent', 'update', ...) to upgrade GA from the denied default
   set in <head>. The banner is hidden by default (HTML `hidden` attribute) and
   shown only when no stored preference exists.
   -------------------------------------------------------------------------- */
(function () {
  var STORAGE_KEY = 'kagenti-cookie-consent';
  var bar        = document.getElementById('cookie-bar');
  var acceptBtn  = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');
  var manageLink = document.getElementById('cookie-manage-link');

  function applyConsent(granted) {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied'
      });
    }
    try { localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied'); } catch (e) {}
    if (bar) bar.hidden = true;
  }

  function showBar() {
    if (bar) bar.hidden = false;
  }

  // On load: apply stored preference or show banner
  var stored;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}

  if (stored === 'granted') {
    applyConsent(true);
  } else if (stored !== 'denied') {
    showBar(); // No preference yet — prompt the user
  }

  if (acceptBtn)  acceptBtn.addEventListener('click',  function () { applyConsent(true);  });
  if (declineBtn) declineBtn.addEventListener('click', function () { applyConsent(false); });
  if (manageLink) manageLink.addEventListener('click', function (e) {
    e.preventDefault();
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    showBar();
  });
}());
