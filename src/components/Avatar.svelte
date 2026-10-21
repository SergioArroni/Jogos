<script lang="ts">
  import { app } from '../stores/app.svelte';

  interface Props {
    userId?: string | null;
    name?: string;
    /** 'mini' and 'tiny' are the small sizes; extra classes (e.g. the large profile one) go in `className`. */
    size?: 'mini' | 'tiny' | '';
    className?: string;
    /** Shows this picture instead of the account's (used for the profile photo preview). */
    src?: string;
  }

  let { userId = null, name = '', size = 'mini', className = '', src }: Props = $props();

  const person = $derived(userId ? app.people.get(userId) : undefined);
  const url = $derived(src ?? (userId && userId === app.user?.id ? app.avatarUrl : person?.avatarUrl ?? ''));
  const initial = $derived((person?.nickname || name || '?').trim().charAt(0).toLocaleUpperCase('es') || '?');
  let failedUrl = $state('');
  const showImage = $derived(url !== failedUrl && /^(https:\/\/|blob:|data:image\/webp;base64,)/i.test(url));
</script>

<span class="avatar {size} {className}" aria-hidden="true">
  {#if showImage}<img src={url} alt="" onerror={() => (failedUrl = url)} />{:else}{initial}{/if}
</span>
