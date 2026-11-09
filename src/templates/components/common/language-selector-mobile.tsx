import {$Each, $If, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{language_selector: Hint['language_selector']}>(({language_selector}) => (
    <>
        <a
            className="navPages-action has-subMenu"
            href="#"
            data-locale-code={language_selector.active_language_code}
            data-collapsible="navPages-locale"
            aria-controls="navPages-locale"
            aria-expanded="false"
            aria-label={language_selector.active_language_code}
        >
            <span>
                <$Lang translationKey={$string('common.locale')}/> <strong>{language_selector.active_language_code}</strong>
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
                    list={language_selector.languages}
                    $then={(language) => (
                        <li className="navPage-subMenu-item">
                            <a
                                className="navPage-subMenu-action navPages-action"
                                href={language.switch_url}
                                data-locale-code={$unescaped(language.code)}
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
        </div>
    </>
));
