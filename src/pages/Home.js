function renderHome() {
  const html = `
    <div class="page-container" style="background-image: url('/images/gym1.jpg'); background-size: cover; background-position: center; min-height: 100vh;">
      <div class="overlay"></div>
      <div class="content z-10 relative max-w-4xl mx-auto p-4 md:p-6">
        <div class="flex justify-between items-center mb-1">
          <h1 class="text-2xl md:text-2xl font-bold text-white">FitCoach</h1> 
         
          <div id="clock" class="text-white text-lg font-mono clock">--:--:--</div>
        </div>
        <h1 class=" md:text-1xl font-bold text-white mb-3">Bienvenido Walter </h1>
        <p class="text-white mb-6">Organiza tus alumnos, rutinas y toma notas importantes.</p>
        <div id="weatherInfo" class="mb-3 bg-gray-500 bg-opacity-50  rounded-lg shadow-md text-center md:text-center md:absolute md:top-6 md:right-6 md:w-44">
          Cargando clima...
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button onclick="navigateTo('/students')" class="bg-gray-500 bg-opacity-50 hover:bg-purple-700 text-black p-1 rounded shadow-lg shadow-black-900/100 transition duration-200">
            Alumnos
          </button>
          <button onclick="navigateTo('/routines')" class="bg-gray-500 bg-opacity-50 hover:bg-purple-700 text-black p-1  rounded shadow-lg shadow-black-900/100 transition duration-200">
            Rutinas
          </button>
          <button onclick="navigateTo('/whatsapp')" class="bg-gray-500 bg-opacity-50 hover:bg-purple-700 text-black p-1   rounded shadow-lg shadow-black-900/100 transition duration-200">
            Chat
          </button>
          <button onclick="navigateTo('/notes')" class="bg-gray-500 bg-opacity-50 hover:bg-purple-700 text-black p-1  rounded shadow-lg shadow-black-900/100 transition duration-200">
            Notas
          </button>
        </div>
        <div class="bg-gray-500 bg-opacity-50 p-1 rounded-lg shadow-md text-center mb-8 ">
          <h3 class="font-semibold text-black mb-2">Cronómetro</h3>
          <div id="stopwatch" class="text-2xl md:text-3xl font-mono font-bold text-black mb-2">00:00:000</div>
          <div class="space-x-2">
            <button id="startStopwatch" class="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded">▶</button>
            <button id="pauseStopwatch" class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded">⏸</button>
            <button id="resetStopwatch" class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">⟳</button>
          </div>
        </div>
        <div id="studentPreview" class="mt-8 space-y-4">
          <h2 class="text-xl font-semibold text-white mb-4">Últimos Alumnos</h2>
          <div id="studentListPreview" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        </div>
      </div>
    </div>
  `;
  document.getElementById('app').innerHTML = html;
  cargarAlumnosEnHome();
  startClock();
  getWeather();
  initStopwatch();
}

window.renderHome = renderHome;

// --- Funciones auxiliares (pueden ir aquí o en utils.js) ---

function startClock() {
  const clockElement = document.getElementById('clock');
  if (!clockElement) return;
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
  updateClock();
  setInterval(updateClock, 1000);
}

