// toast.js — sistema de notificaciones simple
export function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.className = "toast show" + (type === "error" ? " error" : type === "info" ? " info" : "");
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}