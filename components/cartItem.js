import { items, totalSum as sum } from "../data.js";
import { renderDeliveryHtml } from "./delivery.js";

const checkAll = document.querySelector(".check-all");
const totalSum = document.querySelector("#totalSum");
const totalAmount = document.querySelector("#total-amount-items");
const totalDeliverySum = document.querySelector("#total-delivery-sum");
const totalDelivery = document.querySelector("#total-delivery");
const amountDetailsCards = document.querySelectorAll(".amount");

let buttonDecrement = null;
let buttonIncrement = null;
let likeButton = null;
let deleteButton = null;
let checkbox = null;

export const rootRender = (items) => {
  buttonDecrement = document.querySelectorAll("#buttonDecrement");
  buttonIncrement = document.querySelectorAll("#buttonIncrement");
  likeButton = document.querySelectorAll("#like-icon");
  deleteButton = document.querySelectorAll("#delete-icon");

  checkbox = document.querySelectorAll("#checkbox");

  document.querySelector(".cart-item-amount").textContent = items.filter(
    (item) => item?.selected
  ).length
    ? items.filter((item) => item.selected).length
    : (document.querySelector(".cart-item-amount").style.display = "none");

  checkbox.forEach((item) => {
    item.addEventListener("click", (e) => checkboxChange(e));
  });

  buttonDecrement.forEach((item) => {
    item.addEventListener("click", (e) => decrement(e));
  });

  buttonIncrement.forEach((item) => {
    item.addEventListener("click", (e) => increment(e));
  });

  likeButton.forEach((item) => {
    item.addEventListener("click", (e) => like(e));
  });
  deleteButton.forEach((item) => {
    item.addEventListener("click", (e) => deleteItem(e));
  });
};

const checkboxChange = (e) => {
  items.map((item) => {
    if (item.id == e.currentTarget.dataset.id) {
      item.selected = !item.selected;
    }
    if (!item.selected) {
      checkAll.checked = false;
    }

    document.querySelector(".cart-item-amount").style.display = items.filter(
      (item) => item?.selected
    ).length
      ? "block"
      : "none";

    document.querySelector(".cart-item-amount").textContent = items.filter(
      (item) => item?.selected
    ).length;
  });

  if (
    items.filter((item) => {
      return !!item.selected;
    }).length == items.length
  ) {
    checkAll.checked = true;
  }

  values();
  renderDeliveryHtml(items.filter((item) => item.selected));
};

checkAll.addEventListener("click", () => {
  items.map((item) => {
    item.selected = checkAll.checked;
  });

  const checkboxes = document.querySelectorAll("#checkbox");

  checkboxes.forEach((item) => (item.checked = checkAll.checked));

  document.querySelector(".cart-item-amount").style.display = items.filter(
    (item) => item?.selected
  ).length
    ? "block"
    : "none";

  document.querySelector(".cart-item-amount").textContent = items.filter(
    (item) => item?.selected
  ).length;

  values();
  renderDeliveryHtml(items.filter((item) => item.selected));
});

const decrement = (e) => {
  items.map((item) => {
    if (item.id == e.currentTarget.dataset.id) {
      item.left++;
      item.inCart--;

      const currentCard = Array.from(amountDetailsCards).filter(
        (card, index) => {
          return (
            card.querySelector(".available").dataset.id ==
            e.currentTarget.dataset.id
          );
        }
      )[0];

      currentCard.querySelector("#left").textContent = item.inCart;

      if (!!currentCard.querySelector(".left")) {
        currentCard.querySelector(
          ".left"
        ).textContent = `Осталось ${item.left} шт.`;
      }

      currentCard.querySelector(".price").firstChild.textContent = Number(
        Math.round(item.inCart * item.priceDiscount)
      ).toLocaleString("ru-RU");

      currentCard.querySelector(
        ".discount"
      ).firstChild.nextSibling.firstChild.textContent =
        Number(Math.round(item.inCart * item.price)).toLocaleString("ru-RU") +
        " сом";

      currentCard.querySelector(
        ".total-discount"
      ).firstChild.textContent = `${Math.round(
        (currentCard.querySelector(".total-discount").firstChild.textContent =
          item.inCart * item.price - item.inCart * item.priceDiscount)
      )} сом`;

      const buttonDecrement = currentCard.querySelector("#buttonDecrement");
      const buttonIncrement = currentCard.querySelector("#buttonIncrement");

      if (item.left !== 0) {
        buttonIncrement.removeAttribute("disabled");
      }

      if (item.inCart == 1) {
        buttonDecrement.setAttribute("disabled", true);
      } else {
        buttonDecrement.removeAttribute("disabled");
      }
    }
  });

  values();
  renderDeliveryHtml(items.filter((item) => item.selected));
};

