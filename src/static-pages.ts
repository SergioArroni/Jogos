// Shared by login.html and admin.html (still plain pages): bundles the fonts and the
// Supabase library into the build instead of loading them from Google Fonts and a CDN,
// so both pages also open inside the APK without depending on outside servers.
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-sans/800.css';
import '@fontsource/fraunces/600.css';
import '@fontsource/fraunces/700.css';
import { createClient } from '@supabase/supabase-js';
import { inject } from '@vercel/analytics';
import { isNative } from './platform/native';

declare global {
  interface Window {
    supabase: { createClient: typeof createClient };
  }
}

window.supabase = { createClient };

// Count visits to these pages too (web only, like the app).
if (!isNative) inject();
