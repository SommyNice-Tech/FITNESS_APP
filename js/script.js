// "use strict";

// MOBILE MENU TOGGLE
const hamburger = document.querySelector("nav .fas");
const navMenu = document.querySelector("nav ul");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("nav-open");
    hamburger.classList.toggle("fa-times");
    hamburger.classList.toggle("fa-bars");
  });
}

document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav-open");
    if (hamburger) {
      hamburger.classList.remove("fa-times");
      hamburger.classList.add("fa-bars");
    }
  });
});

// NAVBAR SCROLL EFFECT
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  if (window.scrollY > 60) {
    navbar.style.background = "rgba(6,6,6,0.97)";
    navbar.style.boxShadow = "0 2px 20px rgba(229,9,20,0.15)";
  } else {
    navbar.style.background = "rgba(27,23,23,0.5)";
    navbar.style.boxShadow = "none";
  }
});

// BILLING TOGGLE (Monthly / Annual)
const toggleBtn  = document.getElementById('toggle-btn');
const lblMonthly = document.getElementById('lbl-monthly');
const lblAnnual  = document.getElementById('lbl-annual');
let isAnnual = false;

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    isAnnual = !isAnnual;
    toggleBtn.classList.toggle('toggled', isAnnual);

    // Active label highlight
    lblMonthly.classList.toggle('active-label', !isAnnual);
    lblAnnual.classList.toggle('active-label',  isAnnual);

    // Swap all prices
    document.querySelectorAll('.amount').forEach(el => {
      const target = isAnnual ? el.dataset.annual : el.dataset.monthly;
      el.textContent = target;
    });

    // Swap billed-note text
    document.querySelectorAll('.monthly-note').forEach(el => {
      el.style.display = isAnnual ? 'none' : 'block';
    });
    document.querySelectorAll('.annual-note').forEach(el => {
      el.style.display = isAnnual ? 'block' : 'none';
    });
  });

  // Set initial active label
  lblMonthly.classList.add('active-label');
}

//TESTIMONAL AUTO-SLIDING CAROUSEL
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
let currentSlide = 0;
let autoSlideTimer = null;

function goToSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoSlide() {
  autoSlideTimer = setInterval(nextSlide, 3500);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

if (slides.length > 0) {
  goToSlide(0);
  startAutoSlide();

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); });
  });
}
