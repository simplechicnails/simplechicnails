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
        
        // Button Logic: Triggers toggleBooking()
        const bookBtn = item.booking_url 
          ? `<button onclick="toggleBooking('${item.booking_url}')" class="scn-btn-tiny">Book</button>` 
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

// --- EXPANDABLE BOX LOGIC ---
function toggleBooking(url) {
  const expander = document.getElementById('booking-expander');
  const iframe = document.getElementById('booking-frame');
  
  // Set the source if it's new, otherwise keep it to avoid reload
  if (iframe.src !== url) {
    iframe.src = url;
  }
  
  // Show the box
  expander.style.display = 'block';
  
  // Smooth Scroll to the box
  expander.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeBooking() {
  const expander = document.getElementById('booking-expander');
  const iframe = document.getElementById('booking-frame');
  
  // Hide the box
  expander.style.display = 'none';
  
  // Optional: clear src to stop background loading, or keep it for faster re-open
  // iframe.src = ''; 
}
