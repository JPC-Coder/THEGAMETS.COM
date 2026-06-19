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




syncLightboxImages();
