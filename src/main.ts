// Fonts ship inside the app (they used to come from Google Fonts), so they also work offline.
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-sans/800.css';
import '@fontsource/fraunces/600.css';
import '@fontsource/fraunces/700.css';
import { inject } from '@vercel/analytics';
import { mount } from 'svelte';
import App from './App.svelte';
import { app } from './stores/app.svelte';
import { isNative } from './platform/native';
import { theme } from './stores/theme.svelte';

theme.apply();

// Vercel Web Analytics counts visits to the web (cookieless, no personal data). Not inside the APK:
// there the app runs on https://localhost and Vercel could not tell which site the visit belongs to.
if (!isNative) inject();

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
