import {$add, $Each, $number, $partial, $pointer, $raw, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <section
        className="productCarousel"
        data-list-name={$pointer("list")}
        dangerouslyInlineAttributes={{
            attributes: `data-slick='{ "infinite": false, "mobileFirst": true, "slidesToShow": 2, "slidesToScroll": 2, "slide": "[data-product-slide]", "responsive": [ { "breakpoint": 800, "settings": { "slidesToShow": ${$pointer("columns")}, "slidesToScroll": ${$pointer("columns")} } }, { "breakpoint": 550, "settings": { "slidesToShow": 3, "slidesToScroll": 3 } } ] }'`,
        }}
    >
        <$Each
            list={$pointer<unknown[]>("products")}
            $then={() => (
                <div data-product-slide={""} className="productCarousel-slide">
                    {place(
                        $partial("components/products/card", {
                            settings: $pointer("../settings"),
                            theme_settings: $pointer("../theme_settings"),
                            customer: $pointer("../customer"),
                            event: $string("list"),
                            position: $add($pointer<number>("@index"), $number(1)),
                        }),
                    )}
                </div>
            )}
        />
        {$raw("{{#if products.length '>' 1}}")}
        {place($partial("components/carousel-content-announcement"))}
        {$raw("{{/if}}")}
    </section>
);
