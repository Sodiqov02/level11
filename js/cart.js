// js/cart.js

// Mahsulotlar ro'yxatini import qilamiz (agar kerak bo'lsa, lekin hozircha main.js dan keladi deb hisoblaymiz)
// Agar productsData bu yerda ham kerak bo'lsa, uni import qilish kerak:
import { productsData } from "./level11_products.js";

let cart = [];
let cartCountElement; // Savatchadagi mahsulotlar sonini ko'rsatuvchi HTML elementi

/**
 * Savatchani ishga tushiradi.
 * @param {object} elements - DOM elementlari (masalan, cartCountElement).
 */
export function initCart(elements) {
  cartCountElement = elements.cartCountElement;
  loadCartFromLocalStorage(); // Mahalliy xotiradan savatchani yuklash
  updateCartCountDisplay(); // Savatcha sonini yangilash
}

/**
 * Mahsulotni savatchaga qo'shadi.
 * @param {string} productId - Qo'shilayotgan mahsulotning ID si.
 * @param {HTMLElement} buttonElement - Bosilgan tugma elementi.
 * @param {boolean} isModalButton - Tugma modal ichidami yoki yo'qmi.
 */
export function addToCart(productId, buttonElement, isModalButton = false) {
  // productsData dan mahsulotni topish
  const productToAdd = productsData.find((p) => p.id === productId);

  if (productToAdd) {
    // Hozircha oddiygina har bir bosishda yangi mahsulot qo'shamiz.
    // Agar miqdorni hisoblash kerak bo'lsa, bu logikani o'zgartirish kerak.
    cart.push(productToAdd);
    saveCartToLocalStorage(); // Savatchani mahalliy xotiraga saqlash
    updateCartCountDisplay(); // Savatcha sonini yangilash

    // Tugma ko'rinishini o'zgartirish
    if (buttonElement) {
      buttonElement.textContent = "Qo'shildi!";
      buttonElement.classList.remove("bg-indigo-600", "hover:bg-indigo-700");
      buttonElement.classList.add("bg-green-500", "cursor-not-allowed");
      buttonElement.disabled = true;

      // Agar bu asosiy kartadagi tugma bo'lsa va modal ham ochiq bo'lsa,
      // modaldagi tugmani ham yangilashimiz mumkin (agar kerak bo'lsa).
      // Hozircha bu qismi qo'shilmagan.

      setTimeout(() => {
        buttonElement.textContent = "Savatchaga Qo'shish";
        buttonElement.classList.remove("bg-green-500", "cursor-not-allowed");
        buttonElement.classList.add("bg-indigo-600", "hover:bg-indigo-700");
        buttonElement.disabled = false;
      }, 2000); // 2 soniyadan keyin tugma asl holiga qaytadi
    }

    // Agar modal ichidagi tugma bosilsa va asosiy kartada ham shu mahsulot bo'lsa,
    // asosiy kartadagi tugmani ham yangilashimiz mumkin.
    // Bu logikani main.js dagi handleModalAddToCart ichida qisman qilgansiz.
    // Bu yerda takrorlash yoki markazlashtirish haqida o'ylash kerak.
  } else {
    console.error(`Mahsulot topilmadi: ID - ${productId}`);
  }
}

/**
 * Savatchadagi mahsulotlar sonini HTML da ko'rsatadi.
 */
function updateCartCountDisplay() {
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

/**
 * Savatchani brauzerning mahalliy xotirasiga saqlaydi.
 */
function saveCartToLocalStorage() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

/**
 * Savatchani brauzerning mahalliy xotirasidan yuklaydi.
 */
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("shoppingCart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  } else {
    cart = []; // Agar xotirada yo'q bo'lsa, bo'sh massiv
  }
}

// Keyinchalik kerak bo'lishi mumkin bo'lgan funksiyalar:
// removeFromCart(productId)
// clearCart()
// getCartTotal()
