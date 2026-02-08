document.addEventListener('DOMContentLoaded', () => {
  fetchServices();
});

async function fetchServices() {
  const container = document.getElementById('service-container');
  
  try {
    const response = await fetch('services.json');
    if (!response.ok) throw new Error("Could not load services");
    const categories = await response.json();

    container.innerHTML = ''; // Clear loading text

    categories.forEach(cat => {
      // Create Category Title
      const catTitle = document.createElement('div');
      catTitle.className = 'scn-cat-title';
      catTitle.textContent = cat.category;
      container.appendChild(catTitle);

      // Create Items
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
      
      // Spacer
      const spacer = document.createElement('div');
      spacer.style.height = '20px';
      container.appendChild(spacer);
    });

  } catch (error) {
    container.innerHTML = `<p style="color:red">Unable to load menu. Please refresh.</p>`;
    console.error(error);
  }
}