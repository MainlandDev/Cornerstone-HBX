import {$Each, $If, $if, $Partial, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import type {CategoryNodeHint} from '@/context-common';

/** Recursive: a category's sub-menu. Called by name with `context={$this()}` (the category is the context, as in the original). */
export default $asPartial<CategoryNodeHint>(({id, name, url, children}) => (
    <div className="navPage-subMenu navPage-subMenu-horizontal" id={`navPages-${id}`} aria-hidden="true" tabIndex={-1}>
        <ul className="navPage-subMenu-list">
            <li className="navPage-subMenu-item-parent">
                <a className="navPage-subMenu-action navPages-action navPages-action-depth-max" href={url}>
                    <$Lang translationKey={$string('category.view_all.name')} params={{category: name}}/>
                </a>
            </li>
            <$Each
                list={children}
                $then={(child) => (
                    <li className="navPage-subMenu-item-child">
                        <$If
                            query={[child.children]}
                            $then={() => (
                                <>
                                    <a
                                        className={`navPage-subMenu-action navPages-action navPages-action-depth-max has-subMenu${$if(child.is_active).then(() => $$raw(' activePage'))}`}
                                        href={child.url}
                                        data-collapsible={`navPages-${child.id}`}
                                    >
                                        {child.name}
                                        <i className="icon navPages-action-moreIcon" aria-hidden="true">
                                            <svg>
                                                <use href="#icon-chevron-down"/>
                                            </svg>
                                        </i>
                                    </a>
                                    <$Partial name="components/common/navigation-dropdown" context={$this()}/>
                                </>
                            )}
                            $else={() => (
                                <a
                                    className={`navPage-subMenu-action navPages-action${$if(child.is_active).then(() => $$raw(' activePage'))}`}
                                    href={child.url}
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
));
