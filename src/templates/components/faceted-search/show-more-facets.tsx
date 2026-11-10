/**
 * Source: templates/components/faceted-search/show-more-facets.html (37 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $if, $string, $this, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ShowMoreFacetsHint} from '@/context-misc';

/** Positional context: the listing (`brand`, `category` or `product_results`) whose facets are shown in the modal. */
export default $asPartial(() => {
    const listing = $this<ShowMoreFacetsHint>();

    return (
        /* html L1: <div class="modal-body"> */
        <div className="modal-body">
            {/* html L2: <h1 class="facet-quick-heading"> */}
            <h1 className="facet-quick-heading">
                {/* html L3: {{#if facet_title}} */}
                <$If
                    query={[listing.facet_title]}
                    $then={() => <>{/* html L4: {{facet_title}} */}{listing.facet_title}</>}
                    $else={() => <>{/* html L5: {{else}}
                                                                            html L6: {{all_facets}}
                                   */}{listing.all_facets}</>}
                />
            </h1>
            {/* html L9: <div class="form-field" id="facetedSearch-filterItems"> */}
            <div className="form-field" id="facetedSearch-filterItems">
                {/* html L10: <input class="form-input" type="search" placeholder="{{lang 'forms.search.search'}}"> */}
                <input className="form-input" type="search" placeholder={$lang($string('forms.search.search'))}/>
            </div>
            {/* html L12: <ul class="navList facetedSearch-optionColumns"> */}
            <ul className="navList facetedSearch-optionColumns">
                {/* html L13: {{#each facets}} */}
                <$Each
                    list={listing.facets}
                    $then={(facet) => (
                        /* html L14: {{#if facet '===' ../all_facets}} */
                        <$If
                            query={[facet.facet, '===', listing.all_facets]}
                            $then={() => (
                                /* html L15: {{#each items}} */
                                <$Each
                                    list={facet.items}
                                    $then={(item) => (
                                        /* html L16: <li class="navList-item"> */
                                        <li className="navList-item">
                                            {/* html L17-23:
                                               <a
                                               href="{{url}}"
                                               class="navList-action{{#if selected}} is-active{{/if}}"
                                               rel="nofollow"
                                               data-id="{{id}}"
                                               data-faceted-search-facet
                                               >
                                            */}
                                            <a
                                                href={item.url}
                                                className={`navList-action${$if(item.selected).then(() => $$raw(' is-active'))}`}
                                                rel="nofollow"
                                                data-id={item.id}
                                                data-faceted-search-facet=""
                                            >
                                                {/* html L24: {{{title}}} */}
                                                {$unescaped(item.title)}
                                                {/* html L25: {{#if ../show_product_counts}} */}
                                                <$If
                                                    query={[facet.show_product_counts]}
                                                    $then={() => (
                                                        /* html L26: {{#if count}} */
                                                        <$If query={[item.count]} $then={() => /* html L27: <span>({{count}})</span> */ <span>({/* html L27: {{count}} */}{item.count})</span>}/>
                                                    )}
                                                />
                                            </a>
                                        </li>
                                    )}
                                />
                            )}
                        />
                    )}
                />
            </ul>
        </div>
    );
});
