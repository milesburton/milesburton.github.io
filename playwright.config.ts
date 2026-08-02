import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? 'github' : 'list',
	webServer: {
		command: 'npm run build && npm run preview',
		url: 'http://localhost:4321',
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
	use: {
		baseURL: 'http://localhost:4321',
		trace: 'on-first-retry',
	},
	expect: {
		// Small tolerance for anti-aliasing/font-rendering noise between runs,
		// while still catching real layout/content regressions.
		toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
