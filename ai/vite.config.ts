import { sites } from '@openai/sites-vite-plugin';
import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';

import hostingConfig from './.openai/hosting.json';
import { cdnAdapter } from '@vinext/cloudflare/cache/cdn-adapter';
import { imagesOptimizer } from '@vinext/cloudflare/images/images-optimizer';

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  '00000000-0000-4000-8000-000000000000';

const { d1, r2 } = hostingConfig;

const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';

const localBindingConfig = {
  main: 'vinext/server/fetch-handler',
  compatibility_flags: ['nodejs_compat'],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: 'site-creator-d1',
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: 'site-creator-r2',
        },
      ]
    : [],
};

process.env.WRANGLER_WRITE_LOGS ??= 'false';
process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

  server: isCodexSeatbeltSandbox
    ? {
        watch: {
          useFsEvents: false,
          usePolling: true,
        },
      }
    : undefined,

  plugins: [
    vinext({
      cache: {
        cdn: cdnAdapter(),
      },
      images: {
        optimizer: imagesOptimizer(),
      },
    }),

    sites(),

    cloudflare({
      viteEnvironment: {
        name: 'rsc',
        childEnvironments: ['ssr'],
      },
      config: localBindingConfig,
    }),
  ],
});
