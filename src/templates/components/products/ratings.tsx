import {$For, $If, $lang, $number, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

const star = () => (
    <svg>
        <use href="#icon-star" />
    </svg>
);

export default () => (
    <span
        role="img"
        dangerouslyInlineAttributes={{
            attributes: `${$If({
                test: $pointer("rating_target"),
                $then: () =>
                    `${$raw("aria-label=\"")}${$lang($string("products.reviews.rating_aria_label"), {
                        rating_target: $pointer("rating_target"),
                        current_rating: $pointer("rating"),
                        max_rating: $number(5),
                    })}${$raw("\"")}`,
                $else: () =>
                    `${$raw("aria-label=\"")}${$lang($string("products.reviews.rating_aria_label"), {
                        rating_target: $string("Product"),
                        current_rating: $pointer("rating"),
                        max_rating: $number(5),
                    })}${$raw("\"")}`,
            })}`,
        }}
    >
        <$For
            from={$number(1)}
            to={$number(5)}
            $then={() => (
                <>
                    {$raw("{{#if ../this.rating '>=' $index}}")}
                    <span className="icon icon--ratingFull">{star()}</span>
                    {$raw("{{else}}")}
                    <span className="icon icon--ratingEmpty">{star()}</span>
                    {$raw("{{/if}}")}
                </>
            )}
        />
    </span>
);
