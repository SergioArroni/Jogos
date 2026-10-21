// In-app confirmation dialog used instead of the browser's confirm().
// askConfirm({title, text, confirmLabel, danger}) resolves to true or false.
(() => {
  let resolver = null;
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'confirmModal';
  modal.setAttribute('role', 'alertdialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'confirmTitle');
  modal.setAttribute('aria-describedby', 'confirmText');
  modal.innerHTML = '<div class="dialog confirm-dialog"><div class="dialoghead"><h2 id="confirmTitle"></h2><button class="x" type="button" data-answer="no" aria-label="Cerrar">×</button></div><p id="confirmText" class="details"></p><div class="formactions"><button type="button" class="btn ghost" data-answer="no">Cancelar</button><button type="button" class="btn" id="confirmAccept" data-answer="yes"></button></div></div>';

  const finish = answer => {
    modal.classList.remove('open');
    const resolve = resolver;
    resolver = null;
    if (resolve) resolve(answer);
  };
  modal.addEventListener('click', event => {
    const button = event.target.closest('[data-answer]');
    if (button) finish(button.dataset.answer === 'yes');
    else if (event.target === modal) finish(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && resolver) finish(false);
  });

  window.askConfirm = ({ title, text = '', confirmLabel = 'Aceptar', danger = false }) => {
    if (!modal.isConnected) document.body.append(modal);
    if (resolver) resolver(false);
    modal.querySelector('#confirmTitle').textContent = title;
    modal.querySelector('#confirmText').textContent = text;
    const accept = modal.querySelector('#confirmAccept');
    accept.textContent = confirmLabel;
    accept.classList.toggle('danger', danger);
    modal.classList.add('open');
    accept.focus();
    return new Promise(resolve => { resolver = resolve; });
  };
})();
