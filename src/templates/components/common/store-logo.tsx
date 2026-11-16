"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$getImageSrcset1x2x, $If, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <a href={$pointer("urls.home")} className="header-logo__link" data-header-logo-link={""}>
        <$If
            test={$pointer("settings.store_logo.image")}
            $then={() => (
                <$If
                    test={$pointer("theme_settings.logo_size")}
                    operator={$string("===")}
                    rvalue={$string("original")}
                    $then={() => (
                        <img
                            className="header-logo-image-unknown-size"
                            dangerouslyInlineAttributes={{attributes: `src="${$raw("{{getImage settings.store_logo.image 'logo_size'}}")}"`}}
                            alt={$pointer("settings.store_logo.title")}
                            title={$pointer("settings.store_logo.title")}
                        />
                    )}
                    $else={() => (
                        <div className="header-logo-image-container">
                            <img
                                className="header-logo-image"
                                dangerouslyInlineAttributes={{attributes: `src="${$raw("{{getImage settings.store_logo.image 'logo_size'}}")}"`}}
                                srcSet={$getImageSrcset1x2x($pointer<{data: string}>("settings.store_logo.image"), $pointer("theme_settings.logo_size"))}
                                alt={$pointer("settings.store_logo.title")}
                                title={$pointer("settings.store_logo.title")}
                            />
                        </div>
                    )}
                />
            )}
            $else={() => (
                <span className="header-logo-text">{$pointer("settings.store_logo.title")}</span>
            )}
        />
    </a>
);
