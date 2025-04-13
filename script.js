const apiUrl = "https://tasker-localizacao-api.onrender.com/localizacao";

const map = L.map('map').setView([0, 0], 2); // visão inicial
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
let marker = null;

async function atualizarMapa() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.latitude && data.longitude) {
      const lat = parseFloat(data.latitude);
      const lng = parseFloat(data.longitude);

      if (!marker) {
        marker = L.marker([lat, lng]).addTo(map);
      } else {
        marker.setLatLng([lat, lng]);
      }

      map.setView([lat, lng], 15);
    }
  } catch (err) {
    console.error("Erro ao buscar localização:", err);
  }
}

setInterval(atualizarMapa, 5000); // atualiza a cada 5 segundos
