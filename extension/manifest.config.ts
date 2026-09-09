import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'Privacy Browser Agent',
  version: '1.0.0',
  description: 'Privacy-Preserving Browser Vision Agent MVP',
  action: {
    default_popup: 'index.html',
  },
  background: {
    service_worker: 'src/background/serviceWorker.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/content.ts'],
      run_at: 'document_idle',
    },
  ],
  permissions: ['activeTab', 'scripting', 'tabs', 'storage'],
  host_permissions: ['<all_urls>'],
  web_accessible_resources: [
    {
      resources: ['eng.traineddata', '*.png', 'assets/*'],
      matches: ['<all_urls>'],
    },
  ],
});
