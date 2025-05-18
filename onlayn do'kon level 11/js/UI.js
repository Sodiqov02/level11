// js/ui.js

// --- DOM Elementlari (main.js dan olinadi yoki bu yerda topiladi) ---
let productListContainer;
let productModal,
  modalProductName,
  modalProductImage,
  modalProductCategory,
  modalProductDescription,
  modalProductPrice;
let globalModalAddToCartBtn; // Bu o'zgaruvchi main.js dan keladi va modal ichidagi "Savatchaga qo'shish" tugmasi

/**
 * UI modulini ishga tushirish va kerakli DOM elementlarini o'rnatish.
 * Bu funksiya main.js dan chaqiriladi.
 * @param {object} elements - DOM elementlari to'plami.
 */
export function initUI(elements) {
  productListContainer = elements.productListContainer;
  productModal = elements.productModal;
  modalProductName = elements.modalProductName;
  modalProductImage = elements.modalProductImage;
  modalProductCategory = elements.modalProductCategory;
  modalProductDescription = elements.modalProductDescription;
  modalProductPrice = elements.modalProductPrice;
  globalModalAddToCartBtn = elements.modalAddToCartBtn; // main.js dagi modalAddToCartBtn
}

/**
 * Berilgan mahsulot uchun HTML kartasini yaratadi.
 * @param {object} product - Mahsulot haqidagi ma'lumotlar.
 * @returns {string} Mahsulot kartasi uchun HTML string.
 */
export function createProductCard(product) {
  if (!product) return ""; // Agar mahsulot bo'lmasa, bo'sh string qaytarish
  // Mahsulot kartasi uchun HTML struktura
  // Apostrof ('): JavaScript satrlari ichida to'g'ri ekranlangan (`\'`).
  // Placeholder URL'dagi `Rasm+Yo\'q` endi to'g'ri `Rasm Yo'q` matnini hosil qiladi.
  return `<div class="product-card bg-white rounded-xl shadow-lg overflow-hidden flex flex-col" data-id="${
    product.id
  }" data-name="${product.name || "Nomsiz mahsulot"}" data-category="${
    product.category || "Kategoriyasiz"
  }" data-image="${
    product.image || "https://placehold.co/400x300/cccccc/969696?text=Rasm+Yo'q"
  }" data-description="${product.description || "Tavsif yo'q"}" data-price="${
    product.price || "Narxi ko'rsatilmagan"
  }"> <img src="${
    product.image || "https://placehold.co/400x300/cccccc/969696?text=Rasm+Yo'q"
  }" alt="${
    product.name || "Nomsiz mahsulot"
  }" class="w-full h-56 sm:h-60 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x300/cccccc/969696?text=Rasm+Xatosi';"> <div class="p-5 flex flex-col flex-grow"> <h3 class="text-lg font-semibold text-gray-800 mb-1.5 pointer-events-none">${
    product.name || "Nomsiz mahsulot"
  }</h3> <p class="text-xs text-gray-500 mb-2 uppercase tracking-wider pointer-events-none">${
    product.category || "Kategoriyasiz"
  }</p> <p class="text-sm text-gray-600 mb-3 flex-grow pointer-events-none">${
    product.description || "Tavsif yo'q"
  }</p> <p class="text-xl font-bold text-indigo-600 mb-4 pointer-events-none">${
    product.price || "Narxi ko'rsatilmagan"
  }</p> <button class="add-to-cart-btn-card mt-auto w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-sm font-medium" data-product-id="${
    product.id
  }"> Savatchaga Qo'shish </button> </div> </div>`;
}

/**
 * Mahsulotlar ro'yxatini sahifada ko'rsatadi va kerakli event listenerlarni qo'shadi.
 * @param {Array<object>} productsToDisplay - Ko'rsatiladigan mahsulotlar massivi.
 * @param {function} onCartAddCallback - Kartadagi "Savatchaga qo'shish" tugmasi bosilganda chaqiriladigan callback funksiya.
 * @param {function} onCardClickCallback - Mahsulot kartasi bosilganda chaqiriladigan callback funksiya.
 */
