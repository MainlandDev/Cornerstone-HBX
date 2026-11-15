import {$Each, $If, $Lang, $lang, $pointer, $raw, $string, $sanitize, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface SelectedFacet {
    url: string;
    title: string;
}

export default () => (
    <div className="facetedSearch-refineFilters sidebarBlock" role="region" aria-label={$lang($string("search.faceted.selected.facet-label"))}>
        <h2 className="sidebarBlock-heading">
            <$Lang keyName={$string("search.faceted.selected.title")} />
        </h2>

        <$If
            test={$pointer("items")}
            $then={() => (
                <ul className="inlineList inlineList--labels">
                    <$Each
                        list={$pointer<SelectedFacet[]>("items")}
                        $then={(item) => (
                            <li>
                                <a href={item.url} className="facetLabel" rel="nofollow" data-faceted-search-facet={""}>
                                    {$raw("{{#if facet '===' 'rating'}}")}
                                    <$Lang keyName={$string("search.faceted.selected.rating-label")} rating={item.title} />
                                    {$raw("{{else}}")}
                                    {$unescaped($sanitize(item.title))}
                                    {$raw("{{/if}}")}{" "}
                                    <svg className="icon">
                                        <use href="#icon-close" />
                                    </svg>
                                </a>
                            </li>
                        )}
                    />
                </ul>
            )}
            $else={() => (
                <p>
                    <$Lang keyName={$string("search.faceted.selected.no-filters")} />
                </p>
            )}
        />

        <$If
            test={$pointer("remove_all_url")}
            $then={() => (
                <a href={$pointer("remove_all_url")} data-faceted-search-facet={""}>
                    <$Lang keyName={$string("search.faceted.selected.clear-all")} />
                </a>
            )}
        />
    </div>
);
