import ModalModalCloseBtn from "../common/modal/modal-close-btn.tsx";
import {$add, $boolean, $Each, $If, $lang, $number, $partial, $pointer, $sanitize, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$If
        test={$pointer("product_results.products")}
        $then={() => (
            <>
                <ModalModalCloseBtn additional_attr={$string("data-drop-down-close")} />
                <ul className="productGrid" data-list-name="Quick Search Results">
                    <$Each
                        list={$pointer<unknown[]>("product_results.products")}
                        $then={() => (
                            <li className="product">
                                {$partial("components/products/card", {
                                        settings: $pointer("../settings"),
                                        alternate: $boolean(true),
                                        show_compare: $pointer("../show_compare"),
                                        theme_settings: $pointer("../theme_settings"),
                                        customer: $pointer("../customer"),
                                        event: $string("list"),
                                        position: $add($pointer<number>("@index"), $number(1)),
                                    })}
                            </li>
                        )}
                    />
                </ul>
            </>
        )}
        $else={() => (
            <p className="quickSearchMessage">
                {$unescaped(
                    $lang($string("search.results.quick_count"), {
                        count: $pointer<number>("pagination.product_results.total"),
                        search_query: $sanitize($pointer("forms.search.query")),
                    }),
                )}
            </p>
        )}
    />
);
