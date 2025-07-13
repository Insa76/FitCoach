function Navbar() {
  return `
    <nav class="bg-purple-700 text-white p-4 mb-6">
      <ul class="flex space-x-6">
        <li><a href="#/" class="hover:underline">Inicio</a></li>
        <li><a href="#/exercises" class="hover:underline">Ejercicios</a></li>
        <li><a href="#/students" class="hover:underline">Alumnos</a></li>
        <li><a href="#/routines" class="hover:underline">Rutinas</a></li>
      </ul>
    </nav>
  `;
}
window.Navbar = Navbar;