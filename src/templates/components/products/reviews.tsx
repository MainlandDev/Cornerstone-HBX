/**
 * Source: templates/components/products/reviews.html (46 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Each, $Partial, $boolean, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$_lang, $lang, $sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Ratings from '@/templates/components/products/ratings';
import type {ProductDetailHint, ProductPageHint, ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    reviews: ProductDetailHint['reviews'];
    theme_settings: ThemeSettingsHint;
    /** Passed by the callers; the review list itself does not read the product or the URLs. */
    product: ProductDetailHint;
    urls: ProductPageHint['urls'];
    /** Object branch of the lib's `ThemeEmptyList | ThemePagination` union: the array branch has no `reviews`. */
    pagination: Extract<ProductPageHint['pagination'], {reviews?: unknown}>;
}>(({reviews, theme_settings, pagination}) => (
    /* html L1: {{#if reviews.total}} */
    <$If
        query={[reviews.total]}
        $then={() => (
            /* html L2: <section class="toggle productReviews" id="product-reviews" data-product-reviews> */
            <section className="toggle productReviews" id="product-reviews" data-product-reviews="">
                {/* html L3: <h4 class="toggle-title"> */}
                <h4 className="toggle-title">
                    {/* html L4: {{lang 'products.reviews.header' total=reviews.total}} */}
                    {$lang($string('products.reviews.header'), {total: reviews.total})}
                    {/* html L5: {{#if theme_settings.show_product_reviews}} */}
                    <$If
                        query={[theme_settings.show_product_reviews]}
                        $then={() => (
                            /* html L6: <a class="toggleLink is-open" data-collapsible href="#productReviews-content"> */
                            <a className="toggleLink is-open" data-collapsible="" href="#productReviews-content">
                                {/* html L7: <span class="toggleLink-text toggleLink-text--on"> */}
                                <span className="toggleLink-text toggleLink-text--on">{/* html L8: {{lang 'products.reviews.hide'}} */}{$lang($string('products.reviews.hide'))}</span>
                                {/* html L10: <span class="toggleLink-text toggleLink-text--off"> */}
                                <span className="toggleLink-text toggleLink-text--off">{/* html L11: {{lang 'products.reviews.show'}} */}{$lang($string('products.reviews.show'))}</span>
                            </a>
                        )}
                    />
                </h4>
                {/* html L16: <div class="toggle-content is-open" id="productReviews-content" aria-hidden="false"> */}
                <div className="toggle-content is-open" id="productReviews-content" aria-hidden="false">
                    {/* html L17: <ul class="productReviews-list" id="productReviews-list"> */}
                    <ul className="productReviews-list" id="productReviews-list">
                        {/* html L18: {{#each reviews.list}} */}
                        <$Each
                            list={reviews.list}
                            $then={(review) => (
                                /* html L19: <li class="productReview"> */
                                <li className="productReview">
                                    {/* html L20: <article> */}
                                    <article>
                                        {/* html L21: <header> */}
                                        <header>
                                            {/* html L22: <span class="productReview-rating rating--small"> */}
                                            <span className="productReview-rating rating--small">
                                                {/* html L23: {{> components/products/ratings rating=rating}} */}
                                                <Ratings rating={review.rating}/>
                                                {/* html L24: <span class="productReview-ratingNumber">{{ rating }}</span> */}
                                                <span className="productReview-ratingNumber">{/* html L24: {{ rating }} */}{review.rating}</span>
                                            </span>
                                            {/* html L26: <h5 class="productReview-title">{{{ sanitize title }}}</h5> */}
                                            <h5 className="productReview-title">{/* html L26: {{{ sanitize title }}} */}{$unescaped($sanitize(review.title))}</h5>
                                            {/* html L27: {{#if name}} */}
                                            <$If
                                                query={[review.name]}
                                                $then={() => (
                                                    /* html L28: <p class="productReview-author"> */
                                                    <p className="productReview-author">
                                                        {/* html L29: {{{lang 'products.reviews.post_on_by' date=date name=(sanitize name) }}} */}
                                                        {$_lang($string('products.reviews.post_on_by'), {date: review.date, name: $sanitize(review.name)})}
                                                    </p>
                                                )}
                                                $else={() => (
                                                    /* html L31: {{else}}
                                                                                                              html L32: <p class="productReview-author">
                                                    */
                                                    <p className="productReview-author">
                                                        {/* html L33: {{lang 'products.reviews.post_on_by' date=date name=(lang 'products.reviews.anonymous_poster')}} */}
                                                        {$lang($string('products.reviews.post_on_by'), {date: review.date, name: $lang($string('products.reviews.anonymous_poster'))})}
                                                    </p>
                                                )}
                                            />
                                        </header>
                                        {/* html L37: <p class="productReview-body">{{{ sanitize text }}}</p> */}
                                        <p className="productReview-body">{/* html L37: {{{ sanitize text }}} */}{$unescaped($sanitize(review.text))}</p>
                                    </article>
                                </li>
                            )}
                        />
                    </ul>
                    {/* html L42: {{> components/common/paginator pagination.reviews reload=true}} */}
                    <$Partial name="components/common/paginator" context={pagination.reviews} hash={{reload: $boolean(true)}}/>
                </div>
            </section>
        )}
    />
));
