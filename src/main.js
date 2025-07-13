

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa la base de datos
  if (typeof initDB === 'function') initDB();

  // Inicializa el router
  initRouter();

  // Renderiza la página según hash
  setTimeout(() => {
    const path = window.location.hash.slice(1) || '/';
    if (window.routes && typeof window.routes[path] === 'function') {
      window.routes[path]();
    } else {
      navigateTo('/');
    }
  }, 200);
});

// -----------------------------
// Router y navegación
// -----------------------------

function initRouter() {
  window.addEventListener('load', () => {
    const path = window.location.hash.slice(1) || '/';
    navigateTo(path);
    toggleBackButton(path);
  });

  window.addEventListener('hashchange', () => {
    const path = window.location.hash.slice(1) || '/';
    navigateTo(path);
    toggleBackButton(path);
  });
}

function toggleBackButton(url) {
  const backBtn = document.getElementById('backToHomeBtn');
  if (!backBtn) return;
  // Mostrar solo si no estamos en home
  if (url === '' || url === '/') {
    backBtn.style.display = 'none';
  } else {
    backBtn.style.display = 'inline-block';
  }
}

// -----------------------------
// Definición de rutas globales
// -----------------------------

window.routes = {
  '/': window.renderHome,
  '/students': window.renderStudentsPage,
  '/routines': window.renderRoutinesPage,
  '/notes': window.renderNotesPage,
  '/whatsapp': window.renderWhatsAppPage
};

// -----------------------------
// Función global de navegación
// -----------------------------
window.navigateTo = (url) => {
  const routeHandler = window.routes[url];
  if (routeHandler && typeof routeHandler === 'function') {
    routeHandler();
  } else {
    document.getElementById('app').innerHTML = `
      <h1 class="text-2xl text-red-500 mt-8">404 - Página no encontrada</h1>
      <p>No se encontró la página: <strong>${url}</strong></p>
      <button onclick="navigateTo('/')" class="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">← Volver al inicio</button>
    `;
  }
};

window.showToast = function(message, type = "success") {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `fixed bottom-4 right-4 z-50 px-4 py-2 rounded shadow-lg transition-opacity duration-300 show`;
  toast.style.backgroundColor = type === "error" ? "#DC2626" : "#22C55E"; // rojo o verde

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.className = "fixed bottom-4 right-4 z-50 hidden bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300";
    }, 300);
  }, 2000);
}

// Exponer funciones globales por si se requieren en otros scripts
window.initRouter = initRouter;
window.toggleBackButton = toggleBackButton;