import {$Each, $If, $Lang, $lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

interface Language {
    code: string;
    switch_url: string;
    is_active: boolean;
}

export default () => (
    <>
        <a
            className="navPages-action has-subMenu"
            href="#"
            data-locale-code={$pointer("language_selector.active_language_code")}
            data-collapsible="navPages-locale"
            aria-controls="navPages-locale"
            aria-expanded="false"
            aria-label={$pointer("language_selector.active_language_code")}
        >
            <span>
                <$Lang keyName={$string("common.locale")} /> <strong>{$pointer("language_selector.active_language_code")}</strong>
            </span>
            <i className="icon navPages-action-moreIcon" aria-hidden="true">
                <svg>
                    <use href="#icon-chevron-down"></use>
                </svg>
            </i>
        </a>
        <div className="navPage-subMenu" id="navPages-locale" aria-hidden="true" tabIndex={-1}>
            <ul className="navPage-subMenu-list">
                <$Each
                    list={$pointer<Language[]>("language_selector.languages")}
                    $then={(language) => (
                        <li className="navPage-subMenu-item">
                            <a
                                className="navPage-subMenu-action navPages-action"
                                href={language.switch_url}
                                dangerouslyInlineAttributes={{attributes: `data-locale-code="${$raw("{{{code}}}")}"`}}
                                data-warning={$lang($string("common.locale_switch_warning"))}
                                aria-label={language.code}
                            >
                                <$If test={language.is_active} $then={() => <strong>{language.code}</strong>} $else={() => <>{language.code}</>} />
                            </a>
                        </li>
                    )}
                />
            </ul>
        </div>
    </>
);
