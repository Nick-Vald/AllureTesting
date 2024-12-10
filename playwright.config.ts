import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import 'dotenv/config'; // Ensures we get process.env from <playwright_root>/.env

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 4 * 60 * 1000,
  expect : {timeout: 10 * 1000},
  fullyParallel: true,
  reporter: [
    ['html', { open: 'never'}],
    ['blob'],
    ["allure-playwright"]
  ],


  use: {
    headless: true,
    actionTimeout: 0 * 1000, //Would like to get this to a reasonable value such as 10s
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: {
          mode: 'retain-on-failure',
          size:  { width: 1280, height: 720 }
    },
    ignoreHTTPSErrors : true,
    launchOptions:{
      slowMo: process.env.sloMoTest && !isNaN(Number(process.env.sloMoTest)) ? Number(process.env.sloMoTest) : 0,
    }
    // proxy: {
    //   server: 'http://localhost:8888',
    // }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Dimensions from the previously used for removed function 'resizeWindowToStandardSize'. Update if required.
        viewport: {
          width: 1800,
          height: 900 
        },
        // ignoreHTTPSErrors: true,

        //
        // NOTE: defining 'launchOptions' here will override the global 'launchOptions' above, even if EMPTY!
        //
        // launchOptions: {
          //  args: ['--start-maximized', '--auto-open-devtools-for-tabs'] // Add Chrome args as needed
        // },
        contextOptions: {
          // Define below at the top of the file to get a unique name for each run
          //
          // import { getPathSafeStringBasedOnDateTime } from '@utils/common';
          // const currTime = getPathSafeStringBasedOnDateTime();

          // recordHar: { path: `./harfile-chrome-${currTime}.zip` } // Generate har file for run - Uncomment locally as needed
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        contextOptions: { 
          // recordHar: { path: './harfile-firefox.zip' } // Generate har file for run - Uncomment locally as needed
        },
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        deviceScaleFactor: 1, // Defaults to 2, must be 1, otherwise scaled out of window
      },
    },  
  ],
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: './test-results/',
};
export default config;