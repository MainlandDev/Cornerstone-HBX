import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCategory} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

type Hint = ThemeContextHint<ThemePageCategory>;

export default $asPartial<{theme_settings: Hint['theme_settings']; category: Hint['category']}>(({theme_settings, category}) => (
    <$If
        query={[theme_settings.shop_by_price_visibility]}
        $then={() => (
            <div className="sidebarBlock">
                <h2 className="sidebarBlock-heading heading-price" data-shop-by-price="">
                    <$Lang translationKey={$string('category.shop_by_price')}/>
                </h2>

                <$Partial name="components/faceted-search/range-form" hash={{shop_by_price: theme_settings.shop_by_price_visibility}}/>

                <div className="reset-filters">
                    <a href={category.url} className="navList-action reset-btn">
                        <$Lang translationKey={$string('category.reset')}/>
                    </a>
                    <span className="reset-message aria-description--hidden">
                        <$Lang translationKey={$string('category.filter_reset_announcement')}/>
                    </span>
                </div>
            </div>
        )}
    />
));
