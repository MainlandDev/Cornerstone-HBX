/**
 * Source: templates/components/common/language-selector.html (39 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{language_selector: Hint['language_selector']}>(({language_selector}) => (
    /* html L1: <ul class="navUser-section"> */
    <ul className="navUser-section">
        {/* html L2: <li class="navUser-item"> */}
        <li className="navUser-item">
            {/* html L3-10:
               <a class="navUser-action navUser-action--languageSelector has-dropdown"
                  href="#"
                  data-locale-code="{{language_selector.active_language_code}}"
                  data-dropdown="languageSelection"
                  aria-controls="languageSelection"
                  aria-expanded="false"
                  aria-label="{{language_selector.active_language_code}}"
               >
            */}
            <a
                className="navUser-action navUser-action--languageSelector has-dropdown"
                href="#"
                data-locale-code={language_selector.active_language_code}
                data-dropdown="languageSelection"
                aria-controls="languageSelection"
                aria-expanded="false"
                aria-label={language_selector.active_language_code}
            >
                {/* html L11: <span> */}
                <span>
                    {/* html L12: {{lang 'common.locale'}} <strong>{{language_selector.active_language_code}}</strong> */}
                    <$Lang translationKey={$string('common.locale')}/> {/* html L12: <strong> */}<strong>{/* html L12: {{language_selector.active_language_code}} */}{language_selector.active_language_code}</strong>
                </span>
                {/* html L14: <i class="icon" aria-hidden="true"> */}
                <i className="icon" aria-hidden="true">
                    {/* html L15: <svg> */}
                    <svg>
                        {/* html L16: <use href="#icon-chevron-down" /> */}
                        <use href="#icon-chevron-down"/>
                    </svg>
                </i>
            </a>
            {/* html L20: <ul class="dropdown-menu" id="languageSelection" data-dropdown-content aria-hidden="true" tabindex="-1"> */}
            <ul className="dropdown-menu" id="languageSelection" data-dropdown-content="" aria-hidden="true" tabIndex={-1}>
                {/* html L21: {{#each language_selector.languages}} */}
                <$Each
                    list={language_selector.languages}
                    $then={(language) => (
                        /* html L22: <li class="dropdown-menu-item"> */
                        <li className="dropdown-menu-item">
                            {/* html L23-27:
                               <a href="{{switch_url}}"
                                  data-locale-code="{{code}}"
                                  data-warning="{{lang 'common.locale_switch_warning'}}"
                                  aria-label="{{code}}"
                               >
                            */}
                            <a
                                href={language.switch_url}
                                data-locale-code={language.code}
                                data-warning={$lang($string('common.locale_switch_warning'))}
                                aria-label={language.code}
                            >
                                {/* html L28: {{#if is_active}} */}
                                <$If
                                    query={[language.is_active]}
                                    $then={() => /* html L29: <strong>{{code}}</strong> */ <strong>{/* html L29: {{code}} */}{language.code}</strong>}
                                    $else={() => <>{/* html L30: {{else}}
                                                                                                            html L31: {{code}}
                                                   */}{language.code}</>}
                                />
                            </a>
                        </li>
                    )}
                />
            </ul>
        </li>
    </ul>
));
