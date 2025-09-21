const formName = document.querySelector("#name");
const formEmail = document.querySelector("#email");

const formData = {
  name: formName.value,
  email: formEmail.value,
};

const form = document.querySelector(".questions__form");

function collBackPost(data) {
  const validator = new JustValidate(
    document.querySelector(".questions__form"),
    {
      validateBeforeSubmitting: true,
    }
  );

  validator
    .addField("#name", [
      {
        rule: "required",
        errorMessage: "Введите ваше имя",
      },
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Минимумальная длинна три символа",
      },
      {
        rule: "maxLength",
        value: 20,
        errorMessage: "Максимумальная длинна двадцать символов",
      },
    ])
    .addField("#email", [
      {
        rule: "required",
        errorMessage: "Введите вашу почту",
      },
      {
        rule: "email",
        errorMessage: "Почта введена неверно",
      },
    ])
    .addField("#agree", [
      {
        rule: "required",
        errorMessage: "Согласие обязательно",
      },
    ])
    .onSuccess(async () => {
      try {
        await fetch("https://httpbin.org/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const title = "Благодарим за обращение!";
        const text =
          "Мы получили вашу заявку и свяжемся с вами в ближайшее время";
        const icon = "./images/sprite/icon-ok.svg";

        windowMessage(title, text, icon);
        form.reset();

      } catch (error) {
        const title = "Не удалось отправить обращение";
        const text =
          "Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — свяжитесь со службой поддержки.";
        const icon = "./images/sprite/icon-error.svg";
        windowMessage(title, text, icon);
      }
    });
}

collBackPost(formData);

const windowMessage = (title, text, icon) => {
  const messageEl = document.querySelector(".message");
  const messageElTitle = document.querySelector(".message__title");
  const messageElText = document.querySelector(".message__text");
  const messageElIcon = document.querySelector(".message__icon");
  const messageElBtn = document.querySelector(".message__close");

  messageElTitle.textContent = title;
  messageElText.textContent = text;
  messageElIcon.src = icon;

  messageElBtn.addEventListener("click", () => {
    messageEl.style.display = "none";
  });

  messageEl.style.display = "flex";
};
