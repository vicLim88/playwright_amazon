import { expect, type Locator, type Page} from '@playwright/test';
import { stringify, parse } from 'ini';
import { readFileSync } from 'fs';

export class PageMain {
    readonly page: Page;
    readonly locator: Locator;
    readonly locators: {[key:string]:string};
    readonly urls: {[key:string]:string};

    constructor(page: Page){
        this.page = page;
        this.locators = parse(readFileSync("./src/resources/locators/PageMain.ini", "utf-8")).PageMain;
        this.urls = parse(readFileSync("./src/resources/urls/url_amazon.ini", "utf-8")).Amazon;
    }

    private get_locator(element_key: string): string {
        const locator = this.locators[element_key];
        if (!locator) throw new Error(`Locator for element ${element_key} not found in PageMain.ini`);
        return locator;
    }

    private get_url(element_key: string): string {
        const url = this.urls[element_key];
        if (!url) throw new Error(`URL not found in url_amazon.ini`);
        return url;
    }

    private screen_shot(file_name: string){
        this.page.screenshot({path:`screenshots/${file_name}.png`})
    }

    async go_to_page_main(){
        await this.page.goto(this.get_url("main"));
        await this.screen_shot("main_page");
    }

    async search_for_item(item_to_search: string){
        await this.page.fill(this.get_locator("search_bar"), item_to_search);
        await this.screen_shot("main_page_filled_in_search_item")
        await this.page.click(this.get_locator("search_icon"));
        await this.screen_shot("result_page");
    }
}