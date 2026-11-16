"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <form className="form" action={$pointer("urls.search")}>
        <fieldset className="form-fieldset">
            <div className="form-field">
                <label className="form-label is-srOnly" htmlFor="search_query_adv">
                    <$Lang keyName={$string("search.results.form_label")} />
                </label>
                <div className="form-prefixPostfix wrap">
                    <input className="form-input" id="search_query_adv" name="search_query_adv" value={$pointer("forms.search.query")} />
                    <input
                        className="button button--primary form-prefixPostfix-button--postfix"
                        type="submit"
                        value={$lang($string("search.results.form_button_text"))}
                    />
                </div>
            </div>
        </fieldset>
    </form>
);
