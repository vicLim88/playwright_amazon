import { expect, type Locator, type Page} from '@playwright/test';
import { stringify, parse } from 'ini';
import { readFileSync } from 'fs';

export class PageCart {
    readonly page: Page;
    readonly locator: Locator;
    readonly locators: {[key:string]:string};
    readonly urls: {[key:string]:string};

    constructor(page: Page){
        this.page = page;
        this.locators = parse(readFileSync("./src/resources/locators/PageCart.ini", "utf-8")).PageCart;
        this.urls = parse(readFileSync("./src/resources/urls/url_amazon.ini", "utf-8")).Amazon;
    }

    private screen_shot(file_name: string){
        this.page.screenshot({path:`screenshots/${file_name}.png`})
    }

    async action_delete_item(item_name: string){
        const locator_item_name_delete = this.locators["cart_item_action_delete"].replace("{placeholder}", item_name);
        console.log("Action Delete : " + locator_item_name_delete);
        await this.page.click(locator_item_name_delete);
    }

    async assert_item_is_present(item_name: string){
        const locator_item_name = this.locators["cart_item_name"].replace("{placeholder}", item_name);
        await expect(this.page.locator(locator_item_name)).toContainText(item_name);
        await this.screen_shot("Item_at_shopping_cart_added");
    }

    async assert_item_is_deleted(item_name: string){
        const locator_item_name = this.locators["cart_item_name"].replace("{placeholder}", item_name);
        const locator_item_removed_msg = this.locators["cart_item_action_delete_message"]
        await expect(this.page.locator(locator_item_name)).not.toBeVisible();
        await expect(this.page.locator(locator_item_removed_msg)).toBeVisible();
        await this.screen_shot("Item_at_shopping_cart_deleted");
    }
}