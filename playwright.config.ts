import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: { headless: true, trace: 'on', screenshot: 'off' },
  testMatch: /.*\.spec\.ts/,
  reporter: [
    ['list'],
    ['html', { open: 'always', outputFolder: './tests/playwright/reports/test-HTML' }],
  ],
  outputDir: './tests/playwright/reports/test-results',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
};

export default config;
