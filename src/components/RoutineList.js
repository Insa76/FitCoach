function RoutineList({ routines = [] }) {
  if (!routines.length) {
    return '<p class="text-gray-500">No hay rutinas asignadas aún.</p>';
  }

  return `
    <ul class="space-y-4 bg-opacity-50 bg-gray-800 p-1 rounded-lg">
      ${routines.map(rutina => `
        <li class="border border-gray-300 rounded-lg p-1 space-y-2 bg-opacity-50 bg-gray-800">
          <strong>${rutina.actividad}</strong><br/>
          Series: ${rutina.series}, Repeticiones: ${rutina.repeticiones}, Peso: ${rutina.peso}<br/>
          <small>Video: <a href="${rutina.video}" target="_blank" class="text-blue-600 underline">Ver explicación</a></small>
        </li>
      `).join('')}
    </ul>
  `;
}
window.RoutineList = RoutineList;