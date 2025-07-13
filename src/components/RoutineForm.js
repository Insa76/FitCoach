function RoutineForm({ students = [], studentId = null, rutina = {} }) {
  const options = students.map(s => `
    <option value="${s.id}" ${s.id === studentId ? 'selected' : ''}>
      ${s.nombre} ${s.apellido}
    </option>
  `).join('');

  return `
    <form id="routineForm" class="space-y-4" ${rutina.id ? `data-editing-id="${rutina.id}"` : ''}>
      <div>
        <label class="block text-white mb-2">Alumno</label>
        <select name="studentId"  required class="w-full border p-2 rounded bg-gray-500 bg-opacity-50">
          <option value="">Selecciona un alumno</option>
          ${options}
        </select>
      </div>
      <div>
        <label class="block text-white mb-2">Actividad</label>
        <input type="text" name="activity" value="${rutina.actividad || ''}" required class="border  w-full  p-2 rounded bg-gray-500 bg-opacity-50">
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-white mb-2">Series</label>
          <input type="number" name="sets"  value="${rutina.series || ''}" required class="w-full border p-2 rounded bg-gray-500 bg-opacity-50">
        </div>
        <div>
          <label class="block text-white mb-2">Repeticiones</label>
          <input type="number" name="reps" value="${rutina.repeticiones || ''}" required class="w-full border p-2 rounded bg-gray-500 bg-opacity-50">
        </div>
      </div>
      <div>
        <label class="block text-white mb-2">Peso (kg)</label>
        <input type="number" name="weight" value="${rutina.peso || ''}" required class="w-full border p-2 rounded bg-gray-500 bg-opacity-50">
      </div>
      <div>
        <label class="block text-white mb-2">Video explicativo (opcional)</label>
        <input type="url" name="video" value="${rutina.video || ''}" class="w-full border p-2 rounded bg-gray-500 bg-opacity-50">
      </div>
      <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full">Guardar Rutina</button>
    </form>
  `;
}
window.RoutineForm = RoutineForm;