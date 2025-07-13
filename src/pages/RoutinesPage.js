function renderRoutinesPage() {
  const html = `
    <div class="page-container" style="background-image: url('/images/gym1.jpg'); background-size: cover; background-position: center; min-height: 100vh;">
      <div class="overlay"></div>
      <div class="content z-10 relative max-w-4xl mx-auto p-4 md:p-6 ">
        <div class="flex flex-wrap mb-4 items-center justify-between">
          <h1 class="text-2xl font-bold text-white">Rutinas</h1>
          <button onclick="navigateTo('/')" class="mt-3 text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition duration-200">
            Inicio 
          </button>
        </div>
        <div id="routineFormContainer" class="mb-6 mt-4 p-4 rounded shadow-lg border-4"></div>
        <div id="routineListContainer" class="mt-4 space-y-6"></div>
      </div>
    </div>
  `;
  document.getElementById('app').innerHTML = html;

  const formContainer = document.getElementById('routineFormContainer');
  const listContainer = document.getElementById('routineListContainer');
  let allStudents = [];

  if (typeof getAllStudentsFromDB !== 'function') return;

  getAllStudentsFromDB((students) => {
    allStudents = students;
    if (!allStudents.length) {
      formContainer.innerHTML = '<p>No hay alumnos registrados. Agrega uno primero.</p>';
      return;
    }
    formContainer.innerHTML = window.RoutineForm ? RoutineForm({ students }) : '';
    setupFormEventListeners(formContainer, allStudents);
    renderList(allStudents);
  });

  function setupFormEventListeners(formContainer, allStudents) {
    const form = formContainer.querySelector('#routineForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const studentId = parseInt(formData.get('studentId'));
      const actividad = formData.get('activity').trim();
      const series = formData.get('sets').trim();
      const repeticiones = formData.get('reps').trim();
      const peso = formData.get('weight').trim();
      const video = formData.get('video').trim();

      if (!studentId || !actividad || !series || !repeticiones || !peso) {
        alert("Completa todos los campos");
        return;
      }

      const index = allStudents.findIndex(s => s.id === studentId);
      if (index === -1) return;
      if (!allStudents[index].rutinas) allStudents[index].rutinas = [];
      const editingId = form.getAttribute('data-editing-id');

      if (editingId) {
        const rutinaIndex = allStudents[index].rutinas.findIndex(r => r.id === parseInt(editingId));
        if (rutinaIndex > -1) {
          allStudents[index].rutinas[rutinaIndex] = {
            ...allStudents[index].rutinas[rutinaIndex],
            actividad, series, repeticiones, peso, video
          };
        }
        form.removeAttribute('data-editing-id');
      } else {
        allStudents[index].rutinas.push({
          id: Date.now(), actividad, series, repeticiones, peso, video
        });
      }
      if (typeof saveStudentInDB === 'function') saveStudentInDB(allStudents[index]);
      form.reset();
      formContainer.innerHTML = window.RoutineForm ? RoutineForm({ students: allStudents }) : '';
      setupFormEventListeners(formContainer, allStudents);
      renderList(allStudents);
    });
  }

  function renderList(students) {
    const container = document.getElementById('routineListContainer');
    if (!container) return;
    if (!students.some(a => a.rutinas?.length > 0)) {
      container.innerHTML = '<p class="text-gray-500 mt-4">No hay rutinas asignadas aún.</p>';
      return;
    }
    container.innerHTML = students.map(student => {
      if (!student.rutinas?.length) return '';
      return `
        <div class="border border-gray-300 p-1 rounded-lg bg-white shadow-sm bg-opacity-50 bg-gray-800">
          <h2 class="font-semibold">${student.nombre} ${student.apellido}</h2>
          <ul class="mt-3 space-y-2 bg-opacity-50 bg-gray-800 p-1 rounded-lg">
            ${student.rutinas.map(rutina => `
              <li class="bg-opacity-50 bg-gray-800 p-1 border-l-4 border-green-500 pl-3 flex justify-between items-center">
                <div>
                  <strong>${rutina.actividad}</strong><br/>
                  Series: ${rutina.series}, Repeticiones: ${rutina.repeticiones}, Peso: ${rutina.peso}
                  ${rutina.video ? `<small class="block mt-2"><a href="${rutina.video}" target="_blank" class="text-blue-600 underline">Ver video explicativo</a></small>` : ''}
                </div>
                <div class="flex gap-2">
                  <button data-student-id="${student.id}" data-routine-id="${rutina.id}" class="edit-routine-btn bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs">Editar</button>
                  <button data-student-id="${student.id}" data-routine-id="${rutina.id}" class="delete-rutina-btn bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs">Eliminar</button>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.delete-rutina-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = parseInt(btn.dataset.studentId);
        const routineId = parseInt(btn.dataset.routineId);
        if (typeof deleteRoutineFromDB === 'function') {
          deleteRoutineFromDB(studentId, routineId);
          getAllStudentsFromDB(renderList);
        }
      });
    });

    container.querySelectorAll('.edit-routine-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = parseInt(btn.dataset.studentId);
        const routineId = parseInt(btn.dataset.routineId);
        const formContainer = document.getElementById('routineFormContainer');
        if (!studentId || !routineId) return;
        getAllStudentsFromDB((updatedStudents) => {
          const student = updatedStudents.find(s => s.id === studentId);
          const rutina = student?.rutinas?.find(r => r.id === routineId);
          if (student && rutina) {
            if (!formContainer.querySelector(`[data-editing-id="${rutina.id}"]`)) {
              formContainer.innerHTML = window.RoutineForm ? RoutineForm({
                students: updatedStudents,
                studentId: student.id,
                rutina
              }) : '';
              setupFormEventListeners(formContainer, updatedStudents);
            }
          }
        });
      });
    });
  }
}
window.renderRoutinesPage = renderRoutinesPage;