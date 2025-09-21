import { createEl, numberWithSpaces } from "./CreateEl.js";

const basketEl = document.querySelector(".header__basket");
const basketBtn = document.querySelector(".header__user-btn");
const basketList = document.querySelector(".basket__list");
const counterEl = document.querySelector(".header__user-count");
const basketLink = document.querySelector(".basket__link");
const emptyBlock = document.querySelector(".basket__empty-block");

basketBtn.addEventListener("click", () => {
  basketEl.classList.toggle("basket--active");
});

export const createProductInCart = (card) => {
  const product = createEl("li", "basket__item");
  product.innerHTML = `
    <div class="basket__img">
        <img src="${card.image.slice(
          3
        )}" alt="Фотография товара" height="60" width="60">
    </div>
    <span class="basket__name">${card.name}</span>
    <span class="basket__price">${numberWithSpaces(
      card.price.new || card.price
    )} руб</span>
    <button class="basket__item-close" type="button">
        <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
        <use xlink:href="images/sprite.svg#icon-close"></use>
        </svg>
    </button>
    `;
  product.dataset.id = card.id;
  basketList.append(product);
  counterBasket();
};

export const gettingThisCard = (cards) => {
  function handleAddToCart(event) {
    const cardElement = event.target.closest("[data-id]");
    if (!cardElement) return;

    const addButton = event.target.closest(".btn--icon");
    if (!addButton) return;

    event.preventDefault();
    const cardId = Number(cardElement.dataset.id);
    const card = cards.find((item) => item.id === cardId);
    if (!card) return;

    if (!document.querySelector(`.basket__item[data-id="${card.id}"]`)) {
      createProductInCart(card);
    }
  }
  document.addEventListener("click", handleAddToCart);
};

export function handleRemoveClick() {
  basketList.addEventListener("click", (event) => {
    if (!event.target.closest(".basket__item-close")) return;
    event.preventDefault();
    const item = event.target.closest("[data-id]");
    const id = item.dataset.id;
    if (!id) return;
    item.remove();
    localStorage.removeItem(`product_${id}`);

    counterBasket();
  });
}

function counterBasket() {
  emptyBlock.style.display = "none";
  basketLink.style.display = "none";
  const counter = document.querySelectorAll(".basket__item").length;

  if (counter === 0) {
    emptyBlock.style.display = "block";
  } else {
    basketLink.style.display = "flex";
  }

  counterEl.textContent = counter;
}

handleRemoveClick();
counterBasket();
