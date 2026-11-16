"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$capitalize, $Each, $getVar, $If, $pointer, $raw, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface ShareButton {
    service: string;
    annotation: string;
}

const encodedUrl = () => $getVar($string("encodedUrl"));
const encodedTitle = () => $getVar($string("encodedTitle"));

export default (_props: PartialProps) => {
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
                                            <$If
                                                test={$pointer("service")}
                                                operator={$string("===")}
                                                rvalue={$string("facebook")}
                                                $then={() => (
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
                                                )}
                                                $elseThen={[
                                                    {
                                                        test: $pointer("service"),
                                                        operator: $string("==="),
                                                        rvalue: $string("email"),
                                                        $then: () => (
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
                                                        ),
                                                    },
                                                    {
                                                        test: $pointer("service"),
                                                        operator: $string("==="),
                                                        rvalue: $string("print"),
                                                        $then: () => (
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
                                                        ),
                                                    },
                                                    {
                                                        test: $pointer("service"),
                                                        operator: $string("==="),
                                                        rvalue: $string("twitter"),
                                                        $then: () => (
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
                                                        ),
                                                    },
                                                    {
                                                        test: $pointer("service"),
                                                        operator: $string("==="),
                                                        rvalue: $string("linkedin"),
                                                        $then: () => (
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
                                                        ),
                                                    },
                                                    {
                                                        test: $pointer("service"),
                                                        operator: $string("==="),
                                                        rvalue: $string("pinterest"),
                                                        $then: () => (
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
                test={$pointer("settings.facebook_like_button.enabled")}
                $then={() => (
                    <iframe
                        dangerouslyInlineAttributes={{
                            attributes: `class="facebook${$If({test: $pointer("settings.facebook_like_button.verb"), operator: $string("==="), rvalue: $string("recommend"), $then: () => "Recommend", $else: () => "Like"})}Btn" style="border:none; overflow:hidden; margin: 0; padding: 0; position:absolute" src="https://www.facebook.com/plugins/like.php?href=${$pointer("settings.facebook_like_button.href")}&amp;layout=button_count${$If({test: $pointer("settings.facebook_like_button.verb"), operator: $string("==="), rvalue: $string("recommend"), $then: () => $raw("&amp;action=recommend")})}&amp;colorscheme=light&amp;height=20" scrolling="no" frameborder="0" allowTransparency="true"`,
                        }}
                    ></iframe>
                )}
            />
        </>
    );
};
