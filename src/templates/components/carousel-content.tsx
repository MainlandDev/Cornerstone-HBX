/**
 * Source: templates/components/carousel-content.html (12 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $boolean, $if, $parseHandlebarsDangerously, $this, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$and} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import type {SlideHint} from '@/context-hard';

// Called with no arguments inside `carousel`'s `{{#each carousel.slides}}`: the slide is the ambient context and `@index` comes from
// the caller's data frame, so the `aria-label` (which reads `@index` and `.length`) is a raw Handlebars attribute (escape hatch).
export default $asPartial(() => {
    const slide = $this<SlideHint>();
    return (
        /* html L1: <div class="heroCarousel-content{{#and (if heading '==' false) (if text '==' false)}} heroCarousel-content--empty{{/and}}"> */
        <div
            className={`heroCarousel-content${$and($if(slide.heading, '==', $boolean(false)), $if(slide.text, '==', $boolean(false))).then(() => $$raw(' heroCarousel-content--empty'))}`}
        >
            {/* html L2: {{#if heading}} */}
            <$If query={[slide.heading]} $then={() => /* html L3: <p class="heroCarousel-title">{{{heading}}}</p> */ <p className="heroCarousel-title">{/* html L3: {{{heading}}} */}{$unescaped(slide.heading)}</p>}/>
            {/* html L5: {{#if text}} */}
            <$If query={[slide.text]} $then={() => /* html L6: <p class="heroCarousel-description">{{{text}}}</p> */ <p className="heroCarousel-description">{/* html L6: {{{text}}} */}{$unescaped(slide.text)}</p>}/>
            {/* html L8: {{#if button_text}} */}
            <$If
                query={[slide.button_text]}
                $then={() => (
                    /* html L9: <a href="{{url}}" aria-label="{{#if this.alt_text.length '!=' 0}}{{this.alt_text}}{{else}}{{lang 'carousel.slide_number' slide_number=(add @index 1)}}{{/if}}, {{button_text}}" class="heroCarousel-action button button--primary button--large">{{{button_text}}}</a> */
                    <a
                        href={slide.url}
                        $$={$parseHandlebarsDangerously(
                            `aria-label="{{#if this.alt_text.length '!=' 0}}{{this.alt_text}}{{else}}{{lang 'carousel.slide_number' slide_number=(add @index 1)}}{{/if}}, {{button_text}}"`,
                        )}
                        className="heroCarousel-action button button--primary button--large"
                    >
                        {/* html L9: {{{button_text}}} */}
                        {$unescaped(slide.button_text)}
                    </a>
                )}
            />
        </div>
    );
});
