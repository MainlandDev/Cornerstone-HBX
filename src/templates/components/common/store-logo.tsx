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
    <a href={urls.home} className="header-logo__link" data-header-logo-link="">
        <$If
            query={[settings.store_logo.image]}
            $then={() => (
                <$If
                    query={[theme_settings.logo_size, '===', $string('original')]}
                    $then={() =>
                        $parseHandlebarsDangerously(`<img class="header-logo-image-unknown-size"
             src="{{getImage settings.store_logo.image 'logo_size'}}"
             alt="{{settings.store_logo.title}}"
             title="{{settings.store_logo.title}}">`)
                    }
                    $else={() => (
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
            $else={() => <span className="header-logo-text">{settings.store_logo.title}</span>}
        />
    </a>
));

