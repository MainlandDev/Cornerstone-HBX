import {$Each, $If, $Lang, $partial, $pointer, $string, place} from "@mainlanddev/hbx-bigcommerce";

interface ShopByBrand {
    url: string;
    name: string;
}

export default () => (
    <nav>
        <$If
            test={$pointer("brand.faceted_search_enabled")}
            $then={() => place($partial("components/faceted-search/index", $pointer("brand")))}
            $else={() => (
                <$If
                    test={$pointer("shop_by_brand")}
                    $then={() => (
                        <div className="sidebarBlock">
                            <h5 className="sidebarBlock-heading">
                                <$Lang keyName={$string("brand.label")} />
                            </h5>
                            <ul className="navList">
                                <$Each
                                    list={$pointer<ShopByBrand[]>("shop_by_brand")}
                                    $then={(brand) => (
                                        <li className="navList-item">
                                            <a className="navList-action" href={brand.url}>
                                                {brand.name}
                                            </a>
                                        </li>
                                    )}
                                />
                                <li className="navList-item">
                                    <a className="navList-action" href={$pointer("urls.brands")}>
                                        <$Lang keyName={$string("common.view_all")} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                />
            )}
        />
    </nav>
);