const increment = (e) => {
  items.map((item) => {
    if (item.id == e.currentTarget.dataset.id) {
      item.left--;
      item.inCart++;

      const currentCard = Array.from(amountDetailsCards).filter(
        (card, index) => {
          return (
            card.querySelector(".available").dataset.id ==
            e.currentTarget.dataset.id
          );
        }
      )[0];

      currentCard.querySelector("#left").textContent = item.inCart;

      if (!!currentCard.querySelector(".left")) {
        currentCard.querySelector(
          ".left"
        ).textContent = `Осталось ${item.left} шт.`;
      }

      currentCard.querySelector(".price").firstChild.textContent = Number(
        Math.round(item.inCart * item.priceDiscount)
      ).toLocaleString("ru-RU");

      currentCard.querySelector(
        ".discount"
      ).firstChild.nextSibling.firstChild.textContent =
        Number(Math.round(item.inCart * item.price)).toLocaleString("ru-RU") +
        " сом";

      currentCard.querySelector(
        ".total-discount"
      ).firstChild.textContent = `${Math.round(
        (currentCard.querySelector(".total-discount").firstChild.textContent =
          item.inCart * item.price - item.inCart * item.priceDiscount)
      )} сом`;

      const buttonDecrement = currentCard.querySelector("#buttonDecrement");
      const buttonIncrement = currentCard.querySelector("#buttonIncrement");

      if (item.left == 0) {
        buttonIncrement.setAttribute("disabled", true);
      }

      if (item.inCart == 1) {
        buttonDecrement.setAttribute("disabled");
      } else {
        buttonDecrement.removeAttribute("disabled");
      }
    }
  });

  values();
  renderDeliveryHtml(items.filter((item) => item.selected));
};

const like = (e) => {
  items.map((item) => {
    if (item.id == e.currentTarget.dataset.id) {
      item.like = !item.like;

      const currentCard = Array.from(amountDetailsCards).filter(
        (card, index) => {
          return (
            card.querySelector(".available").dataset.id ==
            e.currentTarget.dataset.id
          );
        }
      )[0];

      // Находим SVG-элемент
      let svgElement = currentCard.querySelector("#like-icon path");

      // Устанавливаем новое значение для атрибута fill
      svgElement.setAttribute("fill", item.like ? "#F55123" : "black");
    }
  });
};

const deleteItem = (e) => {
  items.forEach(function (el, i) {
    if (el.id == e.currentTarget.dataset.id) items.splice(i, 1);
  });

  const cartItems = document.querySelectorAll(".cart-item");

  const currentItem = Array.from(cartItems)
    .filter((item, index) => {
      return item.dataset.id == e.currentTarget.dataset.id;
    })[0]
    .remove();

  values();
  renderDeliveryHtml(items.filter((item) => item.selected));
};

window.addEventListener("resize", (e) => {
  if (window.innerWidth <= 320) {
    items.map((item) => {
      return { ...item, title: item.title.slice(0, 44) + "..." };
    });
  } else {
    return items;
  }
});

const paymentCheckbox = document.querySelector("#payment-checkbox");
const submitButton = document.querySelector("#submit");

paymentCheckbox.addEventListener("change", () => {
  values();
});

const values = () => {
  if (paymentCheckbox.checked) {
    submitButton.textContent = "Оплатить " + sum() + " сом";
  } else {
    submitButton.textContent = "Заказать";
  }

  totalSum.innerHTML = sum() + "<span> сом</span>";

  totalAmount.textContent =
    items.reduce((acc, item) => (item.selected ? acc + item.inCart : acc), 0) +
    " товара";
  totalDeliverySum.textContent =
    new Intl.NumberFormat("ru-RU")
      .format(
        String(
          Math.ceil(
            items.reduce(
              (acc, item) =>
                item.selected ? acc + item.price * item.inCart : acc,
              0
            )
          )
        )
      )
      .replace(",", ".") + " сом";
  totalDelivery.textContent =
    "−" +
    new Intl.NumberFormat("ru-RU")
      .format(
        Math.ceil(
          items.reduce(
            (acc, item) =>
              item.selected ? acc + item.price * item.inCart : acc,
            0
          ) -
            items.reduce(
              (acc, item) =>
                item.selected ? acc + item.priceDiscount * item.inCart : acc,
              0
            )
        )
      )
      .replace(",", ".") +
    " сом";
};

values();
