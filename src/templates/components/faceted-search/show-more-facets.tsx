"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface FacetOption {
    id: string;
    url: string;
    title: string;
    count: number;
    selected: boolean;
}

interface Facet {
    items: FacetOption[];
}

export default (_props: PartialProps) => (
    <div className="modal-body">
        <h1 className="facet-quick-heading">
            <$If
                test={$pointer("facet_title")}
                $then={() => <>{$pointer("facet_title")}</>}
                $else={() => <>{$pointer("all_facets")}</>}
            />
        </h1>
        <div className="form-field" id="facetedSearch-filterItems">
            <input className="form-input" type="search" placeholder={$lang($string("forms.search.search"))} />
        </div>
        <ul className="navList facetedSearch-optionColumns">
            <$Each
                list={$pointer<Facet[]>("facets")}
                $then={() => (
                    <>
                        <$If
                            test={$pointer("facet")}
                            operator={$string("===")}
                            rvalue={$pointer("../all_facets")}
                            $then={() => (
                                <>
                                    <$Each
                                        list={$pointer<FacetOption[]>("items")}
                                        $then={(item) => (
                                            <li className="navList-item">
                                                <a
                                                    href={item.url}
                                                    className={`navList-action${$If({test: item.selected, $then: () => " is-active"})}`}
                                                    rel="nofollow"
                                                    data-id={item.id}
                                                    data-faceted-search-facet={""}
                                                >
                                                    {$unescaped(item.title)}{" "}
                                                    <$If
                                                        test={$pointer("../show_product_counts")}
                                                        $then={() => <$If test={item.count} $then={() => <span>({item.count})</span>} />}
                                                    />
                                                </a>
                                            </li>
                                        )}
                                    />
                                </>
                            )}
                        />
                    </>
                )}
            />
        </ul>
    </div>
);
