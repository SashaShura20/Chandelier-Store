const accordionBtns = document.querySelectorAll(".accordion__btn ");

function setupAccordion() {
  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const wasActive = btn.classList.contains("accordion__btn--active");

      accordionBtns.forEach((otherBtn) => {
        otherBtn.classList.remove("accordion__btn--active");
      });

      if (!wasActive) {
        btn.classList.add("accordion__btn--active");
      }
    });
  });
}
setupAccordion();
