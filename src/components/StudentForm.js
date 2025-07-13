function StudentForm(data = {}) {
  const { nombre = '', apellido = '', telefono = '', foto = '', id = '' } = data;

  return `
    <form id="studentForm" class="space-y-4">
      <input type="hidden" name="studentId" value="${id}" />
      <div>
        <label class="block text-white mb-2">Nombre</label>
        <input type="text" name="nombre" value="${nombre}" required class="w-full border p-2 rounded bg-gray-500 bg-opacity-50">
      </div>
      <div>
        <label class="block text-white mb-2">Apellido</label>
        <input type="text" name="apellido" value="${apellido}" required class="w-full border p-2 rounded bg-gray-500 bg-opacity-50">
      </div>
      <div>
        <label class="block text-white mb-2">Teléfono</label>
        <input type="tel" name="telefono" value="${telefono}" required class="w-full border p-2 rounded bg-gray-500 bg-opacity-50">
      </div>
      <div>
        <label class="block text-white mb-2">Foto (Opcional)</label>
        <input type="file" id="fotoInput" accept="image/*" capture="environment" class="w-full border p-2 rounded bg-gray-500 bg-opacity-50">
        ${foto ? `<img id="previewFoto" src="${foto}" class="mt-2 w-12 h-12 mx-auto rounded-full" />` : ''}
        ${foto ? '' : '<img id="previewFoto" class="mt-2 hidden w-12 h-12 rounded-full mx-auto" />'}
      </div>
      <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full">Guardar Alumno</button>
    </form>
  `;
}
window.StudentForm = StudentForm;