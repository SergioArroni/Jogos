<script lang="ts">
  import { untrack } from 'svelte';
  import Avatar from '../components/Avatar.svelte';
  import Modal from '../components/Modal.svelte';
  import { loadGroupShares, updateGroupShares, type GroupShare } from '../data/social';
  import type { Group } from '../domain/types';
  import { app } from '../stores/app.svelte';

  let { group, onclose }: { group: Group | null; onclose: () => void } = $props();

  let shares = $state<GroupShare[] | null>(null);
  let selected = $state<string[]>([]);
  let keptEmails = $state<number[]>([]);
  let status = $state('');
  let saving = $state(false);

  const linked = $derived(app.friends.filter(f => f.userId));
  const emailShares = $derived((shares ?? []).filter(s => !s.member_id && s.member_email));

  $effect(() => {
    if (group) untrack(() => load(group));
  });

  /** On the first share, pre-check the group's members who have an account. */
  async function load(target: Group) {
    shares = null;
    status = 'Cargando…';
    try {
      const rows = await loadGroupShares(app.user!.id, target.id);
      shares = rows;
      const fresh = !rows.length;
      selected = linked.filter(f => rows.some(r => r.member_id === f.userId) || (fresh && target.friendIds.includes(f.id))).map(f => f.userId!);
      keptEmails = rows.filter(r => !r.member_id).map(r => r.id);
      status = fresh && selected.length ? 'Hemos marcado los miembros del grupo que tienen cuenta.' : '';
    } catch (error) {
      status = (error as Error).message;
    }
  }

  async function save() {
    if (!group || !shares) return;
    const add = selected.filter(id => !shares!.some(s => s.member_id === id));
    const remove = [
      ...shares.filter(s => s.member_id && !selected.includes(s.member_id)).map(s => s.id),
      ...emailShares.filter(s => !keptEmails.includes(s.id)).map(s => s.id),
    ];
    saving = true;
    status = 'Guardando…';
    try {
      await updateGroupShares(app.user!.id, group.id, add, remove);
      onclose();
    } catch (error) {
      status = 'No se pudo guardar: ' + (error as Error).message;
    } finally {
      saving = false;
    }
  }
</script>

<Modal open={!!group} title={group ? `Compartir «${group.name}»` : ''} {onclose}>
  {#if shares}
    <p class="details">
      {linked.length ? 'Elige qué amigos pueden ver este grupo y sus partidas.' : 'Ninguno de tus amigos tiene cuenta vinculada todavía. Invítales desde Amigos para compartir el grupo con ellos.'}
    </p>
    <div class="friend-picker share-picker" role="group" aria-label="Amigos con acceso">
      {#each linked as friend (friend.id)}
        <label class="friend-option"><input type="checkbox" value={friend.userId} bind:group={selected} /><Avatar userId={friend.userId} name={friend.name} size="tiny" /><span>{friend.name}</span></label>
      {/each}
    </div>
    {#if emailShares.length}
      <p class="details" style="margin-top:14px">También compartido por correo con:</p>
      <div class="friend-picker share-picker">
        {#each emailShares as share (share.id)}
          <label class="friend-option"><input type="checkbox" value={share.id} bind:group={keptEmails} /><span>{share.member_email}</span></label>
        {/each}
      </div>
    {/if}
  {/if}
  <p class="notice" role="status">{status}</p>
  <div class="formactions">
    <button type="button" class="btn ghost" onclick={onclose}>Cancelar</button>
    <button type="button" class="btn" disabled={saving || !shares || (!linked.length && !emailShares.length)} onclick={save}>Guardar</button>
  </div>
</Modal>
