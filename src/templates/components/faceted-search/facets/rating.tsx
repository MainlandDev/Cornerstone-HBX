/**
 * Source: templates/components/faceted-search/facets/rating.html (27 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string, $this, $unless, $if} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$dashcase} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {FacetHint} from '@/context-misc';

export default $dynamic('rating', () => {
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

                    {/* html L5: <div id="facetedSearch-content--{{dashcase facet}}" class="accordion-content facetedSearch-content--{{dashcase facet}}{{#unless start_collapsed}} is-open{{/unless}}"> */}
                    <div
                        id={`facetedSearch-content--${$dashcase(facet.facet)}`}
                        className={`accordion-content facetedSearch-content--${$dashcase(facet.facet)}${$unless(facet.start_collapsed).then(() => $$raw(' is-open'))}`}
                    >
                        {/* html L6: <ul class="navList"> */}
                        <ul className="navList">
                            {/* html L7: {{#each items}} */}
                            <$Each
                                list={facet.items}
                                $then={(item) => (
                                    /* html L8: <li class="navList-item"> */
                                    <li className="navList-item">
                                        {/* html L9-12:
                                           <a href="{{url}}"
                                              class="navList-action{{#if selected}} is-selected{{/if}}"
                                              rel="nofollow"
                                              data-faceted-search-facet>
                                        */}
                                        <a
                                            href={item.url}
                                            className={`navList-action${$if(item.selected).then(() => $$raw(' is-selected'))}`}
                                            rel="nofollow"
                                            data-faceted-search-facet=""
                                        >
                                            {/* html L13: <span class="rating--small"> */}
                                            <span className="rating--small">
                                                {/* html L14: {{> components/products/ratings rating=title}} */}
                                                <$Partial name="components/products/ratings" hash={{rating: item.title}}/>
                                            </span>
                                            {/* html L16: {{lang 'search.faceted.rating.and-up'}} */}
                                            <$Lang translationKey={$string('search.faceted.rating.and-up')}/>
                                            {/* html L17: {{#if ../show_product_counts}} */}
                                            <$If
                                                query={[facet.show_product_counts]}
                                                $then={() => /* html L18: <span>({{count}})</span> */ <span>({/* html L18: {{count}} */}{item.count})</span>}
                                            />
                                        </a>
                                    </li>
                                )}
                            />
                        </ul>
                    </div>
                </div>
            )}
        />
    );
});
