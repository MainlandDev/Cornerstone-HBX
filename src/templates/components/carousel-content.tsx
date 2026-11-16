"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$add, $If, $lang, $number, $pointer, $raw, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <div className={`heroCarousel-content${$raw("{{#and (if heading '==' false) (if text '==' false)}}")} heroCarousel-content--empty${$raw("{{/and}}")}`}>
        <$If
            test={$pointer("heading")}
            $then={() => <p className="heroCarousel-title">{$unescaped($pointer("heading"))}</p>}
        />
        <$If
            test={$pointer("text")}
            $then={() => <p className="heroCarousel-description">{$unescaped($pointer("text"))}</p>}
        />
        <$If
            test={$pointer("button_text")}
            $then={() => (
                <a
                    href={$pointer("url")}
                    aria-label={`${$If({
                        test: $pointer("this.alt_text.length"),
                        operator: $string("!="),
                        rvalue: $number(0),
                        $then: () => `${$pointer("alt_text")}`,
                        $else: () => `${$lang($string("carousel.slide_number"), {slide_number: $add($pointer<number>("@index"), $number(1))})}`,
                    })}, ${$pointer("button_text")}`}
                    className="heroCarousel-action button button--primary button--large"
                >
                    {$unescaped($pointer("button_text"))}
                </a>
            )}
        />
    </div>
);
