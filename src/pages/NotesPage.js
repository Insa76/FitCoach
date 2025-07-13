function renderNotesPage() {
  const html = `
    <div class="page-container" style="background-image: url('/images/gym1.jpg'); background-size: cover; background-position: center; min-height: 100vh;">
      <div class="overlay"></div>
      <div class="content z-10 relative max-w-4xl mx-auto p-4 md:p-6">
        <div class="flex flex-wrap mb-4 items-center justify-between">
          <h1 class="text-2xl font-bold text-white">Notas</h1>
          <button onclick="navigateTo('/')" class="mt-3 text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition duration-200">
            Inicio 
          </button>
        </div>
        <div id="noteFormContainer" class="mb-6 p-4 rounded shadow-lg border-4"></div>
        <div id="notesListContainer" class="mt-4"></div>
      </div>
    </div>
  `;
  document.getElementById('app').innerHTML = html;

  const formContainer = document.getElementById('noteFormContainer');
  const listContainer = document.getElementById('notesListContainer');

  // Inyectar formulario vacío al inicio
  formContainer.innerHTML = window.NoteForm ? NoteForm({}) : '';
  const form = document.getElementById('noteForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  renderList();
}

window.renderNotesPage = renderNotesPage;

let editingNoteId = null;

function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const note = {
    id: editingNoteId || Date.now(),
    title: formData.get('title'),
    content: formData.get('content'),
    date: formData.get('date') || ''
  };

  let notes = window.LocalDB && LocalDB.get ? LocalDB.get('notes') : [];
  if (editingNoteId) {
    const index = notes.findIndex(n => n.id === note.id);
    if (index > -1) notes[index] = note;
    editingNoteId = null;
  } else {
    notes.push(note);
  }

  window.LocalDB && LocalDB.set && LocalDB.set('notes', notes);
  e.target.reset();
  renderList();
}

function renderList() {
  const notes = window.LocalDB && LocalDB.get ? LocalDB.get('notes') : [];
  const container = document.getElementById('notesListContainer');
  if (!container) return;

  if (!notes.length) {
    container.innerHTML = '<p>No hay notas guardadas aún.</p>';
    return;
  }

  container.innerHTML = window.NotesList ? NotesList({ notes }) : '';

  // Asignar eventos a los botones dinámicos
  addNoteButtonsEventListeners();
}

function addNoteButtonsEventListeners() {
  const container = document.getElementById('notesListContainer');
  if (!container) return;

  container.querySelectorAll('.edit-note-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      const note = window.LocalDB && LocalDB.get ? LocalDB.get('notes').find(n => n.id === id) : null;
      if (!note) return;
      const form = document.getElementById('noteForm');
      if (!form) return;
      form.title.value = note.title;
      form.content.value = note.content;
      form.date.value = note.date || '';
      editingNoteId = id;
    });
  });

  container.querySelectorAll('.delete-note-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      let notes = window.LocalDB && LocalDB.get ? LocalDB.get('notes') : [];
      notes = notes.filter(n => n.id !== id);
      window.LocalDB && LocalDB.set && LocalDB.set('notes', notes);
      renderList();
    });
  });
}