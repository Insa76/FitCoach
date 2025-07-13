function renderStudentsPage() {
  const html = `
    <div class="page-container" style="background-image: url('/images/gym1.jpg'); background-size: cover; background-position: center; min-height: 100vh;">
      <div class="overlay"></div>
      <div class="content z-10 relative max-w-4xl mx-auto p-2 md:p-6">
        <div class="flex flex-wrap mb-4 items-center justify-between">
          <h1 class="text-2xl font-bold text-white">Alumnos</h1>
          <button onclick="navigateTo('/')" class="mt-3 text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition duration-200">
            Inicio 
          </button>
        </div>
        <div id="studentFormContainer" class="mb-6 p-2 rounded shadow-lg border-4"></div>
        <div class="flex flex-wrap gap-3 mb-6">
          <button id="limpiarDatosBtn" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-sm">Limpiar datos</button>
        </div>
        <div id="studentListContainer" class="mt-4 space-y-4"></div>
      </div>
    </div>
  `;
  document.getElementById('app').innerHTML = html;

  const formContainer = document.getElementById('studentFormContainer');
  const listContainer = document.getElementById('studentListContainer');
  let allStudents = [];

  if (typeof getAllStudentsFromDB !== 'function') return;

  getAllStudentsFromDB((loadedStudents) => {
    allStudents = loadedStudents;

    if (!formContainer) return;
    formContainer.innerHTML = window.StudentForm ? StudentForm({}) : '';
    setupFormEventListeners(formContainer, allStudents);
    renderList(allStudents);
  });

  const limpiarBtn = document.getElementById('limpiarDatosBtn');
  if (limpiarBtn) {
    limpiarBtn.addEventListener('click', () => {
      if (typeof clearAllStudentsFromDB === 'function') {
        if (confirm("¿Borrar todos los datos?")) {
          clearAllStudentsFromDB(() => {
            alert("✅ Datos borrados");
            allStudents = [];
            renderList([]);
          });
        }
      }
    });
  }

  function renderList(students) {
    if (!listContainer) return;
    const validStudents = Array.isArray(students) ? students : [];
    listContainer.innerHTML = window.StudentList ? StudentList({
      students: validStudents,
      onEdit(id) {
        const student = validStudents.find(s => s.id === id);
        if (student) {
          const formContainer = document.getElementById('studentFormContainer');
          if (!formContainer) return;
          formContainer.innerHTML = window.StudentForm ? StudentForm(student) : '';
          setupFormEventListeners(formContainer, validStudents);
        }
      },
      onDelete(id) {
        if (typeof deleteStudentFromDB === 'function') {
          deleteStudentFromDB(id);
          getAllStudentsFromDB(renderList);
        }
      }
    }) : '';

    listContainer.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        if (!isNaN(id) && typeof deleteStudentFromDB === 'function') {
          deleteStudentFromDB(id);
          getAllStudentsFromDB(renderList);
        }
      });
    });

    listContainer.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const student = validStudents.find(a => a.id === id);

        if (student) {
          const formContainer = document.getElementById('studentFormContainer');
          if (!formContainer) return;
          formContainer.innerHTML = window.StudentForm ? StudentForm(student) : '';
          setupFormEventListeners(formContainer, validStudents);
        }
      });
    });
  }

  function setupFormEventListeners(formContainer, allStudents) {
    const form = formContainer.querySelector('#studentForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = form.nombre?.value.trim();
      const apellido = form.apellido?.value.trim();
      const telefono = form.telefono?.value.trim();
      const fotoInput = form.querySelector('#fotoInput');
      const previewFoto = form.querySelector('#previewFoto');

      if (!nombre || !apellido || !telefono) {
        alert("Nombre, apellido y teléfono son obligatorios");
        return;
      }

      let foto = '';
      if (fotoInput && fotoInput.files.length > 0) {
        const file = fotoInput.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
          foto = event.target.result;
          if (previewFoto) {
            previewFoto.src = foto;
            previewFoto.style.display = 'block';
          }
          guardarAlumno(nombre, apellido, telefono, foto, allStudents, formContainer);
        };

        reader.onerror = () => {
          alert("Error al cargar la imagen");
          foto = '';
          guardarAlumno(nombre, apellido, telefono, foto, allStudents, formContainer);
        };

        reader.readAsDataURL(file);
      } else {
        // Si no hay nueva foto, usa la existente o deja vacío
        guardarAlumno(nombre, apellido, telefono, foto, allStudents, formContainer);
      }
    });
  }

  function guardarAlumno(nombre, apellido, telefono, foto, allStudents, formContainer) {
    const form = formContainer.querySelector('#studentForm');
    const studentId = form?.studentId ? parseInt(form.studentId.value) : NaN;

    const nuevoAlumno = {
      id: isNaN(studentId) ? Date.now() : studentId,
      nombre,
      apellido,
      telefono,
      foto
    };

    const index = allStudents.findIndex(s => s.id === nuevoAlumno.id);
    if (index > -1) {
      allStudents[index] = nuevoAlumno; // Actualizar
    } else {
      allStudents.push(nuevoAlumno); // Agregar
    }

    if (typeof saveStudentInDB === 'function') saveStudentInDB(nuevoAlumno);

    // Reiniciar formulario
    form.reset();
    const previewFoto = form.querySelector('#previewFoto');
    if (previewFoto) {
      previewFoto.src = '';
      previewFoto.style.display = 'none';
    }
    formContainer.innerHTML = window.StudentForm ? StudentForm({}) : '';
    setupFormEventListeners(formContainer, allStudents);

    // Refrescar lista
    renderList(allStudents);
  }
}

window.renderStudentsPage = renderStudentsPage;