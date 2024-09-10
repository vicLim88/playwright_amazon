import { test, expect} from '@playwright/test';
import { PageMain } from '../../main/pages/page_main'
import { PageResult } from '../../main/pages/page_result'
import { PageCart } from '../../main/pages/page_cart';

test("Should see the results for a list of smartwatches", async ({page}, testInfo) => {
    const main_page = new PageMain(page);

    await main_page.go_to_page_main();
    await main_page.search_for_item("smartwatch");

    await testInfo.attach("amazon",{
        body: await page.screenshot(),
        contentType: "image/png"
    })
});