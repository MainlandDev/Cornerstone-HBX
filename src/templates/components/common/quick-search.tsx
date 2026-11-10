/**
 * Source: templates/components/common/quick-search.html (32 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $if, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_lang, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{
    name: HandlebarsInlineValueToken<string>;
    semantic_search_enabled: Hint['semantic_search_enabled'];
    urls: Hint['urls'];
}>(({name, semantic_search_enabled, urls}) => (
    /* html L1: <div class="container"> */
    <div className="container">
        {/* html L2: <form class="form" data-url="{{urls.search}}" data-quick-search-form> */}
        <form className="form" data-url={urls.search} data-quick-search-form="">
            {/* html L3: <fieldset class="form-fieldset"> */}
            <fieldset className="form-fieldset">
                {/* html L4: <div class="form-field"> */}
                <div className="form-field">
                    {/* html L5: {{#if semantic_search_enabled}} */}
                    <$If
                        query={[semantic_search_enabled]}
                        $then={() => (
                            /* html L6: <label class="is-srOnly" for="{{name}}">{{lang "search.quick_search.input_label_semantic"}}</label> */
                            <label className="is-srOnly" htmlFor={name}>
                                {/* html L6: {{lang "search.quick_search.input_label_semantic"}} */}
                                <$Lang translationKey={$string('search.quick_search.input_label_semantic')}/>
                            </label>
                        )}
                        $else={() => (
                            /* html L7: {{else}}
                                                              html L8: <label class="is-srOnly" for="{{name}}">{{lang "search.quick_search.input_label"}}</label>
                            */
                            <label className="is-srOnly" htmlFor={name}>
                                {/* html L8: {{lang "search.quick_search.input_label"}} */}
                                <$Lang translationKey={$string('search.quick_search.input_label')}/>
                            </label>
                        )}
                    />
                    {/* html L10-21:
                       <input class="form-input"
                              data-search-quick
                              name="{{name}}"
                              id="{{name}}"
                              data-error-message="{{lang 'search.error.empty_field'}}"
                              {{#if semantic_search_enabled}}
                              placeholder="{{lang 'search.quick_search.input_placeholder_semantic'}}"
                              {{else}}
                              placeholder="{{lang 'search.quick_search.input_placeholder'}}"
                              {{/if}}
                              autocomplete="off"
                       >
                    */}
                    <input
                        className="form-input"
                        data-search-quick=""
                        name={name}
                        id={name}
                        data-error-message={$lang($string('search.error.empty_field'))}
                        $$={$if(semantic_search_enabled)
                            .then(() => [
                                $$raw('placeholder="'),
                                $lang($string('search.quick_search.input_placeholder_semantic')),
                                $$raw('"'),
                            ])
                            .else(() => [$$raw('placeholder="'), $lang($string('search.quick_search.input_placeholder')), $$raw('"')])}
                        autoComplete="off"
                    />
                </div>
            </fieldset>
        </form>
        {/* html L25: <section class="quickSearchResults" data-bind="html: results"></section> */}
        <section className="quickSearchResults" data-bind="html: results"></section>
        {/* html L26-30:
           <p role="status"
              aria-live="polite"
              class="aria-description--hidden"
              data-search-aria-message-predefined-text="{{{lang 'search.results.quick_count_live'}}}"
           ></p>
        */}
        <p role="status" aria-live="polite" className="aria-description--hidden" data-search-aria-message-predefined-text={$_lang($string('search.results.quick_count_live'))}></p>
    </div>
));
