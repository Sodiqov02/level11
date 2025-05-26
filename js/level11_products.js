export const productsData = [
  {
    id: "prod_futbolka_001",
    name: "Dizayner Futbolkasi #1",
    category: "futbolka",
    price: "95,000 so'm",
    image: "/img/5.png",
    description: "Yuqori sifatli matodan tikilgan, o'ziga xos dizayndagi futbolka.",
  },
  {
    id: "prod_futbolka_002",
    name: "Trenddagi Futbolka #2",
    category: "futbolka",
    price: "105,000 so'm",
    image: "img/5.png",
    description:
      "Eng so'nggi urfdagi print bilan bezatilgan, qulay va zamonaviy futbolka.",
  },
  {
    id: "prod_futbolka_003",
    name: "Klassik Futbolka #3",
    category: "futbolka",
    price: "90,000 so'm",
    image: "img/6.png",
    description: "Har doim urfda bo'ladigan klassik bichimdagi, sifatli futbolka.",
  },
  {
    id: "prod_futbolka_004",
    name: "Sportcha Futbolka #4",
    category: "futbolka",
    price: "110,000 so'm",
    image: "img/blackabs.png",
    description:
      "Faol hayot tarzi uchun mo'ljallangan, nafas oluvchi matodan tikilgan sport futbolkasi.",
  },
  {
    id: "prod_futbolka_005",
    name: "Original Futbolka #5",
    category: "futbolka",
    price: "99,000 so'm",
    image: "img/8.png",
    description:
      "Betakror printga ega, ko' sordidagi karta tugmasi ham yangilanishi uchun kerak.",
  },
];

function updateCardButton(productId) {
  const cardButton = document.querySelector(
    `.add-to-cart-btn-card[data-product-id="${productId}"]`
  );
  if (cardButton && !cardButton.disabled) {
    cardButton.textContent = "Qo'shildi!";
    cardButton.classList.remove("bg-indigo-600", "hover:bg-indigo-700");
    cardButton.classList.add("bg-green-500", "cursor-not-allowed");
    cardButton.disabled = true;

    setTimeout(() => {
      if (cardButton) {
        cardButton.textContent = "Savatchaga Qo'shish";
        cardButton.classList.remove("bg-green-500", "cursor-not-allowed");
        cardButton.classList.add("bg-indigo-600", "hover:bg-indigo-700");
        cardButton.disabled = false;
      }
    }, 1500);
  }
}

export function initCart({ cartCountElement }) {
  cartCountElement.textContent = cart.length;
}
