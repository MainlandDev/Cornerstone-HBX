/**
 * Source: templates/components/common/store-logo.html (21 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $parseHandlebarsDangerously, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {Hint} from '@/context-common';

// `$getImage` / `$getImageSrcset1x2x` need a sized image hint (width and height) that the library's `settings.store_logo.image` type lacks,
// so the two <img> tags that call them are raw Handlebars (escape hatch); the conditions and wrappers stay typed.
export default $asPartial<{
    settings: Hint['settings'];
    theme_settings: Hint['theme_settings'];
    urls: Hint['urls'];
}>(({settings, theme_settings, urls}) => (
    /* html L1: <a href="{{urls.home}}" class="header-logo__link" data-header-logo-link> */
    <a href={urls.home} className="header-logo__link" data-header-logo-link="">
        {/* html L2: {{#if settings.store_logo.image}} */}
        <$If
            query={[settings.store_logo.image]}
            $then={() => (
                /* html L3: {{#if theme_settings.logo_size '===' 'original'}} */
                <$If
                    query={[theme_settings.logo_size, '===', $string('original')]}
                    $then={() =>
                        $parseHandlebarsDangerously(`<img class="header-logo-image-unknown-size"
             src="{{getImage settings.store_logo.image 'logo_size'}}"
             alt="{{settings.store_logo.title}}"
             title="{{settings.store_logo.title}}">`)
                    }
                    $else={() => (
                        /* html L8: {{else}}
                                                      html L9: <div class="header-logo-image-container">
                        */
                        <div className="header-logo-image-container">
                            {$parseHandlebarsDangerously(`<img class="header-logo-image"
                 src="{{getImage settings.store_logo.image 'logo_size'}}"
                 srcset="{{getImageSrcset1x2x settings.store_logo.image theme_settings.logo_size}}"
                 alt="{{settings.store_logo.title}}"
                 title="{{settings.store_logo.title}}">`)}
                        </div>
                    )}
                />
            )}
            $else={() => /* html L17: {{else}}
                                                        html L18: <span class="header-logo-text">{{settings.store_logo.title}}</span>
                         */ <span className="header-logo-text">{/* html L18: {{settings.store_logo.title}} */}{settings.store_logo.title}</span>}
        />
    </a>
));

