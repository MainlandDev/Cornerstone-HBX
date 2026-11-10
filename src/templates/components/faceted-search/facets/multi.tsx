/**
 * Source: templates/components/faceted-search/facets/multi.html (37 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string, $this, $unless, $if} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang, $_Sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$dashcase} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {FacetHint} from '@/context-misc';

export default $dynamic('multi', () => {
    const facet = $this<FacetHint>();

    return (
        /* html L1: {{#if items}} */
        <$If
            query={[facet.items]}
            $then={() => (
                /* html L2: <div class="accordion-block"> */
                <div className="accordion-block">
                    {/* html L3: {{> components/faceted-search/faceted-search-navigation}} */}
                    <$Partial name="components/faceted-search/faceted-search-navigation"/>

                    {/* html L5: <div id="facetedSearch-content--{{dashcase facet}}" class="accordion-content{{#unless start_collapsed}} is-open{{/unless}}"> */}
                    <div
                        id={`facetedSearch-content--${$dashcase(facet.facet)}`}
                        className={`accordion-content${$unless(facet.start_collapsed).then(() => $$raw(' is-open'))}`}
                    >
                        {/* html L6: <ul id="facetedSearch-navList--{{dashcase facet}}" data-facet="{{facet}}" class="navList" data-has-more-results="{{has_more_results}}"> */}
                        <ul
                            id={`facetedSearch-navList--${$dashcase(facet.facet)}`}
                            data-facet={facet.facet}
                            className="navList"
                            data-has-more-results={facet.has_more_results}
                        >
                            {/* html L7: {{#each items}} */}
                            <$Each
                                list={facet.items}
                                $then={(item) => (
                                    /* html L8: <li class="navList-item"> */
                                    <li className="navList-item">
                                        {/* html L9-13:
                                           <a
                                               href="{{url}}"
                                               class="navList-action navList-action--checkbox{{#if selected}} is-selected{{/if}}"
                                               rel="nofollow"
                                               data-faceted-search-facet>
                                        */}
                                        <a
                                            href={item.url}
                                            className={`navList-action navList-action--checkbox${$if(item.selected).then(() => $$raw(' is-selected'))}`}
                                            rel="nofollow"
                                            data-faceted-search-facet=""
                                        >
                                            {/* html L14: {{{sanitize title}}} */}
                                            <$_Sanitize str={item.title}/>
                                            {/* html L15: {{#if ../show_product_counts}} */}
                                            <$If
                                                query={[facet.show_product_counts]}
                                                $then={() => /* html L16: <span>({{count}})</span> */ <span>({/* html L16: {{count}} */}{item.count})</span>}
                                            />

                                            {/* html L19: <span class="navList-action-close" aria-hidden="true"> */}
                                            <span className="navList-action-close" aria-hidden="true">
                                                {/* html L20: <svg class="icon"> */}
                                                <svg className="icon">
                                                    {/* html L21: <use href="#icon-close"/> */}
                                                    <use href="#icon-close"/>
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                )}
                            />
                        </ul>

                        {/* html L29: {{#if show_more_toggle}} */}
                        <$If
                            query={[facet.show_more_toggle]}
                            $then={() => (
                                /* html L30: <a href="#facetedSearch-navList--{{dashcase facet}}" role="button" class="toggleLink"> */
                                <a href={`#facetedSearch-navList--${$dashcase(facet.facet)}`} role="button" className="toggleLink">
                                    {/* html L31: <span class="toggleLink-text toggleLink-text--off">{{lang 'search.faceted.show-more'}}</span> */}
                                    <span className="toggleLink-text toggleLink-text--off">
                                        {/* html L31: {{lang 'search.faceted.show-more'}} */}
                                        <$Lang translationKey={$string('search.faceted.show-more')}/>
                                    </span>
                                </a>
                            )}
                        />
                    </div>
                </div>
            )}
        />
    );
});
