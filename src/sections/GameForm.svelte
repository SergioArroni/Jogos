<script lang="ts">
  import Modal from '../components/Modal.svelte';
  import { nameKey } from '../domain/text';
  import type { Game } from '../domain/types';
  import { untrack } from 'svelte';
  import { app, uid } from '../stores/app.svelte';

  /** `game` undefined → new game. */
  let { open, game, onclose }: { open: boolean; game?: Game; onclose: () => void } = $props();

  let form = $state({ name: '', players: '', types: '', weight: '', duration: '', location: '', notes: '' });
  let status = $state('');

  $effect(() => {
    if (open) untrack(reset);
  });

  function reset() {
    status = '';
    form = game
      ? { name: game.name, players: game.players ?? '', types: game.types.join(', '), weight: String(game.weight ?? ''),
          duration: String(game.duration ?? ''), location: game.location ?? '', notes: game.notes ?? '' }
      : { name: '', players: '', types: '', weight: '', duration: '', location: app.places[0]?.name ?? '', notes: '' };
  }

  function submit(event: SubmitEvent) {
    event.preventDefault();
    const saved: Game = {
      id: game?.id ?? uid(),
      name: form.name.trim(),
      players: form.players.trim(),
      types: form.types.split(',').map(type => type.trim()).filter(Boolean),
      weight: Number(form.weight) || null,
      duration: Number(form.duration) || null,
      location: form.location,
      notes: form.notes.trim(),
    };
    if (app.games.some(g => g.id !== saved.id && nameKey(g.name) === nameKey(saved.name))) {
      status = 'Ya hay un juego con ese nombre en tu colección.';
      return;
    }
    app.upsertGame(saved);
    onclose();
  }
</script>

<Modal {open} title={game ? 'Editar juego' : 'Añadir juego'} {onclose}>
  <form onsubmit={submit}>
    <div class="formgrid">
      <div class="field"><label for="gName">Nombre *</label><input id="gName" required maxlength="100" bind:value={form.name} /></div>
      <div class="field"><label for="gPlayers">Jugadores (mín.–máx.)</label><input id="gPlayers" placeholder="Ej. 2–6" bind:value={form.players} /></div>
      <div class="field"><label for="gTypes">Estilos (separados por comas)</label><input id="gTypes" placeholder="Fiesta, Cartas, Humor" bind:value={form.types} /></div>
      <div class="field">
        <label for="gWeight">Dureza (1–5)</label>
        <select id="gWeight" bind:value={form.weight}>
          <option value="">Sin indicar</option>
          {#each ['Muy ligero', 'Ligero', 'Medio', 'Duro', 'Muy duro'] as label, i (label)}<option value={String(i + 1)}>{i + 1} · {label}</option>{/each}
        </select>
      </div>
      <div class="field"><label for="gDuration">Duración en minutos</label><input id="gDuration" type="number" min="1" max="600" placeholder="Ej. 30" bind:value={form.duration} /></div>
      <div class="field">
        <label for="gLocation">Lugar</label>
        <select id="gLocation" bind:value={form.location}>
          <option value="">Sin asignar</option>
          {#each app.places as place (place.id)}<option value={place.name}>{place.name}</option>{/each}
        </select>
      </div>
      <div class="field full"><label for="gNotes">Notas / expansiones / grupo ideal</label><textarea id="gNotes" placeholder="Ej. expansión de…, ideal para…" bind:value={form.notes}></textarea></div>
    </div>
    <p class="notice" role="status">{status}</p>
    <div class="formactions"><button type="button" class="btn ghost" onclick={onclose}>Cancelar</button><button class="btn" type="submit">Guardar juego</button></div>
  </form>
</Modal>
