import {$If, $if, $Partial, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import type {CategoryNodeHint} from '@/context-common';

/** Category item in the alternate navigation design. Called by name with `context={$this()}`. */
export default $asPartial<CategoryNodeHint>(({id, name, url, is_active, children}) => (
    <$If
        query={[children]}
        $then={() => (
            <>
                <a
                    className={`navPages-action navPages-action-depth-max has-subMenu is-root${$if(is_active).then(() => $$raw(' activePage'))}`}
                    href={url}
                    data-collapsible={`navPages-${id}`}
                    aria-label={name}
                >
                    {name}
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
            <a className={`navPages-action${$if(is_active).then(() => $$raw(' activePage'))}`} href={url} aria-label={name}>
                {name}
            </a>
        )}
    />
));
