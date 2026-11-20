"use server";
import CarouselContent from "./carousel-content.tsx";
import CarouselContentAnnouncement from "./carousel-content-announcement.tsx";
import CarouselPlayPauseButton from "./carousel-play-pause-button.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import ResponsiveImg from "./common/responsive-img.tsx";
import {$add, $Each, $If, $Or, $lang, $number, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface Slide {
    url: string;
    alt_text: string;
    button_text: string;
    heading: string;
    text: string;
    stencil_image: string;
}

export default (_props: PartialProps) => (
    <section
        className="heroCarousel"
        dangerouslyInlineAttributes={{
            attributes: `data-slick='{ "arrows": ${$pointer("arrows")}, "mobileFirst": true, "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": ${$pointer("carousel.swap_frequency")}, "slide": "[data-hero-slide]" }'`,
        }}
    >
        <$Each
            list={$pointer<Slide[]>("carousel.slides")}
            $then={(slide, loop) => {
                // A slide with a button is a <div> around a linked image; one without is an <a> around the image. Each branch holds a whole
                // element, so the template is balanced HTML either way (an open tag in one branch and its close in a later `{{#if}}` is not).
                const image = (
                    <$If
                        test={loop["@first"]}
                        $then={() =>
                            <ResponsiveImg image={slide.stencil_image} class={$string("heroCarousel-image")} fallback_size={$string("1280w")} lazyload={$string("disabled")} />
                        }
                        $else={() =>
                            <ResponsiveImg image={slide.stencil_image} class={$string("heroCarousel-image")} fallback_size={$string("1280w")} lazyload={$string("lazyload")} />
                        }
                    />
                );
                const body = (
                    <div
                        className={`heroCarousel-slide ${$If({test: $pointer("../theme_settings.homepage_stretch_carousel_images"), $then: () => "stretch"})} ${$If({test: loop["@first"], $then: () => "heroCarousel-slide--first"})}`}
                    >
                        <$If
                            test={$pointer("button_text")}
                            $then={() => <a href={slide.url} className="heroCarousel-image-wrapper">{image}</a>}
                            $else={() => <div className="heroCarousel-image-wrapper">{image}</div>}
                        />
                        <$Or
                            values={[slide.heading, slide.text, slide.button_text]}
                            $then={() => <CarouselContent />}
                        />
                    </div>
                );
                return (
                    <$If
                        test={$pointer("button_text")}
                        $then={() => <div data-hero-slide={loop["@index"]}>{body}</div>}
                        $else={() => (
                            <a
                                href={slide.url}
                                data-hero-slide={loop["@index"]}
                                aria-label={$If({
                                    test: $pointer("this.alt_text.length"),
                                    operator: $string("!="),
                                    rvalue: $number(0),
                                    $then: () => slide.alt_text,
                                    $else: () => $lang($string("carousel.slide_number"), {slide_number: $add(loop["@index"], $number(1))}),
                                })}
                            >
                                {body}
                            </a>
                        )}
                    />
                );
            }}
        />
        <$If
            test={$pointer("carousel.slides.length")}
            operator={$string(">")}
            rvalue={$number(1)}
            $then={() => (
                <>
                    <CarouselContentAnnouncement />
                    <$If test={$pointer("play_pause_button")} $then={() => <CarouselPlayPauseButton />} />
                </>
            )}
        />
    </section>
);
