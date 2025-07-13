import './components/Dashboard.js';
import './components/MessagePreview.js';
import './components/Navbar.js';
import './components/StudentForm.js';
import './components/StudentList.js';
import './components/RoutineForm.js';
import './components/RoutineList.js';
import './components/NoteForm.js';
import './components/NotesList.js';
import './components/WhatsAppForm.js';

import './utils.js';
import './indexedDB.js';

import './pages/Home.js';
import './pages/StudentsPage.js';
import './pages/RoutinesPage.js';
import './pages/NotesPage.js';
import './pages/WhatsAppPage.js';

// ...tu código de router aquí (lo que ya tienes)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initDB === 'function') initDB();
  initRouter();
  setTimeout(() => {
    const path = window.location.hash.slice(1) || '/';
    if (window.routes && typeof window.routes[path] === 'function') {
      window.routes[path]();
    } else {
      navigateTo('/');
    }
  }, 200);
});

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
  if (url === '' || url === '/') {
    backBtn.style.display = 'none';
  } else {
    backBtn.style.display = 'inline-block';
  }
}

window.routes = {
  '/': window.renderHome,
  '/students': window.renderStudentsPage,
  '/routines': window.renderRoutinesPage,
  '/notes': window.renderNotesPage,
  '/whatsapp': window.renderWhatsAppPage
};

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
  toast.style.backgroundColor = type === "error" ? "#DC2626" : "#22C55E";
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.className = "fixed bottom-4 right-4 z-50 hidden bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300";
    }, 300);
  }, 2000);
}

window.initRouter = initRouter;
window.toggleBackButton = toggleBackButton;