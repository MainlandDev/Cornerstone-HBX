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
    <div className="container">
        <form className="form" data-url={urls.search} data-quick-search-form="">
            <fieldset className="form-fieldset">
                <div className="form-field">
                    <$If
                        query={[semantic_search_enabled]}
                        $then={() => (
                            <label className="is-srOnly" htmlFor={name}>
                                <$Lang translationKey={$string('search.quick_search.input_label_semantic')}/>
                            </label>
                        )}
                        $else={() => (
                            <label className="is-srOnly" htmlFor={name}>
                                <$Lang translationKey={$string('search.quick_search.input_label')}/>
                            </label>
                        )}
                    />
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
        <section className="quickSearchResults" data-bind="html: results"></section>
        <p role="status" aria-live="polite" className="aria-description--hidden" data-search-aria-message-predefined-text={$_lang($string('search.results.quick_count_live'))}></p>
    </div>
));
