/**
 * Source: templates/components/faceted-search/facets/range.html (8 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $this, $unless} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$dashcase} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {FacetHint} from '@/context-misc';

export default $dynamic('range', () => {
    const facet = $this<FacetHint>();

    return (
        /* html L1: <div class="accordion-block"> */
        <div className="accordion-block">
            {/* html L2: {{> components/faceted-search/faceted-search-navigation}} */}
            <$Partial name="components/faceted-search/faceted-search-navigation"/>

            {/* html L4: <div id="facetedSearch-content--{{dashcase facet}}" class="accordion-content{{#unless start_collapsed}} is-open{{/unless}}"> */}
            <div
                id={`facetedSearch-content--${$dashcase(facet.facet)}`}
                className={`accordion-content${$unless(facet.start_collapsed).then(() => $$raw(' is-open'))}`}
            >
                {/* html L5: {{> components/faceted-search/range-form}} */}
                <$Partial name="components/faceted-search/range-form"/>
            </div>
        </div>
    );
});
