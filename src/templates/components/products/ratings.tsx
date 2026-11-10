/**
 * Source: templates/components/products/ratings.html (24 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$number, $string, $if} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$for, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ProductCardHint} from '@/context-products';

export default $asPartial<{
    rating_target?: ProductCardHint['name'];
    rating: ProductCardHint['rating'];
}>(({rating_target, rating}) => (
    /* html L1-7:
       <span role="img"
           {{#if rating_target}}
             aria-label="{{lang 'products.reviews.rating_aria_label' rating_target=rating_target current_rating=rating max_rating=5}}"
           {{else}}
             aria-label="{{lang 'products.reviews.rating_aria_label' rating_target='Product' current_rating=rating max_rating=5}}"
           {{/if}}
       >
    */
    <span
        role="img"
        $$={$if(rating_target)
            .then(() => [
                $$raw('aria-label="'),
                $lang($string('products.reviews.rating_aria_label'), {rating_target, current_rating: rating, max_rating: $number(5)}),
                $$raw('"'),
            ])
            .else(() => [
                $$raw('aria-label="'),
                $lang($string('products.reviews.rating_aria_label'), {rating_target: $string('Product'), current_rating: rating, max_rating: $number(5)}),
                $$raw('"'),
            ])}
    >
        {$for($number(1), $number(5)).then((ctx) =>
            $if(rating, '>=', ctx.$index)
                .then(() => $$raw('<span class="icon icon--ratingFull"><svg><use href="#icon-star" /></svg></span>'))
                .else(() => $$raw('<span class="icon icon--ratingEmpty"><svg><use href="#icon-star" /></svg></span>')),
        )}
    </span>
));
