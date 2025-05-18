// js/main.js
import {
  initUI,
  displayProductsUI,
  openProductModalUI,
  closeProductModalUI,
  updateActiveCategoryLink,
  toggleSidebarUI,
  closeSidebarUI,
  displayProductsDataErrorUI,
} from "UI.js"; // ui.js modulidan kerakli funksiyalarni import qilish
import { initCart, addToCart } from "./cart.js"; // cart.js modulidan kerakli funksiyalarni import qilish
import { productsData } from "./level11_products.js";
// productsData global o'zgaruvchi sifatida level11_products.js dan keladi deb taxmin qilinadi.
// Agar level11_products.js faylini ham modulga aylantirsangiz, uni quyidagicha import qilishingiz kerak bo'ladi:
// import { productsData } from './level11_products.js';
// Hozircha u global scope'da e'lon qilingan deb hisoblaymiz.

// --- Global DOM Elementlari (Sahifa yuklanganda topiladi) ---
let productListContainer,
  categoryList,
  sidebar,
  sidebarToggle,
  sidebarOverlay,
  cartButton,
  cartCountElement;
let productModal, closeModalBtn, modalAddToCartBtn; // modalAddToCartBtn ni bu yerda e'lon qilamiz
let currentYearElement;

// --- Sahifa to'liq yuklangandan so'ng ishga tushadigan asosiy funksiya ---
document.addEventListener("DOMContentLoaded", () => {
  // DOM elementlarini ID orqali topish
  productListContainer = document.getElementById("product-list");
  categoryList = document.getElementById("categoryList"); // Sidebar'dagi kategoriya ro'yxati
  sidebar = document.getElementById("sidebar");
  sidebarToggle = document.getElementById("sidebarToggle");
  sidebarOverlay = document.getElementById("sidebar-overlay");
  cartButton = document.getElementById("cartButton"); // Savatcha tugmasi (agar maxsus funksiyasi bo'lsa)
  cartCountElement = document.getElementById("cart-count"); // Savatchadagi mahsulotlar soni
  currentYearElement = document.getElementById("currentYear");

  // Modal oyna elementlari
  productModal = document.getElementById("productModal");
  closeModalBtn = document.getElementById("closeModalBtn");
  modalAddToCartBtn = document.getElementById("modalAddToCartBtn"); // Modal ichidagi "Savatchaga qo'shish" tugmasi

  // UI (Foydalanuvchi Interfeysi) modulini ishga tushirish va kerakli elementlarni uzatish
  initUI({
    productListContainer,
    productModal,
    modalProductName: document.getElementById("modalProductName"),
    modalProductImage: document.getElementById("modalProductImage"),
    modalProductCategory: document.getElementById("modalProductCategory"),
    modalProductDescription: document.getElementById("modalProductDescription"),
    modalProductPrice: document.getElementById("modalProductPrice"),
    modalAddToCartBtn, // global modalAddToCartBtn ni ui.js ga uzatamiz
  });

  // Savatcha modulini ishga tushirish
  initCart({ cartCountElement });

  // productsData mavjudligini tekshirish va mahsulotlarni ko'rsatish
  if (typeof productsData !== "undefined" && Array.isArray(productsData)) {
    renderProducts(); // Barcha mahsulotlarni ko'rsatish (boshlang'ich filtr "all")
    const allProductsLink = categoryList.querySelector(
      '.category-link[data-category="all"]'
    );
    if (allProductsLink) {
      // Boshlang'ich aktiv kategoriyani belgilash
      updateActiveCategoryLink(
        allProductsLink,
        categoryList.querySelectorAll(".category-link")
      );
    }
  } else {
    // Agar productsData topilmasa, xatolik xabarini ko'rsatish
    console.error(
      "main.js: `productsData` topilmadi yoki massiv emas. Xatolik xabarini ko'rsatish."
    );
    displayProductsDataErrorUI();
  }

  // Asosiy event listenerlarni (hodisa tinglovchilarni) sozlash
  setupEventListeners();

  // Footerda joriy yilni ko'rsatish
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});

/**
 * Mahsulotlarni filtrlaydi va UI da ko'rsatadi.
 * @param {string} filterCategory - Filtrlash uchun kategoriya (default: 'all').
 */
function renderProducts(filterCategory = "all") {
  // productsData mavjudligini yana bir bor tekshirish
  if (typeof productsData === "undefined" || !Array.isArray(productsData)) {
    displayProductsDataErrorUI(); // Agar topilmasa, xatolik ko'rsatish
    return;
  }

  // Mahsulotlarni kategoriya bo'yicha filtrlash
  const filteredProducts = productsData.filter(
    (product) =>
      product && (filterCategory === "all" || product.category === filterCategory)
  );

  // Filtrlangan mahsulotlarni UI da ko'rsatish
  // Callback funksiyalar: handleAddToCart (kartadan savatchaga qo'shish uchun)
  // va handleProductCardClick (karta bosilganda modalni ochish uchun)
  displayProductsUI(filteredProducts, handleAddToCart, handleProductCardClick);
}

/**
 * Asosiy event listenerlarni (hodisa tinglovchilarni) sozlaydi.
 */
