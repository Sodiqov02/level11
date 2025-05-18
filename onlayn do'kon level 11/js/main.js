import {
  initUI,
  displayProductsUI,
  openProductModalUI,
  closeProductModalUI,
  updateActiveCategoryLink,
  toggleSidebarUI,
  closeSidebarUI,
  displayProductsDataErrorUI,
} from "./UI.js";
import { initCart, addToCart } from "./cart.js";
import { productsData } from "./level11_products.js";

// --- Global DOM Elementlari ---
let productListContainer,
  categoryList,
  sidebar,
  sidebarToggle,
  sidebarOverlay,
  cartButton,
  cartCountElement;
let productModal, closeModalBtn, modalAddToCartBtn;
let currentYearElement;

// --- Sahifa Yuklanganda Ishga Tushadi ---
document.addEventListener("DOMContentLoaded", () => {
  // DOM elementlarini topish
  productListContainer = document.getElementById("product-list");
  categoryList = document.getElementById("categoryList");
  sidebar = document.getElementById("sidebar");
  sidebarToggle = document.getElementById("sidebarToggle");
  sidebarOverlay = document.getElementById("sidebar-overlay");
  cartButton = document.getElementById("cartButton");
  cartCountElement = document.getElementById("cart-count");
  currentYearElement = document.getElementById("currentYear");

  // Modal elementlari
  productModal = document.getElementById("productModal");
  closeModalBtn = document.getElementById("closeModalBtn");
  modalAddToCartBtn = document.getElementById("modalAddToCartBtn");

  // UI modulini ishga tushirish
  initUI({
    productListContainer,
    productModal,
    modalProductName: document.getElementById("modalProductName"),
    modalProductImage: document.getElementById("modalProductImage"),
    modalProductCategory: document.getElementById("modalProductCategory"),
    modalProductDescription: document.getElementById("modalProductDescription"),
    modalProductPrice: document.getElementById("modalProductPrice"),
    modalAddToCartBtn,
  });

  // Savatcha modulini ishga tushirish
  initCart({ cartCountElement });

  // Mahsulotlarni ko'rsatish
  if (Array.isArray(productsData)) {
    renderProducts();
    const allProductsLink = categoryList.querySelector(
      '.category-link[data-category="all"]'
    );
    if (allProductsLink) {
      updateActiveCategoryLink(
        allProductsLink,
        categoryList.querySelectorAll(".category-link")
      );
    }
  } else {
    console.error("main.js: `productsData` massiv emas!");
    displayProductsDataErrorUI();
  }

  // Event listenerlarni sozlash
  setupEventListeners();

  // Joriy yilni ko'rsatish
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});

/**
 * Mahsulotlarni filtrlaydi va ko'rsatadi.
 * @param {string} filterCategory - Filtrlash uchun kategoriya (default: 'all').
 */
function renderProducts(filterCategory = "all") {
  if (!Array.isArray(productsData)) {
    displayProductsDataErrorUI();
    return;
  }

  const filteredProducts = productsData.filter(
    (product) => filterCategory === "all" || product.category === filterCategory
  );

  displayProductsUI(filteredProducts, handleAddToCart, handleProductCardClick);
}

/**
 * Event listenerlarni sozlaydi.
 */
function setupEventListeners() {
  // Kategoriya linklari
  if (categoryList) {
    const links = categoryList.querySelectorAll(".category-link");
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedCategory = link.dataset.category;
        renderProducts(selectedCategory);
        updateActiveCategoryLink(link, links);
        if (window.innerWidth < 768 && sidebar && sidebarOverlay) {
          closeSidebarUI(sidebar, sidebarOverlay);
        }
      });
    });
  }

  // Sidebar ochish/yopish
  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSidebarUI(sidebar, sidebarOverlay);
    });
    sidebarOverlay.addEventListener("click", () =>
      closeSidebarUI(sidebar, sidebarOverlay)
    );
  }

  // Modal yopish
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeProductModalUI);
  }

  // Modal orqa fonini bosish
  if (productModal) {
    productModal.addEventListener("click", (event) => {
      if (event.target === productModal) {
        closeProductModalUI();
      }
    });
  }
}

/**
 * Kartadagi savatchaga qo'shish tugmasi.
 * @param {string} productId - Mahsulot ID si.
 * @param {HTMLElement} buttonElement - Bosilgan tugma.
 */
function handleAddToCart(productId, buttonElement) {
  addToCart(productId, buttonElement, false);
}

/**
 * Modal ichidagi savatchaga qo'shish tugmasi.
 * @param {string} productId - Mahsulot ID si.
 * @param {HTMLElement} buttonElement - Bosilgan tugma.
 */
function handleModalAddToCart(productId, buttonElement) {
  addToCart(productId, buttonElement, true);

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

/**
 * Mahsulot kartasi bosilganda modalni ochadi.
 * @param {object} productData - Mahsulot ma'lumotlari.
 */
function handleProductCardClick(productData) {
  openProductModalUI(productData, handleModalAddToCart);
}

// Boshlang'ich mahsulotlarni ko'rsatish
function initProductDisplay() {
  const initialCategory =
    categoryList.querySelector(".category-link.active") ||
    categoryList.querySelector('.category-link[data-category="all"]');
  if (initialCategory) {
    const selectedCategory = initialCategory.dataset.category;
    renderProducts(selectedCategory);
  }
}
initProductDisplay();
