const listCard = document.querySelector(".catalog__list");

export const createEl = (type, className, href = "", content = "") => {
  const element = document.createElement(type);
  className.split(" ").forEach((cls) => {
    element.classList.add(cls);
  });

  if (href) element.href = href;
  if (content) element.textContent = content;
  return element;
};

export function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const createCard = (card, classNames) => {
  const liEl = createEl("li", classNames || "catalog__item");
  liEl.dataset.id = card.id;
  liEl.innerHTML = `
  <div class="product-card">
    <div class="product-card__visual">
      <img class="product-card__img" src="${card.image.slice(3)}" height="436" width="290"
            alt="Изображение товара">
      <div class="product-card__more">
        <a href="#" class="product-card__link btn btn--icon">
          <span class="btn__text">В корзину</span>
          <svg width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-basket"></use>
          </svg>
        </a>
        <a href="#" class="product-card__link btn btn--secondary">
          <span class="btn__text">Подробнее</span>
        </a>
      </div>
    </div>
    <div class="product-card__info">
      <h2 class="product-card__title">${card.name}</h2>
      <span class="product-card__old">
      <span class="product-card__old-number">${numberWithSpaces(card.price.old)}</span>
      <span class="product-card__old-add">₽</span>
    </span>
      <span class="product-card__price">
      <span class="product-card__price-number">${numberWithSpaces(card.price.new)}</span>
      <span class="product-card__price-add">₽</span>
    </span>
      <div class="product-card__tooltip tooltip">
        <button class="tooltip__btn" aria-label="Показать подсказку">
          <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-i"></use>
          </svg>
        </button>
        <div class="tooltip__content">
          <span class="tooltip__text">Наличие товара по городам:</span>
          <ul class="tooltip__list">
            <li class="tooltip__item">
              <span class="tooltip__text">Москва: <span class="tooltip__count">${card.availability.moscow}</span></span>
            </li>
            <li class="tooltip__item">
              <span class="tooltip__text">Оренбург: <span class="tooltip__count">${card.availability.orenburg}</span></span>
            </li>
            <li class="tooltip__item">
              <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${card.availability.saintPetersburg}</span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  `

  listCard.append(liEl);
  return liEl
};
