"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

interface NavChild {
    id: string;
    url: string;
    name: string;
    children: unknown;
}

interface NavGrandchild {
    url: string;
    name: string;
}

export default (_props: PartialProps) => (
    <$If
        test={$pointer("children")}
        $then={() => (
            <>
                <a
                    className={`navPages-action has-subMenu${$If({test: $pointer("is_active"), $then: () => " activePage"})}`}
                    href={$pointer("url")}
                    data-collapsible={`navPages-${$pointer("id")}`}
                >
                    {$pointer("name")}
                    <i className="icon navPages-action-moreIcon" aria-hidden="true">
                        <svg>
                            <use href="#icon-chevron-down" />
                        </svg>
                    </i>
                </a>
                <div className="navPage-subMenu" id={`navPages-${$pointer("id")}`} aria-hidden="true" tabIndex={-1}>
                    <ul className="navPage-subMenu-list">
                        <li className="navPage-subMenu-item">
                            <a
                                className="navPage-subMenu-action navPages-action"
                                href={$pointer("url")}
                                aria-label={$lang($string("category.view_all.name"), {category: $pointer("name")})}
                            >
                                <$Lang keyName={$string("category.view_all.name")} category={$pointer("name")} />
                            </a>
                        </li>
                        <$Each
                            list={$pointer<NavChild[]>("children")}
                            $then={(child) => (
                                <li className="navPage-subMenu-item">
                                    <$If
                                        test={child.children}
                                        $then={() => (
                                            <>
                                                <a
                                                    className={`navPage-subMenu-action navPages-action has-subMenu${$If({test: $pointer("is_active"), $then: () => " activePage"})}`}
                                                    href={child.url}
                                                    aria-label={child.name}
                                                >
                                                    {child.name}
                                                    <span
                                                        className="collapsible-icon-wrapper"
                                                        data-collapsible={`navPages-${child.id}`}
                                                        data-collapsible-disabled-breakpoint="medium"
                                                        data-collapsible-disabled-state="open"
                                                        data-collapsible-enabled-state="closed"
                                                    >
                                                        <i className="icon navPages-action-moreIcon" aria-hidden="true">
                                                            <svg>
                                                                <use href="#icon-chevron-down" />
                                                            </svg>
                                                        </i>
                                                    </span>
                                                </a>
                                                <ul className="navPage-childList" id={`navPages-${child.id}`}>
                                                    <$Each
                                                        list={$pointer<NavGrandchild[]>("children")}
                                                        $then={(grandchild) => (
                                                            <li className="navPage-childList-item">
                                                                <a
                                                                    className={`navPage-childList-action navPages-action${$If({test: $pointer("is_active"), $then: () => " activePage"})}`}
                                                                    href={grandchild.url}
                                                                    aria-label={grandchild.name}
                                                                >
                                                                    {grandchild.name}
                                                                </a>
                                                            </li>
                                                        )}
                                                    />
                                                </ul>
                                            </>
                                        )}
                                        $else={() => (
                                            <a
                                                className={`navPage-subMenu-action navPages-action${$If({test: $pointer("is_active"), $then: () => " activePage"})}`}
                                                href={child.url}
                                                aria-label={child.name}
                                            >
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
            <a className={`navPages-action${$If({test: $pointer("is_active"), $then: () => " activePage"})}`} href={$pointer("url")} aria-label={$pointer("name")}>
                {$pointer("name")}
            </a>
        )}
    />
);
