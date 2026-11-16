import Paginator from "../common/paginator.tsx";
import {$boolean, $Each, $If, $Lang, $lang, $partial, $pointer, $sanitize, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface Review {
    rating: number;
    title: string;
    name: string;
    date: string;
    text: string;
}

export default () => {
    return (
        <$If
            test={$pointer("reviews.total")}
            $then={() => (
                <section className="toggle productReviews" id="product-reviews" data-product-reviews={""}>
                    <h4 className="toggle-title">
                        <$Lang keyName={$string("products.reviews.header")} total={$pointer("reviews.total")} />
                        <$If
                            test={$pointer("theme_settings.show_product_reviews")}
                            $then={() => (
                                <a className="toggleLink is-open" data-collapsible={""} href="#productReviews-content">
                                    <span className="toggleLink-text toggleLink-text--on">
                                        <$Lang keyName={$string("products.reviews.hide")} />
                                    </span>
                                    <span className="toggleLink-text toggleLink-text--off">
                                        <$Lang keyName={$string("products.reviews.show")} />
                                    </span>
                                </a>
                            )}
                        />
                    </h4>
                    <div className="toggle-content is-open" id="productReviews-content" aria-hidden="false">
                        <ul className="productReviews-list" id="productReviews-list">
                            <$Each
                                list={$pointer<Review[]>("reviews.list")}
                                $then={(review) => (
                                    <li className="productReview">
                                        <article>
                                            <header>
                                                <span className="productReview-rating rating--small">
                                                    {$partial("components/products/ratings", {rating: review.rating})}
                                                    <span className="productReview-ratingNumber">{review.rating}</span>
                                                </span>
                                                <h5 className="productReview-title">{$unescaped($sanitize(review.title))}</h5>
                                                <$If
                                                    test={review.name}
                                                    $then={() => (
                                                        <p className="productReview-author">
                                                            {$unescaped(
                                                                $lang($string("products.reviews.post_on_by"), {
                                                                    date: review.date,
                                                                    name: $sanitize(review.name),
                                                                }),
                                                            )}
                                                        </p>
                                                    )}
                                                    $else={() => (
                                                        <p className="productReview-author">
                                                            <$Lang
                                                                keyName={$string("products.reviews.post_on_by")}
                                                                date={review.date}
                                                                name={$lang($string("products.reviews.anonymous_poster"))}
                                                            />
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
                        <Paginator $positionalHash={$pointer("pagination.reviews")} reload={$boolean(true)} />
                    </div>
                </section>
            )}
        />
    );
};
