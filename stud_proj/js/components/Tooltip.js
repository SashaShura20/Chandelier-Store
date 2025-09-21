export async function initProductTooltips() {
  const tooltips = document.querySelectorAll(".tooltip__content");

  tooltips.forEach((tooltip) => {
    tippy(".tooltip__btn", {
      content(reference) {
        return reference.nextElementSibling.innerHTML;
      },
      allowHTML: true,
      theme: "light",
    });
  });
}
