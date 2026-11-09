import {$Each, $If, $if, $string, $this, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ShowMoreFacetsHint} from '@/context-misc';

/** Positional context: the listing (`brand`, `category` or `product_results`) whose facets are shown in the modal. */
export default $asPartial(() => {
    const listing = $this<ShowMoreFacetsHint>();

    return (
        <div className="modal-body">
            <h1 className="facet-quick-heading">
                <$If
                    query={[listing.facet_title]}
                    $then={() => <>{listing.facet_title}</>}
                    $else={() => <>{listing.all_facets}</>}
                />
            </h1>
            <div className="form-field" id="facetedSearch-filterItems">
                <input className="form-input" type="search" placeholder={$lang($string('forms.search.search'))}/>
            </div>
            <ul className="navList facetedSearch-optionColumns">
                <$Each
                    list={listing.facets}
                    $then={(facet) => (
                        <$If
                            query={[facet.facet, '===', listing.all_facets]}
                            $then={() => (
                                <$Each
                                    list={facet.items}
                                    $then={(item) => (
                                        <li className="navList-item">
                                            <a
                                                href={item.url}
                                                className={`navList-action${$if(item.selected).then(() => $$raw(' is-active'))}`}
                                                rel="nofollow"
                                                data-id={item.id}
                                                data-faceted-search-facet=""
                                            >
                                                {$unescaped(item.title)}
                                                <$If
                                                    query={[facet.show_product_counts]}
                                                    $then={() => (
                                                        <$If query={[item.count]} $then={() => <span>({item.count})</span>}/>
                                                    )}
                                                />
                                            </a>
                                        </li>
                                    )}
                                />
                            )}
                        />
                    )}
                />
            </ul>
        </div>
    );
});
