import {$capitalize, $Each, $If, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface SocialMedia {
    display_name: string;
    url: string;
}

export default () => (
    <$If
        test={$pointer("social_media")}
        $then={() => (
            <ul className="socialLinks socialLinks--alt">
                <$Each
                    list={$pointer<SocialMedia[]>("social_media")}
                    $then={(social) => (
                        <$If
                            test={$pointer("display_name")}
                            operator={$string("===")}
                            rvalue={$string("twitter")}
                            $then={() => (
                                <li className="socialLinks-item">
                                    <a className="icon icon--x" href={social.url} target="_blank" rel="noopener" title="X">
                                        <span className="aria-description--hidden">X</span>
                                        <svg>
                                            <use href="#icon-x" />
                                        </svg>
                                    </a>
                                </li>
                            )}
                            $else={() => (
                                <li className="socialLinks-item">
                                    <a
                                        className={`icon icon--${social.display_name}`}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener"
                                        dangerouslyInlineAttributes={{attributes: `title="${$unescaped($capitalize(social.display_name))}"`}}
                                    >
                                        <span className="aria-description--hidden">{$unescaped($capitalize(social.display_name))}</span>
                                        <svg>
                                            <use href={`#icon-${social.display_name}`} />
                                        </svg>
                                    </a>
                                </li>
                            )}
                        />
                    )}
                />
            </ul>
        )}
    />
);
