/**
 * Source: templates/components/brand/sidebar.html (22 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageBrand} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

type Hint = ThemeContextHint<ThemePageBrand>;

export default $asPartial<{brand: Hint['brand']; shop_by_brand: Hint['shop_by_brand']; urls: Hint['urls']}>(
    ({brand, shop_by_brand, urls}) => (
        /* html L1: <nav> */
        <nav>
            {/* html L2: {{#if brand.faceted_search_enabled}} */}
            <$If
                query={[brand.faceted_search_enabled]}
                $then={() => /* html L3: {{> components/faceted-search/index brand}} */ <$Partial name="components/faceted-search/index" context={brand}/>}
                $else={() => (
                    /* html L4: {{else}}
                                              html L5: {{#if shop_by_brand}}
                    */
                    <$If
                        query={[shop_by_brand]}
                        $then={() => (
                            /* html L6: <div class="sidebarBlock"> */
                            <div className="sidebarBlock">
                                {/* html L7: <h5 class="sidebarBlock-heading">{{lang 'brand.label'}}</h5> */}
                                <h5 className="sidebarBlock-heading">
                                    {/* html L7: {{lang 'brand.label'}} */}
                                    <$Lang translationKey={$string('brand.label')}/>
                                </h5>
                                {/* html L8: <ul class="navList"> */}
                                <ul className="navList">
                                    {/* html L9: {{#each shop_by_brand}} */}
                                    <$Each
                                        list={shop_by_brand}
                                        $then={(brandLink) => (
                                            /* html L10: <li class="navList-item"> */
                                            <li className="navList-item">
                                                {/* html L11: <a class="navList-action" href="{{url}}">{{name}}</a> */}
                                                <a className="navList-action" href={brandLink.url}>
                                                    {/* html L11: {{name}} */}
                                                    {brandLink.name}
                                                </a>
                                            </li>
                                        )}
                                    />
                                    {/* html L14: <li class="navList-item"> */}
                                    <li className="navList-item">
                                        {/* html L15: <a class="navList-action" href="{{urls.brands}}">{{lang 'common.view_all'}}</a> */}
                                        <a className="navList-action" href={urls.brands}>
                                            {/* html L15: {{lang 'common.view_all'}} */}
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
