function MessagePreview({ messages = [] }) {
  if (!messages.length) {
    return `<p class="text-gray-500">No hay mensajes aún.</p>`;
  }

  return `
    <div class="space-y-2">
      ${messages.map(msg => `
        <div class="bg-gray-100 p-2 rounded-lg ${msg.sent ? 'bg-blue-100 ml-auto' : 'bg-gray-100 mr-auto'}">
          <p class="text-sm">${msg.text}</p>
          <small class="block mt-1 text-gray-500">${msg.date}</small>
        </div>
      `).join('')}
    </div>
  `;
}
window.MessagePreview = MessagePreview;