export function displayProductsUI(
  productsToDisplay,
  onCartAddCallback,
  onCardClickCallback
) {
  if (!productListContainer) {
    console.error("UI: Mahsulotlar ro'yxati uchun konteyner topilmadi!");
    return;
  }
  productListContainer.innerHTML = ""; // Oldingi mahsulotlarni tozalash

  if (productsToDisplay.length === 0) {
    // Agar mahsulotlar bo'lmasa, xabar ko'rsatish
    productListContainer.innerHTML =
      '<p class="text-center text-gray-500 col-span-full py-10">Ushbu kategoriyada hozircha mahsulotlar mavjud emas.</p>';
    return;
  }

  // Har bir mahsulot uchun kartani yaratib, sahifaga qo'shish
  productsToDisplay.forEach((product) => {
    const productCardHTML = createProductCard(product);
    productListContainer.insertAdjacentHTML("beforeend", productCardHTML);
  });

  // Kartadagi "Savatchaga qo'shish" tugmalariga event listenerlarni qo'shish
  // Har safar mahsulotlar qayta chizilganda listenerlar qayta qo'shiladi, shuning uchun klonlash usuli ishlatiladi
  document.querySelectorAll(".add-to-cart-btn-card").forEach((button) => {
    const newButton = button.cloneNode(true); // Eski listenerlarni olib tashlash uchun
    button.parentNode.replaceChild(newButton, button);
    newButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Karta bosilishini oldini olish
      const productId = newButton.dataset.productId;
      onCartAddCallback(productId, newButton); // main.js dagi callback funksiyani chaqirish
    });
  });

  // Mahsulot kartalariga modalni ochish uchun event listenerlarni qo'shish
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => {
      // Kartadan mahsulot ma'lumotlarini olish
      const productData = {
        id: card.dataset.id,
        name: card.dataset.name,
        category: card.dataset.category,
        image: card.dataset.image,
        description: card.dataset.description,
        price: card.dataset.price,
      };
      onCardClickCallback(productData); // main.js dagi callback funksiyani chaqirish (openProductModal)
    });
  });
}

/**
 * Mahsulot modal oynasini ochadi va ma'lumotlar bilan to'ldiradi.
 * @param {object} product - Ko'rsatiladigan mahsulot ma'lumotlari.
 * @param {function} onModalCartAddCallback - Modal ichidagi "Savatchaga qo'shish" tugmasi bosilganda chaqiriladigan callback.
 */
export function openProductModalUI(product, onModalCartAddCallback) {
  // Modal elementlari mavjudligini tekshirish
  if (
    !productModal ||
    !modalProductName ||
    !modalProductImage ||
    !modalProductCategory ||
    !modalProductDescription ||
    !modalProductPrice ||
    !globalModalAddToCartBtn
  ) {
    console.error(
      "UI: Modal elementlari topilmadi yoki to'liq emas! Kerakli elementlar: productModal, modalProductName, modalProductImage, modalProductCategory, modalProductDescription, modalProductPrice, globalModalAddToCartBtn."
    );
    return;
  }

  // Modal oynani mahsulot ma'lumotlari bilan to'ldirish
  modalProductName.textContent = product.name;
  modalProductImage.src = product.image;
  modalProductImage.alt = product.name; // Rasm uchun alt atributi
  modalProductCategory.textContent = product.category;
  modalProductDescription.textContent = product.description;
  modalProductPrice.textContent = product.price;

  // Modal ichidagi "Savatchaga qo'shish" tugmasini sozlash
  // Eski listenerlarni olib tashlash uchun tugmani klonlash va qayta tayinlash
  const newModalBtn = globalModalAddToCartBtn.cloneNode(true);
  globalModalAddToCartBtn.parentNode.replaceChild(newModalBtn, globalModalAddToCartBtn);
  globalModalAddToCartBtn = newModalBtn; // globalModalAddToCartBtn ni yangilangan tugmaga o'zgartirish

  // Tugmani boshlang'ich holatga keltirish
  globalModalAddToCartBtn.disabled = false;
  globalModalAddToCartBtn.textContent = "Savatchaga Qo'shish";
  globalModalAddToCartBtn.classList.remove("bg-green-500", "cursor-not-allowed");
  globalModalAddToCartBtn.classList.add("bg-indigo-600", "hover:bg-indigo-700");
  globalModalAddToCartBtn.dataset.productId = product.id; // Mahsulot ID sini tugmaga qo'shish

  // Tugmaga click hodisasini qo'shish (onclick orqali, takroriy listenerlarni oldini olish uchun)
  globalModalAddToCartBtn.onclick = (event) => {
    event.stopPropagation(); // Boshqa click hodisalarini oldini olish
    onModalCartAddCallback(product.id, globalModalAddToCartBtn); // main.js dagi callback funksiyani chaqirish
  };

  // Modalni ko'rsatish
  productModal.classList.add("open");
  document.body.style.overflow = "hidden"; // Orqa fon scroll bo'lishini to'xtatish
}

