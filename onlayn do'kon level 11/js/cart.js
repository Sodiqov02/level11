// js/level11_products.js

/*
  MUHIM ESLATMALAR RASMLAR HAQIDA:

  1. PAPKA STRUKTURASI:
     Rasmlaringiz loyihangizning asosiy papkasida joylashgan "img" nomli papkada bo'lishi kerak.
     Ya'ni, struktura quyidagicha bo'lishi kerak:
     your-project-folder/
     ├── index.html
     ├── css/
     │   └── style.css
     ├── js/
     │   ├── main.js
     │   ├── UI.js
     │   └── level11_products.js
     └── img/  <-- SHU YERDA RASMLAR BO'LISHI KERAK
         ├── 4.png
         ├── 5.png
         ├── 6.png
         ├── 7.png
         ├── 8.png
         └── boshqa_rasmlar.jpg (agar bo'lsa)

  2. RASM YO'LLARI:
     Quyidagi `productsData` massividagi har bir mahsulot uchun `image` maydonidagi yo'l
     `"img/rasm_nomi.kengaytmasi"` ko'rinishida bo'lishi kerak.
     Masalan, `image: "img/4.png"` degani, `index.html` bilan bir qatorda turgan `img` papkasining
     ichidagi `4.png` nomli faylni qidiradi.

  3. FAYL NOMLARI VA KENGAYTMALARI:
     - Rasm fayllarining nomlari va kengaytmalari (masalan, `.png`, `.jpg`, `.jpeg`) to'g'ri yozilganiga amin bo'ling.
     - Ba'zi operatsion tizimlar fayl nomlarida katta-kichik harflarni farqlaydi (masalan, `4.PNG` va `4.png` boshqa fayllar bo'lishi mumkin).
       Shuning uchun, `level11_products.js` dagi yo'llar va haqiqiy fayl nomlari bir xil bo'lishiga e'tibor bering.

  4. TEKSHIRISH:
     - Agar rasmlar ko'rinmasa, birinchi navbatda "img" papkasi to'g'ri joyda (`index.html` bilan birga) ekanligini tekshiring.
     - Keyin, "img" papkasi ichida kerakli rasm fayllari (masalan, `4.png`, `5.png`) mavjudligini tekshiring.
     - Brauzerning "Developer Tools" (Ko'pincha F12 tugmasi) "Network" bo'limida qizil rangda xatolik berayotgan rasm yo'llarini tekshirishingiz mumkin.
       Bu sizga qaysi yo'l bilan muammo borligini ko'rsatadi.

  5. PLACEHOLDER (O'RINBOSAR) RASMLAR:
     `UI.js` faylingizda `onerror` atributi orqali agar asosiy rasm topilmasa, o'rinbosar rasm ko'rsatish logikasi mavjud.
     Bu yaxshi amaliyot. Quyidagi yo'llar to'g'ri ishlamasa, o'sha o'rinbosar rasmlar ko'rinadi.
*/

export const productsData = [
  {
    id: "prod_futbolka_001",
    name: "Dizayner Futbolkasi #1",
    category: "futbolka",
    price: "95,000 so'm",
    image: "img/4.png", // <-- Tekshiring: "img" papkasida "4.png" fayli bormi?
    description: "Yuqori sifatli matodan tikilgan, o'ziga xos dizayndagi futbolka.",
  },
  {
    id: "prod_futbolka_002",
    name: "Trenddagi Futbolka #2",
    category: "futbolka",
    price: "105,000 so'm",
    image: "img/5.png", // <-- Tekshiring: "img" papkasida "5.png" fayli bormi?
    description:
      "Eng so'nggi urfdagi print bilan bezatilgan, qulay va zamonaviy futbolka.",
  },
  {
    id: "prod_futbolka_003",
    name: "Klassik Futbolka #3",
    category: "futbolka",
    price: "90,000 so'm",
    image: "img/6.png", // <-- Tekshiring: "img" papkasida "6.png" fayli bormi?
    description: "Har doim urfda bo'ladigan klassik bichimdagi, sifatli futbolka.",
  },
  {
    id: "prod_futbolka_004",
    name: "Sportcha Futbolka #4",
    category: "futbolka",
    price: "110,000 so'm",
    image: "img/7.png", // <-- Tekshiring: "img" papkasida "7.png" fayli bormi?
    description:
      "Faol hayot tarzi uchun mo'ljallangan, nafas oluvchi matodan tikilgan sport futbolkasi.",
  },
  {
    id: "prod_futbolka_005",
    name: "Original Futbolka #5",
    category: "futbolka",
    price: "99,000 so'm",
    image: "img/8.png", // <-- Tekshiring: "img" papkasida "8.png" fayli bormi?
    description:
      "Betakror printga ega, ko'pchilikka ma'qul keladigan zamonaviy futbolka.", // Tavsifni biroz to'g'irladim
  },
  // Agar boshqa mahsulotlar bo'lsa, ularni ham shu tartibda qo'shing
  // Masalan, kepkalar uchun (agar rasmlari bo'lsa):
  /*
    {
      id: "prod_kepka_001",
      name: "Zamonaviy Kepka",
      category: "kepka",
      price: "75,000 so'm",
      image: "img/kepka1.png", // <-- "img" papkasida "kepka1.png" fayli bo'lishi kerak
      description: "Quyoshdan himoyalovchi, qulay va zamonaviy kepka.",
    },
    */
];

// Bu funksiyalar cart.js faylida bo'lishi kerak, bu yerda qoldirilgan bo'lsa olib tashlang yoki
// agar shu faylda ishlatilayotgan bo'lsa, logikani qayta ko'rib chiqing.
// Hozirgi holatda `main.js` `cart.js` dan import qilmoqda.

// function updateCardButton(productId) { ... } // cart.js yoki UI.js da bo'lishi mumkin
// export function initCart({ cartCountElement }) { ... } // cart.js da