function setupEventListeners() {
  // Sidebar'dagi kategoriya linklariga click hodisasini qo'shish
  if (categoryList) {
    const links = categoryList.querySelectorAll(".category-link");
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault(); // Linkning standart harakatini to'xtatish
        const selectedCategory = link.dataset.category; // Tanlangan kategoriyani olish
        renderProducts(selectedCategory); // Mahsulotlarni shu kategoriya bo'yicha ko'rsatish
        updateActiveCategoryLink(link, links); // Aktiv linkni vizual belgilash

        // Agar ekran kichik bo'lsa (mobil qurilma), sidebar'ni yopish
        if (window.innerWidth < 768 && sidebar && sidebarOverlay) {
          closeSidebarUI(sidebar, sidebarOverlay);
        }
      });
    });
  }

  // Sidebar'ni ochish/yopish tugmasiga (mobil uchun) click hodisasini qo'shish
  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Boshqa elementlarga click hodisasi o'tishini to'xtatish
      toggleSidebarUI(sidebar, sidebarOverlay); // Sidebar'ni ochish/yopish
    });
    // Sidebar orqa fonini bosganda sidebar'ni yopish
    sidebarOverlay.addEventListener("click", () =>
      closeSidebarUI(sidebar, sidebarOverlay)
    );
  }

  // Modal oynani yopish tugmasiga click hodisasini qo'shish
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeProductModalUI);
  }

  // Modal oynaning orqa fonini bosganda modalni yopish
  if (productModal) {
    productModal.addEventListener("click", (event) => {
      // Faqat modalning orqa foni (modal-content emas) bosilganda yopish
      if (event.target === productModal) {
        closeProductModalUI();
      }
    });
  }
}

// --- UI Modulidan Chaqiriladigan Callback Funksiyalar ---

/**
 * Mahsulot kartasidagi "Savatchaga qo'shish" tugmasi bosilganda ishga tushadi.
 * @param {string} productId - Savatchaga qo'shilayotgan mahsulot ID si.
 * @param {HTMLElement} buttonElement - Bosilgan tugma elementi.
 */
function handleAddToCart(productId, buttonElement) {
  addToCart(productId, buttonElement, false); // false - bu modal ichidagi tugma emasligini bildiradi
}

/**
 * Modal oyna ichidagi "Savatchaga qo'shish" tugmasi bosilganda ishga tushadi.
 * @param {string} productId - Savatchaga qo'shilayotgan mahsulot ID si.
 * @param {HTMLElement} buttonElement - Bosilgan tugma elementi (modal ichidagi).
 */
function handleModalAddToCart(productId, buttonElement) {
  addToCart(productId, buttonElement, true); // true - bu modal ichidagi tugma ekanligini bildiradi

  // Kartadagi mos keladigan "Savatchaga qo'shish" tugmasini ham yangilash
  // Bu foydalanuvchi modalda mahsulotni qo'shganda, asosiy sahifadagi karta tugmasi ham yangilanishi uchun kerak.
  const cardButton = document.querySelector(
    `.add-to-cart-btn-card[data-product-id="${productId}"]`
  );
  if (cardButton && !cardButton.disabled) {
    // Kartadagi tugmani ham "Qo'shildi!" holatiga o'tkazish
    cardButton.textContent = "Qo'shildi!";
    cardButton.classList.remove("bg-indigo-600", "hover:bg-indigo-700");
    cardButton.classList.add("bg-green-500", "cursor-not-allowed");
    cardButton.disabled = true;

    // Kartadagi tugmani ma'lum vaqtdan keyin asl holiga qaytarish (agar kerak bo'lsa)
    // Bu foydalanuvchiga mahsulot yana qo'shilishi mumkinligini bildiradi.
    // Agar mahsulot faqat bir marta qo'shilishi kerak bo'lsa, bu qismni olib tashlashingiz mumkin.
    setTimeout(() => {
      if (cardButton) {
        // Element hali ham mavjudligini tekshirish
        cardButton.textContent = "Savatchaga Qo'shish";
        cardButton.classList.remove("bg-green-500", "cursor-not-allowed");
        cardButton.classList.add("bg-indigo-600", "hover:bg-indigo-700");
        cardButton.disabled = false;
      }
    }, 1500); // 1.5 soniyadan keyin
  }
}

/**
 * Mahsulot kartasi bosilganda ishga tushadi (modal oynani ochish uchun).
 * @param {object} productData - Bosilgan mahsulot haqidagi ma'lumotlar.
 */
function handleProductCardClick(productData) {
  // Modal oynani ochish va kerakli callback funksiyani (modal ichidagi savatchaga qo'shish uchun) uzatish
  openProductModalUI(productData, handleModalAddToCart);
}
// --- Sahifa to'liq yuklangandan so'ng ishga tushadigan funksiya ---
// Mahsulotlar ma'lumotlarini ko'rsatish
function initProductDisplay() {
  const initialCategory = categoryList.querySelector(".category-link.active");
  if (initialCategory) {
    const selectedCategory = initialCategory.dataset.category;
    renderProducts(selectedCategory);
  }
}
// Sahifa yuklanganda mahsulotlarni ko'rsatish
initProductDisplay();
