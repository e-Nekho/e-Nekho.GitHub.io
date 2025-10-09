import React, { useEffect } from 'react';
import './FormBlock.css';

function FormBlock() {
    useEffect(() => {
    const radioUnique = document.querySelector(".radio-gender-unique");
    const radioGroup = document.getElementsByName("radio-group-1");
    const otherFields = document.getElementById("other-gender-fields");
    const mainFields = document.getElementById("main-fields");

    const updateFormState = () => {
      if (radioUnique && radioUnique.checked) {
        otherFields?.classList.add("active");
        mainFields?.classList.add("disabled-section");
        mainFields?.querySelectorAll("input, select, textarea, button").forEach(
          (el) => (el.disabled = true)
        );
      } else {
        otherFields?.classList.remove("active");
        mainFields?.classList.remove("disabled-section");
        mainFields?.querySelectorAll("input, select, textarea, button").forEach(
          (el) => (el.disabled = false)
        );
      }
    };

    radioGroup.forEach((r) => r.addEventListener("change", updateFormState));
    window.addEventListener("DOMContentLoaded", updateFormState);
    updateFormState();

    // === Валидация формы ===
    const form = document.getElementById("test-form");
    const messageBox = document.getElementById("form-message");
    const telInput = form.querySelector('input[name="field-tel"]');

    // Автоформат номера телефона
    telInput.addEventListener("input", () => {
      let val = telInput.value.replace(/[^\d]/g, "");
      if (val.length > 11) val = val.slice(0, 11);
      let formatted = "";
      if (val.length > 0) {
        formatted = "+7 ";
        if (val.length > 1) formatted += val.slice(1, 4);
        if (val.length > 4) formatted += " " + val.slice(4, 7);
        if (val.length > 7) formatted += "-" + val.slice(7, 9);
        if (val.length > 9) formatted += "-" + val.slice(9, 11);
      }
      telInput.value = formatted;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let hasError = false;
      messageBox.textContent = "";
      document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));

      const fio = form.querySelector('input[name="field-name"]');
      if (!fio.value.trim()) {
        fio.insertAdjacentHTML("afterend", '<div class="error-message" id="error-fio">Введите ФИО</div>');
        hasError = true;
      }

      const tel = form.querySelector('input[name="field-tel"]');
      const telPattern = /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/;
      if (!tel.value.trim() || !telPattern.test(tel.value.trim())) {
        document.getElementById("error-tel").textContent = "Введите корректный номер телефона";
        hasError = true;
      }

      const email = form.querySelector('input[name="field-email"]');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        document.getElementById("error-email").textContent = "Введите корректный email";
        hasError = true;
      }

      const date = form.querySelector('input[name="field-date"]');
      if (!date.value.trim()) {
        date.insertAdjacentHTML("afterend", '<div class="error-message">Введите дату рождения</div>');
        hasError = true;
      }

      const check = form.querySelector('input[name="check-1"]');
      if (!check.checked) {
        document.getElementById("error-check").textContent = "Необходимо согласиться с контрактом";
        hasError = true;
      }

      if (!hasError) {
        messageBox.textContent = "✅ Форма сохранена!";
        messageBox.classList.add("success");
      } else {
        messageBox.textContent = "❌ Исправьте ошибки в форме";
        messageBox.classList.remove("success");
      }
    });

    return () => {
      radioGroup.forEach((r) => r.removeEventListener("change", updateFormState));
      window.removeEventListener("DOMContentLoaded", updateFormState);
      form?.removeEventListener("submit", () => {});
    };
  }, []);

    return (
        <section className="form-block order-3">
            <h2 className="main-field-name">Форма:</h2>
            <div className="main-field border-box">
                <form id="test-form" noValidate>
                <div className="form">
                    <label>
                    ФИО: <br />
                    <input name="field-name" type="text" title="Введите ваше ФИО" placeholder="Иванов Иван Иванович" />
                    </label>

                    <label>
                    Номер телефона: <br />
                    <input
                        name="field-tel"
                        type="tel"
                        title="Введите ваш номер"
                        placeholder="+7 800 555-35-35"
                        pattern="^\\+?[0-9\\s\\-()]{10,20}$"
                        maxLength="20"
                        autoComplete="off"
                    />
                    </label>
                    <div className="error-message" id="error-tel"></div>

                    <label>
                    Адрес электронной почты: <br />
                    <input
                        name="field-email"
                        type="email"
                        title="Введите ваш адрес электронной почты"
                        placeholder="ExampleAdress@example.com"
                    />
                    </label>
                    <div className="error-message" id="error-email"></div>

                    <label>
                    Дата рождения: <br />
                    <input name="field-date" type="date" defaultValue="2000-01-01" />
                    </label>

                    <div style={{ paddingTop: "8px" }}>
                    Выберите ваш пол:
                    <label>
                        <br />
                        <input name="radio-group-1" defaultChecked type="radio" />
                        Мужской
                    </label>
                    <label>
                        <input name="radio-group-1" type="radio" />
                        Женский
                    </label>
                    <label>
                        <input name="radio-group-1" type="radio" className="radio-gender-unique" />
                        Другой
                    </label>

                    <div id="other-gender-fields" className="section-gender-fun">
                        🚫 В Российской Федерации существует только два пола.
                    </div>
                    </div>

                    <div id="main-fields">
                    <label>
                        Ваши любимые языки программирования <br />
                        <select name="programm-lang[]" multiple className="multibox-1" size="10">
                        <option value="Pascal">Pascal</option>
                        <option value="C">C</option>
                        <option value="C++">C++</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="PHP">PHP</option>
                        <option value="Python">Python</option>
                        <option value="Haskel">Haskel</option>
                        <option value="Clojure">Clojure</option>
                        <option value="Prolog">Prolog</option>
                        <option value="Scala">Scala</option>
                        </select>
                    </label>

                    <label>
                        Напишите немного о себе: <br />
                        <textarea name="multi-field"></textarea>
                    </label>

                    <label style={{ display: "block", position: "relative" }}>
                        <input name="check-1" type="checkbox" /> С контрактом ознакомлен(а)
                    </label>
                    <div className="error-message" id="error-check"></div>

                    <input type="submit" value="Сохранить" />
                    <div id="form-message" className="form-message"></div>
                    </div>
                </div>
                </form>
            </div>
        </section>
    );
}

export default FormBlock;