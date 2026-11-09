import {$Each, $If, $Partial, $string, $this, $unless, $if} from '@mainlanddev/bigcommerce-react';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$dashcase} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {FacetHint} from '@/context-misc';

export default $dynamic('rating', () => {
    const facet = $this<FacetHint>();

    return (
        <$If
            query={[facet.items]}
            $then={() => (
                <div className="accordion-block">
                    <$Partial name="components/faceted-search/faceted-search-navigation"/>

                    <div
                        id={`facetedSearch-content--${$dashcase(facet.facet)}`}
                        className={`accordion-content facetedSearch-content--${$dashcase(facet.facet)}${$unless(facet.start_collapsed).then(() => $$raw(' is-open'))}`}
                    >
                        <ul className="navList">
                            <$Each
                                list={facet.items}
                                $then={(item) => (
                                    <li className="navList-item">
                                        <a
                                            href={item.url}
                                            className={`navList-action${$if(item.selected).then(() => $$raw(' is-selected'))}`}
                                            rel="nofollow"
                                            data-faceted-search-facet=""
                                        >
                                            <span className="rating--small">
                                                <$Partial name="components/products/ratings" hash={{rating: item.title}}/>
                                            </span>
                                            <$Lang translationKey={$string('search.faceted.rating.and-up')}/>
                                            <$If
                                                query={[facet.show_product_counts]}
                                                $then={() => <span>({item.count})</span>}
                                            />
                                        </a>
                                    </li>
                                )}
                            />
                        </ul>
                    </div>
                </div>
            )}
        />
    );
});
