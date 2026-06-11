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
