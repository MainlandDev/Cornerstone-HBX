/**
 * Source: templates/components/faceted-search/index.html (48 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $boolean, $number, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Any, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$join, $lang, $pluck, $toLowerCase, $_dynamicComponent} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {FacetedSearchHint} from '@/context-misc';

/** Positional context: the listing (`brand`, `category` or `product_results`) that carries `facets` and `selected`. */
export default $asPartial(() => {
    const listing = $this<FacetedSearchHint>();

    return (
        /* html L1: <div id="facetedSearch" class="facetedSearch sidebarBlock" role="region" aria-label="{{lang 'search.faceted.label'}}"> */
        <div id="facetedSearch" className="facetedSearch sidebarBlock" role="region" aria-label={$lang($string('search.faceted.label'))}>
            {/* html L2: {{> components/faceted-search/selected-facets selected}} */}
            <$Partial name="components/faceted-search/selected-facets" context={listing.selected}/>

            {/* html L4: <a href="#facetedSearch-navList" role="button" class="facetedSearch-toggle toggleLink" data-collapsible> */}
            <a href="#facetedSearch-navList" role="button" className="facetedSearch-toggle toggleLink" data-collapsible="">
                {/* html L5: <span class="facetedSearch-toggle-text"> */}
                <span className="facetedSearch-toggle-text">
                    {/* html L6: {{#if facets.length '>' 2}} */}
                    <$If
                        query={[listing.facets.length, '>', $number(2)]}
                        $then={() => (
                            <>
                                {/* html L7: {{lang 'search.faceted.browse-by'}} {{join (pluck facets 'title') ', ' limit=2}} &amp; {{toLowerCase (lang 'search.faceted.more')}} */}
                                <$Lang translationKey={$string('search.faceted.browse-by')}/>{' '}
                                {/* html L7: {{join (pluck facets 'title') ', ' limit=2}} */}
                                {$join($pluck(listing.facets, $string('title')), $string(', '), {limit: $number(2)})} &amp;{' '}
                                {/* html L7: {{toLowerCase (lang 'search.faceted.more')}} */}
                                {$toLowerCase($lang($string('search.faceted.more')))}
                            </>
                        )}
                        $else={() => (
                            <>
                                {/* html L8: {{else}}
                                                                      html L9: {{lang 'search.faceted.browse-by'}} {{join (pluck facets 'title') ', ' lastSeparator=' & '}}
                                */}
                                <$Lang translationKey={$string('search.faceted.browse-by')}/>{' '}
                                {/* html L9: {{join (pluck facets 'title') ', ' lastSeparator=' & '}} */}
                                {$join($pluck(listing.facets, $string('title')), $string(', '), {lastSeparator: $string(' & ')})}
                            </>
                        )}
                    />
                </span>

                {/* html L13: <span class="facetedSearch-toggle-indicator"> */}
                <span className="facetedSearch-toggle-indicator">
                    {/* html L14: <span class="toggleLink-text toggleLink-text--on"> */}
                    <span className="toggleLink-text toggleLink-text--on">
                        {/* html L15: {{lang 'search.faceted.hide-filters'}} */}
                        <$Lang translationKey={$string('search.faceted.hide-filters')}/>

                        {/* html L17: <i class="icon" aria-hidden="true"> */}
                        <i className="icon" aria-hidden="true">
                            {/* html L18: <svg><use href="#icon-keyboard-arrow-up"/></svg> */}
                            <svg>
                                {/* html L18: <use href="#icon-keyboard-arrow-up"/> */}
                                <use href="#icon-keyboard-arrow-up"/>
                            </svg>
                        </i>
                    </span>

                    {/* html L22: <span class="toggleLink-text toggleLink-text--off"> */}
                    <span className="toggleLink-text toggleLink-text--off">
                        {/* html L23: {{lang 'search.faceted.show-filters'}} */}
                        <$Lang translationKey={$string('search.faceted.show-filters')}/>

                        {/* html L25: <i class="icon" aria-hidden="true"> */}
                        <i className="icon" aria-hidden="true">
                            {/* html L26: <svg><use href="#icon-keyboard-arrow-down"/></svg> */}
                            <svg>
                                {/* html L26: <use href="#icon-keyboard-arrow-down"/> */}
                                <use href="#icon-keyboard-arrow-down"/>
                            </svg>
                        </i>
                    </span>
                </span>
            </a>

            {/* html L32: {{#any facets visible=true}} */}
            <$Any
                list={listing.facets}
                predicate={{visible: $boolean(true)}}
                $then={() => (
                    /* html L33-35:
                       <div id="facetedSearch-navList"
                           class="facetedSearch-navList"
                       >
                    */
                    <div id="facetedSearch-navList" className="facetedSearch-navList">
                        {/* html L36: <div class="accordion accordion--navList"> */}
                        <div className="accordion accordion--navList">
                            {/* html L37: {{#each facets}} */}
                            <$Each
                                list={listing.facets}
                                $then={(facet) => (
                                    /* html L38: {{#if visible}} */
                                    <$If query={[facet.visible]} $then={() => <>{/* html L39: {{{dynamicComponent 'components/faceted-search/facets'}}} */}{$_dynamicComponent($string('components/faceted-search/facets'))}</>}/>
                                )}
                            />
                        </div>

                        {/* html L44: <div class="blocker" style="display: none;"></div> */}
                        <div className="blocker" style={{display: 'none'}}></div>
                    </div>
                )}
            />
        </div>
    );
});
