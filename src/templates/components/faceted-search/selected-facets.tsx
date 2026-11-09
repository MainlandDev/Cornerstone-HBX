import {$Each, $If, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $_Sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {SelectedFacetsHint} from '@/context-misc';

/** Positional context: the `selected` object of a faceted-search listing. */
export default $asPartial(() => {
    const selected = $this<SelectedFacetsHint>();

    return (
        <div className="facetedSearch-refineFilters sidebarBlock" role="region" aria-label={$lang($string('search.faceted.selected.facet-label'))}>
            <h2 className="sidebarBlock-heading">
                <$Lang translationKey={$string('search.faceted.selected.title')}/>
            </h2>

            <$If
                query={[selected.items]}
                $then={() => (
                    <ul className="inlineList inlineList--labels">
                        <$Each
                            list={selected.items}
                            $then={(item) => (
                                <li>
                                    <a href={item.url} className="facetLabel" rel="nofollow" data-faceted-search-facet="">
                                        <$If
                                            query={[item.facet, '===', $string('rating')]}
                                            $then={() => (
                                                <$Lang translationKey={$string('search.faceted.selected.rating-label')} params={{rating: item.title}}/>
                                            )}
                                            $else={() => <$_Sanitize str={item.title}/>}
                                        />

                                        <svg className="icon">
                                            <use href="#icon-close"/>
                                        </svg>
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                )}
                $else={() => (
                    <p>
                        <$Lang translationKey={$string('search.faceted.selected.no-filters')}/>
                    </p>
                )}
            />

            <$If
                query={[selected.remove_all_url]}
                $then={() => (
                    <a href={selected.remove_all_url} data-faceted-search-facet="">
                        <$Lang translationKey={$string('search.faceted.selected.clear-all')}/>
                    </a>
                )}
            />
        </div>
    );
});
