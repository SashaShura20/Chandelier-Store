// Burger
const burgerMenu = document.querySelector('.main-menu');
const burgerBtn = document.querySelector('.header__catalog-btn');
const burgerBtnclose = document.querySelector('.main-menu__close');

// Citi
const locationCity = document.querySelector('.location__city');
const locationCityName = document.querySelector('.location__city-name');
const locationBtns = document.querySelectorAll('.location__sublink');
const citiName = document.querySelector('.location__city-name');

burgerBtn.addEventListener('click', () => {
    burgerMenu.classList.add('main-menu--active')
});

burgerBtnclose.addEventListener('click', () => {
    burgerMenu.classList.remove('main-menu--active')
});

locationCity.addEventListener('click', () => {
    locationCity.classList.toggle('location__city--active')
});


locationBtns.forEach(locationBtn => {
    locationBtn.addEventListener('click', () => {
    citiName.textContent = locationBtn.textContent
    locationCity.classList.toggle('location__city--active')
});

})
