"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$$themeSettings, $And, $boolean, $cdn, $Each, $ellipsis, $getImage, $If, $json, $length, $number, $pointer, $raw, $sanitize, $string, $unescaped, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface Review {
    name: string;
    date: string;
    text: string;
    title: string;
    rating: number;
}

interface Product {
    title: string;
    sku: string;
    mpn: string;
    gtin: string;
    url: string;
    condition: string;
    description: string;
    rating: number;
    num_reviews: number;
    brand: {url: string; name: string};
    main_image: {data: string};
    reviews: {list: Review[]};
    price: {
        price_range: {min: {with_tax: {value: number}; without_tax: {value: number}}; max: {with_tax: {value: number}; without_tax: {value: number}}};
        with_tax: {value: number};
        without_tax: {value: number};
    };
}

/* Quoted JSON text goes through `$raw`: a plain string body would have its `"` escaped. */
export default (_props: PartialProps) => {
    const settings = $$themeSettings();
    const product = $pointer<Product>("product");
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: `
{
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": ${$raw("{{{JSONstringify product.title}}}")},
    ${$If({test: product.sku, $then: () => `${$raw('"sku": "')}${product.sku}${$raw('",')}`})}
    ${$If({test: product.mpn, $then: () => `${$raw('"mpn": "')}${product.mpn}${$raw('",')}`})}
    ${$If({test: product.gtin, $then: () => `${$raw('"gtin')}${$length(product.gtin)}${$raw('": "')}${product.gtin}${$raw('",')}`})}
    "url" : "${product.url}",
    ${$If({
        test: product.brand,
        $then: () => `${$raw('\n    "brand": {\n        "@type": "Brand",\n        "url": "')}${product.brand.url}${$raw('",\n        "name": ')}${$raw("{{{JSONstringify product.brand.name}}}")}${$raw("\n    },")}`,
    })}
    "description": ${$unescaped($json($ellipsis($sanitize(product.description), $number(4000))))},
    "image": "${$getImage(product.main_image, $string("zoom_size"), $cdn(settings.default_image_product))}",
    ${$And({
        a: $pointer("settings.show_product_reviews"),
        b: $pointer("product.reviews.list.length"),
        $then: () => `${$raw('\n    "aggregateRating": {\n        "@type": "AggregateRating",\n        "ratingValue": "')}${product.rating}${$raw('",\n        "reviewCount": "')}${product.num_reviews}${$raw('"\n    },\n    "review": [\n        ')}${$Each({
            list: $pointer<Review[]>("product.reviews.list"),
            $then: (review, loop) => `${$raw('\n            {\n                "@type": "Review",\n                "author": {\n                    "@type": "Person",\n                    "name": ')}${$If({test: review.name, $then: () => $raw("{{{JSONstringify name}}}"), $else: () => $raw("{{{JSONstringify (lang 'products.reviews.anonymous_poster')}}}")})}${$raw('\n                },\n                "datePublished": "')}${review.date}${$raw('",\n                "reviewBody": ')}${$raw("{{{JSONstringify text}}}")}${$raw(',\n                "name": ')}${$raw("{{{JSONstringify title}}}")}${$raw(',\n                "reviewRating": {\n                    "@type": "Rating",\n                    "bestRating": "5",\n                    "ratingValue": "')}${review.rating}${$raw('",\n                    "worstRating": "1"\n                }\n            }')}${$Unless({test: loop["@last"], $then: () => $raw(",")})}\n        `,
        })}${$raw("\n    ],")}`,
    })}
    "offers": {
        "@type": "Offer",
        "priceCurrency": "${$pointer("currency_selector.active_currency_code")}",
        ${$If({
            test: product.price.price_range,
            $then: () => `${$raw('\n        "minPrice": "')}${$If({
                test: product.price.price_range.min.with_tax,
                $then: () => `${product.price.price_range.min.with_tax.value}`,
                $else: () => `${product.price.price_range.min.without_tax.value}`,
            })}${$raw('",\n        "maxPrice": "')}${$If({
                test: product.price.price_range.max.with_tax,
                $then: () => `${product.price.price_range.max.with_tax.value}`,
                $else: () => `${product.price.price_range.max.without_tax.value}`,
            })}${$raw('",')}`,
            $else: () => `${$raw('\n        "price": "')}${$If({
                test: product.price.with_tax,
                $then: () => `${product.price.with_tax.value}`,
                $else: () => `${product.price.without_tax.value}`,
            })}${$raw('",')}`,
        })}
        "itemCondition" : "https://schema.org/${$If({test: product.condition, $then: () => `${product.condition}`, $else: () => "New"})}Condition",
        "availability" : "https://schema.org/${$If({
            test: $pointer("product.pre_order"),
            $then: () => "PreOrder",
            $elseThen: [
                {test: $pointer("product.out_of_stock"), $then: () => "OutOfStock"},
                {test: $pointer("product.can_purchase"), operator: $string("==="), rvalue: $boolean(false), $then: () => "OutOfStock"},
            ],
            $else: () => "InStock",
        })}",
        "url" : "${product.url}",
        "priceValidUntil": "${$raw("{{moment (moment add='31536000000') 'YYYY-MM-DD' }}")}"
    }
}
`,
            }}
        />
    );
};
