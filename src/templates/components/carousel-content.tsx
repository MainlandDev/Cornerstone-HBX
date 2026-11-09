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
        <div
            className={`heroCarousel-content${$and($if(slide.heading, '==', $boolean(false)), $if(slide.text, '==', $boolean(false))).then(() => $$raw(' heroCarousel-content--empty'))}`}
        >
            <$If query={[slide.heading]} $then={() => <p className="heroCarousel-title">{$unescaped(slide.heading)}</p>}/>
            <$If query={[slide.text]} $then={() => <p className="heroCarousel-description">{$unescaped(slide.text)}</p>}/>
            <$If
                query={[slide.button_text]}
                $then={() => (
                    <a
                        href={slide.url}
                        $$={$parseHandlebarsDangerously(
                            `aria-label="{{#if this.alt_text.length '!=' 0}}{{this.alt_text}}{{else}}{{lang 'carousel.slide_number' slide_number=(add @index 1)}}{{/if}}, {{button_text}}"`,
                        )}
                        className="heroCarousel-action button button--primary button--large"
                    >
                        {$unescaped(slide.button_text)}
                    </a>
                )}
            />
        </div>
    );
});
