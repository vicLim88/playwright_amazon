import { test, expect} from '@playwright/test';
import { PageMain } from '../main/pages/page_main'

test("Should see the result", async ({page}, testInfo) => {
    const main_page = new PageMain(page);

    await main_page.go_to_page_main();
    await main_page.search_for_item("iWatch");

    await testInfo.attach("amazon",{
        body: await page.screenshot(),
        contentType: "image/png"
    })
});