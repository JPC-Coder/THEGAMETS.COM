const cart = [];
const cartCount = document.querySelector("#cartCount");
const cartList = document.querySelector("#cartList");
const cartTotal = document.querySelector("#cartTotal");

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    const product = card.dataset.product;
    const price = Number(card.dataset.price);
    const color = card.querySelector(".color-select").value;
    const size = card.querySelector(".size-select").value;
    const quantity = Number(card.querySelector(".qty-input").value);

    cart.push({ product, price, color, size, quantity });
    renderCart();
  });
});

function renderCart() {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = itemCount;
  cartTotal.textContent = `$${total.toFixed(2)}`;

  if (!cart.length) {
    cartList.innerHTML = '<p class="empty-cart">No items yet. Add a product to start your order.</p>';
    return;
  }

  cartList.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div>
        <strong>${item.product}</strong>
        <span>${item.color} / ${item.size} / Qty ${item.quantity}</span>
      </div>
      <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
    </div>
  `).join("");
}

const track = document.querySelector("#carouselTrack");
const slides = Array.from(track.children);
let currentSlide = 0;

function moveCarousel(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.querySelector("#prevSlide").addEventListener("click", () => moveCarousel(-1));
document.querySelector("#nextSlide").addEventListener("click", () => moveCarousel(1));

setInterval(() => moveCarousel(1), 5000);

const lightbox = document.createElement("div");
lightbox.className = "image-lightbox";
lightbox.id = "imageLightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-label", "Image viewer");
lightbox.innerHTML = `
  <div class="image-lightbox-panel">
    <button class="image-lightbox-close" type="button" aria-label="Close image viewer">&times;</button>
    <button class="image-lightbox-btn prev" type="button" aria-label="Previous image">&#8249;</button>
    <figure class="image-lightbox-stage">
      <img id="lightboxImage" src="" alt="" data-no-viewer="true" />
      <figcaption class="image-lightbox-caption" id="lightboxCaption"></figcaption>
      <span class="image-lightbox-count" id="lightboxCount"></span>
    </figure>
    <button class="image-lightbox-btn next" type="button" aria-label="Next image">&#8250;</button>
  </div>
`;
document.body.appendChild(lightbox);

const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const lightboxCount = document.querySelector("#lightboxCount");
const closeButton = lightbox.querySelector(".image-lightbox-close");
const previousButton = lightbox.querySelector(".image-lightbox-btn.prev");
const nextButton = lightbox.querySelector(".image-lightbox-btn.next");
const pageImages = Array.from(document.querySelectorAll("img:not([data-no-viewer])"))
  .filter((image) => !image.closest("a"));
let activeImageIndex = 0;

function getImageCaption(image) {
  const figureCaption = image.closest("figure")?.querySelector("figcaption")?.textContent?.trim();
  const productName = image.closest(".product-card")?.querySelector("h3")?.textContent?.trim();
  return figureCaption || productName || image.alt || "The Gamets image";
}

function showLightboxImage(index) {
  activeImageIndex = (index + pageImages.length) % pageImages.length;
  const image = pageImages[activeImageIndex];
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || getImageCaption(image);
  lightboxCaption.textContent = getImageCaption(image);
  lightboxCount.textContent = `${activeImageIndex + 1} of ${pageImages.length}`;
}

function openLightbox(index) {
  showLightboxImage(index);
  lightbox.classList.add("is-open");
  document.body.classList.add("lightbox-open");
  closeButton.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.body.classList.remove("lightbox-open");
}

pageImages.forEach((image, index) => {
  const wrapper = document.createElement("div");
  wrapper.className = "image-viewer-wrap";
  const link = document.createElement("a");
  link.className = "view-bigger-link";
  link.href = image.getAttribute("src");
  link.textContent = "View catalog images";
  link.setAttribute("aria-label", `View catalog images: ${getImageCaption(image)}`);

  image.parentNode.insertBefore(wrapper, image);
  wrapper.appendChild(image);
  wrapper.appendChild(link);

  link.addEventListener("click", (event) => {
    event.preventDefault();
    openLightbox(index);
  });
});

previousButton.addEventListener("click", () => showLightboxImage(activeImageIndex - 1));
nextButton.addEventListener("click", () => showLightboxImage(activeImageIndex + 1));
closeButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showLightboxImage(activeImageIndex - 1);
  if (event.key === "ArrowRight") showLightboxImage(activeImageIndex + 1);
});


const cardImages = [
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_46_53 p.m. (1).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_46_54 p.m. (2).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_46_54 p.m. (3).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_46_54 p.m. (4).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_46_54 p.m. (5).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_46_55 p.m. (6).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_46_55 p.m. (7).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_46_55 p.m. (8).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_46_55 p.m. (9).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_46_56 p.m. (10).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_47_03 p.m. (2).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_47_04 p.m. (3).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_47_04 p.m. (4).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_47_04 p.m. (5).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_47_04 p.m. (6).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_47_04 p.m. (7).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_47_05 p.m. (8).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_47_05 p.m. (9).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 02_47_05 p.m. (10).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 03_23_22 p.m. (1).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 03_23_23 p.m. (2).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 03_23_23 p.m. (3).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 03_23_23 p.m. (4).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 03_23_23 p.m. (5).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 03_23_23 p.m. (6).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 03_23_24 p.m. (7).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 03_23_24 p.m. (8).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 03_23_24 p.m. (9).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 03_23_24 p.m. (10).png",
  "images/assets/ cards/ChatGPT Image 13 jun 2026, 03_27_53 p.m. (1).png"
];

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    siteNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const featuredCard = document.querySelector("#featuredCard");
const cardCounter = document.querySelector("#cardCounter");
const cardThumbs = document.querySelector("#cardThumbs");
let activeCard = 0;

cardImages.forEach((src, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", `View trading card ${index + 1}`);
  button.innerHTML = `<img src="${src}" alt="Trading card thumbnail ${index + 1}" />`;
  button.addEventListener("click", () => showCard(index));
  cardThumbs.appendChild(button);
});

function showCard(index) {
  activeCard = (index + cardImages.length) % cardImages.length;
  featuredCard.src = cardImages[activeCard];
  featuredCard.alt = `Collectors trading card ${activeCard + 1}`;
  cardCounter.textContent = `Card ${activeCard + 1} of ${cardImages.length}`;
  Array.from(cardThumbs.children).forEach((button, buttonIndex) => {
    button.classList.toggle("is-active", buttonIndex === activeCard);
  });
  syncLightboxImages();
}

document.querySelector("#prevCard")?.addEventListener("click", () => showCard(activeCard - 1));
document.querySelector("#nextCard")?.addEventListener("click", () => showCard(activeCard + 1));
showCard(0);

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const closeLightboxButton = document.querySelector(".lightbox-close");
const prevLightboxButton = document.querySelector(".lightbox-nav.prev");
const nextLightboxButton = document.querySelector(".lightbox-nav.next");
let lightboxImages = [];
let activeLightboxImage = 0;

function imageTitle(image) {
  const product = image.closest(".product-card")?.querySelector("h3")?.textContent?.trim();
  const figure = image.closest("figure")?.querySelector("figcaption")?.textContent?.trim();
  const book = image.closest(".book-cover")?.querySelector("h3")?.textContent?.trim();
  return product || figure || book || image.alt || "The Gamets artwork";
}

function syncLightboxImages() {
  lightboxImages = Array.from(document.querySelectorAll(".lightbox-image"));
}

function openLightbox(index) {
  syncLightboxImages();
  activeLightboxImage = index;
  renderLightbox();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  closeLightboxButton.focus();
}

function renderLightbox() {
  const image = lightboxImages[activeLightboxImage];
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || imageTitle(image);
  lightboxCaption.textContent = `${imageTitle(image)} · ${activeLightboxImage + 1} of ${lightboxImages.length}`;
}

function moveLightbox(direction) {
  activeLightboxImage = (activeLightboxImage + direction + lightboxImages.length) % lightboxImages.length;
  renderLightbox();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

document.addEventListener("click", (event) => {
  const image = event.target.closest(".lightbox-image");
  if (!image) return;
  event.preventDefault();
  syncLightboxImages();
  openLightbox(lightboxImages.indexOf(image));
});

document.querySelectorAll(".lightbox-placeholder").forEach((button) => {
  button.addEventListener("click", () => {
    const svg = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
        <rect width="900" height="1200" fill="#10131a"/>
        <rect x="45" y="45" width="810" height="1110" rx="34" fill="#171b24" stroke="#ffd36a" stroke-width="6" stroke-dasharray="20 18"/>
        <text x="450" y="520" text-anchor="middle" fill="#ff8a00" font-family="Arial" font-size="82" font-weight="900">${button.dataset.title}</text>
        <text x="450" y="620" text-anchor="middle" fill="#f8f5ef" font-family="Arial" font-size="36">Replace this panel with your uploaded page art.</text>
      </svg>
    `);
    const placeholder = new Image();
    placeholder.className = "lightbox-image";
    placeholder.src = `data:image/svg+xml,${svg}`;
    placeholder.alt = button.dataset.title;
    document.body.appendChild(placeholder);
    placeholder.style.display = "none";
    syncLightboxImages();
    openLightbox(lightboxImages.indexOf(placeholder));
    placeholder.remove();
  });
});

closeLightboxButton?.addEventListener("click", closeLightbox);
prevLightboxButton?.addEventListener("click", () => moveLightbox(-1));
nextLightboxButton?.addEventListener("click", () => moveLightbox(1));
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

syncLightboxImages();
