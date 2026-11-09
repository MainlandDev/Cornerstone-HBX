import {$if, $If, $string, $this, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {RangeFormHint} from '@/context-misc';

/**
 * `shop_by_price` arrives as a hash argument from `category/shop-by-price`; the range facet calls it with no arguments, so it is absent there.
 * The remaining values are read from the ambient context (the facet, or the category page).
 */
export default $asPartial<{shop_by_price: HandlebarsInlineValueToken<boolean>}>(({shop_by_price}) => {
    const range = $this<RangeFormHint>();

    return (
        <form id="facet-range-form" className="form" method="get" data-faceted-search-range="" noValidate>
            <input type="hidden" name="search_query" value={range.search_query}/>
            <$If query={[range.sort]} $then={() => <input type="hidden" name="sort" value={range.sort}/>}/>
            <fieldset className="form-fieldset">
                <div className="form-minMaxRow">
                    <div className="form-field">
                        <input
                            name={`${$if(shop_by_price).then(() => $$raw('price_min')).else(() => $$raw('min_price'))}`}
                            placeholder={$lang($string('search.faceted.range.min-placeholder'))}
                            min="0"
                            className="form-input form-input--small"
                            required
                            type="number"
                            value={range.min_price}
                            aria-label={$lang($string('search.faceted.range.min-placeholder'))}
                            aria-describedby="min_price_description"
                        />
                        <span id="min_price_description" className="aria-description--hidden">
                            <$Lang translationKey={$string('search.faceted.range.min-description')}/>
                        </span>
                    </div>

                    <div className="form-field">
                        <input
                            name={`${$if(shop_by_price).then(() => $$raw('price_max')).else(() => $$raw('max_price'))}`}
                            placeholder={$lang($string('search.faceted.range.max-placeholder'))}
                            min="0"
                            className="form-input form-input--small"
                            required
                            type="number"
                            value={range.max_price}
                            aria-label={$lang($string('search.faceted.range.max-placeholder'))}
                            aria-describedby="max_price_description"
                        />
                        <span id="max_price_description" className="aria-description--hidden">
                            <$Lang translationKey={$string('search.faceted.range.max-description')}/>
                        </span>
                    </div>

                    <div className="form-field">
                        <button className="button button--small" type="submit">
                            <$Lang translationKey={$string('search.faceted.range.update')}/>
                        </button>
                    </div>
                </div>

                <div className="form-inlineMessage" aria-live="polite" role="alert"></div>
            </fieldset>
        </form>
    );
});
