import {$Each, $If, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Str = HandlebarsInlineValueToken<string>;

export default $asPartial<{
    previous: Str;
    next: Str;
    links: Array<{number: HandlebarsInlineValueToken<number>; link: Str}>;
}>(({previous, next, links}) => (
    <div className="pagination" role="region" aria-label={$lang($string('common.pagination'))}>
        <ul className="pagination-list pagination-list--small">
            <$If
                query={[previous]}
                $then={() => (
                    <li className="pagination-item pagination-item--previous">
                        <a className="pagination-link" href={previous} data-faceted-search-facet="">
                            <i className="icon" aria-hidden="true">
                                <svg>
                                    <use href="#icon-chevron-left"></use>
                                </svg>
                            </i>
                            <$Lang translationKey={$string('common.previous')}/>
                        </a>
                    </li>
                )}
            />

            <$If
                query={[links.length]}
                $then={() => (
                    <$Each
                        list={links}
                        $then={(item) => (
                            <li className="pagination-item">
                                <a className="pagination-link" href={item.link}>
                                    {item.number}
                                </a>
                            </li>
                        )}
                    />
                )}
            />

            <$If
                query={[next]}
                $then={() => (
                    <li className="pagination-item pagination-item--next">
                        <a className="pagination-link" href={next} data-faceted-search-facet="">
                            <$Lang translationKey={$string('common.next')}/>
                            <i className="icon" aria-hidden="true">
                                <svg>
                                    <use href="#icon-chevron-right"></use>
                                </svg>
                            </i>
                        </a>
                    </li>
                )}
            />
        </ul>
    </div>
));
