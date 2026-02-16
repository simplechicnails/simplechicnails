document.addEventListener('DOMContentLoaded', () => {
  fetchServices();
});

async function fetchServices() {
  const container = document.getElementById('service-container');
  try {
    const response = await fetch('services.json');
    if (!response.ok) throw new Error("Could not load services");
    const categories = await response.json();
    container.innerHTML = ''; 

    categories.forEach(cat => {
      const catTitle = document.createElement('div');
      catTitle.className = 'scn-cat-title';
      catTitle.textContent = cat.category;
      container.appendChild(catTitle);

      cat.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'scn-service-item';
        
        // This generates the button for ALL services now
        const bookBtn = item.booking_url 
          ? `<button onclick="openModal('${item.booking_url}')" class="scn-btn-tiny">Book</button>` 
          : '';

        itemDiv.innerHTML = `
          <div class="scn-item-details">
            <span class="scn-item-name">${item.name} <span style="font-weight:400; font-size:12px; color:#888;">(${item.duration})</span></span>
            <span class="scn-item-desc">${item.description}</span>
          </div>
          <div class="scn-item-price">
            ${item.price}
            ${bookBtn}
          </div>
        `;
        container.appendChild(itemDiv);
      });
      
      const spacer = document.createElement('div');
      spacer.style.height = '20px';
      container.appendChild(spacer);
    });
  } catch (error) {
    container.innerHTML = `<p style="color:red">Unable to load menu. Please refresh.</p>`;
    console.error(error);
  }
}

// --- MODAL FUNCTIONS ---
function openModal(url) {
  const modal = document.getElementById('booking-modal');
  const iframe = document.getElementById('booking-frame');
  iframe.src = url;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('booking-modal');
  const iframe = document.getElementById('booking-frame');
  modal.style.display = 'none';
  iframe.src = '';
  document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
  const modal = document.getElementById('booking-modal');
  if (event.target == modal) {
    closeModal();
  }
}
