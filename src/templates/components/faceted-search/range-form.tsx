/**
 * Source: templates/components/faceted-search/range-form.html (48 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
        /* html L1: <form id="facet-range-form" class="form" method="get" data-faceted-search-range novalidate> */
        <form id="facet-range-form" className="form" method="get" data-faceted-search-range="" noValidate>
            {/* html L2: <input type="hidden" name="search_query" value="{{search_query}}"> */}
            <input type="hidden" name="search_query" value={range.search_query}/>
            {/* html L3: {{#if this.sort}} */}
            <$If query={[range.sort]} $then={() => /* html L4: <input type="hidden" name="sort" value="{{this.sort}}"> */ <input type="hidden" name="sort" value={range.sort}/>}/>
            {/* html L6: <fieldset class="form-fieldset"> */}
            <fieldset className="form-fieldset">
                {/* html L7: <div class="form-minMaxRow"> */}
                <div className="form-minMaxRow">
                    {/* html L8: <div class="form-field"> */}
                    <div className="form-field">
                        {/* html L9-19:
                           <input
                               name="{{#if shop_by_price}}price_min{{else}}min_price{{/if}}"
                               placeholder="{{lang 'search.faceted.range.min-placeholder'}}"
                               min="0"
                               class="form-input form-input--small"
                               required
                               type="number"
                               value="{{min_price}}"
                               aria-label="{{lang 'search.faceted.range.min-placeholder'}}"
                               aria-describedby="min_price_description"
                           />
                        */}
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
                        {/* html L20: <span id="min_price_description" class="aria-description--hidden">{{lang 'search.faceted.range.min-description'}}</span> */}
                        <span id="min_price_description" className="aria-description--hidden">
                            {/* html L20: {{lang 'search.faceted.range.min-description'}} */}
                            <$Lang translationKey={$string('search.faceted.range.min-description')}/>
                        </span>
                    </div>

                    {/* html L23: <div class="form-field"> */}
                    <div className="form-field">
                        {/* html L24-34:
                           <input
                               name="{{#if shop_by_price}}price_max{{else}}max_price{{/if}}"
                               placeholder="{{lang 'search.faceted.range.max-placeholder'}}"
                               min="0"
                               class="form-input form-input--small"
                               required
                               type="number"
                               value="{{max_price}}"
                               aria-label="{{lang 'search.faceted.range.max-placeholder'}}"
                               aria-describedby="max_price_description"
                           />
                        */}
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
                        {/* html L35: <span id="max_price_description" class="aria-description--hidden">{{lang 'search.faceted.range.max-description'}}</span> */}
                        <span id="max_price_description" className="aria-description--hidden">
                            {/* html L35: {{lang 'search.faceted.range.max-description'}} */}
                            <$Lang translationKey={$string('search.faceted.range.max-description')}/>
                        </span>
                    </div>

                    {/* html L38: <div class="form-field"> */}
                    <div className="form-field">
                        {/* html L39: <button class="button button--small" type="submit"> */}
                        <button className="button button--small" type="submit">
                            {/* html L40: {{lang 'search.faceted.range.update'}} */}
                            <$Lang translationKey={$string('search.faceted.range.update')}/>
                        </button>
                    </div>
                </div>

                {/* html L45: <div class="form-inlineMessage" aria-live="polite" role="alert"></div> */}
                <div className="form-inlineMessage" aria-live="polite" role="alert"></div>
            </fieldset>
        </form>
    );
});
