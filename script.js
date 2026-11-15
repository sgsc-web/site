/* SGSC shared behaviour: mobile menu, accordion, counters, scroll-reveal, back-to-top.
   Vanilla JS, no dependencies. The contact form has its own inline script (unchanged). */
document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Mobile menu (☰) — same ids as before ---------- */
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    if (mobileMenu && navLinks) {
        const setMenu = (open) => {
            navLinks.classList.toggle('active', open);
            mobileMenu.setAttribute('aria-expanded', String(open));
        };
        mobileMenu.addEventListener('click', () => setMenu(!navLinks.classList.contains('active')));
        navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) { setMenu(false); mobileMenu.focus(); }
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) setMenu(false);
        });
    }

    /* ---------- Accordion (services page) ----------
       Buttons with aria-expanded/aria-controls; Arrow Up/Down, Home, End move focus. */
    const accordions = document.querySelectorAll('[data-accordion]');
    accordions.forEach((acc) => {
        const triggers = Array.from(acc.querySelectorAll('.acc-trigger'));
        const toggle = (trigger, open) => {
            const item = trigger.closest('.acc-item');
            const panel = document.getElementById(trigger.getAttribute('aria-controls'));
            trigger.setAttribute('aria-expanded', String(open));
            item.classList.toggle('is-open', open);
            if (panel) panel.hidden = !open;
        };
        triggers.forEach((t) => {
            t.addEventListener('click', () => toggle(t, t.getAttribute('aria-expanded') !== 'true'));
            t.addEventListener('keydown', (e) => {
                const i = triggers.indexOf(t);
                let next = null;
                if (e.key === 'ArrowDown') next = triggers[(i + 1) % triggers.length];
                if (e.key === 'ArrowUp') next = triggers[(i - 1 + triggers.length) % triggers.length];
                if (e.key === 'Home') next = triggers[0];
                if (e.key === 'End') next = triggers[triggers.length - 1];
                if (next) { e.preventDefault(); next.focus(); }
            });
        });
        triggers.forEach((t) => toggle(t, false)); // panels stay visible if JS is unavailable
        // Open the panel named in the URL hash (e.g. services.html#svc-3) or the first one.
        const fromHash = acc.querySelector(window.location.hash ? `.acc-item${window.location.hash} .acc-trigger` : null);
        toggle(fromHash || triggers[0], true);
        window.addEventListener('hashchange', () => {
            const t = acc.querySelector(`.acc-item${window.location.hash} .acc-trigger`);
            if (t) { toggle(t, true); t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }
        });
    });

    /* ---------- Animated counters ---------- */
    const counters = document.querySelectorAll('[data-count]');
    const fmt = new Intl.NumberFormat('en-US'); // Latin digits with comma grouping (1,000)
    const num = (el, v) => ('plain' in el.dataset ? String(v) : fmt.format(v)); // data-plain: no thousands separator (years)
    const finalText = (el) => num(el, Number(el.dataset.count)) + (el.dataset.suffix || '');
    const runCounter = (el) => {
        const target = Number(el.dataset.count);
        if (reduceMotion || !('requestAnimationFrame' in window)) { el.textContent = finalText(el); return; }
        const dur = 1600, start = performance.now();
        const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = num(el, Math.round(target * eased)) + (p === 1 ? (el.dataset.suffix || '') : '');
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    /* ---------- Scroll reveal + counters via IntersectionObserver ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('in');
                entry.target.classList.remove('reveal-pending');
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach((el) => {
            if (!reduceMotion) el.classList.add('reveal-pending'); // hide only when JS + motion are available
            io.observe(el);
        });

        const co = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { runCounter(entry.target); obs.unobserve(entry.target); }
            });
        }, { threshold: 0.6 });
        counters.forEach((el) => co.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('in'));
        counters.forEach((el) => { el.textContent = finalText(el); });
    }

    /* ---------- Back-to-top button ---------- */
    const toTop = document.createElement('button');
    toTop.className = 'to-top';
    toTop.type = 'button';
    toTop.setAttribute('aria-label', 'العودة إلى أعلى الصفحة');
    toTop.innerHTML = '<svg class="icon" aria-hidden="true"><use href="assets/icons.svg#i-up"/></svg>';
    document.body.appendChild(toTop);
    const onScroll = () => toTop.classList.toggle('show', window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
});
