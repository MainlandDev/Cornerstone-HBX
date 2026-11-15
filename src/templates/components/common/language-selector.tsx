import {$Each, $If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface Language {
    code: string;
    switch_url: string;
    is_active: boolean;
}

export default () => (
    <ul className="navUser-section">
        <li className="navUser-item">
            <a
                className="navUser-action navUser-action--languageSelector has-dropdown"
                href="#"
                data-locale-code={$pointer("language_selector.active_language_code")}
                data-dropdown="languageSelection"
                aria-controls="languageSelection"
                aria-expanded="false"
                aria-label={$pointer("language_selector.active_language_code")}
            >
                <span>
                    <$Lang keyName={$string("common.locale")} /> <strong>{$pointer("language_selector.active_language_code")}</strong>
                </span>
                <i className="icon" aria-hidden="true">
                    <svg>
                        <use href="#icon-chevron-down" />
                    </svg>
                </i>
            </a>
            <ul className="dropdown-menu" id="languageSelection" data-dropdown-content={""} aria-hidden="true" tabIndex={-1}>
                <$Each
                    list={$pointer<Language[]>("language_selector.languages")}
                    $then={(language) => (
                        <li className="dropdown-menu-item">
                            <a
                                href={language.switch_url}
                                data-locale-code={language.code}
                                data-warning={$lang($string("common.locale_switch_warning"))}
                                aria-label={language.code}
                            >
                                <$If test={language.is_active} $then={() => <strong>{language.code}</strong>} $else={() => <>{language.code}</>} />
                            </a>
                        </li>
                    )}
                />
            </ul>
        </li>
    </ul>
);
