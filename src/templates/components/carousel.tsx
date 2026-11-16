import ResponsiveImg from "./common/responsive-img.tsx";
import {$add, $Each, $If, $Or, $lang, $number, $partial, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

interface Slide {
    url: string;
    alt_text: string;
    button_text: string;
    heading: string;
    text: string;
    stencil_image: string;
}

export default () => (
    <section
        className="heroCarousel"
        dangerouslyInlineAttributes={{
            attributes: `data-slick='{ "arrows": ${$pointer("arrows")}, "mobileFirst": true, "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": ${$pointer("carousel.swap_frequency")}, "slide": "[data-hero-slide]" }'`,
        }}
    >
        <$Each
            list={$pointer<Slide[]>("carousel.slides")}
            $then={(slide, loop) => (
                <>
                    {$raw('{{#if button_text}}<div data-hero-slide="{{@index}}">{{else}}')}
                    {$raw('<a href="')}
                    {slide.url}
                    {$raw('" data-hero-slide="{{@index}}" aria-label="')}
                    <$If
                        test={$pointer("this.alt_text.length")}
                        operator={$string("!=")}
                        rvalue={$number(0)}
                        $then={() => slide.alt_text}
                        $else={() => $lang($string("carousel.slide_number"), {slide_number: $add(loop["@index"], $number(1))})}
                    />
                    {$raw('">{{/if}}')}
                    <div
                        className={`heroCarousel-slide ${$raw("{{#if ../theme_settings.homepage_stretch_carousel_images}}stretch{{/if}}")} ${$raw("{{#if @first}}heroCarousel-slide--first{{/if}}")}`}
                    >
                        {$raw("{{#if button_text}}")}
                        {$raw('<a href="')}
                        {slide.url}
                        {$raw('" class="heroCarousel-image-wrapper">{{else}}<div class="heroCarousel-image-wrapper">{{/if}}')}
                        <$If
                            test={loop["@first"]}
                            $then={() =>
                                <ResponsiveImg image={slide.stencil_image} class={$string("heroCarousel-image")} fallback_size={$string("1280w")} lazyload={$string("disabled")} />
                            }
                            $else={() =>
                                <ResponsiveImg image={slide.stencil_image} class={$string("heroCarousel-image")} fallback_size={$string("1280w")} lazyload={$string("lazyload")} />
                            }
                        />
                        {$raw("{{#if button_text}}</a>{{else}}</div>{{/if}}")}
                        <$Or
                            values={[slide.heading, slide.text, slide.button_text]}
                            $then={() => $partial("components/carousel-content")}
                        />
                    </div>
                    {$raw("{{#if button_text}}</div>{{else}}</a>{{/if}}")}
                </>
            )}
        />
        <$If
            test={$pointer("carousel.slides.length")}
            operator={$string(">")}
            rvalue={$number(1)}
            $then={() => (
                <>
                    {$partial("components/carousel-content-announcement")}
                    <$If test={$pointer("play_pause_button")} $then={() => $partial("components/carousel-play-pause-button")} />
                </>
            )}
        />
    </section>
);
