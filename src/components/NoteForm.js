function NoteForm() {
  return `
    <form id="noteForm" class="space-y-4">
      <div>
        <label class="block text-white mb-2">Título</label>
        <input type="text" name="title" required class="w-full border p-2 rounded bg-gray-500 bg-opacity-50">
      </div>
      <div>
        <label class="block text-white mb-2">Contenido</label>
        <textarea name="content" required class="w-full border p-2 rounded bg-gray-500 bg-opacity-50" rows="4"></textarea>
      </div>
      <div>
        <label class="block text-white mb-2">Fecha (opcional)</label>
        <input type="date" name="date" class="w-full border p-2 rounded bg-gray-500 bg-opacity-50">
      </div>
      <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full">Guardar Nota</button>
    </form>
  `;
}
window.NoteForm = NoteForm;