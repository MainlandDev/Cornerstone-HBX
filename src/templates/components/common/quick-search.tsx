import {$Lang, $lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <div className="container">
        <form className="form" data-url={$pointer("urls.search")} data-quick-search-form={""}>
            <fieldset className="form-fieldset">
                <div className="form-field">
                    <label className="is-srOnly" htmlFor={$pointer("name")}>
                        <$Lang keyName={$string("search.quick_search.input_label")} />
                    </label>
                    <input
                        className="form-input"
                        data-search-quick={""}
                        name={$pointer("name")}
                        id={$pointer("name")}
                        data-error-message={$lang($string("search.error.empty_field"))}
                        placeholder={$lang($string("search.quick_search.input_placeholder"))}
                        autoComplete="off"
                    />
                </div>
            </fieldset>
        </form>
        <section className="quickSearchResults" data-bind="html: results"></section>
        <p
            role="status"
            aria-live="polite"
            className="aria-description--hidden"
            dangerouslyInlineAttributes={{
                attributes: `data-search-aria-message-predefined-text="${$raw("{{{lang 'search.results.quick_count_live'}}}")}"`,
            }}
        ></p>
    </div>
);
