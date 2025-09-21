import { createCard } from "./CreateEl.js";

const dayProductsList = document.querySelector(".day-products__list");
const dayProductsBlock = document.querySelector(".day-products");

export function createCardDayProducts(cards) {
  const dayProducts = cards.filter((card) => card.goodsOfDay === true);

  if(!dayProducts.length) {
    dayProductsBlock.remove();
    return
  }

  dayProductsList.innerHTML = "";

  dayProducts.forEach((card) => {
    const cardLiEl = createCard(card, "day-products__item swiper-slide");
    dayProductsList.appendChild(cardLiEl);
  });

  const cardsEl = dayProductsList.querySelectorAll(".product-card");
  cardsEl.forEach((card) => {
    card.classList.add("product-card--small");
  });

  initDayProductsSwiper();
}

function initDayProductsSwiper() {
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: false,
    slidesPerView: 4,

    navigation: {
      nextEl: ".day-products__navigation-btn--next",
      prevEl: ".day-products__navigation-btn--prev",
    },
  });
}
