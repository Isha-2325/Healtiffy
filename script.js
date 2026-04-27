/* ============================================================
   HEALTHIFFY CAFÉ — Enhanced 3D Website JavaScript
   Fuel Your Fitness · Pune
   ============================================================ */

/* ---- Enhanced Cart System ---- */
let cart = [];
let discount = 0;
let deliveryFee = 0;
const cartSidebar = document.getElementById('cartSidebar');
const cartToggle = document.getElementById('cartToggle');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const cartItemCount = document.getElementById('cartItemCount');
const cartSummary = document.getElementById('cartSummary');
const cartSubtotal = document.getElementById('cartSubtotal');
const deliveryFeeEl = document.getElementById('deliveryFee');
const discountAmount = document.getElementById('discountAmount');
const btnTotal = document.getElementById('btnTotal');

function toggleCart() {
  cartSidebar.classList.toggle('open');
}

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  
  updateCart();
  showAddedAnimation();
  
  // Auto-open cart for first item
  if (cart.length === 1) {
    setTimeout(() => cartSidebar.classList.add('open'), 300);
  }
}

function updateQuantity(index, change) {
  const item = cart[index];
  item.quantity += change;
  
  if (item.quantity <= 0) {
    removeFromCart(index);
  } else {
    updateCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  if (cart.length === 0) return;
  
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    discount = 0;
    updateCart();
  }
}

function applyPromoCode() {
  const promoInput = document.getElementById('promoCode');
  const code = promoInput.value.trim().toUpperCase();
  
  if (!code) {
    alert('Please enter a promo code');
    return;
  }
  
  // Simple promo logic (you can expand this)
  const promoCodes = {
    'HEALTHY10': 10,
    'FITNESS20': 20,
    'WELCOME15': 15
  };
  
  if (promoCodes[code]) {
    discount = promoCodes[code];
    updateCart();
    promoInput.value = '';
    alert(`Promo code applied! You got ₹${discount} off`);
  } else {
    alert('Invalid promo code');
  }
}

function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = Math.max(0, subtotal + deliveryFee - discount);
  
  return { subtotal, total };
}

function updateCart() {
  const { subtotal, total } = calculateTotals();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Update cart items display
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty-state">
        <div class="empty-icon">
          <i class="fas fa-shopping-basket"></i>
        </div>
        <h4>Your cart is empty</h4>
        <p>Add delicious items from our menu to get started!</p>
        <button class="btn-primary" onclick="toggleCart(); document.getElementById('menu').scrollIntoView({behavior: 'smooth'});">
          <i class="fas fa-utensils"></i> Browse Menu
        </button>
      </div>
    `;
    cartSummary.style.display = 'none';
  } else {
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      
      const cartItemEl = document.createElement('div');
      cartItemEl.className = 'cart-item';
      cartItemEl.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-customizations">Fresh & Healthy</div>
        </div>
        <div class="cart-item-controls">
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)" ${item.quantity <= 1 ? 'disabled' : ''}>
              <i class="fas fa-minus"></i>
            </button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <span class="cart-item-price">₹${itemTotal}</span>
          <button class="cart-item-remove" onclick="removeFromCart(${index})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      cartItems.appendChild(cartItemEl);
    });
    
    cartSummary.style.display = 'block';
  }
  
  // Update totals
  cartSubtotal.textContent = `₹${subtotal}`;
  deliveryFeeEl.textContent = deliveryFee > 0 ? `₹${deliveryFee}` : 'FREE';
  
  if (discount > 0) {
    discountAmount.parentElement.style.display = 'flex';
    discountAmount.textContent = `-₹${discount}`;
  } else {
    discountAmount.parentElement.style.display = 'none';
  }
  
  cartTotal.textContent = `₹${total}`;
  btnTotal.textContent = `₹${total}`;
  
  // Update cart counts
  cartCount.textContent = itemCount;
  cartItemCount.textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
}

function showAddedAnimation() {
  cartToggle.classList.add('animate-pulse');
  setTimeout(() => {
    cartToggle.classList.remove('animate-pulse');
  }, 600);
}

function sendOrderToWhatsApp() {
  if (cart.length === 0) {
    alert('Your cart is empty! Add some items first.');
    return;
  }
  
  const { subtotal, total } = calculateTotals();
  
  let orderText = '🥗 Healthiffy Order 🥗\n\n';
  orderText += '📍 Preferred Location: [FC Road / Kothrud]\n\n';
  orderText += '📋 Order Details:\n';
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    orderText += `• ${item.name} x${item.quantity} = ₹${itemTotal}\n`;
  });
  
  orderText += `\n💰 Payment Summary:\n`;
  orderText += `• Subtotal: ₹${subtotal}\n`;
  
  if (deliveryFee > 0) {
    orderText += `• Delivery Fee: ₹${deliveryFee}\n`;
  }
  
  if (discount > 0) {
    orderText += `• Discount: -₹${discount}\n`;
  }
  
  orderText += `• Total: ₹${total}\n\n`;
  orderText += `🚚 Delivery Address: [Please provide]\n`;
  orderText += `📞 Contact: [Please provide]\n\n`;
  orderText += `⏰ Preferred delivery time: [ASAP / Specific time]\n\n`;
  orderText += `Thank you! 😊`;
  
  const whatsappUrl = `https://wa.me/918087228075?text=${encodeURIComponent(orderText)}`;
  window.open(whatsappUrl, '_blank');
}

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- Mobile hamburger ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---- Menu tab switching ---- */
document.querySelectorAll('.mtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const targetId = 'tab-' + tab.dataset.tab;
    document.getElementById(targetId).classList.add('active');
  });
});

