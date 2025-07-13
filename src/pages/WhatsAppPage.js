function renderWhatsAppPage() {
  const html = `
    <div class="page-container" style="background-image: url('/images/gym1.jpg'); background-color:#2563eb; background-size: cover; background-position: center; min-height: 100vh;">
      <div class="overlay"></div>
      <div class="content z-10 relative max-w-4xl mx-auto p-2 md:p-6">
        <div class="flex flex-wrap mb-4 items-center justify-between">
          <h1 class="text-2xl font-bold text-white">Mensajes</h1>
          <button onclick="navigateTo('/')" class="mt-3 text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition duration-200">
            Inicio 
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-1">
            <h2 class="font-semibold mb-2 text-white">Alumnos</h2>
            <div id="studentListContainer" class="space-y-2"></div>
          </div>
          <div class="md:col-span-3">
            <div id="messageHistoryContainer"></div>
            <div id="whatsAppFormContainer" class="mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('app').innerHTML = html;
  const container = document.getElementById('whatsAppFormContainer');
  if (!container) {
    console.error("whatsAppFormContainer no encontrado");
    return;
  }

  if (typeof getAllStudentsFromDB !== 'function') return;

  getAllStudentsFromDB((students) => {
    if (!students.length) {
      container.innerHTML = '<p>No hay alumnos registrados aún.</p>';
      return;
    }

    const validStudents = students.filter(s => s.telefono);
    if (!validStudents.length) {
      container.innerHTML = '<p>Ningún alumno tiene número de teléfono.</p>';
      return;
    }

    container.innerHTML = validStudents.map(student => `
      <div class="border border-gray-300 p-2 rounded-lg bg-white shadow-sm bg-opacity-50 bg-gray-800">
        <div class="flex items-center gap-2 mb-2">
          ${student.foto ? `<img src="${student.foto}" alt="Foto" class="w-12 h-12 rounded-md object-cover">` : ''}
          <div>
            <strong>${student.nombre} ${student.apellido}</strong><br/>
            <small>Teléfono: ${student.telefono}</small>
          </div>
        </div>
        <button data-id="${student.id}" class="send-whatsapp-btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2">Enviar mensaje por WhatsApp</button>
      </div>
    `).join('');

    // Asignar eventos a botones dinámicos
    container.querySelectorAll('.send-whatsapp-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const studentId = parseInt(e.target.dataset.id);
        const student = students.find(a => a.id === studentId);
        if (student && student.telefono) {
          const telefono = student.telefono.replace(/\D/g, ''); // Limpiar formato
          const mensaje = encodeURIComponent("Hola, ¿cómo estás?"); // Cambia tu mensaje aquí
          window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
        }
      });
    });
  });
}

window.renderWhatsAppPage = renderWhatsAppPage;