let productListContainer;
let productModal,
  modalProductName,
  modalProductImage,
  modalProductCategory,
  modalProductDescription,
  modalProductPrice;
let globalModalAddToCartBtn;

export function initUI(elements) {
  productListContainer = elements.productListContainer;
  productModal = elements.productModal;
  modalProductName = elements.modalProductName;
  modalProductImage = elements.modalProductImage;
  modalProductCategory = elements.modalProductCategory;
  modalProductDescription = elements.modalProductDescription;
  modalProductPrice = elements.modalProductPrice;
  globalModalAddToCartBtn = elements.modalAddToCartBtn;
}

export function createProductCard(product) {
  if (!product) return "";
  return `<div class="product-card bg-white rounded-xl shadow-lg overflow-hidden flex flex-col" data-id="${
    product.id
  }" data-name="${product.name || "Nomsiz mahsulot"}" data-category="${
    product.category || "Kategoriyasiz"
  }" data-image="${
    product.image || "https://placehold.co/400x300/cccccc/969696?text=Rasm+Yo'q"
  }" data-description="${product.description || "Tavsif yo'q"}" data-price="${
    product.price || "Narxi ko'rsatilmagan"
  }">
    <img src="${
      product.image || "https://placehold.co/400x300/cccccc/969696?text=Rasm+Yo'q"
    }" alt="${
    product.name || "Nomsiz mahsulot"
  }" class="w-full h-56 sm:h-60 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x300/cccccc/969696?text=Rasm+Xatosi';">
    <div class="p-5 flex flex-col flex-grow">
      <h3 class="text-lg font-semibold text-gray-800 mb-1.5 pointer-events-none">${
        product.name || "Nomsiz mahsulot"
      }</h3>
      <p class="text-xs text-gray-500 mb-2 uppercase tracking-wider pointer-events-none">${
        product.category || "Kategoriyasiz"
      }</p>
      <p class="text-sm text-gray-600 mb-3 flex-grow pointer-events-none">${
        product.description || "Tavsif yo'q"
      }</p>
      <p class="text-xl font-bold text-indigo-600 mb-4 pointer-events-none">${
        product.price || "Narxi ko'rsatilmagan"
      }</p>
      <button class="add-to-cart-btn-card mt-auto w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-sm font-medium" data-product-id="${
        product.id
      }">Savatchaga Qo'shish</button>
    </div>
  </div>`;
}

export function displayProductsUI(
  productsToDisplay,
  onCartAddCallback,
  onCardClickCallback
) {
  if (!productListContainer) {
    console.error("UI: Mahsulotlar ro'yxati uchun konteyner topilmadi!");
    return;
  }
  productListContainer.innerHTML = "";

  if (productsToDisplay.length === 0) {
    productListContainer.innerHTML =
      '<p class="text-center text-gray-500 col-span-full py-10">Ushbu kategoriyada hozircha mahsulotlar mavjud emas.</p>';
    return;
  }

  productsToDisplay.forEach((product) => {
    const productCardHTML = createProductCard(product);
    productListContainer.insertAdjacentHTML("beforeend", productCardHTML);
  });

  document.querySelectorAll(".add-to-cart-btn-card").forEach((button) => {
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    newButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const productId = newButton.dataset.productId;
      onCartAddCallback(productId, newButton);
    });
  });

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => {
      const productData = {
        id: card.dataset.id,
        name: card.dataset.name,
        category: card.dataset.category,
        image: card.dataset.image,
        description: card.dataset.description,
        price: card.dataset.price,
      };
      onCardClickCallback(productData);
    });
  });
}

export function openProductModalUI(product, onModalCartAddCallback) {
  if (
    !productModal ||
    !modalProductName ||
    !modalProductImage ||
    !modalProductCategory ||
    !modalProductDescription ||
    !modalProductPrice ||
    !globalModalAddToCartBtn
  ) {
    console.error("UI: Modal elementlari topilmadi!");
    return;
  }

  modalProductName.textContent = product.name;
  modalProductImage.src = product.image;
  modalProductImage.alt = product.name;
  modalProductCategory.textContent = product.category;
  modalProductDescription.textContent = product.description;
  modalProductPrice.textContent = product.price;

  const newModalBtn = globalModalAddToCartBtn.cloneNode(true);
  globalModalAddToCartBtn.parentNode.replaceChild(newModalBtn, globalModalAddToCartBtn);
  globalModalAddToCartBtn = newModalBtn;

  globalModalAddToCartBtn.disabled = false;
  globalModalAddToCartBtn.textContent = "Savatchaga Qo'shish";
  globalModalAddToCartBtn.classList.remove("bg-green-500", "cursor-not-allowed");
  globalModalAddToCartBtn.classList.add("bg-indigo-600", "hover:bg-indigo-700");
  globalModalAddToCartBtn.dataset.productId = product.id;

  globalModalAddToCartBtn.onclick = (event) => {
    event.stopPropagation();
    onModalCartAddCallback(product.id, globalModalAddToCartBtn);
  };

  productModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

export function closeProductModalUI() {
  if (productModal) {
    productModal.classList.remove("open");
    document.body.style.overflow = "auto";
  }
}

export function updateActiveCategoryLink(activeLinkElement, allLinks) {
  allLinks.forEach((l) => {
    l.classList.remove("active-category-style");
    l.classList.add("category-link-default-style");
  });
  activeLinkElement.classList.add("active-category-style");
  activeLinkElement.classList.remove("category-link-default-style");
}

export function toggleSidebarUI(sidebar, sidebarOverlay) {
  sidebar.classList.toggle("-translate-x-full");
  sidebar.classList.toggle("translate-x-0");
  sidebarOverlay.classList.toggle("hidden");
}

export function closeSidebarUI(sidebar, sidebarOverlay) {
  sidebar.classList.add("-translate-x-full");
  sidebar.classList.remove("translate-x-0");
  sidebarOverlay.classList.add("hidden");
}

export function displayProductsDataErrorUI() {
  if (productListContainer) {
    productListContainer.innerHTML = `<div class="col-span-full text-center py-10 bg-red-50 p-4 rounded-lg border border-red-200">
      <p class="text-red-700 font-bold text-xl mb-3">Xatolik: Mahsulotlar Yuklanmadi!</p>
      <p class="text-gray-700 mb-2"><code>productsData</code> o'zgaruvchisi topilmadi yoki noto'g'ri formatda.</p>
      <p class="text-gray-600 text-sm mb-1">Iltimos, quyidagilarni tekshiring:</p>
      <ul class="list-disc list-inside text-left inline-block text-gray-600 text-sm mt-1 space-y-1">
        <li><code>js/level11_products.js</code> fayli mavjudligiga ishonch hosil qiling.</li>
        <li>Fayl nomi to'g'ri yozilganligini tekshiring.</li>
        <li><code>js/level11_products.js</code> faylida sintaksis xatoliklari yo'qligiga ishonch hosil qiling.</li>
      </ul>
      <p class="text-gray-500 mt-3 text-xs">Muammo davom etsa, brauzer konsolini tekshiring.</p>
    </div>`;
  }
}
