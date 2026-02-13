// @ts-check
const { defineConfig } = require('@playwright/test')

/**
 * @see https://playwright.dev/docs/test-configuration
 */

    module.exports = defineConfig({
    testDir: './tests/',
    /* Maximum time one test can run for. */
    timeout: 30 *1000,
    expect : {
        timeout: 5000,
    },
    reporter : 'html',

    use: {

        browserName : 'chromium',
        headless : true,
        screenshot : 'on',
        trace: 'retain-on-failure', //off,on (how to get traces for on and off test cases
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    },


});
