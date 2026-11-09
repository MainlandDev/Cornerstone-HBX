import {$Each, $If, $Partial, $string, $this, $unless, $if} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang, $_Sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$dashcase} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {FacetHint} from '@/context-misc';

export default $dynamic('multi', () => {
    const facet = $this<FacetHint>();

    return (
        <$If
            query={[facet.items]}
            $then={() => (
                <div className="accordion-block">
                    <$Partial name="components/faceted-search/faceted-search-navigation"/>

                    <div
                        id={`facetedSearch-content--${$dashcase(facet.facet)}`}
                        className={`accordion-content${$unless(facet.start_collapsed).then(() => $$raw(' is-open'))}`}
                    >
                        <ul
                            id={`facetedSearch-navList--${$dashcase(facet.facet)}`}
                            data-facet={facet.facet}
                            className="navList"
                            data-has-more-results={facet.has_more_results}
                        >
                            <$Each
                                list={facet.items}
                                $then={(item) => (
                                    <li className="navList-item">
                                        <a
                                            href={item.url}
                                            className={`navList-action navList-action--checkbox${$if(item.selected).then(() => $$raw(' is-selected'))}`}
                                            rel="nofollow"
                                            data-faceted-search-facet=""
                                        >
                                            <$_Sanitize str={item.title}/>
                                            <$If
                                                query={[facet.show_product_counts]}
                                                $then={() => <span>({item.count})</span>}
                                            />

                                            <span className="navList-action-close" aria-hidden="true">
                                                <svg className="icon">
                                                    <use href="#icon-close"/>
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                )}
                            />
                        </ul>

                        <$If
                            query={[facet.show_more_toggle]}
                            $then={() => (
                                <a href={`#facetedSearch-navList--${$dashcase(facet.facet)}`} role="button" className="toggleLink">
                                    <span className="toggleLink-text toggleLink-text--off">
                                        <$Lang translationKey={$string('search.faceted.show-more')}/>
                                    </span>
                                </a>
                            )}
                        />
                    </div>
                </div>
            )}
        />
    );
});
