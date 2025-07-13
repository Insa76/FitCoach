function NotesList({ notes = [], onEdit, onDelete }) {
  if (!notes.length) {
    return '<p class="text-gray-500">No tienes notas guardadas aún.</p>';
  }

  return `
    <ul class="space-y-4 bg-opacity-50 bg-gray-800 p-2 rounded-lg">
      ${notes.map(note => `
        <li class="border border-gray-300 rounded-lg p-1 space-y-2">
          <h3 class="font-semibold">${note.title}</h3>
          <p class="mt-2 text-white">${note.content}</p>
          ${note.date ? `<small class="block mt-2 text-white">Fecha: ${note.date}</small>` : ''}

          <div class="mt-4 flex justify-end space-x-2">
            <button data-id="${note.id}" class="edit-note-btn bg-purple-600 hover:bg-purple-800 text-white px-3 py-1 rounded text-xs">Editar</button>
            <button data-id="${note.id}" class="delete-note-btn bg-purple-600 hover:bg-purple-800 text-white px-3 py-1 rounded text-xs">Eliminar</button>
          </div>
        </li>
      `).join('')}
    </ul>
  `;
}
window.NotesList = NotesList;