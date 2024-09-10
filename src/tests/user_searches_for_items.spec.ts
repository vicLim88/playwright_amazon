import { test, expect} from '@playwright/test';
import { PageMain } from '../main/pages/page_main'
import { PageResult } from '../main/pages/page_result'
import { PageCart } from '../main/pages/page_cart';

// test("Should see the results for a list of smartwatches", async ({page}, testInfo) => {
//     const main_page = new PageMain(page);

//     await main_page.go_to_page_main();
//     await main_page.search_for_item("smartwatch");

//     await testInfo.attach("amazon",{
//         body: await page.screenshot(),
//         contentType: "image/png"
//     })
// });


// test("Should see results only contain Samsung Brand", async ({page}, testInfo) => {
//     const main_page = new PageMain(page);
//     const result_page = new PageResult(page);

//     await main_page.go_to_page_main();
//     await main_page.search_for_item("smartwatch");

//     await result_page.refine_search_by_brand("SAMSUNG");

//     await result_page.sort_by("Price: High to Low");

//     await testInfo.attach("amazon",{
//         body: await page.screenshot(),
//         contentType: "image/png"
//     })
// });

// test("Should see 1 item being added to cart", async ({page}, testInfo) => {
//     const main_page = new PageMain(page);
//     const result_page = new PageResult(page);

//     // Given
//     await main_page.go_to_page_main();
//     await main_page.search_for_item("smartwatch");

//     await result_page.refine_search_by_brand("SAMSUNG");
//     await result_page.sort_by("Price: High to Low");

//     // When
//     await result_page.add_item_to_cart("Samsung Galaxy Watch5 Pro 45mm Bluetooth Smart Watch, Golf Edition, Black Titanium (UK version)");

//     // Then
//     await result_page.assert_cart_count("1");

//     // Finally
//     await testInfo.attach("amazon",{
//         body: await page.screenshot(),
//         contentType: "image/png"
//     })
// });


// test("Should see the selected item being present at cart page", async ({page}, testInfo) => {
//     const main_page = new PageMain(page);
//     const result_page = new PageResult(page);
//     const cart_page = new PageCart(page);

//     // Given
//     await main_page.go_to_page_main();
//     await main_page.search_for_item("smartwatch");

//     await result_page.refine_search_by_brand("SAMSUNG");
//     await result_page.sort_by("Price: High to Low");

//     // When
//     await result_page.add_item_to_cart("Samsung Galaxy Watch5 Pro 45mm Bluetooth Smart Watch, Golf Edition, Black Titanium (UK version)");
//     await result_page.assert_cart_count("1");
//     await result_page.view_cart();

//     // Then
//     await cart_page.assert_item_is_present("Samsung Galaxy Watch5 Pro 45mm Bluetooth Smart Watch, Golf Edition, Black Titanium (UK version)");

//     // Finally
//     await testInfo.attach("amazon",{
//         body: await page.screenshot(),
//         contentType: "image/png"
//     })
// });

test("Should see the selected item being deleted at cart page", async ({page}, testInfo) => {
    const main_page = new PageMain(page);
    const result_page = new PageResult(page);
    const cart_page = new PageCart(page);

    const data_item_01: string = "Samsung Galaxy Watch5 Pro 45mm Bluetooth Smart Watch, Golf Edition, Black Titanium (UK version)";

    // Given
    const navigate_to_amazon = await test.step("Navigate to Amazon", async ()=>{
        await main_page.go_to_page_main();
    });

    const select_item_to_cart = await test.step("Add '" + data_item_01 + "' to cart", async ()=>{
        await main_page.search_for_item("smartwatch");

        await result_page.refine_search_by_brand("SAMSUNG");
        await result_page.sort_by("Price: High to Low");

        await result_page.add_item_to_cart(data_item_01);
    });

    const check_item_at_cart = await test.step("Check item at cart", async ()=>{
        await result_page.view_cart();
    })

    // When
    await cart_page.action_delete_item(data_item_01);

    // Then
    await cart_page.assert_item_is_deleted(data_item_01);

    // Finally
    await testInfo.attach("amazon",{
        body: await page.screenshot(),
        contentType: "image/png"
    })
});