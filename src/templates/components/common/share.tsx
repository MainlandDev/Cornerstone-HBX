import {$Each, $If, $if, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$AssignVar} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_capitalize, $cdn, $encodeURI, $getImageSrcset, $getVar} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {Hint, ProductHint} from '@/context-common';

export default $asPartial<{
    url: HandlebarsInlineValueToken<string>;
    head: Hint['head'];
    settings: Hint['settings'];
    theme_settings: Hint['theme_settings'];
    product: ProductHint;
}>(({url, head, settings, theme_settings, product}) => (
    <>
    <$If
        query={[settings.add_this.buttons]}
        $then={() => (
            <>
                <$AssignVar keyName={$string('encodedUrl')} value={$encodeURI(url)}/>
                <$AssignVar keyName={$string('encodedTitle')} value={$encodeURI(head.title)}/>
                <div>
                    <ul className="socialLinks">
                        <$Each
                            list={settings.add_this.buttons}
                            $then={(button) => (
                                <li className={`socialLinks-item socialLinks-item--${button.service}`}>
                                    <$If
                                        query={[button.service, '===', $string('facebook')]}
                                        $then={() => (
                                            <a
                                                className={`socialLinks__link icon icon--${button.service}`}
                                                title={$_capitalize(button.service)}
                                                href={`https://facebook.com/sharer/sharer.php?u=${$getVar($string('encodedUrl'))}`}
                                                target="_blank"
                                                rel="noopener"
                                                $$={$unescaped(button.annotation)}
                                            >
                                                <span className="aria-description--hidden">{$_capitalize(button.service)}</span>
                                                <svg>
                                                    <use href="#icon-facebook"/>
                                                </svg>
                                            </a>
                                        )}
                                        $elseThen={[
                                            {
                                                query: [button.service, '===', $string('email')],
                                                $then: () => (
                                                    <a
                                                        className={`socialLinks__link icon icon--${button.service}`}
                                                        title={$_capitalize(button.service)}
                                                        href={`mailto:?subject=${$getVar($string('encodedTitle'))}&body=${$getVar($string('encodedUrl'))}`}
                                                        target="_self"
                                                        rel="noopener"
                                                        $$={$unescaped(button.annotation)}
                                                    >
                                                        <span className="aria-description--hidden">{$_capitalize(button.service)}</span>
                                                        <svg>
                                                            <use href="#icon-envelope"/>
                                                        </svg>
                                                    </a>
                                                ),
                                            },
                                            {
                                                query: [button.service, '===', $string('print')],
                                                $then: () => (
                                                    <a
                                                        className={`socialLinks__link icon icon--${button.service}`}
                                                        title={$_capitalize(button.service)}
                                                        $$={[$$raw('onclick="window.print();return false;" '), $unescaped(button.annotation)]}
                                                    >
                                                        <span className="aria-description--hidden">{$_capitalize(button.service)}</span>
                                                        <svg>
                                                            <use href="#icon-print"/>
                                                        </svg>
                                                    </a>
                                                ),
                                            },
                                            {
                                                query: [button.service, '===', $string('twitter')],
                                                $then: () => (
                                                    <a
                                                        className="socialLinks__link icon icon--x"
                                                        href={`https://x.com/intent/tweet/?text=${$getVar($string('encodedTitle'))}&url=${$getVar($string('encodedUrl'))}`}
                                                        target="_blank"
                                                        rel="noopener"
                                                        title="X"
                                                        $$={$unescaped(button.annotation)}
                                                    >
                                                        <span className="aria-description--hidden">X</span>
                                                        <svg>
                                                            <use href="#icon-x"/>
                                                        </svg>
                                                    </a>
                                                ),
                                            },
                                            {
                                                query: [button.service, '===', $string('linkedin')],
                                                $then: () => (
                                                    <a
                                                        className={`socialLinks__link icon icon--${button.service}`}
                                                        title={$_capitalize(button.service)}
                                                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${$getVar($string('encodedUrl'))}&title=${$getVar($string('encodedTitle'))}&summary=${$getVar($string('encodedTitle'))}&source=${$getVar($string('encodedUrl'))}`}
                                                        target="_blank"
                                                        rel="noopener"
                                                        $$={$unescaped(button.annotation)}
                                                    >
                                                        <span className="aria-description--hidden">{$_capitalize(button.service)}</span>
                                                        <svg>
                                                            <use href="#icon-linkedin"/>
                                                        </svg>
                                                    </a>
                                                ),
                                            },
                                            {
                                                query: [button.service, '===', $string('pinterest')],
                                                $then: () => (
                                                    <a
                                                        className={`socialLinks__link icon icon--${button.service}`}
                                                        title={$_capitalize(button.service)}
                                                        href={`https://pinterest.com/pin/create/button/?url=${$getVar($string('encodedUrl'))}&media=${$getImageSrcset(product.main_image, {'1x': theme_settings.zoom_size}, $cdn(theme_settings.default_image_product))}&description=${$getVar($string('encodedTitle'))}`}
                                                        target="_blank"
                                                        rel="noopener"
                                                        $$={$unescaped(button.annotation)}
                                                    >
                                                        <span className="aria-description--hidden">{$_capitalize(button.service)}</span>
                                                        <svg>
                                                            <use href="#icon-pinterest"/>
                                                        </svg>
                                                    </a>
                                                ),
                                            },
                                        ]}
                                    />
                                </li>
                            )}
                        />
                    </ul>
                </div>
            </>
        )}
    />
    <$If
        query={[settings.facebook_like_button.enabled]}
        $then={() => (
            <iframe
                className={`facebook${$if(settings.facebook_like_button.verb, '===', $string('recommend')).then(() => $$raw('Recommend')).else(() => $$raw('Like'))}Btn`}
                style={{border: 'none', overflow: 'hidden', margin: '0', padding: '0', position: 'absolute'}}
                src={`https://www.facebook.com/plugins/like.php?href=${settings.facebook_like_button.href}&layout=button_count${$if(settings.facebook_like_button.verb, '===', $string('recommend')).then(() => $$raw('&action=recommend'))}&colorscheme=light&height=20`}
                scrolling="no"
                frameBorder="0"
                $$={$$raw('allowtransparency="true"')}
            ></iframe>
        )}
    />
    </>
));
