/**
 * Source: templates/components/common/navigation-list-alternate.html (21 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $if, $Partial, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import type {CategoryNodeHint} from '@/context-common';

/** Category item in the alternate navigation design. Called by name with `context={$this()}`. */
export default $asPartial<CategoryNodeHint>(({id, name, url, is_active, children}) => (
    /* html L1: {{#if children}} */
    <$If
        query={[children]}
        $then={() => (
            <>
                {/* html L2-6:
                   <a class="navPages-action navPages-action-depth-max has-subMenu is-root{{#if is_active}} activePage{{/if}}"
                      href="{{url}}"
                      data-collapsible="navPages-{{id}}"
                      aria-label="{{name}}"
                   >
                */}
                <a
                    className={`navPages-action navPages-action-depth-max has-subMenu is-root${$if(is_active).then(() => $$raw(' activePage'))}`}
                    href={url}
                    data-collapsible={`navPages-${id}`}
                    aria-label={name}
                >
                    {/* html L7: {{name}} */}
                    {name}
                    {/* html L8: <i class="icon navPages-action-moreIcon" aria-hidden="true"> */}
                    <i className="icon navPages-action-moreIcon" aria-hidden="true">
                        {/* html L9: <svg><use href="#icon-chevron-down" /></svg> */}
                        <svg>
                            {/* html L9: <use href="#icon-chevron-down" /> */}
                            <use href="#icon-chevron-down"/>
                        </svg>
                    </i>
                </a>
                {/* html L12: {{> components/common/navigation-dropdown}} */}
                <$Partial name="components/common/navigation-dropdown" context={$this()}/>
            </>
        )}
        $else={() => (
            /* html L13: {{else}}
                              html L14-17:
               <a class="navPages-action{{#if is_active}} activePage{{/if}}"
                  href="{{url}}"
                  aria-label="{{name}}"
               >
            */
            <a className={`navPages-action${$if(is_active).then(() => $$raw(' activePage'))}`} href={url} aria-label={name}>
                {/* html L18: {{name}} */}
                {name}
            </a>
        )}
    />
));