/* ============================================================
   AI CHATBOT — powered by Claude API
   ============================================================ */

const SYSTEM_PROMPT = `You are the friendly and knowledgeable AI assistant for Healthiffy Café, a healthy fitness café in Pune, India with two locations. Be concise, warm, enthusiastic, and helpful. Only answer questions related to Healthiffy. If asked about something unrelated, gently redirect to café topics.

ABOUT HEALTHIFFY:
- Tagline: "Fuel Your Fitness"
- Phone: +91 82630 45675 | WhatsApp orders: 8087228075
- Instagram: @healthiffy_pune
- Hours: Mon–Sun 8am–9pm
- Offers dine-in and takeaway

LOCATIONS:
1. FC Road, Pune — Google Maps: https://maps.google.com/?q=FC+Road+Pune
2. Shop No. 22, Anubhav, Kothrud, Pune (Near MIT WPU College)

FOOD MENU:
Sandwiches: Mix Veg Grill ₹65 | Chocolate Peanut Butter ₹65 | Natural Peanut Butter ₹65 | Paneer Grill ₹85 | Avocado Grill ₹95
Roasted Makhana: Simple ₹75 | Peri Peri ₹85 | Ghee Pepper ₹95
Oats Bowl: Tropical Fruit & Honey Oats ₹85 | Dark Chocolate Oats ₹95
Salad Bowls: Peanut Cucumber ₹50 | Black Chana Salad ₹65 | Corn & Veggie Crunch ₹75 | Broccoli Peanut Crunch ₹85 | Mix Sprout Salad ₹85 | Soya Chunk Power Bowl ₹85 | Green Velvet Salad ₹95 | Desi Chickpea Salad ₹105 | Avocado Tomato Salad ₹125
Fruit Bowls: Classic Fruit Bowl ₹75 | Melon Mint Medley ₹85
Other Bowls: Mashed Potato ₹50 | Guacamole ₹85
Chia Pudding: Nut and Banana ₹75 | Apple Cinnamon ₹85 | Mixed Berries ₹95

BEVERAGES:
Healthiffy Special: Kashmiri Kahwa Pure ₹50 | Kashmiri Kahwa Sweet ₹50 | Kashmiri Noon Chai Pink ₹65
Smoothies: Date Almond Energizer ₹50 | Melon Mint Cooler ₹65 | Beet Berry Power ₹75 | Papaya Refresh ₹75 | Berrylicious Glow ₹85 | Choco Oats Builder ₹85 | Green Zen Detox ₹85 | Golden Aura ₹85 | Dragonfuel ₹95 | Avocado Royale ₹115
Coffee & Tea (S/L): Coffee ₹15/₹25 | Cardamom Tea ₹15/₹25 | Lemon Tea ₹15/₹25 | Hot Chocolate ₹20/₹35
Green Teas ₹25: Hibiscus Cinnamon Clove | Jasmine | Dandelion | Rose | Kesar | Traditional Green Tea
Green Teas ₹35: Mint | Chamomile | Turmeric Tulsi Ginger | Ashwagandha
Hot Beverage Shots: Everyday Energy Shot (Ginger) ₹25 | Immunity Glow Shot (Amla) ₹35
Fresh Juices: Watermelon ₹50 | Cucumber Mint ₹65 | Pineapple ₹75 | Orange/Mosambi ₹75 | ABC (Apple, Beet, Carrot) ₹85

MONTHLY PLAN — ₹2,250/month:
Includes 30 Salad Bowls + 12 Healthy Green Teas + 3 Smoothies.
7-day extension for absent days.
Sandwich or Oats Bowl available as alternative on any 5 days.
Great value for fitness-conscious regulars!

ORDERING: Customers can WhatsApp 8087228075 to place orders or enquire about the monthly plan.`;

