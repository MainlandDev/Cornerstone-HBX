import {$If, $Each, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface PageLink {
    link: string;
    number: string;
}

export default () => (
    <div className="pagination" role="region" aria-label={$lang($string("common.pagination"))}>
        <ul className="pagination-list pagination-list--small">
            <$If
                test={$pointer("previous")}
                $then={() => (
                    <li className="pagination-item pagination-item--previous">
                        <a className="pagination-link" href={$pointer("previous")} data-faceted-search-facet={""}>
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

            <$If
                test={$pointer("links.length")}
                $then={() => (
                    <$Each
                        list={$pointer<PageLink[]>("links")}
                        $then={(page) => (
                            <li className="pagination-item">
                                <a className="pagination-link" href={page.link}>
                                    {page.number}
                                </a>
                            </li>
                        )}
                    />
                )}
            />

            <$If
                test={$pointer("next")}
                $then={() => (
                    <li className="pagination-item pagination-item--next">
                        <a className="pagination-link" href={$pointer("next")} data-faceted-search-facet={""}>
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
    </div>
);
