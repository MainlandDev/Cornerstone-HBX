import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint, SearchFormHint} from '@/context-common';

export default $asPartial<{
    urls: Hint['urls'];
    forms: SearchFormHint;
}>(({urls, forms}) => (
    <form className="form" action={urls.search}>
        <fieldset className="form-fieldset">
            <div className="form-field">
                <label className="form-label is-srOnly" htmlFor="search_query_adv">
                    <$Lang translationKey={$string('search.results.form_label')}/>
                </label>
                <div className="form-prefixPostfix wrap">
                    <input className="form-input" id="search_query_adv" name="search_query_adv" value={forms.search.query}/>
                    <input
                        className="button button--primary form-prefixPostfix-button--postfix"
                        type="submit"
                        value={$lang($string('search.results.form_button_text'))}
                    />
                </div>
            </div>
        </fieldset>
    </form>
));
