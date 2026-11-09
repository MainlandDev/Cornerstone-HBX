import {$Each, $If, $Partial} from '@mainlanddev/bigcommerce-react';
import {$asPartial, type ThemeContextHint, type ThemePageCategory} from '@mainlanddev/bigcommerce-react/theme';

type Hint = ThemeContextHint<ThemePageCategory>;

export default $asPartial<{category: Hint['category']; theme_settings: Hint['theme_settings']}>(({category, theme_settings}) => (
    <nav>
        <$If
            query={[category.subcategories]}
            $then={() => (
                <div className="sidebarBlock">
                    <h2 className="sidebarBlock-heading">{category.name}</h2>
                    <ul className="navList">
                        <$Each
                            list={category.subcategories}
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
            query={[category.faceted_search_enabled]}
            $then={() => <$Partial name="components/faceted-search/index" context={category}/>}
            $else={() => <$Partial name="components/category/shop-by-price" hash={{theme_settings: theme_settings, category: category}}/>}
        />
    </nav>
));
