export let items = [
  {
    id: 1,
    title: "Футболка UZcotton мужская",
    selected: true,
    price: 1051,
    priceDiscount: 522,
    inCart: 1,
    img: "./img/img1.svg",
    size: 56,
    left: 2, // осталось в магазине
    color: "белый",
    company: "OOO Вайлдберриз",
    companyHover: "OOO «ВАЙЛЛДБЕРРИЗ»",
    inStorage: 2, // отправляется 5-6 февраля, остальное 7-8 февраля
    like: false,
  },
  {
    id: 2,
    title:
      "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
    selected: false,
    price: 11500.235,
    priceDiscount: 10500.235,
    inCart: 200,
    img: "./img/img2.svg",
    size: null,
    left: 5, // осталось в магазине
    color: "прозрачный",
    company: "OOO Мегапрофстиль",
    companyHover: "OOO «МЕГАПРОФСТИЛЬ»",
    inStorage: 184, // отправляется 5-6 февраля, остальное 7-8 февраля
    like: false,
  },
  {
    id: 3,
    title:
      'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
    selected: false,
    price: 475,
    priceDiscount: 247,
    inCart: 2,
    img: "./img/img3.svg",
    size: null,
    left: 2, // осталось в магазине
    color: null,
    company: "OOO Вайлдберриз",
    companyHover: "OOO «ВАЙЛЛДБЕРРИЗ»",
    inStorage: 2, // отправляется 5-6 февраля, остальное 7-8 февраля
    like: false,
  },
];

export const totalSum = () =>
  new Intl.NumberFormat("ru-RU")
    .format(
      String(
        Math.ceil(
          items.reduce(
            (acc, item) =>
              item.selected ? acc + item.priceDiscount * item.inCart : acc,
            0
          )
        )
      )
    )
    .replace(",", ".");
