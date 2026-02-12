document.addEventListener('DOMContentLoaded', () => {
  fetchServices();
  init3DTilt();
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
        itemDiv.innerHTML = `
          <div class="scn-item-details">
            <span class="scn-item-name">${item.name} <span style="font-weight:400; font-size:12px; color:#888;">(${item.duration})</span></span>
            <span class="scn-item-desc">${item.description}</span>
          </div>
          <div class="scn-item-price">${item.price}</div>
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

// --- 3D TILT ENGINE ---
function init3DTilt() {
  const container = document.querySelector('.scn-3d-container');
  const card = document.querySelector('.scn-3d-card');
  const sheen = document.querySelector('.scn-sheen');

  if(!container || !card) return;

  container.addEventListener('mousemove', (e) => {
    // Calculate rotation
    // The divisor (20) controls the sensitivity. Lower = more extreme tilt.
    const xAxis = (window.innerWidth / 2 - e.pageX) / 20;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 20;

    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    
    // Move the sheen opposite to the mouse for realistic reflection
    // We adjust background position to simulate light travel
    sheen.style.backgroundPosition = `${xAxis}px ${yAxis}px`;
  });

  // Snap back to center when mouse leaves
  container.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    card.style.transition = 'transform 0.5s ease';
  });

  // Remove transition when moving so it feels instant
  container.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
}
