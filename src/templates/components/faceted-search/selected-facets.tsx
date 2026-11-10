/**
 * Source: templates/components/faceted-search/selected-facets.html (38 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $_Sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {SelectedFacetsHint} from '@/context-misc';

/** Positional context: the `selected` object of a faceted-search listing. */
export default $asPartial(() => {
    const selected = $this<SelectedFacetsHint>();

    return (
        /* html L1: <div class="facetedSearch-refineFilters sidebarBlock" role="region" aria-label="{{lang 'search.faceted.selected.facet-label'}}"> */
        <div className="facetedSearch-refineFilters sidebarBlock" role="region" aria-label={$lang($string('search.faceted.selected.facet-label'))}>
            {/* html L2: <h2 class="sidebarBlock-heading"> */}
            <h2 className="sidebarBlock-heading">
                {/* html L3: {{lang 'search.faceted.selected.title'}} */}
                <$Lang translationKey={$string('search.faceted.selected.title')}/>
            </h2>

            {/* html L6: {{#if items}} */}
            <$If
                query={[selected.items]}
                $then={() => (
                    /* html L7: <ul class="inlineList inlineList--labels"> */
                    <ul className="inlineList inlineList--labels">
                        {/* html L8: {{#each items}} */}
                        <$Each
                            list={selected.items}
                            $then={(item) => (
                                /* html L9: <li> */
                                <li>
                                    {/* html L10-14:
                                       <a href="{{url}}"
                                          class="facetLabel"
                                          rel="nofollow"
                                          data-faceted-search-facet
                                       >
                                    */}
                                    <a href={item.url} className="facetLabel" rel="nofollow" data-faceted-search-facet="">
                                        {/* html L15: {{#if facet '===' 'rating'}} */}
                                        <$If
                                            query={[item.facet, '===', $string('rating')]}
                                            $then={() => (
                                                /* html L16: {{lang 'search.faceted.selected.rating-label' rating=title}} */
                                                <$Lang translationKey={$string('search.faceted.selected.rating-label')} params={{rating: item.title}}/>
                                            )}
                                            $else={() => /* html L17: {{else}}
                                                                                                                        html L18: {{{sanitize title}}}
                                                         */ <$_Sanitize str={item.title}/>}
                                        />

                                        {/* html L21: <svg class="icon"> */}
                                        <svg className="icon">
                                            {/* html L22: <use href="#icon-close" /> */}
                                            <use href="#icon-close"/>
                                        </svg>
                                    </a>
                                </li>
                            )}
                        />
                    </ul>
                )}
                $else={() => (
                    /* html L28: {{else}}
                                              html L29: <p>{{lang 'search.faceted.selected.no-filters'}}</p>
                    */
                    <p>
                        {/* html L29: {{lang 'search.faceted.selected.no-filters'}} */}
                        <$Lang translationKey={$string('search.faceted.selected.no-filters')}/>
                    </p>
                )}
            />

            {/* html L32: {{#if remove_all_url}} */}
            <$If
                query={[selected.remove_all_url]}
                $then={() => (
                    /* html L33: <a href="{{remove_all_url}}" data-faceted-search-facet> */
                    <a href={selected.remove_all_url} data-faceted-search-facet="">
                        {/* html L34: {{lang 'search.faceted.selected.clear-all'}} */}
                        <$Lang translationKey={$string('search.faceted.selected.clear-all')}/>
                    </a>
                )}
            />
        </div>
    );
});
