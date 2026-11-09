import {$Each, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageBrand} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

type Hint = ThemeContextHint<ThemePageBrand>;

export default $asPartial<{brand: Hint['brand']; shop_by_brand: Hint['shop_by_brand']; urls: Hint['urls']}>(
    ({brand, shop_by_brand, urls}) => (
        <nav>
            <$If
                query={[brand.faceted_search_enabled]}
                $then={() => <$Partial name="components/faceted-search/index" context={brand}/>}
                $else={() => (
                    <$If
                        query={[shop_by_brand]}
                        $then={() => (
                            <div className="sidebarBlock">
                                <h5 className="sidebarBlock-heading">
                                    <$Lang translationKey={$string('brand.label')}/>
                                </h5>
                                <ul className="navList">
                                    <$Each
                                        list={shop_by_brand}
                                        $then={(brandLink) => (
                                            <li className="navList-item">
                                                <a className="navList-action" href={brandLink.url}>
                                                    {brandLink.name}
                                                </a>
                                            </li>
                                        )}
                                    />
                                    <li className="navList-item">
                                        <a className="navList-action" href={urls.brands}>
                                            <$Lang translationKey={$string('common.view_all')}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    />
                )}
            />
        </nav>
    ),
);
