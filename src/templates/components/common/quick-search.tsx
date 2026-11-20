"use server";
import {$if, type PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";
import type { $hb } from "@mainlanddev/hbx-bigcommerce/grammar";

export default (_props: PartialProps) => (
    <div className="container">
        <form className="form" data-url={$pointer("urls.search")} data-quick-search-form={""}>
            <fieldset className="form-fieldset">
                <div className="form-field">
                    <$If test={$pointer<$hb<boolean>>("semantic_search_enabled")} $then={()=>{
                        return <label className="is-srOnly" htmlFor={$pointer("name")}>
                            <$Lang keyName={$string("search.quick_search.input_label_semantic")} />
                        </label>
                    }} $else={()=>{
                        return <label className="is-srOnly" htmlFor={$pointer("name")}>
                            <$Lang keyName={$string("search.quick_search.input_label")} />
                        </label>
                    }}/>
                    <input
                        className="form-input"
                        data-search-quick={""}
                        name={$pointer("name")}
                        id={$pointer("name")}
                        data-error-message={$lang($string("search.error.empty_field"))}
                        autoComplete="off"
                        dangerouslyInlineAttributes={{
                            attributes: `${$if($pointer<$hb<boolean>>("semantic_search_enabled")).then(()=>{
                                return [$raw('placeholder="'), $lang($string("search.quick_search.input_placeholder_semantic")), $raw('"')]
                            }).else(()=>{
                                return [$raw('placeholder="'), $lang($string("search.quick_search.input_placeholder")), $raw('"')]
                            })}`
                        }}
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
