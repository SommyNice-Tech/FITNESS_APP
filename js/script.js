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
const toggleBtn = document.getElementById("toggle-btn");
const lblMonthly = document.getElementById("lbl-monthly");
const lblAnnual = document.getElementById("lbl-annual");
let isAnnual = false;

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    isAnnual = !isAnnual;
    toggleBtn.classList.toggle("toggled", isAnnual);

    // Active label highlight
    lblMonthly.classList.toggle("active-label", !isAnnual);
    lblAnnual.classList.toggle("active-label", isAnnual);

    // Swap all prices
    document.querySelectorAll(".amount").forEach((el) => {
      const target = isAnnual ? el.dataset.annual : el.dataset.monthly;
      el.textContent = target;
    });

    // Swap billed-note text
    document.querySelectorAll(".monthly-note").forEach((el) => {
      el.style.display = isAnnual ? "none" : "block";
    });
    document.querySelectorAll(".annual-note").forEach((el) => {
      el.style.display = isAnnual ? "block" : "none";
    });
  });

  // Set initial active label
  lblMonthly.classList.add("active-label");
}

//TESTIMONAL AUTO-SLIDING CAROUSEL
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".carousel-dot");
const prevBtn = document.getElementById("carousel-prev");
const nextBtn = document.getElementById("carousel-next");
let currentSlide = 0;
let autoSlideTimer = null;

function goToSlide(index) {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}
function prevSlide() {
  goToSlide(currentSlide - 1);
}

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

  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoSlide();
    });
  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoSlide();
    });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goToSlide(i);
      resetAutoSlide();
    });
  });
}

// BMI CALCULATOR
function calculateBMI() {
  const weightEl = document.getElementById("weight");
  const heightEl = document.getElementById("height");
  const resultDiv = document.getElementById("bmi-result");
  const bmiValue = document.getElementById("bmi-value");
  const bmiCat = document.getElementById("bmi-category");
  const bmiAdvice = document.getElementById("bmi-advice");

  const weight = parseFloat(weightEl.value);
  const height = parseFloat(heightEl.value);

  if (!weight || !height || weight <= 0 || height <= 0) {
    resultDiv.style.display = "flex";
    bmiValue.textContent = "--";
    bmiCat.textContent = "Please enter a valid values above";
    bmiCat.classList = "bmi-badge";
    bmiAdvice.textContent = "";
    return;
  }

  const hM = height / 100;
  const bmi = weight / (hM * hM).toFixed(1);

  let category, advice, cls;
  if (bmi < 18.5) {
    category = "⚠️ Underweight";
    cls = "bmi-badge underweight";
    advice =
      "You may need to build muscle mass. Our Personal Trainer Frank Morgan can design a nutritious strength programme just for you!";
  } else if (bmi < 25.0) {
    category = "✅ Normal Weight";
    cls = "bmi-badge normal";
    advice =
      "Excellent! You're in a healthy range. Maintain it with our classes and balanced nutrition. Keep it up!";
  } else if (bmi < 30.0) {
    category = "⚠️ Overweight";
    cls = "bmi-badge overweight";
    advice =
      "Our Cardio Zone, Dance Classes and personal training sessions can help you hit your target weight!";
  } else {
    category = "🔴 Obese";
    cls = "bmi-badge obese";
    advice =
      "Our Medical Exercise Specialist Enzo Sar creates safe, tailored protocols. Book a free consultation today!";
  }

  bmiValue.textContent = bmi;
  bmiCat.textContent = category;
  bmiCat.className = cls;
  bmiAdvice.textContent = advice;
  resultDiv.style.display = "flex";

  // Entrance animtion
  resultDiv.style.opacity = "0";
  resultDiv.style.transform = "translateY(24px)";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      resultDiv.style.transition = "opacity 0.45s ease, transform 0.45s ease";
      resultDiv.style.opacity = "1";
      resultDiv.style.transform = "translateY(0)";
    });
  });

  // Allow Enter key in BMI inputs
  ["weight", "height"].forEach((id) => {
    const el = document.getElementById(id);
    if (el)
      el.addEventListener("keypress", (e) => {
        if (e.key === "Enter") calculateBMI();
      });
  });
}
