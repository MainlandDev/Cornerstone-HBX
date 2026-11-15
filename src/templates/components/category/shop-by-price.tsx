import {$$themeSettings, $If, $Lang, $partial, $pointer, $string, place} from "@mainlanddev/hbx-bigcommerce";

export default () => {
    const settings = $$themeSettings();
    return (
        <$If
            test={settings.shop_by_price_visibility}
            $then={() => (
                <div className="sidebarBlock">
                    <h2 className="sidebarBlock-heading heading-price" data-shop-by-price={""}>
                        <$Lang keyName={$string("category.shop_by_price")} />
                    </h2>

                    {place($partial("components/faceted-search/range-form", {shop_by_price: settings.shop_by_price_visibility}))}

                    <div className="reset-filters">
                        <a href={$pointer("category.url")} className="navList-action reset-btn">
                            <$Lang keyName={$string("category.reset")} />
                        </a>{" "}
                        <span className="reset-message aria-description--hidden">
                            <$Lang keyName={$string("category.filter_reset_announcement")} />
                        </span>
                    </div>
                </div>
            )}
        />
    );
};
