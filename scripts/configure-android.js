const fs = require('node:fs');
const path = require('node:path');
const manifest = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
let xml = fs.readFileSync(manifest, 'utf8');
if (!xml.includes('android:host="login-callback"')) {
  const filter = `            <intent-filter>\n                <action android:name="android.intent.action.VIEW" />\n                <category android:name="android.intent.category.DEFAULT" />\n                <category android:name="android.intent.category.BROWSABLE" />\n                <data android:scheme="es.sergioarroni.miludoteca" android:host="login-callback" />\n            </intent-filter>\n`;
  xml = xml.replace(/(\s*<\/activity>)/, `\n${filter}$1`);
  fs.writeFileSync(manifest, xml);
}
