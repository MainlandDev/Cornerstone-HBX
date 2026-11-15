import {$capitalize, $Each, $getVar, $If, $pointer, $raw, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface ShareButton {
    service: string;
    annotation: string;
}

const encodedUrl = () => $getVar($string("encodedUrl"));
const encodedTitle = () => $getVar($string("encodedTitle"));

export default () => {
    return (
        <>
            <$If
                test={$pointer("settings.add_this.buttons")}
                $then={() => (
                    <>
                        {$raw("{{assignVar 'encodedUrl' (encodeURI url)}}")}
                        {" "}
                        {$raw("{{assignVar 'encodedTitle' (encodeURI head.title)}}")}
                        <div>
                            <ul className="socialLinks">
                                <$Each
                                    list={$pointer<ShareButton[]>("settings.add_this.buttons")}
                                    $then={(button) => (
                                        <li className={`socialLinks-item socialLinks-item--${button.service}`}>
                                            {$raw("{{#if service '===' 'facebook'}}")}
                                            <a
                                                className={`socialLinks__link icon icon--${button.service}`}
                                                dangerouslyInlineAttributes={{
                                                    attributes: `title="${$unescaped($capitalize(button.service))}" href="https://facebook.com/sharer/sharer.php?u=${encodedUrl()}" target="_blank" rel="noopener" ${$raw("{{{annotation}}}")}`,
                                                }}
                                            >
                                                <span className="aria-description--hidden">{$unescaped($capitalize(button.service))}</span>
                                                <svg>
                                                    <use href="#icon-facebook" />
                                                </svg>
                                            </a>
                                            {$raw("{{else if service '===' 'email'}}")}
                                            <a
                                                className={`socialLinks__link icon icon--${button.service}`}
                                                dangerouslyInlineAttributes={{
                                                    attributes: `title="${$unescaped($capitalize(button.service))}" href="mailto:?subject=${encodedTitle()}&amp;body=${encodedUrl()}" target="_self" rel="noopener" ${$raw("{{{annotation}}}")}`,
                                                }}
                                            >
                                                <span className="aria-description--hidden">{$unescaped($capitalize(button.service))}</span>
                                                <svg>
                                                    <use href="#icon-envelope" />
                                                </svg>
                                            </a>
                                            {$raw("{{else if service '===' 'print'}}")}
                                            <a
                                                className={`socialLinks__link icon icon--${button.service}`}
                                                dangerouslyInlineAttributes={{
                                                    attributes: `title="${$unescaped($capitalize(button.service))}" onclick="window.print();return false;" ${$raw("{{{annotation}}}")}`,
                                                }}
                                            >
                                                <span className="aria-description--hidden">{$unescaped($capitalize(button.service))}</span>
                                                <svg>
                                                    <use href="#icon-print" />
                                                </svg>
                                            </a>
                                            {$raw("{{else if service '===' 'twitter'}}")}
                                            <a
                                                className="socialLinks__link icon icon--x"
                                                dangerouslyInlineAttributes={{
                                                    attributes: `href="https://x.com/intent/tweet/?text=${encodedTitle()}&amp;url=${encodedUrl()}" target="_blank" rel="noopener" title="X" ${$raw("{{{annotation}}}")}`,
                                                }}
                                            >
                                                <span className="aria-description--hidden">X</span>
                                                <svg>
                                                    <use href="#icon-x" />
                                                </svg>
                                            </a>
                                            {$raw("{{else if service '===' 'linkedin'}}")}
                                            <a
                                                className={`socialLinks__link icon icon--${button.service}`}
                                                dangerouslyInlineAttributes={{
                                                    attributes: `title="${$unescaped($capitalize(button.service))}" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=${encodedUrl()}&amp;title=${encodedTitle()}&amp;summary=${encodedTitle()}&amp;source=${encodedUrl()}" target="_blank" rel="noopener" ${$raw("{{{annotation}}}")}`,
                                                }}
                                            >
                                                <span className="aria-description--hidden">{$unescaped($capitalize(button.service))}</span>
                                                <svg>
                                                    <use href="#icon-linkedin" />
                                                </svg>
                                            </a>
                                            {$raw("{{else if service '===' 'pinterest'}}")}
                                            <a
                                                className={`socialLinks__link icon icon--${button.service}`}
                                                dangerouslyInlineAttributes={{
                                                    attributes: `title="${$unescaped($capitalize(button.service))}" href="https://pinterest.com/pin/create/button/?url=${encodedUrl()}&amp;media=${$raw("{{getImageSrcset ../product.main_image (cdn ../theme_settings.default_image_product) 1x=../theme_settings.zoom_size}}")}&amp;description=${encodedTitle()}" target="_blank" rel="noopener" ${$raw("{{{annotation}}}")}`,
                                                }}
                                            >
                                                <span className="aria-description--hidden">{$unescaped($capitalize(button.service))}</span>
                                                <svg>
                                                    <use href="#icon-pinterest" />
                                                </svg>
                                            </a>
                                            {$raw("{{/if}}")}
                                        </li>
                                    )}
                                />
                            </ul>
                        </div>
                    </>
                )}
            />
            <$If
                test={$pointer("settings.facebook_like_button.enabled")}
                $then={() => (
                    <iframe
                        dangerouslyInlineAttributes={{
                            attributes: `class="facebook${$raw("{{#if settings.facebook_like_button.verb '===' 'recommend'}}Recommend{{else}}Like{{/if}}")}Btn" style="border:none; overflow:hidden; margin: 0; padding: 0; position:absolute" src="https://www.facebook.com/plugins/like.php?href=${$pointer("settings.facebook_like_button.href")}&amp;layout=button_count${$raw("{{#if settings.facebook_like_button.verb '===' 'recommend'}}&amp;action=recommend{{/if}}")}&amp;colorscheme=light&amp;height=20" scrolling="no" frameborder="0" allowTransparency="true"`,
                        }}
                    ></iframe>
                )}
            />
        </>
    );
};
