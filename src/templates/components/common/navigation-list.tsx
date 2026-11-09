import {$Each, $If, $if, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {CategoryNodeHint} from '@/context-common';

/** Category item in the simple navigation design. Called by name with `context={$this()}`, as the original inherits the item. */
export default $asPartial<CategoryNodeHint>(({id, name, url, is_active, children}) => (
    <$If
        query={[children]}
        $then={() => (
            <>
                <a
                    className={`navPages-action has-subMenu${$if(is_active).then(() => $$raw(' activePage'))}`}
                    href={url}
                    data-collapsible={`navPages-${id}`}
                >
                    {name}
                    <i className="icon navPages-action-moreIcon" aria-hidden="true">
                        <svg>
                            <use href="#icon-chevron-down"/>
                        </svg>
                    </i>
                </a>
                <div className="navPage-subMenu" id={`navPages-${id}`} aria-hidden="true" tabIndex={-1}>
                    <ul className="navPage-subMenu-list">
                        <li className="navPage-subMenu-item">
                            <a
                                className="navPage-subMenu-action navPages-action"
                                href={url}
                                aria-label={$lang($string('category.view_all.name'), {category: name})}
                            >
                                <$Lang translationKey={$string('category.view_all.name')} params={{category: name}}/>
                            </a>
                        </li>
                        <$Each
                            list={children}
                            $then={(child) => (
                                <li className="navPage-subMenu-item">
                                    <$If
                                        query={[child.children]}
                                        $then={() => (
                                            <>
                                                <a
                                                    className={`navPage-subMenu-action navPages-action has-subMenu${$if(child.is_active).then(() => $$raw(' activePage'))}`}
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
                                                                <use href="#icon-chevron-down"/>
                                                            </svg>
                                                        </i>
                                                    </span>
                                                </a>
                                                <ul className="navPage-childList" id={`navPages-${child.id}`}>
                                                    <$Each
                                                        list={child.children}
                                                        $then={(grandchild) => (
                                                            <li className="navPage-childList-item">
                                                                <a
                                                                    className={`navPage-childList-action navPages-action${$if(grandchild.is_active).then(() => $$raw(' activePage'))}`}
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
                                                className={`navPage-subMenu-action navPages-action${$if(child.is_active).then(() => $$raw(' activePage'))}`}
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
            <a className={`navPages-action${$if(is_active).then(() => $$raw(' activePage'))}`} href={url} aria-label={name}>
                {name}
            </a>
        )}
    />
));
