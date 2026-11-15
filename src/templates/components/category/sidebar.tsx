import {$Each, $If, $partial, $pointer, place} from "@mainlanddev/hbx-bigcommerce";

interface Subcategory {
    url: string;
    name: string;
}

export default () => (
    <nav>
        <$If
            test={$pointer("category.subcategories")}
            $then={() => (
                <div className="sidebarBlock">
                    <h2 className="sidebarBlock-heading">{$pointer("category.name")}</h2>
                    <ul className="navList">
                        <$Each
                            list={$pointer<Subcategory[]>("category.subcategories")}
                            $then={(subcategory) => (
                                <li className="navList-item">
                                    <a className="navList-action" href={subcategory.url} title={subcategory.name}>
                                        {subcategory.name}
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                </div>
            )}
        />

        <$If
            test={$pointer("category.faceted_search_enabled")}
            $then={() => place($partial("components/faceted-search/index", $pointer("category")))}
            $else={() => place($partial("components/category/shop-by-price"))}
        />
    </nav>
);
