"use server";
import FacetedSearchFacetsHierarchyChildren from "./hierarchy-children.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $pointer, $sanitize, $this, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface ChildFacet {
    id: string;
    url: string;
    title: string;
    count: number;
    selected: boolean;
    has_sub_categories: boolean;
    children: ChildFacet[];
}

export default (_props: PartialProps) => (
    <ul className="navList navList--inner">
        <$Each
            list={$this<ChildFacet[]>()}
            $then={(item) => (
                <li className="navList-item">
                    <a
                        href={item.url}
                        className={`navList-action navList-action--checkbox${$If({test: item.selected, $then: () => " is-selected"})}${$If({test: item.has_sub_categories, $then: () => " has-children"})}`}
                        rel="nofollow"
                        data-id={item.id}
                        data-faceted-search-facet={""}
                    >
                        {$unescaped($sanitize(item.title))}{" "}
                        <$If
                            test={$pointer("../show_product_counts")}
                            $then={() => <$If test={item.count} $then={() => <span>({item.count})</span>} />}
                        />
                    </a>
                    <$If
                        test={item.children}
                        $then={() => <FacetedSearchFacetsHierarchyChildren $positionalHash={item.children} />}
                    />
                </li>
            )}
        />
    </ul>
);
