function StudentList({ students = [], onEdit = () => {}, onDelete = () => {} }) {
  if (!Array.isArray(students)) {
    console.warn("students debe ser un array válido");
    students = [];
  }

  return `
    <ul class="space-y-4 bg-opacity-50 bg-gray-800 p-2 rounded-lg">
      ${students.map(student => {
        if (!student.nombre || !student.apellido) return '';

        return `
          <li class="border border-gray-300 rounded-lg p-1 bg-white shadow-sm bg-opacity-50 bg-gray-800">
            <div class="flex items-center gap-4 mb-2">
              ${student.foto ? `<img src="${student.foto}" alt="Foto" class="w-12 h-12 rounded-md object-cover">` : ''}
              <div>
                <strong>${student.nombre} ${student.apellido}</strong><br/>
                <small>Teléfono: ${student.telefono}</small>
              </div>
            </div>
            <div class="flex justify-end space-x-2 mt-2">
              <button data-id="${student.id}" class="edit-btn bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs">Editar</button>
              <button data-id="${student.id}" class="delete-btn bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs">Eliminar</button>
            </div>
          </li>
        `;
      }).join('')}
    </ul>
  `;
}
window.StudentList = StudentList;