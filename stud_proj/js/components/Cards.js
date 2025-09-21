import { createCard, createEl } from "./CreateEl.js";
import { initProductTooltips } from "./Tooltip.js";
import { cards } from "../main.js";

const pendant = document.querySelector(".custom-checkbox--pendant");
const pendantValueEl = pendant.querySelector(".custom-checkbox__count");
const ceiling = document.querySelector(".custom-checkbox--ceiling");
const ceilingValueEl = ceiling.querySelector(".custom-checkbox__count");
const overhead = document.querySelector(".custom-checkbox--overhead");
const overheadValueEl = overhead.querySelector(".custom-checkbox__count");
const point = document.querySelector(".custom-checkbox--point");
const pointValueEl = point.querySelector(".custom-checkbox__count");
const nightlights = document.querySelector(".custom-checkbox--nightlights");
const nightlightsValueEl = nightlights.querySelector(".custom-checkbox__count");

const listCard = document.querySelector(".catalog__list");
const checkboxes = document.querySelectorAll(".catalog-form .custom-checkbox__field");
let selectedTypes = [];

const selectEl = document.querySelector(".catalog__sort-select");
const allCardEl = document.querySelector("#all-item");

const listPagination = document.querySelector(".catalog__pagination");
const form = document.querySelector(".catalog-form");
const resetBtn = document.querySelector(".catalog-form__reset");

export async function getCards() {
  const response = await fetch("./data/data.json");
  const data = await response.json();

  return data;
}

let activeFilters = {
  inStock: false,
  selectedTypes: [],
};

let list = [];

const lampTypesCount = {};

let currentFilter = null;

export function countLampTypes(card) {
  card.type.forEach((type) => {
    if (!lampTypesCount[type]) {
      lampTypesCount[type] = 0;
    }
    lampTypesCount[type]++;
  });

  pendantValueEl.textContent = lampTypesCount.pendant || 0;
  ceilingValueEl.textContent = lampTypesCount.ceiling || 0;
  overheadValueEl.textContent = lampTypesCount.overhead || 0;
  pointValueEl.textContent = lampTypesCount.point || 0;
  nightlightsValueEl.textContent = lampTypesCount.nightlights || 0;
}

let filteredCards = [];

export function filterAndRenderCards() {
  filteredCards = [...cards];

  if (selectedTypes.length > 0) {
    filteredCards = filteredCards.filter((card) =>
      card.type.some((type) => selectedTypes.includes(type))
    );
  }

  if (currentFilter === "inStock") {
    filteredCards = filteredCards.filter(
      (card) =>
        card.availability.moscow > 0 ||
        card.availability.orenburg > 0 ||
        card.availability.saintPetersburg > 0
    );
  }

  pagination(filteredCards);

  sortingDirectionCard(filteredCards, selectEl.value)
}

inStockFilter(filteredCards);

allCard(filteredCards);

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      selectedTypes.push(this.value);
    } else {
      selectedTypes = selectedTypes.filter((t) => t !== this.value);
    }
    filterAndRenderCards();
  });

  resetBtn.addEventListener("click", () => {
    selectedTypes = [];
    currentFilter = null;
    form.reset();
    allCardEl.checked = true;

    filterAndRenderCards();
  });
});

selectEl.addEventListener("change", filterAndRenderCards);

// Добавляем тип. Если его нет - сортируем список
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      selectedTypes.push(this.value);
    } else {
      selectedTypes = selectedTypes.filter((t) => t !== this.value);
    }
    filterAndRenderCards();
  });
});

function inStockFilter() {
  const inStockEl = document.querySelector("#instock");
  
  inStockEl.addEventListener("change", () => {
    currentFilter = inStockEl.checked ? "inStock" : null;
    allCardEl.checked = false; 
    filterAndRenderCards();
  });
}

export function allCard() {
  allCardEl.addEventListener("change", () => {
    if (allCardEl.checked) {
      currentFilter = null;
      document.querySelector("#instock").checked = false;
      filterAndRenderCards();
    }
  });
}

export function sortCardRating(cards) {
  const ratingCards = [...cards];

  ratingCards.sort((a, b) => b.rating - a.rating);

  listCard.innerHTML = "";
  pagination(ratingCards);
}

export function sortingDirectionCard(cards, direction) {
  const cardPrice = [...cards];

  selectEl.addEventListener("change", () => {
    if (selectEl.value == "rating-max") {
      sortCardRating(cards);
    } else if (selectEl.value == "price-min") {
      sortingDirectionCard(cards, "price-min");
    } else if (selectEl.value == "price-max") {
      sortingDirectionCard(cards, "price-max");
    }
  });

  if (direction == "price-min") {
    cardPrice.sort((a, b) => a.price.new - b.price.new);
  } else if (direction == "price-max") {
    cardPrice.sort((a, b) => b.price.new - a.price.new);
  }

  listCard.innerHTML = "";
  pagination(cardPrice);
}

export function pagination(cards) {
  const itemsPerPage = 6;
  let currentPage = 1;

  const dataToShow = currentFilter ? filteredCards : cards;

  function showPage(page) {
    listCard.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    dataToShow.slice(start, end).forEach((card) => createCard(card));

    initProductTooltips();
  }

  const pageCount = Math.ceil(cards.length / itemsPerPage);
  listPagination.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const liEl = createEl("li", "catalog__pagination-item");
    const linkEl = createEl("button", "catalog__pagination-link");
    linkEl.textContent = i;

    linkEl.addEventListener("click", () => {
      currentPage = i;
      showPage(currentPage);
    });

    liEl.appendChild(linkEl);
    listPagination.appendChild(liEl);
  }

  showPage(currentPage);
}

export function resetAllFilters() {
  selectedTypes = [];
  currentFilter = null;

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  const inStockEl = document.querySelector("#instock");
  inStockEl.checked = false;
  resetAllFilters();
}