/**
 * Mahsulot modal oynasini yopadi.
 */
export function closeProductModalUI() {
  if (productModal) {
    productModal.classList.remove("open");
    document.body.style.overflow = "auto"; // Scrollni qayta yoqish
  }
}

/**
 * Sidebar'dagi aktiv kategoriya linkini vizual tarzda belgilaydi.
 * @param {HTMLElement} activeLinkElement - Aktiv bo'lishi kerak bo'lgan link elementi.
 * @param {NodeListOf<HTMLElement>} allLinks - Barcha kategoriya linklari.
 */
export function updateActiveCategoryLink(activeLinkElement, allLinks) {
  allLinks.forEach((l) => {
    l.classList.remove("active-category-style");
    l.classList.add("category-link-default-style");
  });
  activeLinkElement.classList.add("active-category-style");
  activeLinkElement.classList.remove("category-link-default-style");
}

/**
 * Sidebar'ni ochadi yoki yopadi (toggle).
 * @param {HTMLElement} sidebar - Sidebar elementi.
 * @param {HTMLElement} sidebarOverlay - Sidebar orqa foni uchun overlay elementi.
 */
export function toggleSidebarUI(sidebar, sidebarOverlay) {
  sidebar.classList.toggle("-translate-x-full");
  sidebar.classList.toggle("translate-x-0");
  sidebarOverlay.classList.toggle("hidden");
}

/**
 * Sidebar'ni yopadi.
 * @param {HTMLElement} sidebar - Sidebar elementi.
 * @param {HTMLElement} sidebarOverlay - Sidebar orqa foni uchun overlay elementi.
 */
export function closeSidebarUI(sidebar, sidebarOverlay) {
  sidebar.classList.add("-translate-x-full");
  sidebar.classList.remove("translate-x-0");
  sidebarOverlay.classList.add("hidden");
}

/**
 * Mahsulot ma'lumotlari yuklanmaganda xatolik xabarini ko'rsatadi.
 */
export function displayProductsDataErrorUI() {
  if (productListContainer) {
    productListContainer.innerHTML = `  <div class="col-span-full text-center py-10 bg-red-50 p-4 rounded-lg border border-red-200"> <p class="text-red-700 font-bold text-xl mb-3">Xatolik: Mahsulotlar Yuklanmadi!</p> <p class="text-gray-700 mb-2"> <code>productsData</code> o'zgaruvchisi <code>js/level11_products.js</code> faylidan topilmadi yoki noto'g'ri formatda. </p> <p class="text-gray-600 text-sm mb-1">Iltimos, quyidagilarni tekshiring:</p> <ul class="list-disc list-inside text-left inline-block text-gray-600 text-sm mt-1 space-y-1"> <li><code>js/level11_products.js</code> fayli mavjudligiga ishonch hosil qiling.</li> <li>Fayl nomi HTML kodidagi <code>&lt;script src="js/level11_products.js"&gt;&lt;/script&gt;</code> qatorida to'g'ri yozilganligini tekshiring.</li> <li><code>js/level11_products.js</code> faylida JavaScript sintaksis xatoliklari yo'qligiga ishonch hosil qiling (brauzer konsolini tekshiring).</li> <li><code>productsData</code> o'zgaruvchisi <code>js/level11_products.js</code> faylida global o'zgaruvchi sifatida to'g'ri e'lon qilinganligini tekshiring.</li> </ul> <p class="text-gray-500 mt-3 text-xs"> Agar muammo davom etsa, brauzeringizning "Developer Console" (Ishlab chiquvchi konsoli) qismidagi xabarlarni ko'rib chiqing. </p> </div> `;
  }
}
