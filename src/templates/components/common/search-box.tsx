/**
 * Source: templates/components/common/search-box.html (12 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint, SearchFormHint} from '@/context-common';

export default $asPartial<{
    urls: Hint['urls'];
    forms: SearchFormHint;
}>(({urls, forms}) => (
    /* html L1: <form class="form"  action="{{urls.search}}"> */
    <form className="form" action={urls.search}>
        {/* html L2: <fieldset class="form-fieldset"> */}
        <fieldset className="form-fieldset">
            {/* html L3: <div class="form-field"> */}
            <div className="form-field">
                {/* html L4: <label class="form-label is-srOnly" for="search_query_adv">{{lang 'search.results.form_label'}}</label> */}
                <label className="form-label is-srOnly" htmlFor="search_query_adv">
                    {/* html L4: {{lang 'search.results.form_label'}} */}
                    <$Lang translationKey={$string('search.results.form_label')}/>
                </label>
                {/* html L5: <div class="form-prefixPostfix wrap"> */}
                <div className="form-prefixPostfix wrap">
                    {/* html L6: <input class="form-input" id="search_query_adv" name="search_query_adv" value="{{forms.search.query}}"> */}
                    <input className="form-input" id="search_query_adv" name="search_query_adv" value={forms.search.query}/>
                    {/* html L7: <input class="button button--primary form-prefixPostfix-button--postfix" type="submit" value="{{lang 'search.results.form_button_text'}}"> */}
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
