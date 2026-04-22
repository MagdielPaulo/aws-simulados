export function showToast(message, icon = 'info', className = 'toast-unlock', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${className}`;
  toast.innerHTML = `<i data-lucide="${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);

  if (window.lucide) window.lucide.createIcons({ nodes: [toast] });

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease-in forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Modal de confirmação na paleta do projeto (substitui o confirm() nativo)
export function showConfirm({
  icon = 'help-circle',
  color = 'var(--blue-400)',
  rgb = '59,130,246',
  title = '',
  message = '',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  danger = false,
  onConfirm,
  onCancel,
}) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box" style="--mc:${color};--mrgb:${rgb}">
      <div class="modal-icon-box">
        <i data-lucide="${icon}"></i>
      </div>
      <p class="modal-title">${title}</p>
      <p class="modal-message">${message}</p>
      <div class="modal-actions">
        <button class="btn btn-ghost modal-cancel">${cancelText}</button>
        <button class="btn ${danger ? 'btn-danger-fill' : 'btn-primary'} modal-confirm">${confirmText}</button>
      </div>
    </div>`;

  document.body.appendChild(overlay);
  if (window.lucide) window.lucide.createIcons({ nodes: [overlay] });

  // Força reflow antes de animar entrada
  overlay.offsetHeight;
  overlay.classList.add('modal-in');

  const close = (cb) => {
    overlay.classList.remove('modal-in');
    overlay.classList.add('modal-out');
    setTimeout(() => { overlay.remove(); cb?.(); }, 220);
  };

  overlay.querySelector('.modal-confirm').addEventListener('click', () => close(onConfirm));
  overlay.querySelector('.modal-cancel').addEventListener('click',  () => close(onCancel));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(onCancel); });
}
