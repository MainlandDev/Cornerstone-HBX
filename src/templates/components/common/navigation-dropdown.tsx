/**
 * Source: templates/components/common/navigation-dropdown.html (20 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $if, $Partial, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CategoryNodeHint} from '@/context-common';

/** Recursive: a category's sub-menu. Called by name with `context={$this()}` (the category is the context, as in the original). */
export default $asPartial<CategoryNodeHint>(({id, name, url, children}) => (
    /* html L1: <div class="navPage-subMenu navPage-subMenu-horizontal" id="navPages-{{id}}" aria-hidden="true" tabindex="-1"> */
    <div className="navPage-subMenu navPage-subMenu-horizontal" id={`navPages-${id}`} aria-hidden="true" tabIndex={-1}>
        {/* html L2: <ul class="navPage-subMenu-list"> */}
        <ul className="navPage-subMenu-list">
            {/* html L3: <li class="navPage-subMenu-item-parent"> */}
            <li className="navPage-subMenu-item-parent">
                {/* html L4: <a class="navPage-subMenu-action navPages-action navPages-action-depth-max" href="{{url}}">{{lang 'category.view_all.name' category=name}}</a> */}
                <a className="navPage-subMenu-action navPages-action navPages-action-depth-max" href={url}>
                    {/* html L4: {{lang 'category.view_all.name' category=name}} */}
                    <$Lang translationKey={$string('category.view_all.name')} params={{category: name}}/>
                </a>
            </li>
            {/* html L6: {{#each children}} */}
            <$Each
                list={children}
                $then={(child) => (
                    /* html L7: <li class="navPage-subMenu-item-child"> */
                    <li className="navPage-subMenu-item-child">
                        {/* html L8: {{#if children}} */}
                        <$If
                            query={[child.children]}
                            $then={() => (
                                <>
                                    {/* html L9: <a class="navPage-subMenu-action navPages-action navPages-action-depth-max has-subMenu{{#if is_active}} activePage{{/if}}" href="{{url}}" data-collapsible="navPages-{{id}}"> */}
                                    <a
                                        className={`navPage-subMenu-action navPages-action navPages-action-depth-max has-subMenu${$if(child.is_active).then(() => $$raw(' activePage'))}`}
                                        href={child.url}
                                        data-collapsible={`navPages-${child.id}`}
                                    >
                                        {/* html L10: {{name}}<i class="icon navPages-action-moreIcon" aria-hidden="true"><svg><use href="#icon-chevron-down" /></svg></i> */}
                                        {child.name}
                                        {/* html L10: <i class="icon navPages-action-moreIcon" aria-hidden="true"> */}
                                        <i className="icon navPages-action-moreIcon" aria-hidden="true">
                                            {/* html L10: <svg> */}
                                            <svg>
                                                {/* html L10: <use href="#icon-chevron-down" /> */}
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
                                                                      html L14: <a class="navPage-subMenu-action navPages-action{{#if is_active}} activePage{{/if}}" href="{{url}}">{{name}}</a>
                                */
                                <a
                                    className={`navPage-subMenu-action navPages-action${$if(child.is_active).then(() => $$raw(' activePage'))}`}
                                    href={child.url}
                                >
                                    {/* html L14: {{name}} */}
                                    {child.name}
                                </a>
                            )}
                        />
                    </li>
                )}
            />
        </ul>
    </div>
));