function initStopwatch() {
  const display = document.getElementById('stopwatch');
  const startBtn = document.getElementById('startStopwatch');
  const pauseBtn = document.getElementById('pauseStopwatch');
  const resetBtn = document.getElementById('resetStopwatch');
  if (!display) return;
  let startTime = 0, elapsed = 0, stopwatchInterval = null;
  function updateDisplay() {
    const totalMs = elapsed;
    const minutes = String(Math.floor(totalMs / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((totalMs % 60000) / 1000)).padStart(2, '0');
    const ms = String(totalMs % 1000).padStart(3, '0');
    display.textContent = `${minutes}:${seconds}:${ms}`;
  }
  startBtn.addEventListener('click', () => {
    if (!stopwatchInterval) {
      startTime = Date.now() - elapsed;
      stopwatchInterval = setInterval(() => {
        elapsed = Date.now() - startTime;
        updateDisplay();
      }, 10);
    }
  });
  pauseBtn.addEventListener('click', () => {
    if (stopwatchInterval) {
      clearInterval(stopwatchInterval);
      stopwatchInterval = null;
    }
  });
  resetBtn.addEventListener('click', () => {
    if (stopwatchInterval) {
      clearInterval(stopwatchInterval);
      stopwatchInterval = null;
    }
    elapsed = 0;
    updateDisplay();
  });
  updateDisplay();
}

function getWeather() {
  const weatherContainer = document.getElementById('weatherInfo');
  if (!weatherContainer) return;
  let latitude = -34.60;
  let longitude = -58.38;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        fetchAndRenderWeather(latitude, longitude, weatherContainer);
      },
      () => fetchAndRenderWeather(latitude, longitude, weatherContainer)
    );
  } else {
    fetchAndRenderWeather(latitude, longitude, weatherContainer);
  }
}
async function fetchAndRenderWeather(lat, lon, container) {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius&windspeed_unit=kmh`);
    const data = await response.json();
    const temp = data.current_weather?.temperature || 'N/A';
    const windspeed = data.current_weather?.windspeed || 'N/A';
    const weatherCode = data.current_weather?.weathercode || null;
    const weatherText = weatherCodeToText(weatherCode);
    container.innerHTML = `
      <p class="font-semibold text-white">Clima actual</p>
      <p class="text-black"> Temperatura: <strong>${temp}°C</strong></p>
      <p class="text-black"> Viento: <strong>${windspeed} km/h</strong></p>
      <p class="text-black"> Estado: <strong>${weatherText}</strong></p>
    `;
  } catch (error) {
    console.error('Error al cargar el clima:', error);
    container.innerHTML = '<p class="text-gray-700">Clima no disponible</p>';
  }
}
function weatherCodeToText(code) {
  const codes = {
    0: 'Despejado ☀️', 1: 'Pocas nubes ⛅', 2: 'Parcialmente nublado ☁️', 3: 'Nublado 🌤️',
    45: 'Niebla 🌫️', 48: 'Escarcha 🥶', 51: 'Lluvia ligera 🌦️', 53: 'Lluvia moderada 🌧️', 55: 'Lluvia intensa 🌧️🌧️🌧️',
    61: 'Lluvia leve 🌦️', 63: 'Lluvia moderada 🌧️', 65: 'Lluvia fuerte 🌧️🌧️'
  }; return codes[code] || 'Desconocido';
}

// Debes definir esta función en indexedDB.js
function cargarAlumnosEnHome() {
  const previewContainer = document.getElementById('studentListPreview');
  if (!previewContainer || typeof getAllStudentsFromDB !== 'function') return;
  getAllStudentsFromDB((students) => {
    if (!students.length) {
      previewContainer.innerHTML = '<p>No hay alumnos registrados aún.</p>';
      return;
    }
    const alumnosConRutinas = students.filter(a => a.rutinas?.length > 0);
    if (!alumnosConRutinas.length) {
      previewContainer.innerHTML = '<p>No hay rutinas asignadas aún.</p>';
      return;
    }
    previewContainer.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        ${alumnosConRutinas.slice(0, 3).map(student => `
          <div class="bg-opacity-50 bg-gray-800 p-1 rounded-lg shadow-md">
            <div class="flex flex-col items-center text-center">
              ${student.foto ? `<img src="${student.foto}" alt="Foto" class="w-16 h-16 rounded-md object-cover mx-auto ">` : ''}
              <strong class="text-white">${student.nombre} ${student.apellido}</strong><br/>
              <ul class="space-y-1">
                ${student.rutinas.slice(0, 10).map(r => `
                  <li class="text-sm text-white">
                    ${r.actividad} | ${r.series} series x ${r.repeticiones} reps Peso: ${r.peso} Kg.
                  </li>
                `).join('')}
              </ul>
              <button onclick="navigateTo('/students')" class="mt-3 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition duration-200">
                Ver detalles
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  });
}