function Dashboard() {
  return `
    <div class="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 class="text-xl font-bold text-purple-700 mb-4">Resumen de la jornada</h2>
      <ul class="space-y-2">
        <li><strong>Ejercicios:</strong> <span id="dashboardExercises">0</span></li>
        <li><strong>Alumnos:</strong> <span id="dashboardStudents">0</span></li>
        <li><strong>Rutinas asignadas:</strong> <span id="dashboardRoutines">0</span></li>
      </ul>
    </div>
  `;
}
window.Dashboard = Dashboard;