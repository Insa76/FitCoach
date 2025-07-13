let db = null;
const DB_NAME = 'FitCoachDB';
const STORE_NAME = 'students';

// Inicializar IndexedDB
function initDB() {
  const request = indexedDB.open(DB_NAME, 1);

  request.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  };

  request.onsuccess = (e) => {
    db = e.target.result;
  };

  request.onerror = (e) => {
    console.error("Error al iniciar IndexedDB", e);
  };
}

// Cargar todos los alumnos
function getAllStudentsFromDB(callback) {
  if (!db) return callback([]);

  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const result = [];

  const cursorRequest = store.openCursor();

  cursorRequest.onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      result.push(cursor.value);
      cursor.continue();
    } else {
      callback(result);
    }
  };
}

// Elimina una rutina específica
function deleteRoutineFromDB(studentId, routineId) {
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const getRequest = store.get(parseInt(studentId));

  getRequest.onsuccess = () => {
    const student = getRequest.result;

    if (!student || !student.rutinas) return;

    student.rutinas = student.rutinas.filter(r => r.id !== parseInt(routineId));
    store.put(student);
  };
}

// Guarda alumno completo
function saveStudentInDB(student) {
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  store.put(student);
}

// Eliminar alumno por ID
function deleteStudentFromDB(id) {
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  store.delete(parseInt(id));
}

// Limpiar todo
function clearAllStudentsFromDB(callback) {
  if (!db) return;

  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const clearRequest = store.clear();

  clearRequest.onsuccess = () => callback?.();
}

// Exponer a window
window.initDB = initDB;
window.getAllStudentsFromDB = getAllStudentsFromDB;
window.deleteRoutineFromDB = deleteRoutineFromDB;
window.saveStudentInDB = saveStudentInDB;
window.deleteStudentFromDB = deleteStudentFromDB;
window.clearAllStudentsFromDB = clearAllStudentsFromDB;