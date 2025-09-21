import {} from "./components/Header.js";
import {} from "./components/Accordion.js";
import {} from "./components/Validation.js";
import { createCardDayProducts } from "./components/Swiper.js";
import { gettingThisCard } from "./components/Basket.js";
import {
  getCards,
  countLampTypes,
  sortingDirectionCard,
  filterAndRenderCards
} from "./components/Cards.js";

export const cards = await getCards();
function initApp() {
  cards.forEach((card) => {
    countLampTypes(card);
  });

  filterAndRenderCards(),
  sortingDirectionCard(cards, "price-min"); // Сортировка по умолчанию
  createCardDayProducts(cards);
  gettingThisCard(cards);
}


initApp();
