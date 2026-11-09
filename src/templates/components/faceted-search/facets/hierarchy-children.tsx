import {$parseHandlebarsDangerously} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';

// Called as `{{> components/faceted-search/facets/hierarchy-children children}}`: the context IS the array (`{{#each this}}`) and the items
// read `../show_product_counts` from the caller's scope. `$this` only types object hints, so the loop is raw Handlebars (escape hatch).
export default $asPartial(() => (
    <ul className="navList navList--inner">
        {$parseHandlebarsDangerously(`{{#each this}}
        <li class="navList-item">
            <a
            href="{{url}}"
            class="navList-action navList-action--checkbox{{#if selected}} is-selected{{/if}}{{#if has_sub_categories}} has-children{{/if}}"
            rel="nofollow"
            data-id="{{id}}"
            data-faceted-search-facet>
                {{{sanitize title}}}
                {{#if ../show_product_counts}}
                    {{#if count}}
                        <span>({{count}})</span>
                    {{/if}}
                {{/if}}
            </a>
            {{#if children}}
                {{> components/faceted-search/facets/hierarchy-children children}}
            {{/if}}
        </li>
    {{/each}}`)}
    </ul>
));
