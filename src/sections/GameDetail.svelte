<script lang="ts">
  import Modal from '../components/Modal.svelte';
  import { gameArt } from '../domain/art';
  import { averageRating } from '../domain/stats';
  import { formatDecimal, formatShortDate, nameKey } from '../domain/text';
  import type { Game } from '../domain/types';
  import { app } from '../stores/app.svelte';

  interface Props {
    game: Game | null;
    onclose: () => void;
    onedit: (game: Game) => void;
    ondelete: (game: Game) => void;
    onplay: (game: Game) => void;
  }

  let { game, onclose, onedit, ondelete, onplay }: Props = $props();

  const art = $derived(game ? gameArt(game) : null);
  const stat = $derived(game ? app.stats.games.get(nameKey(game.name)) : undefined);
  const rating = $derived(averageRating(stat));
  const canPlay = $derived(!!app.user && !app.playsMissing);
  const facts = $derived(game ? [
    `👥 ${game.players || 'Jugadores por confirmar'}`,
    game.duration ? `⏱ ${game.duration} min` : '⏱ Duración por confirmar',
    game.weight ? `Dureza ${game.weight}/5` : 'Dureza por confirmar',
    `📍 ${game.location || 'Lugar por asignar'}`,
  ] : []);
</script>

<Modal open={!!game} title={game?.name ?? ''} {onclose} dialogClass="detail-dialog" labelId="detailTitle">
  {#snippet header()}
    <div class="detail-hero pattern-{art?.pattern}" style:--c1={art?.from} style:--c2={art?.to}>
      <span class="cover-emoji" aria-hidden="true">{art?.emoji}</span>
      <button class="x" type="button" aria-label="Cerrar" onclick={onclose}>×</button>
    </div>
  {/snippet}
  {#if game}
    <div class="detail-body">
      <h2 id="detailTitle">{game.name}</h2>
      <div class="tags">
        {#each facts as fact (fact)}<span class="tag">{fact}</span>{/each}
        {#each game.types as type (type)}<span class="tag green">{type}</span>{/each}
      </div>
      {#if game.notes}<p class="details">{game.notes}</p>{/if}
      {#if canPlay}
        <div class="detail-stats">
          {#if stat}
            <div><strong>{stat.count}</strong><span>{stat.count === 1 ? 'partida' : 'partidas'}</span></div>
            <div><strong>{formatShortDate(stat.last)}</strong><span>última vez</span></div>
            <div><strong>{rating != null ? '★ ' + formatDecimal(rating) : '–'}</strong><span>nota media</span></div>
          {:else}
            <p class="notice">Aún no lo habéis jugado. ¡Estrenadlo!</p>
          {/if}
        </div>
      {/if}
    </div>
    <div class="formactions">
      <button type="button" class="btn ghost" onclick={() => ondelete(game)}>Eliminar</button>
      <button type="button" class="btn secondary" onclick={() => onedit(game)}>Editar</button>
      {#if canPlay}<button type="button" class="btn" onclick={() => onplay(game)}>Registrar partida</button>{/if}
    </div>
  {/if}
</Modal>
