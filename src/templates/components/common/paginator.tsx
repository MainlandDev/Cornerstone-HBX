import {$Each, $If, $Lang, $lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

interface PageLink {
    number: string;
    url: string;
}

export default () => (
    <nav className="pagination" aria-label="pagination">
        <ul className="pagination-list">
            <$If
                test={$pointer("previous")}
                $then={() => (
                    <li className="pagination-item pagination-item--previous">
                        <a
                            className="pagination-link"
                            href={$pointer("previous")}
                            dangerouslyInlineAttributes={{
                                attributes: `${$raw("{{#unless reload}}data-faceted-search-facet{{/unless}}")} aria-label="${$lang($string("common.previous"))}"`,
                            }}
                        >
                            <i className="icon" aria-hidden="true">
                                <svg>
                                    <use href="#icon-chevron-left"></use>
                                </svg>
                            </i>
                            <$Lang keyName={$string("common.previous")} />
                        </a>
                    </li>
                )}
            />
            <$Each
                list={$pointer<PageLink[]>("links")}
                $then={(link) => (
                    <li className={`pagination-item ${$raw("{{#if this.number '==' ../current}}pagination-item--current{{/if}}")}`}>
                        <a
                            className="pagination-link"
                            href={link.url}
                            dangerouslyInlineAttributes={{
                                attributes: `${$raw("{{#unless reload}}data-faceted-search-facet{{/unless}}")} ${$raw("{{#if this.number '==' ../current}}aria-current=\"page\" data-pagination-current-page-link{{/if}}")} aria-label="${$raw("{{lang 'common.paginator.page_of' current=this.number total=../links.length}}")}"`,
                            }}
                        >
                            {link.number}
                        </a>
                    </li>
                )}
            />
            <$If
                test={$pointer("next")}
                $then={() => (
                    <li className="pagination-item pagination-item--next">
                        <a
                            className="pagination-link"
                            href={$pointer("next")}
                            dangerouslyInlineAttributes={{
                                attributes: `${$raw("{{#unless reload}}data-faceted-search-facet{{/unless}}")} aria-label="${$lang($string("common.next"))}"`,
                            }}
                        >
                            <$Lang keyName={$string("common.next")} />
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
);
