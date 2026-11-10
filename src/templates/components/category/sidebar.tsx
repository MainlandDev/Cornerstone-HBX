/**
 * Source: templates/components/category/sidebar.html (21 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCategory} from '@mainlanddev/bigcommerce-react/theme';

type Hint = ThemeContextHint<ThemePageCategory>;

export default $asPartial<{category: Hint['category']; theme_settings: Hint['theme_settings']}>(({category, theme_settings}) => (
    /* html L1: <nav> */
    <nav>
        {/* html L2: {{#if category.subcategories}} */}
        <$If
            query={[category.subcategories]}
            $then={() => (
                /* html L3: <div class="sidebarBlock"> */
                <div className="sidebarBlock">
                    {/* html L4: <h2 class="sidebarBlock-heading">{{category.name}}</h2> */}
                    <h2 className="sidebarBlock-heading">{/* html L4: {{category.name}} */}{category.name}</h2>
                    {/* html L5: <ul class="navList"> */}
                    <ul className="navList">
                        {/* html L6: {{#each category.subcategories}} */}
                        <$Each
                            list={category.subcategories}
                            $then={(subcategory) => (
                                /* html L7: <li class="navList-item"> */
                                <li className="navList-item">
                                    {/* html L8: <a class="navList-action" href="{{url}}" title="{{name}}">{{name}}</a> */}
                                    <a className="navList-action" href={subcategory.url} title={subcategory.name}>
                                        {/* html L8: {{name}} */}
                                        {subcategory.name}
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                </div>
            )}
        />

        {/* html L15: {{#if category.faceted_search_enabled}} */}
        <$If
            query={[category.faceted_search_enabled]}
            $then={() => /* html L16: {{> components/faceted-search/index category}} */ <$Partial name="components/faceted-search/index" context={category}/>}
            $else={() => /* html L17: {{else}}
                                                        html L18: {{> components/category/shop-by-price}}
                         */ <$Partial name="components/category/shop-by-price" hash={{theme_settings: theme_settings, category: category}}/>}
        />
    </nav>
));
