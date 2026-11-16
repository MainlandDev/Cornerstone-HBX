"use server";
import type {ThemeSettingsObject} from "@mainlanddev/hbx-bigcommerce";
import FacetedSearchRangeForm from "../faceted-search/range-form.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => {
    const settings = $pointer<ThemeSettingsObject>("theme_settings");
    return (
        <$If
            test={settings.shop_by_price_visibility}
            $then={() => (
                <div className="sidebarBlock">
                    <h2 className="sidebarBlock-heading heading-price" data-shop-by-price={""}>
                        <$Lang keyName={$string("category.shop_by_price")} />
                    </h2>

                    <FacetedSearchRangeForm shop_by_price={settings.shop_by_price_visibility} />

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
