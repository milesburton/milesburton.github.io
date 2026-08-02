import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
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
		// Tolerance for anti-aliasing/font-rendering noise between runs (observed
		// as a whole-page ~1-line text reflow shift, up to ~3-4% of pixels, on an
		// otherwise-unchanged page -- not caught by retrying, so the threshold
		// needs to absorb it). Real layout regressions (e.g. misaligned cards)
		// tend to produce much larger diffs and still get caught; alignment.spec.ts
		// covers the specific class of bug that first motivated the 2% threshold.
		toHaveScreenshot: { maxDiffPixelRatio: 0.05 },
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
