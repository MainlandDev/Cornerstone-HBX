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
    <nav className="pagination" aria-label="pagination">
        <ul className="pagination-list">
            <$If
                query={[previous]}
                $then={() => (
                    <li className="pagination-item pagination-item--previous">
                        <a
                            className="pagination-link"
                            href={previous}
                            $$={$unless(reload).then(() => $$raw('data-faceted-search-facet'))}
                            aria-label={$lang($string('common.previous'))}
                        >
                            <i className="icon" aria-hidden="true">
                                <svg>
                                    <use href="#icon-chevron-left"></use>
                                </svg>
                            </i>
                            <$Lang translationKey={$string('common.previous')}/>
                        </a>
                    </li>
                )}
            />
            <$Each
                list={links}
                $then={(link) => (
                    <li className={`pagination-item ${$if(link.number, '==', current).then(() => $$raw('pagination-item--current'))}`}>
                        <a
                            className="pagination-link"
                            href={link.url}
                            $$={[
                                $parseHandlebarsDangerously('{{#unless reload}}data-faceted-search-facet{{/unless}}'),
                                $if(link.number, '==', current).then(() => $$raw('aria-current="page" data-pagination-current-page-link')),
                            ]}
                            aria-label={$lang($string('common.paginator.page_of'), {current: link.number, total: links.length})}
                        >
                            {link.number}
                        </a>
                    </li>
                )}
            />

            <$If
                query={[next]}
                $then={() => (
                    <li className="pagination-item pagination-item--next">
                        <a
                            className="pagination-link"
                            href={next}
                            $$={$unless(reload).then(() => $$raw('data-faceted-search-facet'))}
                            aria-label={$lang($string('common.next'))}
                        >
                            <$Lang translationKey={$string('common.next')}/>
                            <i className="icon" aria-hidden="true">
                                <svg>
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
