<script lang="ts">
  import { confirmDialog } from '../stores/confirm.svelte';
  import Modal from './Modal.svelte';

  const request = $derived(confirmDialog.request);
</script>

<Modal open={!!request} title={request?.title ?? ''} onclose={() => confirmDialog.answer(false)} dialogClass="confirm-dialog">
  {#if request?.text}<p class="details">{request.text}</p>{/if}
  <div class="formactions">
    <button type="button" class="btn ghost" onclick={() => confirmDialog.answer(false)}>Cancelar</button>
    <!-- svelte-ignore a11y_autofocus -->
    <button type="button" class="btn" class:danger={request?.danger} autofocus onclick={() => confirmDialog.answer(true)}>
      {request?.confirmLabel ?? 'Aceptar'}
    </button>
  </div>
</Modal>
