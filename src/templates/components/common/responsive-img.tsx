import {$if, $string, $unless, $boolean, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$cdn, $default, $getImageSrcset, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ImageHint} from '@/context-common';

type Str = HandlebarsInlineValueToken<string>;

/**
 * Lazysizes srcset pattern (see the original template's header comment). The whole attribute list is one `$$` carrier because
 * the original switches attribute names and values on `image`, `lazyload` and `default_image`.
 */
export default $asPartial<{
    image: ImageHint;
    fallback_size: Str;
    lazyload: Str;
    default_image: Str;
    class: Str;
    lqip_size: Str;
    otherAttributes: Str;
}>(({image, fallback_size, lazyload, default_image, class: className, lqip_size, otherAttributes}) => (
    <img
        $$={[
            $if(image)
                .then(() => [
                    $$raw('src="'),
                    $getImageSrcset(image, {'1x': $default(fallback_size, $string('160w'))}),
                    $$raw('" alt="'),
                    image.alt,
                    $$raw('" title="'),
                    image.alt,
                    $$raw('" data-sizes="auto" '),
                    $unless(lazyload, '==', $string('disabled')).then(() =>
                        $if(lazyload, '==', $string('lazyload+lqip'))
                            .then(() => [
                                $$raw('srcset="'),
                                $getImageSrcset(image, {'1x': $default(lqip_size, $string('80w'))}),
                                $$raw('" '),
                            ])
                            .else(() => $$raw('srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" ')),
                    ),
                    $unless(lazyload, '==', $string('disabled')).then(() => $$raw('data-')),
                    $$raw('srcset="'),
                    $getImageSrcset(image, {use_default_sizes: $boolean(true)}),
                    $$raw('" '),
                ])
                .elseIf(default_image, () => [
                    $$raw('src="'),
                    $cdn(default_image),
                    $$raw('" alt="'),
                    $lang($string('products.card_default_image_alt')),
                    $$raw('" '),
                ]),
            $$raw('class="'),
            $unless(lazyload, '==', $string('disabled')).then(() => $$raw('lazyload')),
            $if(className).then(() => [$$raw(' '), className]),
            $$raw('" '),
            $if(lazyload, '==', $string('lazyload')).then(() => $$raw('loading="lazy" ')),
            otherAttributes,
        ]}
    />
));
