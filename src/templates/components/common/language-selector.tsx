import {$Each, $If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{language_selector: Hint['language_selector']}>(({language_selector}) => (
    <ul className="navUser-section">
        <li className="navUser-item">
            <a
                className="navUser-action navUser-action--languageSelector has-dropdown"
                href="#"
                data-locale-code={language_selector.active_language_code}
                data-dropdown="languageSelection"
                aria-controls="languageSelection"
                aria-expanded="false"
                aria-label={language_selector.active_language_code}
            >
                <span>
                    <$Lang translationKey={$string('common.locale')}/> <strong>{language_selector.active_language_code}</strong>
                </span>
                <i className="icon" aria-hidden="true">
                    <svg>
                        <use href="#icon-chevron-down"/>
                    </svg>
                </i>
            </a>
            <ul className="dropdown-menu" id="languageSelection" data-dropdown-content="" aria-hidden="true" tabIndex={-1}>
                <$Each
                    list={language_selector.languages}
                    $then={(language) => (
                        <li className="dropdown-menu-item">
                            <a
                                href={language.switch_url}
                                data-locale-code={language.code}
                                data-warning={$lang($string('common.locale_switch_warning'))}
                                aria-label={language.code}
                            >
                                <$If
                                    query={[language.is_active]}
                                    $then={() => <strong>{language.code}</strong>}
                                    $else={() => <>{language.code}</>}
                                />
                            </a>
                        </li>
                    )}
                />
            </ul>
        </li>
    </ul>
));
