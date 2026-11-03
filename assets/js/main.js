/* KET GAMES - vanilla JavaScript. No dependencies. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setNav(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.querySelector("[data-copy-email]");
  var copyStatus = document.getElementById("copy-status");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-copy-email");
      function done(msg) { if (copyStatus) copyStatus.textContent = msg; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(
          function () { done("Email address copied."); },
          function () { done("Copy failed. Please copy the address manually."); }
        );
      } else {
        done("Copy is not available in this browser. Please copy the address manually.");
      }
    });
  }

  /* ---------- Gallery filter + lightbox (JumpRift page) ---------- */
  var gallery = document.getElementById("gallery");
  if (!gallery) return;

  var items = Array.prototype.slice.call(gallery.querySelectorAll("a.shot"));
  var filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      items.forEach(function (item) {
        item.hidden = !(filter === "all" || item.getAttribute("data-env") === filter);
      });
      var status = document.getElementById("filter-status");
      if (status) {
        var n = items.filter(function (i) { return !i.hidden; }).length;
        status.textContent = "Showing " + n + " screenshot" + (n === 1 ? "" : "s") + ".";
      }
    });
  });

  var dialog = document.getElementById("lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return; /* links fall back to opening the image */

  var lbImg = dialog.querySelector("img");
  var lbCap = dialog.querySelector(".lightbox-caption");
  var current = 0;

  function visibleItems() { return items.filter(function (i) { return !i.hidden; }); }

  function show(list, index) {
    var n = list.length;
    current = (index + n) % n;
    var a = list[current];
    var thumb = a.querySelector("img");
    lbImg.src = a.getAttribute("href");
    lbImg.alt = thumb ? thumb.alt : "";
    lbCap.textContent = a.getAttribute("data-caption") || "";
  }

  items.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var list = visibleItems();
      show(list, list.indexOf(a));
      dialog.showModal();
    });
  });

  dialog.querySelector(".lb-close").addEventListener("click", function () { dialog.close(); });
  dialog.querySelector(".lb-prev").addEventListener("click", function () { var l = visibleItems(); show(l, current - 1); });
  dialog.querySelector(".lb-next").addEventListener("click", function () { var l = visibleItems(); show(l, current + 1); });

  /* Click outside the image closes the dialog */
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog || e.target.classList.contains("lightbox-inner")) dialog.close();
  });

  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); show(visibleItems(), current - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); show(visibleItems(), current + 1); }
  });

  dialog.addEventListener("close", function () { lbImg.removeAttribute("src"); });
})();
