/**
 * Source: templates/components/category/shop-by-price.html (13 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCategory} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

type Hint = ThemeContextHint<ThemePageCategory>;

export default $asPartial<{theme_settings: Hint['theme_settings']; category: Hint['category']}>(({theme_settings, category}) => (
    /* html L1: {{#if theme_settings.shop_by_price_visibility}} */
    <$If
        query={[theme_settings.shop_by_price_visibility]}
        $then={() => (
            /* html L2: <div class="sidebarBlock"> */
            <div className="sidebarBlock">
                {/* html L3: <h2 class="sidebarBlock-heading heading-price" data-shop-by-price>{{lang 'category.shop_by_price'}}</h2> */}
                <h2 className="sidebarBlock-heading heading-price" data-shop-by-price="">
                    {/* html L3: {{lang 'category.shop_by_price'}} */}
                    <$Lang translationKey={$string('category.shop_by_price')}/>
                </h2>

                {/* html L5: {{> components/faceted-search/range-form shop_by_price=theme_settings.shop_by_price_visibility}} */}
                <$Partial name="components/faceted-search/range-form" hash={{shop_by_price: theme_settings.shop_by_price_visibility}}/>

                {/* html L7: <div class="reset-filters"> */}
                <div className="reset-filters">
                    {/* html L8: <a href="{{category.url}}" class="navList-action reset-btn">{{lang 'category.reset'}}</a> */}
                    <a href={category.url} className="navList-action reset-btn">
                        {/* html L8: {{lang 'category.reset'}} */}
                        <$Lang translationKey={$string('category.reset')}/>
                    </a>
                    {/* html L9: <span class="reset-message aria-description--hidden">{{lang 'category.filter_reset_announcement'}}</span> */}
                    <span className="reset-message aria-description--hidden">
                        {/* html L9: {{lang 'category.filter_reset_announcement'}} */}
                        <$Lang translationKey={$string('category.filter_reset_announcement')}/>
                    </span>
                </div>
            </div>
        )}
    />
));
