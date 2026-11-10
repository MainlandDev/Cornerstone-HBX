/**
 * Source: templates/components/common/navigation-list.html (72 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $if, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {CategoryNodeHint} from '@/context-common';

/** Category item in the simple navigation design. Called by name with `context={$this()}`, as the original inherits the item. */
export default $asPartial<CategoryNodeHint>(({id, name, url, is_active, children}) => (
    /* html L1: {{#if children}} */
    <$If
        query={[children]}
        $then={() => (
            <>
                {/* html L2-5:
                   <a class="navPages-action has-subMenu{{#if is_active}} activePage{{/if}}"
                      href="{{url}}"
                      data-collapsible="navPages-{{id}}"
                   >
                */}
                <a
                    className={`navPages-action has-subMenu${$if(is_active).then(() => $$raw(' activePage'))}`}
                    href={url}
                    data-collapsible={`navPages-${id}`}
                >
                    {/* html L6: {{name}} */}
                    {name}
                    {/* html L7: <i class="icon navPages-action-moreIcon" aria-hidden="true"> */}
                    <i className="icon navPages-action-moreIcon" aria-hidden="true">
                        {/* html L8: <svg><use href="#icon-chevron-down" /></svg> */}
                        <svg>
                            {/* html L8: <use href="#icon-chevron-down" /> */}
                            <use href="#icon-chevron-down"/>
                        </svg>
                    </i>
                </a>
                {/* html L11: <div class="navPage-subMenu" id="navPages-{{id}}" aria-hidden="true" tabindex="-1"> */}
                <div className="navPage-subMenu" id={`navPages-${id}`} aria-hidden="true" tabIndex={-1}>
                    {/* html L12: <ul class="navPage-subMenu-list"> */}
                    <ul className="navPage-subMenu-list">
                        {/* html L13: <li class="navPage-subMenu-item"> */}
                        <li className="navPage-subMenu-item">
                            {/* html L14-17:
                               <a class="navPage-subMenu-action navPages-action"
                                  href="{{url}}"
                                  aria-label="{{lang 'category.view_all.name' category=name}}"
                               >
                            */}
                            <a
                                className="navPage-subMenu-action navPages-action"
                                href={url}
                                aria-label={$lang($string('category.view_all.name'), {category: name})}
                            >
                                {/* html L18: {{lang 'category.view_all.name' category=name}} */}
                                <$Lang translationKey={$string('category.view_all.name')} params={{category: name}}/>
                            </a>
                        </li>
                        {/* html L21: {{#each children}} */}
                        <$Each
                            list={children}
                            $then={(child) => (
                                /* html L22: <li class="navPage-subMenu-item"> */
                                <li className="navPage-subMenu-item">
                                    {/* html L23: {{#if children}} */}
                                    <$If
                                        query={[child.children]}
                                        $then={() => (
                                            <>
                                                {/* html L24-27:
                                                   <a class="navPage-subMenu-action navPages-action has-subMenu{{#if is_active}} activePage{{/if}}"
                                                      href="{{url}}"
                                                      aria-label="{{name}}"
                                                   >
                                                */}
                                                <a
                                                    className={`navPage-subMenu-action navPages-action has-subMenu${$if(child.is_active).then(() => $$raw(' activePage'))}`}
                                                    href={child.url}
                                                    aria-label={child.name}
                                                >
                                                    {/* html L28: {{name}} */}
                                                    {child.name}
                                                    {/* html L29-34:
                                                       <span class="collapsible-icon-wrapper"
                                                           data-collapsible="navPages-{{id}}"
                                                           data-collapsible-disabled-breakpoint="medium"
                                                           data-collapsible-disabled-state="open"
                                                           data-collapsible-enabled-state="closed"
                                                       >
                                                    */}
                                                    <span
                                                        className="collapsible-icon-wrapper"
                                                        data-collapsible={`navPages-${child.id}`}
                                                        data-collapsible-disabled-breakpoint="medium"
                                                        data-collapsible-disabled-state="open"
                                                        data-collapsible-enabled-state="closed"
                                                    >
                                                        {/* html L35: <i class="icon navPages-action-moreIcon" aria-hidden="true"> */}
                                                        <i className="icon navPages-action-moreIcon" aria-hidden="true">
                                                            {/* html L36: <svg><use href="#icon-chevron-down" /></svg> */}
                                                            <svg>
                                                                {/* html L36: <use href="#icon-chevron-down" /> */}
                                                                <use href="#icon-chevron-down"/>
                                                            </svg>
                                                        </i>
                                                    </span>
                                                </a>
                                                {/* html L40: <ul class="navPage-childList" id="navPages-{{id}}"> */}
                                                <ul className="navPage-childList" id={`navPages-${child.id}`}>
                                                    {/* html L41: {{#each children}} */}
                                                    <$Each
                                                        list={child.children}
                                                        $then={(grandchild) => (
                                                            /* html L42: <li class="navPage-childList-item"> */
                                                            <li className="navPage-childList-item">
                                                                {/* html L43-46:
                                                                   <a class="navPage-childList-action navPages-action{{#if is_active}} activePage{{/if}}"
                                                                      href="{{url}}"
                                                                      aria-label="{{name}}"
                                                                   >
                                                                */}
                                                                <a
                                                                    className={`navPage-childList-action navPages-action${$if(grandchild.is_active).then(() => $$raw(' activePage'))}`}
                                                                    href={grandchild.url}
                                                                    aria-label={grandchild.name}
                                                                >
                                                                    {/* html L47: {{name}} */}
                                                                    {grandchild.name}
                                                                </a>
                                                            </li>
                                                        )}
                                                    />
                                                </ul>
                                            </>
                                        )}
                                        $else={() => (
                                            /* html L52: {{else}}
                                                                                              html L53-56:
                                               <a class="navPage-subMenu-action navPages-action{{#if is_active}} activePage{{/if}}"
                                                  href="{{url}}"
                                                  aria-label="{{name}}"
                                               >
                                            */
                                            <a
                                                className={`navPage-subMenu-action navPages-action${$if(child.is_active).then(() => $$raw(' activePage'))}`}
                                                href={child.url}
                                                aria-label={child.name}
                                            >
                                                {/* html L57: {{name}} */}
                                                {child.name}
                                            </a>
                                        )}
                                    />
                                </li>
                            )}
                        />
                    </ul>
                </div>
            </>
        )}
        $else={() => (
            /* html L64: {{else}}
                              html L65-68:
               <a class="navPages-action{{#if is_active}} activePage{{/if}}"
                  href="{{url}}"
                  aria-label="{{name}}"
               >
            */
            <a className={`navPages-action${$if(is_active).then(() => $$raw(' activePage'))}`} href={url} aria-label={name}>
                {/* html L69: {{name}} */}
                {name}
            </a>
        )}
    />
));
