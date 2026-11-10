/**
 * Source: templates/components/faceted-search/facets/hierarchy.html (35 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $string, $this, $unless, $if} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang, $_Sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$dashcase} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {FacetHint, HierarchyItemHint} from '@/context-misc';

export default $dynamic('hierarchy', () => {
    const facet = $this<Omit<FacetHint, 'items'> & {items: Array<HierarchyItemHint>}>();

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
                        {/* html L6: <ul id="facetedSearch-navList--{{dashcase facet}}" class="navList" data-facet="{{facet}}" data-has-more-results="{{has_more_results}}"> */}
                        <ul
                            id={`facetedSearch-navList--${$dashcase(facet.facet)}`}
                            className="navList"
                            data-facet={facet.facet}
                            data-has-more-results={facet.has_more_results}
                        >
                            {/* html L7: {{#each items}} */}
                            <$Each
                                list={facet.items}
                                $then={(item) => (
                                    /* html L8: <li class="navList-item"> */
                                    <li className="navList-item">
                                        {/* html L9-14:
                                           <a
                                               href="{{url}}"
                                               class="navList-action navList-action--checkbox{{#if selected }} is-selected{{/if}}{{#if has_sub_categories}} has-children{{/if}}"
                                               rel="nofollow"
                                               data-id="{{id}}"
                                               data-faceted-search-facet>
                                        */}
                                        <a
                                            href={item.url}
                                            className={`navList-action navList-action--checkbox${$if(item.selected).then(() => $$raw(' is-selected'))}${$if(item.has_sub_categories).then(() => $$raw(' has-children'))}`}
                                            rel="nofollow"
                                            data-id={item.id}
                                            data-faceted-search-facet=""
                                        >
                                            {/* html L15: {{{sanitize title}}} */}
                                            <$_Sanitize str={item.title}/>
                                            {/* html L16: {{#if ../show_product_counts}} */}
                                            <$If
                                                query={[facet.show_product_counts]}
                                                $then={() => /* html L17: <span>({{count}})</span> */ <span>({/* html L17: {{count}} */}{item.count})</span>}
                                            />
                                        </a>
                                        {/* html L20: {{#if children}} */}
                                        <$If
                                            query={[item.children]}
                                            $then={() => /* html L21: {{> components/faceted-search/facets/hierarchy-children children}} */ <$Partial name="components/faceted-search/facets/hierarchy-children" context={item.children}/>}
                                        />
                                    </li>
                                )}
                            />
                        </ul>

                        {/* html L27: {{#if show_more_toggle}} */}
                        <$If
                            query={[facet.show_more_toggle]}
                            $then={() => (
                                /* html L28: <a href="#facetedSearch-navList--{{dashcase facet}}" role="button" class="toggleLink"> */
                                <a href={`#facetedSearch-navList--${$dashcase(facet.facet)}`} role="button" className="toggleLink">
                                    {/* html L29: <span class="toggleLink-text toggleLink-text--off">{{lang 'search.faceted.show-more'}}</span> */}
                                    <span className="toggleLink-text toggleLink-text--off">
                                        {/* html L29: {{lang 'search.faceted.show-more'}} */}
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
