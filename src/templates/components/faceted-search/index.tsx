import {$Each, $If, $Partial, $boolean, $number, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Any, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$join, $lang, $pluck, $toLowerCase, $_dynamicComponent} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {FacetedSearchHint} from '@/context-misc';

/** Positional context: the listing (`brand`, `category` or `product_results`) that carries `facets` and `selected`. */
export default $asPartial(() => {
    const listing = $this<FacetedSearchHint>();

    return (
        <div id="facetedSearch" className="facetedSearch sidebarBlock" role="region" aria-label={$lang($string('search.faceted.label'))}>
            <$Partial name="components/faceted-search/selected-facets" context={listing.selected}/>

            <a href="#facetedSearch-navList" role="button" className="facetedSearch-toggle toggleLink" data-collapsible="">
                <span className="facetedSearch-toggle-text">
                    <$If
                        query={[listing.facets.length, '>', $number(2)]}
                        $then={() => (
                            <>
                                <$Lang translationKey={$string('search.faceted.browse-by')}/>{' '}
                                {$join($pluck(listing.facets, $string('title')), $string(', '), {limit: $number(2)})} &amp;{' '}
                                {$toLowerCase($lang($string('search.faceted.more')))}
                            </>
                        )}
                        $else={() => (
                            <>
                                <$Lang translationKey={$string('search.faceted.browse-by')}/>{' '}
                                {$join($pluck(listing.facets, $string('title')), $string(', '), {lastSeparator: $string(' & ')})}
                            </>
                        )}
                    />
                </span>

                <span className="facetedSearch-toggle-indicator">
                    <span className="toggleLink-text toggleLink-text--on">
                        <$Lang translationKey={$string('search.faceted.hide-filters')}/>

                        <i className="icon" aria-hidden="true">
                            <svg>
                                <use href="#icon-keyboard-arrow-up"/>
                            </svg>
                        </i>
                    </span>

                    <span className="toggleLink-text toggleLink-text--off">
                        <$Lang translationKey={$string('search.faceted.show-filters')}/>

                        <i className="icon" aria-hidden="true">
                            <svg>
                                <use href="#icon-keyboard-arrow-down"/>
                            </svg>
                        </i>
                    </span>
                </span>
            </a>

            <$Any
                list={listing.facets}
                predicate={{visible: $boolean(true)}}
                $then={() => (
                    <div id="facetedSearch-navList" className="facetedSearch-navList">
                        <div className="accordion accordion--navList">
                            <$Each
                                list={listing.facets}
                                $then={(facet) => (
                                    <$If query={[facet.visible]} $then={() => <>{$_dynamicComponent($string('components/faceted-search/facets'))}</>}/>
                                )}
                            />
                        </div>

                        <div className="blocker" style={{display: 'none'}}></div>
                    </div>
                )}
            />
        </div>
    );
});