const chatMsgs  = document.getElementById('chatMsgs');
const chatInput = document.getElementById('chatInput');
const quickQs   = document.getElementById('quickQs');
let conversationHistory = [];

function appendMsg(text, role) {
  const wrapper = document.createElement('div');
  wrapper.className = 'msg ' + (role === 'user' ? 'user' : 'bot');
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  wrapper.appendChild(bubble);
  chatMsgs.appendChild(wrapper);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
  return wrapper;
}

function showTyping() {
  const wrapper = document.createElement('div');
  wrapper.className = 'msg bot';
  wrapper.id = 'typingIndicator';
  const ind = document.createElement('div');
  ind.className = 'typing-indicator';
  ind.innerHTML = '<span></span><span></span><span></span>';
  wrapper.appendChild(ind);
  chatMsgs.appendChild(wrapper);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

async function sendChat() {
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';
  quickQs.style.display = 'none';

  appendMsg(text, 'user');
  conversationHistory.push({ role: 'user', content: text });
  showTyping();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 350,
        system: SYSTEM_PROMPT,
        messages: conversationHistory
      })
    });

    const data = await response.json();
    removeTyping();

    const reply = (data.content && data.content[0] && data.content[0].text)
      ? data.content[0].text
      : 'Sorry, I had trouble connecting. Please WhatsApp us at 8087228075!';

    conversationHistory.push({ role: 'assistant', content: reply });
    appendMsg(reply, 'bot');

  } catch (err) {
    removeTyping();
    appendMsg('Oops! Please WhatsApp us directly at 8087228075 — we\'ll help right away!', 'bot');
    console.error('Chat error:', err);
  }
}

function askQuick(btn) {
  chatInput.value = btn.textContent;
  sendChat();
}

/* ---- Three.js 3D Hero Background ---- */
function init3DBackground() {
  const container = document.getElementById('threejs-container');
  if (!container) return;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  
  // Create floating particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 800;
  const posArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x97C459,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  // Add floating food items
  const foodItems = [];
  const foodColors = [0x639922, 0x97C459, 0xC0DD97, 0xEAF3DE];
  
  for (let i = 0; i < 12; i++) {
    const geometry = new THREE.SphereGeometry(0.1, 16, 16);
    const material = new THREE.MeshPhongMaterial({
      color: foodColors[Math.floor(Math.random() * foodColors.length)],
      emissive: foodColors[Math.floor(Math.random() * foodColors.length)],
      emissiveIntensity: 0.2
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4
    );
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    scene.add(mesh);
    foodItems.push(mesh);
  }
  
  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0x97C459, 1, 100);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);
  
  camera.position.z = 5;
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particles
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;
    
    // Animate food items
    foodItems.forEach((item, index) => {
      item.rotation.x += 0.01;
      item.rotation.y += 0.01;
      item.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
    });
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ---- Initialize 3D background ---- */
window.addEventListener('load', () => {
  init3DBackground();
  
  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
});

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
