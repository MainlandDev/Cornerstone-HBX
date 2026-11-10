/**
 * Source: templates/components/carousel.html (61 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
    /* html L1-11:
       <section class="heroCarousel"
           data-slick='{
               "arrows": {{arrows}},
               "mobileFirst": true,
               "slidesToShow": 1,
               "slidesToScroll": 1,
               "autoplay": true,
               "autoplaySpeed": {{carousel.swap_frequency}},
               "slide": "[data-hero-slide]"
           }'
       >
    */
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
        {/* html L12: {{#each carousel.slides}} */}
        <$Each
            list={carousel.slides}
            $then={(slide, loop) => (
                <>
                    {$parseHandlebarsDangerously(`{{#if button_text}}<div data-hero-slide="{{@index}}">{{else}}<a href="{{url}}" data-hero-slide="{{@index}}" aria-label="{{#if this.alt_text.length '!=' 0}}{{this.alt_text}}{{else}}{{lang 'carousel.slide_number' slide_number=(add @index 1)}}{{/if}}">{{/if}}`)}
                    {/* html L18: <div class="heroCarousel-slide {{#if ../theme_settings.homepage_stretch_carousel_images}}stretch{{/if}} {{#if @first}}heroCarousel-slide--first{{/if}}"> */}
                    <div
                        className={`heroCarousel-slide ${$if(theme_settings.homepage_stretch_carousel_images).then(() => $$raw('stretch'))} ${$if(loop['@first']).then(() => $$raw('heroCarousel-slide--first'))}`}
                    >
                        {$parseHandlebarsDangerously(
                            `{{#if button_text}}<a href="{{url}}" class="heroCarousel-image-wrapper">{{else}}<div class="heroCarousel-image-wrapper">{{/if}}`,
                        )}
                        {/* html L24: {{#if @first}} */}
                        <$If
                            query={[loop['@first']]}
                            $then={() => (
                                /* html L25-30:
                                   {{> components/common/responsive-img
                                       image=stencil_image
                                       class="heroCarousel-image"
                                       fallback_size='1280w'
                                       lazyload='disabled'
                                   }}
                                */
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
                                /* html L31: {{else}}
                                                                      html L32-37:
                                   {{> components/common/responsive-img
                                       image=stencil_image
                                       class="heroCarousel-image"
                                       fallback_size='1280w'
                                       lazyload='lazyload'
                                   }}
                                */
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
                        {/* html L44: {{#or heading text button_text}} */}
                        <$Or
                            values={[slide.heading, slide.text, slide.button_text]}
                            $then={() => /* html L45: {{> components/carousel-content}} */ <$Partial name="components/carousel-content"/>}
                        />
                    </div>
                    {$parseHandlebarsDangerously(`{{#if button_text}}</div>{{else}}</a>{{/if}}`)}
                </>
            )}
        />
        {/* html L54: {{#if carousel.slides.length '>' 1}} */}
        <$If
            query={[carousel.slides.length, '>', $number(1)]}
            $then={() => (
                <>
                    {/* html L55: {{> components/carousel-content-announcement}} */}
                    <$Partial name="components/carousel-content-announcement"/>
                    {/* html L56: {{#if play_pause_button}} */}
                    <$If query={[play_pause_button]} $then={() => /* html L57: {{> components/carousel-play-pause-button}} */ <$Partial name="components/carousel-play-pause-button"/>}/>
                </>
            )}
        />
    </section>
));
