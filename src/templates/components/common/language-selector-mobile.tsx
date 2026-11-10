/**
 * Source: templates/components/common/language-selector-mobile.html (38 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{language_selector: Hint['language_selector']}>(({language_selector}) => (
    <>
        {/* html L1-8:
           <a class="navPages-action has-subMenu"
              href="#"
              data-locale-code="{{language_selector.active_language_code}}"
              data-collapsible="navPages-locale"
              aria-controls="navPages-locale"
              aria-expanded="false"
              aria-label="{{language_selector.active_language_code}}"
           >
        */}
        <a
            className="navPages-action has-subMenu"
            href="#"
            data-locale-code={language_selector.active_language_code}
            data-collapsible="navPages-locale"
            aria-controls="navPages-locale"
            aria-expanded="false"
            aria-label={language_selector.active_language_code}
        >
            {/* html L9: <span> */}
            <span>
                {/* html L10: {{lang 'common.locale'}} <strong>{{language_selector.active_language_code}}</strong> */}
                <$Lang translationKey={$string('common.locale')}/> {/* html L10: <strong> */}<strong>{/* html L10: {{language_selector.active_language_code}} */}{language_selector.active_language_code}</strong>
            </span>
            {/* html L12: <i class="icon navPages-action-moreIcon" aria-hidden="true"> */}
            <i className="icon navPages-action-moreIcon" aria-hidden="true">
                {/* html L13: <svg> */}
                <svg>
                    {/* html L14: <use href="#icon-chevron-down"></use> */}
                    <use href="#icon-chevron-down"></use>
                </svg>
            </i>
        </a>
        {/* html L18: <div class="navPage-subMenu" id="navPages-locale" aria-hidden="true" tabindex="-1"> */}
        <div className="navPage-subMenu" id="navPages-locale" aria-hidden="true" tabIndex={-1}>
            {/* html L19: <ul class="navPage-subMenu-list"> */}
            <ul className="navPage-subMenu-list">
                {/* html L20: {{#each language_selector.languages}} */}
                <$Each
                    list={language_selector.languages}
                    $then={(language) => (
                        /* html L21: <li class="navPage-subMenu-item"> */
                        <li className="navPage-subMenu-item">
                            {/* html L22-27:
                               <a class="navPage-subMenu-action navPages-action"
                                  href="{{switch_url}}"
                                  data-locale-code="{{{code}}}"
                                  data-warning="{{lang 'common.locale_switch_warning'}}"
                                  aria-label="{{code}}"
                               >
                            */}
                            <a
                                className="navPage-subMenu-action navPages-action"
                                href={language.switch_url}
                                data-locale-code={$unescaped(language.code)}
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
        </div>
    </>
));
