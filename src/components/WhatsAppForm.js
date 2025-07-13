function WhatsAppForm({ student = null }) {
  const placeholder = student ? `Escribe un mensaje a ${student.nombre}...` : 'Selecciona un alumno para comenzar';

  return `
    <div class="whatsapp-form bg-white border border-gray-300 rounded-md p-2 shadow-md">
      ${student ? `
        <div class="flex items-center gap-2 mb-2">
          <img src="${student.foto || 'https://via.placeholder.com/40'}"  alt="Foto de ${student.nombre}" class="w-10 h-10 rounded-md object-cover">
          <strong>${student.nombre} ${student.apellido}</strong>
        </div>
      ` : ''}
      <textarea id="messageInput" rows="4" class="w-full border border-gray-300 p-1 rounded mb-2" placeholder="${placeholder}" ${student ? '' : 'disabled'}></textarea>
      <button id="sendWhatsAppBtn" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full" ${student ? '' : 'disabled'}>
        Enviar Mensaje
      </button>
    </div>
  `;
}
window.WhatsAppForm = WhatsAppForm;