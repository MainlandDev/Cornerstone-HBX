import {$Each, $If, $Lang, $partial, $pointer, $raw, $string, place} from "@mainlanddev/hbx-bigcommerce";

interface NavChild {
    id: string;
    url: string;
    name: string;
    children: unknown;
}

export default () => (
    <div className="navPage-subMenu navPage-subMenu-horizontal" id={`navPages-${$pointer("id")}`} aria-hidden="true" tabIndex={-1}>
        <ul className="navPage-subMenu-list">
            <li className="navPage-subMenu-item-parent">
                <a className="navPage-subMenu-action navPages-action navPages-action-depth-max" href={$pointer("url")}>
                    <$Lang keyName={$string("category.view_all.name")} category={$pointer("name")} />
                </a>
            </li>
            <$Each
                list={$pointer<NavChild[]>("children")}
                $then={(child) => (
                    <li className="navPage-subMenu-item-child">
                        <$If
                            test={child.children}
                            $then={() => (
                                <>
                                    <a
                                        className={`navPage-subMenu-action navPages-action navPages-action-depth-max has-subMenu${$If({test: $pointer("is_active"), $then: () => $raw(" activePage")})}`}
                                        href={child.url}
                                        data-collapsible={`navPages-${child.id}`}
                                    >
                                        {child.name}
                                        <i className="icon navPages-action-moreIcon" aria-hidden="true">
                                            <svg>
                                                <use href="#icon-chevron-down" />
                                            </svg>
                                        </i>
                                    </a>
                                    {place($partial("components/common/navigation-dropdown"))}
                                </>
                            )}
                            $else={() => (
                                <a className={`navPage-subMenu-action navPages-action${$If({test: $pointer("is_active"), $then: () => $raw(" activePage")})}`} href={child.url}>
                                    {child.name}
                                </a>
                            )}
                        />
                    </li>
                )}
            />
        </ul>
    </div>
);
