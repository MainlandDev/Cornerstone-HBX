import {$Each, $If, $Partial, $if, $number, $parseHandlebarsDangerously, $string} from '@mainlanddev/bigcommerce-react';
import {$Or} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$asPartial, type ThemeContextHint, type ThemePageHome} from '@mainlanddev/bigcommerce-react/theme';

type HomeHint = ThemeContextHint<ThemePageHome>;

// Escape hatch (raw Handlebars) is used only where JSX cannot express the markup:
// - `data-slick`: a single-quoted JSON attribute that interpolates `{{arrows}}` and `{{carousel.swap_frequency}}`;
// - each slide's wrapper and image wrapper, whose open and close tags sit in separate `{{#if button_text}}` blocks (`<div>` vs `<a>`);
// - the `aria-label` that reads `@index` and `.length`.
export default $asPartial<{
    carousel: Extract<HomeHint['carousel'], {slides: unknown}>;
    theme_settings: HomeHint['theme_settings'];
    arrows: HomeHint['theme_settings']['homepage_show_carousel_arrows'];
    play_pause_button: HomeHint['theme_settings']['homepage_show_carousel_play_pause_button'];
}>(({carousel, theme_settings, play_pause_button}) => (
    <section
        className="heroCarousel"
        $$={$parseHandlebarsDangerously(`data-slick='{
        "arrows": {{arrows}},
        "mobileFirst": true,
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "autoplay": true,
        "autoplaySpeed": {{carousel.swap_frequency}},
        "slide": "[data-hero-slide]"
    }'`)}
    >
        <$Each
            list={carousel.slides}
            $then={(slide, loop) => (
                <>
                    {$parseHandlebarsDangerously(`{{#if button_text}}<div data-hero-slide="{{@index}}">{{else}}<a href="{{url}}" data-hero-slide="{{@index}}" aria-label="{{#if this.alt_text.length '!=' 0}}{{this.alt_text}}{{else}}{{lang 'carousel.slide_number' slide_number=(add @index 1)}}{{/if}}">{{/if}}`)}
                    <div
                        className={`heroCarousel-slide ${$if(theme_settings.homepage_stretch_carousel_images).then(() => $$raw('stretch'))} ${$if(loop['@first']).then(() => $$raw('heroCarousel-slide--first'))}`}
                    >
                        {$parseHandlebarsDangerously(
                            `{{#if button_text}}<a href="{{url}}" class="heroCarousel-image-wrapper">{{else}}<div class="heroCarousel-image-wrapper">{{/if}}`,
                        )}
                        <$If
                            query={[loop['@first']]}
                            $then={() => (
                                <$Partial
                                    name="components/common/responsive-img"
                                    hash={{
                                        image: slide.stencil_image,
                                        class: $string('heroCarousel-image'),
                                        fallback_size: $string('1280w'),
                                        lazyload: $string('disabled'),
                                    }}
                                />
                            )}
                            $else={() => (
                                <$Partial
                                    name="components/common/responsive-img"
                                    hash={{
                                        image: slide.stencil_image,
                                        class: $string('heroCarousel-image'),
                                        fallback_size: $string('1280w'),
                                        lazyload: $string('lazyload'),
                                    }}
                                />
                            )}
                        />
                        {$parseHandlebarsDangerously(`{{#if button_text}}</a>{{else}}</div>{{/if}}`)}
                        <$Or
                            values={[slide.heading, slide.text, slide.button_text]}
                            $then={() => <$Partial name="components/carousel-content"/>}
                        />
                    </div>
                    {$parseHandlebarsDangerously(`{{#if button_text}}</div>{{else}}</a>{{/if}}`)}
                </>
            )}
        />
        <$If
            query={[carousel.slides.length, '>', $number(1)]}
            $then={() => (
                <>
                    <$Partial name="components/carousel-content-announcement"/>
                    <$If query={[play_pause_button]} $then={() => <$Partial name="components/carousel-play-pause-button"/>}/>
                </>
            )}
        />
    </section>
));
