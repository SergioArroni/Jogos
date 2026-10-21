import { mount } from 'svelte';
import App from './App.svelte';
import { app } from './stores/app.svelte';
import { theme } from './stores/theme.svelte';

theme.apply();

// The loading screen (in index.html) stays until we know whether there is a session.
const slowTimer = setTimeout(() => {
  const message = document.getElementById('authGateMessage');
  if (message) message.textContent = 'La comprobación está tardando. Vuelve al inicio de sesión e inténtalo otra vez.';
}, 8000);

mount(App, { target: document.getElementById('app')! });

app.start().then(() => clearTimeout(slowTimer)).catch(error => {
  clearTimeout(slowTimer);
  console.error(error);
  location.replace('login.html?error=connection' + location.hash);
});
