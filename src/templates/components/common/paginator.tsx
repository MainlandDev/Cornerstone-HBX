"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $pointer, $raw, $string} from "@mainlanddev/hbx-bigcommerce";

interface PageLink {
    number: string;
    url: string;
}

export default (_props: PartialProps) => (
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
                    <li className={`pagination-item ${$If({test: $pointer("this.number"), operator: $string("=="), rvalue: $pointer("../current"), $then: () => "pagination-item--current"})}`}>
                        <a
                            className="pagination-link"
                            href={link.url}
                            dangerouslyInlineAttributes={{
                                attributes: `${$raw("{{#unless reload}}data-faceted-search-facet{{/unless}}")} ${$If({test: $pointer("this.number"), operator: $string("=="), rvalue: $pointer("../current"), $then: () => $raw('aria-current="page" data-pagination-current-page-link')})} aria-label="${$raw("{{lang 'common.paginator.page_of' current=this.number total=../links.length}}")}"`,
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
