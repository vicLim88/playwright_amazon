import { expect, type Locator, type Page} from '@playwright/test';
import { stringify, parse } from 'ini';
import { readFileSync } from 'fs';

export class PageResult {
    readonly page: Page;
    readonly locator: Locator;
    readonly locators: {[key:string]:string};
    readonly urls: {[key:string]:string};

    constructor(page: Page){
        this.page = page;
        this.locators = parse(readFileSync("./src/resources/locators/PageResult.ini", "utf-8")).PageResult;
        this.urls = parse(readFileSync("./src/resources/urls/url_amazon.ini", "utf-8")).Amazon;
    }

    private get_url(element_key: string): string {
        const url = this.urls[element_key];
        if (!url) throw new Error(`URL not found in url_amazon.ini`);
        return url;
    }

    private screen_shot(file_name: string){
        this.page.screenshot({path:`screenshots/${file_name}.png`})
    }

    async sort_by(sort_type: string){
        const sort_by = this.locators["sort_by"];
        const sort_by_item = this.locators["sort_by_item"].replace("{drop_down_sort_by}", sort_type);

        await this.page.click(sort_by);
        await this.page.click(sort_by_item);
        await this.screen_shot("result_page_sorted_by");
    }

    async refine_search_by_brand(brand_of_choice: string){
        const checkbox_brand = this.locators["section_refinement_brands"].replace("{checkbox_brand}", brand_of_choice);

        await this.page.click(checkbox_brand);
        await this.screen_shot("result_page_filtered_by_brand");
    }
}