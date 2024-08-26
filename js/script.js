"use strict";

const arr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

const img = document.querySelector(".slider__img");
const nextBtn = document.querySelector(".slider__btn.slider__next");
const prevBtn = document.querySelector(".slider__btn.slider__prev");
const dotsContainer = document.querySelector(".slider__dots");
let currentIndex = 0;
let autoSlideInterval;

function showRndImage(index) {
  img.src = `./images/${arr[index]}`;
  updateButton();
  updateDots();
}

function updateButton() {
  prevBtn.style.display = currentIndex === 0 ? "none" : "inline-block";
  nextBtn.style.display =
    currentIndex === arr.length - 1 ? "none" : "inline-block";
}

function createDots() {
  arr.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("slider__dot");
    dot.dataset.index = index;
    dot.addEventListener("click", () => {
      currentIndex = index;
      showRndImage(currentIndex);
      stopAutoSlide();
      startAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll(".slider__dot");
  dots.forEach((dot) => dot.classList.remove("slider__active"));
  dots[currentIndex].classList.add("slider__active");
}

nextBtn.onclick = () => {
  if (currentIndex < arr.length - 1) {
    currentIndex++;
    showRndImage(currentIndex);
    stopAutoSlide();
    startAutoSlide();
  }
};

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    showRndImage(currentIndex);
    stopAutoSlide();
    startAutoSlide();
  }
};

function initSlider() {
  createDots();
  showRndImage(currentIndex);
  startAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    if (currentIndex < arr.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    showRndImage(currentIndex);
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

img.addEventListener("mouseover", stopAutoSlide);
img.addEventListener("mouseout", startAutoSlide);

initSlider();
