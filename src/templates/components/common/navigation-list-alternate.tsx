import {$If, $partial, $pointer, $raw, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$If
        test={$pointer("children")}
        $then={() => (
            <>
                <a
                    className={`navPages-action navPages-action-depth-max has-subMenu is-root${$If({test: $pointer("is_active"), $then: () => $raw(" activePage")})}`}
                    href={$pointer("url")}
                    data-collapsible={`navPages-${$pointer("id")}`}
                    aria-label={$pointer("name")}
                >
                    {$pointer("name")}
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
            <a className={`navPages-action${$If({test: $pointer("is_active"), $then: () => $raw(" activePage")})}`} href={$pointer("url")} aria-label={$pointer("name")}>
                {$pointer("name")}
            </a>
        )}
    />
);
