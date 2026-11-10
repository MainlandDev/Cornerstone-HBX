/**
 * Source: templates/components/common/paginator.html (53 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $if, $parseHandlebarsDangerously, $string, $unless, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {PaginationLinkHint} from '@/context-common';

type Str = HandlebarsInlineValueToken<string>;

export default $asPartial<{
    previous: Str;
    next: Str;
    current: HandlebarsInlineValueToken<number>;
    links: Array<PaginationLinkHint>;
    reload: HandlebarsInlineValueToken<boolean>;
}>(({previous, next, current, links, reload}) => (
    /* html L1: <nav class="pagination" aria-label="pagination"> */
    <nav className="pagination" aria-label="pagination">
        {/* html L2: <ul class="pagination-list"> */}
        <ul className="pagination-list">
            {/* html L3: {{#if previous}} */}
            <$If
                query={[previous]}
                $then={() => (
                    /* html L4: <li class="pagination-item pagination-item--previous"> */
                    <li className="pagination-item pagination-item--previous">
                        {/* html L5-9:
                           <a class="pagination-link"
                              href="{{previous}}"
                              {{#unless reload}}data-faceted-search-facet{{/unless}}
                              aria-label="{{lang 'common.previous'}}"
                           >
                        */}
                        <a
                            className="pagination-link"
                            href={previous}
                            $$={$unless(reload).then(() => $$raw('data-faceted-search-facet'))}
                            aria-label={$lang($string('common.previous'))}
                        >
                            {/* html L10: <i class="icon" aria-hidden="true"> */}
                            <i className="icon" aria-hidden="true">
                                {/* html L11: <svg> */}
                                <svg>
                                    {/* html L12: <use href="#icon-chevron-left"></use> */}
                                    <use href="#icon-chevron-left"></use>
                                </svg>
                            </i>
                            {/* html L15: {{lang 'common.previous'}} */}
                            <$Lang translationKey={$string('common.previous')}/>
                        </a>
                    </li>
                )}
            />
            {/* html L19: {{#each links}} */}
            <$Each
                list={links}
                $then={(link) => (
                    /* html L20: <li class="pagination-item {{#if this.number '==' ../current}}pagination-item--current{{/if}}"> */
                    <li className={`pagination-item ${$if(link.number, '==', current).then(() => $$raw('pagination-item--current'))}`}>
                        {/* html L21-29:
                           <a class="pagination-link"
                              href="{{this.url}}"
                              {{#unless reload}}data-faceted-search-facet{{/unless}}
                              {{#if this.number '==' ../current}}
                              aria-current="page"
                              data-pagination-current-page-link
                              {{/if}}
                              aria-label="{{lang 'common.paginator.page_of' current=this.number total=../links.length}}"
                           >
                        */}
                        <a
                            className="pagination-link"
                            href={link.url}
                            $$={[
                                $parseHandlebarsDangerously('{{#unless reload}}data-faceted-search-facet{{/unless}}'),
                                $if(link.number, '==', current).then(() => $$raw('aria-current="page" data-pagination-current-page-link')),
                            ]}
                            aria-label={$lang($string('common.paginator.page_of'), {current: link.number, total: links.length})}
                        >
                            {/* html L30: {{this.number}} */}
                            {link.number}
                        </a>
                    </li>
                )}
            />

            {/* html L35: {{#if next}} */}
            <$If
                query={[next]}
                $then={() => (
                    /* html L36: <li class="pagination-item pagination-item--next"> */
                    <li className="pagination-item pagination-item--next">
                        {/* html L37-41:
                           <a class="pagination-link"
                              href="{{next}}"
                              {{#unless reload}}data-faceted-search-facet{{/unless}}
                              aria-label="{{lang 'common.next'}}"
                           >
                        */}
                        <a
                            className="pagination-link"
                            href={next}
                            $$={$unless(reload).then(() => $$raw('data-faceted-search-facet'))}
                            aria-label={$lang($string('common.next'))}
                        >
                            {/* html L42: {{lang 'common.next'}} */}
                            <$Lang translationKey={$string('common.next')}/>
                            {/* html L43: <i class="icon" aria-hidden="true"> */}
                            <i className="icon" aria-hidden="true">
                                {/* html L44: <svg> */}
                                <svg>
                                    {/* html L45: <use href="#icon-chevron-right"></use> */}
                                    <use href="#icon-chevron-right"></use>
                                </svg>
                            </i>
                        </a>
                    </li>
                )}
            />
        </ul>
    </nav>
));
