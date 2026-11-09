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
    <$If
        query={[reviews.total]}
        $then={() => (
            <section className="toggle productReviews" id="product-reviews" data-product-reviews="">
                <h4 className="toggle-title">
                    {$lang($string('products.reviews.header'), {total: reviews.total})}
                    <$If
                        query={[theme_settings.show_product_reviews]}
                        $then={() => (
                            <a className="toggleLink is-open" data-collapsible="" href="#productReviews-content">
                                <span className="toggleLink-text toggleLink-text--on">{$lang($string('products.reviews.hide'))}</span>
                                <span className="toggleLink-text toggleLink-text--off">{$lang($string('products.reviews.show'))}</span>
                            </a>
                        )}
                    />
                </h4>
                <div className="toggle-content is-open" id="productReviews-content" aria-hidden="false">
                    <ul className="productReviews-list" id="productReviews-list">
                        <$Each
                            list={reviews.list}
                            $then={(review) => (
                                <li className="productReview">
                                    <article>
                                        <header>
                                            <span className="productReview-rating rating--small">
                                                <Ratings rating={review.rating}/>
                                                <span className="productReview-ratingNumber">{review.rating}</span>
                                            </span>
                                            <h5 className="productReview-title">{$unescaped($sanitize(review.title))}</h5>
                                            <$If
                                                query={[review.name]}
                                                $then={() => (
                                                    <p className="productReview-author">
                                                        {$_lang($string('products.reviews.post_on_by'), {date: review.date, name: $sanitize(review.name)})}
                                                    </p>
                                                )}
                                                $else={() => (
                                                    <p className="productReview-author">
                                                        {$lang($string('products.reviews.post_on_by'), {date: review.date, name: $lang($string('products.reviews.anonymous_poster'))})}
                                                    </p>
                                                )}
                                            />
                                        </header>
                                        <p className="productReview-body">{$unescaped($sanitize(review.text))}</p>
                                    </article>
                                </li>
                            )}
                        />
                    </ul>
                    <$Partial name="components/common/paginator" context={pagination.reviews} hash={{reload: $boolean(true)}}/>
                </div>
            </section>
        )}
    />
));
