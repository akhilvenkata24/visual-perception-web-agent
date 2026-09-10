import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  manifest_version: 3,
  name: 'WebPilot AI — Autonomous Browser Vision Agent',
  version: '1.0.0',
  description: 'Futuristic AI Web Agent with Three.js-inspired spatial visualization and context-aware privacy',
  action: {},
  side_panel: {
    default_path: 'index.html',
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
  permissions: ['activeTab', 'scripting', 'tabs', 'storage', 'sidePanel'],
  host_permissions: ['<all_urls>'],
  web_accessible_resources: [
    {
      resources: ['eng.traineddata', '*.png', 'assets/*'],
      matches: ['<all_urls>'],
    },
  ],
});
