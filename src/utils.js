window.LocalDB = {
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error al leer", e);
      return [];
    }
  },
  set(key, data) {
    try {
      const serializedData = JSON.stringify(data);

      // Verificar tamaño actual
      const sizeKB = (new Blob([serializedData]).size / 1024).toFixed(2);
      const sizeMB = (sizeKB / 1024).toFixed(2);

      if (sizeMB > 1) { // Si pasa de ~1MB
        alert("⚠️ Demasiados datos guardados. Considera borrar fotos.");
        return;
      }

      localStorage.setItem(key, serializedData);
    } catch (e) {
      alert("⚠️ Error al guardar. Límite de almacenamiento excedido.");
      console.error("No se pudo guardar:", e);
    }
  }
};

function isValidId(id) {
  const numericId = parseInt(id);
  return id !== undefined && id !== null && !isNaN(numericId);
}
window.isValidId = isValidId;