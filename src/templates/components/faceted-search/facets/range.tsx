import {$Partial, $this, $unless} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$dashcase} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {FacetHint} from '@/context-misc';

export default $dynamic('range', () => {
    const facet = $this<FacetHint>();

    return (
        <div className="accordion-block">
            <$Partial name="components/faceted-search/faceted-search-navigation"/>

            <div
                id={`facetedSearch-content--${$dashcase(facet.facet)}`}
                className={`accordion-content${$unless(facet.start_collapsed).then(() => $$raw(' is-open'))}`}
            >
                <$Partial name="components/faceted-search/range-form"/>
            </div>
        </div>
    );
});
