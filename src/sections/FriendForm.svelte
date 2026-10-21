<script lang="ts">
  import { untrack } from 'svelte';
  import Modal from '../components/Modal.svelte';
  import { lookupAccounts } from '../data/social';
  import { isValidNickname, nameKey, nicknameSuggestion, withSuffix } from '../domain/text';
  import type { Friend } from '../domain/types';
  import { app, uid } from '../stores/app.svelte';

  /** `friend` undefined → new friend; `inviteOnly` opens straight on the invitation step. */
  let { open, friend, inviteOnly = false, onclose }: { open: boolean; friend?: Friend; inviteOnly?: boolean; onclose: () => void } = $props();

  type Linked = Pick<Friend, 'userId' | 'nickname' | 'invite' | 'invitedAt' | 'email'>;
  interface Draft { id: string; previous?: Friend; value: string; name: string; linked: Linked; invite: string }

  let step = $state<'form' | 'ask' | 'invite'>('form');
  let value = $state('');
  let status = $state('');
  let busy = $state(false);
  let draft = $state<Draft | null>(null);
  let invited = $state<Friend | null>(null);
  let inviteStatus = $state('');

  const inviteLink = $derived(invited ? new URL('login.html?signup=1&' + (invited.invite
    ? 'nickname=' + encodeURIComponent(invited.invite) : 'email=' + encodeURIComponent(invited.email ?? '')), location.href).href : '');
  const title = $derived(step === 'invite' && invited ? 'Invitar a ' + invited.name : friend ? 'Editar amigo' : 'Añadir amigo');

  $effect(() => {
    if (open) untrack(() => {
      status = '';
      busy = false;
      value = friend?.name ?? '';
      invited = inviteOnly && friend ? friend : null;
      inviteStatus = '';
      step = invited ? 'invite' : 'form';
    });
  });

  const sameName = (name: string, id: string) => app.friends.some(f => f.id !== id && nameKey(f.name) === nameKey(name));

  function linkedOf(previous?: Friend): Linked {
    if (previous?.userId) return { userId: previous.userId, nickname: previous.nickname };
    if (previous?.invite) return { invite: previous.invite, invitedAt: previous.invitedAt };
    if (previous?.email) return { email: previous.email };
    return {};
  }

  /**
   * Existing nickname → link the account directly. Otherwise ask (inside this
   * dialog) whether to invite them with a sign-up link and a suggested nickname.
   * Renaming a friend who is already linked or invited keeps the link.
   */
  async function submit(event: SubmitEvent) {
    event.preventDefault();
    const id = friend?.id ?? uid();
    const typed = value.trim().replace(/^@/, '');
    const key = typed.toLowerCase();
    if (!typed) return void (status = 'Escribe un nombre o apodo.');
    if (sameName(typed, id)) return void (status = 'Ya existe un amigo con ese nombre.');
    const unchanged = !!friend && [friend.name, friend.nickname].some(x => x?.toLowerCase() === key);
    let name = typed;
    let linked = linkedOf(friend);
    if (!unchanged && app.user) {
      const slug = nicknameSuggestion(typed);
      const queries = [...new Set([key, slug])].filter(q => isValidNickname(q));
      busy = true;
      status = 'Comprobando si ya usa la app…';
      try {
        const results = queries.length ? await lookupAccounts(queries) : [];
        const match = results.find(r => r.query === key && r.found);
        if (match?.self) return void (status = 'Ese es tu propio apodo.');
        if (match) {
          linked = { userId: match.userId, nickname: match.nickname };
          name = match.nickname!;
        } else if (!linked.userId && !linked.invite && !linked.email) {
          const taken = results.some(r => r.query === slug && r.found);
          draft = { id, previous: friend, value: typed, name, linked, invite: taken ? withSuffix(slug) : slug };
          status = '';
          step = 'ask';
          return;
        }
      } catch (error) {
        console.warn('No se pudo comprobar el apodo:', error);
      } finally {
        busy = false;
      }
    }
    commit({ id, previous: friend, value: typed, name, linked, invite: '' });
  }

  function commit(next: Draft) {
    const { id, previous, value: typed, name, linked } = next;
    if (linked.userId && app.friends.some(f => f.id !== id && f.userId === linked.userId)) {
      step = 'form';
      return void (status = `@${linked.nickname} ya está en tus amigos.`);
    }
    if (name !== typed && sameName(name, id)) {
      step = 'form';
      return void (status = 'Ya existe un amigo con ese nombre.');
    }
    const saved: Friend = { id, name, ...Object.fromEntries(Object.entries(linked).filter(([, v]) => v != null)) };
    app.upsertFriend(saved);
    if (saved.invite && saved.invite !== previous?.invite) {
      invited = saved;
      step = 'invite';
    } else onclose();
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(inviteLink);
      inviteStatus = 'Enlace copiado. Pégalo en WhatsApp, Telegram o donde quieras.';
    } catch {
      inviteStatus = 'No se pudo copiar automáticamente. Copia este enlace: ' + inviteLink;
    }
  }
</script>

<Modal {open} {title} {onclose}>
  {#if step === 'form'}
    <form onsubmit={submit}>
      <div class="field">
        <label for="friendName">Nombre o apodo *</label>
        <input id="friendName" required maxlength="60" autocomplete="off" spellcheck="false" placeholder="Ej. su_morenito_19" bind:value />
        <small>Si es el apodo de alguien que ya usa la app, se vinculará a su cuenta. Si no, podrás invitarle.</small>
      </div>
      <p class="notice" role="status">{status}</p>
      <div class="formactions"><button type="button" class="btn ghost" onclick={onclose}>Cancelar</button><button class="btn" disabled={busy}>Guardar amigo</button></div>
    </form>
  {:else if step === 'ask' && draft}
    <p>«{draft.value}» todavía no usa El Baúl de los Jogos. ¿Quieres invitarle a crear una cuenta?</p>
    <div class="formactions">
      <button type="button" class="btn ghost" onclick={() => commit(draft!)}>Guardar sin invitar</button>
      <button type="button" class="btn" onclick={() => commit({ ...draft!, linked: { invite: draft!.invite, invitedAt: new Date().toISOString() } })}>Invitar</button>
    </div>
  {:else if invited}
    <p>
      Envíale este enlace a {invited.name} para que se cree una cuenta en El Baúl de los Jogos.
      {#if invited.invite}Le propondremos el apodo {invited.invite}; si lo mantiene, quedará vinculado a tu amigo automáticamente.{/if}
    </p>
    <p class="notice" role="status">{inviteStatus}</p>
    <div class="formactions">
      <button type="button" class="btn ghost" onclick={onclose}>Listo</button>
      <a class="btn secondary" target="_blank" rel="noopener"
        href={'https://wa.me/?text=' + encodeURIComponent('¡Hola! Te he añadido como amigo en El Baúl de los Jogos. Crea tu cuenta aquí para que organicemos partidas juntos: ' + inviteLink)}>WhatsApp</a>
      <button type="button" class="btn" onclick={copyLink}>Copiar enlace</button>
    </div>
  {/if}
</Modal>
