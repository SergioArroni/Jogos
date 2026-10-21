<script lang="ts">
  import { normalizeGamePlace, withDefaultPlaces } from '../domain/seed';
  import { app } from '../stores/app.svelte';
  import { askConfirm } from '../stores/confirm.svelte';

  let file = $state<FileList | null>(null);
  let status = $state('');

  function exportBackup() {
    const { games, groups, friends, places } = app.collection;
    const blob = new Blob([JSON.stringify({ version: 2, exportedAt: new Date().toISOString(), games, groups: groups.filter(g => !g._shared), friends, places }, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'el-baul-de-los-jogos-backup.json';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function importBackup() {
    const chosen = file?.[0];
    if (!chosen) return void (status = 'Selecciona primero un archivo JSON.');
    try {
      const data = JSON.parse(await chosen.text());
      if (!Array.isArray(data.games) || !Array.isArray(data.groups)) throw new Error('formato');
      const ok = await askConfirm({ title: '¿Sustituir el catálogo?', text: 'Los juegos, grupos, amigos y lugares actuales se reemplazarán por los de la copia.', confirmLabel: 'Importar', danger: true });
      if (!ok) return;
      app.replaceCollection({
        games: data.games.map(normalizeGamePlace),
        groups: data.groups.filter((g: { _shared?: boolean }) => !g._shared),
        friends: Array.isArray(data.friends) ? data.friends : [],
        places: withDefaultPlaces(Array.isArray(data.places) ? data.places : []),
      });
      status = 'Copia importada correctamente.';
    } catch {
      status = 'No se ha podido importar: el archivo no parece una copia válida.';
    }
  }
</script>

<section class="panel active">
  <div class="sectionhead"><div><h2>Datos y copia de seguridad</h2><p>Tu catálogo es tuyo: expórtalo o impórtalo cuando quieras.</p></div></div>
  <div class="card" style="margin-top:15px">
    <h3>Exportar catálogo</h3>
    <p class="details">Descarga juegos y grupos en un archivo JSON. Guárdalo como copia de seguridad.</p>
    <button class="btn" onclick={exportBackup}>Descargar copia JSON</button>
    <hr style="border:0;border-top:1px solid var(--line);width:100%" />
    <h3>Importar catálogo</h3>
    <p class="details">Carga una copia anterior. Esto sustituirá los datos guardados actualmente en este navegador.</p>
    <input type="file" accept=".json,application/json" bind:files={file} />
    <button class="btn secondary" onclick={importBackup}>Importar copia</button>
    <p class="notice">{status}</p>
  </div>
  <div class="hint">Con una sesión iniciada, los cambios se guardan en tu cuenta Supabase y aparecen también en la app móvil. La copia JSON sigue disponible como respaldo.</div>
</section>
