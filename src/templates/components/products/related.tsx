/**
 * Source: templates/components/products/related.html (9 lines).
 *
 * The original iterates its own context (`{{#each this}}`, the related-products array) and calls the card with
 * `../settings`, `../theme_settings` and `position=(add @index 1)`. A named prop cannot be the root of the context, so the
 * whole body is the original text, verbatim, in a raw fragment (DEVIATIONS.md section 8.2).
 */
import {$parseHandlebarsDangerously} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';

export default $asPartial(() => (
    <>
        {/* html L1-L8: the whole template */}
        {$parseHandlebarsDangerously(`<h4>{{lang 'products.related_products' }}</h4>
<ul class="product-list" data-list-name="Related Products">
    {{#each this}}
    <li class="product-card">
            {{>components/products/card settings=../settings theme_settings=../theme_settings event="list" position=(add @index 1)}}
    </li>
    {{/each}}
</ul>`)}
    </>
));
