import { test, expect} from '@playwright/test';
import { PageMain } from '../main/pages/page_main'
import { PageResult } from '../main/pages/page_result'

// test("Should see the results for a list of smartwatches", async ({page}, testInfo) => {
//     const main_page = new PageMain(page);

//     await main_page.go_to_page_main();
//     await main_page.search_for_item("smartwatch");

//     await testInfo.attach("amazon",{
//         body: await page.screenshot(),
//         contentType: "image/png"
//     })
// });


test("Should see results only contain Samsung Brand", async ({page}, testInfo) => {
    const main_page = new PageMain(page);
    const result_page = new PageResult(page);

    await main_page.go_to_page_main();
    await main_page.search_for_item("smartwatch");

    await result_page.refine_search_by_brand("SAMSUNG");

    await result_page.sort_by("Price: High to Low");

    await testInfo.attach("amazon",{
        body: await page.screenshot(),
        contentType: "image/png"
    })
});