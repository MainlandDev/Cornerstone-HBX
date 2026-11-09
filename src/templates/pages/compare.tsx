import {$Each, $if, $If, $Partial, $string, $unescaped, $unless} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Inject, $Lang, $Or, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ExtendedThemePageCompare} from '@/context-pagesA';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ExtendedThemePageCompare>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <$Inject keyName={$string('comparisons')} value={ctx.comparisons}/>
                        <$Inject keyName={$string('compareRemoveMessage')} value={$lang($string('compare.no_remove'))}/>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h1 className="page-heading">
                            <$Lang translationKey={$string('compare.header')} params={{products: ctx.comparisons.length}}/>
                        </h1>
                        <main className="page">
                            <div className="page-content">
                                <table className="compareTable">
                                    <tr className="compareTable-row">
                                        <th className="compareTable-heading"></th>
                                        <$Each
                                            list={ctx.comparisons}
                                            $then={(item) => (
                                                <th className="compareTable-product">
                                                    <article className="card">
                                                        <figure className="card-figure">
                                                            <a
                                                                className="card-figure__link"
                                                                aria-label={item.name}
                                                                href={item.url}
                                                                data-event-type="product-click"
                                                            >
                                                                <div className="card-img-container">
                                                                    <$Partial
                                                                        name="components/common/responsive-img"
                                                                        hash={{
                                                                            image: item.image,
                                                                            class: $string('card-image'),
                                                                            fallback_size: ctx.theme_settings.product_size,
                                                                            lazyload: ctx.theme_settings.lazyload_mode,
                                                                            default_image: ctx.theme_settings.default_image_product,
                                                                        }}
                                                                    />
                                                                </div>
                                                            </a>
                                                            <a
                                                                className="compareTable-removeProduct"
                                                                data-comparison-remove=""
                                                                href={`${$if(item.remove_url).then(() => [item.remove_url]).else(() => [$$raw('#')])}`}
                                                            >
                                                                <svg className="icon">
                                                                    <use href="#icon-close"></use>
                                                                </svg>
                                                            </a>
                                                        </figure>
                                                        <div className="card-body">
                                                            <$If
                                                                query={[item.brand.name]}
                                                                $then={() => (
                                                                    <p className="card-text">
                                                                        <a href={item.brand.url}>{item.brand.name}</a>
                                                                    </p>
                                                                )}
                                                            />
                                                            <h3 className="card-title">
                                                                <a href={item.url}>{item.name}</a>
                                                            </h3>
                                                            <$Or
                                                                values={[ctx.customer, $unless(ctx.settings.hide_price_from_guests)]}
                                                                $then={() => (
                                                                    <$If
                                                                        query={[item.price_range]}
                                                                        $then={() => (
                                                                            <$Partial
                                                                                name="components/products/price-range"
                                                                                hash={{price: item.price, theme_settings: ctx.theme_settings}}
                                                                            />
                                                                        )}
                                                                        $else={() => (
                                                                            <$Partial
                                                                                name="components/products/price"
                                                                                hash={{price: item.price, theme_settings: ctx.theme_settings}}
                                                                            />
                                                                        )}
                                                                    />
                                                                )}
                                                                $else={() => <$Partial name="components/common/login-for-pricing"/>}
                                                            />
                                                        </div>
                                                    </article>
                                                </th>
                                            )}
                                        />
                                    </tr>
                                    <tr className="compareTable-row">
                                        <th className="compareTable-heading"></th>
                                        <$Each
                                            list={ctx.comparisons}
                                            $then={(item) => (
                                                <td className="compareTable-action">
                                                    <$If
                                                        query={[item.show_cart_action]}
                                                        $then={() => (
                                                            <>
                                                                <$If
                                                                    query={[item.has_options]}
                                                                    $then={() => (
                                                                        <a
                                                                            href={item.url}
                                                                            data-event-type="product-click"
                                                                            className="button button--primary"
                                                                            data-product-id={item.id}
                                                                        >
                                                                            <$Lang translationKey={$string('products.choose_options')}/>
                                                                        </a>
                                                                    )}
                                                                />
                                                                <$If
                                                                    query={[item.pre_order]}
                                                                    $then={() => (
                                                                        <a
                                                                            href={item.url}
                                                                            data-event-type="product-click"
                                                                            className="button button--primary"
                                                                            data-product-id={item.id}
                                                                        >
                                                                            <$Lang translationKey={$string('products.pre_order')}/>
                                                                        </a>
                                                                    )}
                                                                />
                                                                <$If
                                                                    query={[item.add_to_cart_url]}
                                                                    $then={() => (
                                                                        <a
                                                                            href={item.add_to_cart_url}
                                                                            data-event-type="product-click"
                                                                            className="button button--primary"
                                                                            data-product-id={item.id}
                                                                        >
                                                                            <$Lang translationKey={$string('products.add_to_cart')}/>
                                                                        </a>
                                                                    )}
                                                                />
                                                                <$If
                                                                    query={[item.out_of_stock_message]}
                                                                    $then={() => (
                                                                        <a href={item.url} className="button button--primary" data-product-id={item.id}>
                                                                            {item.out_of_stock_message}
                                                                        </a>
                                                                    )}
                                                                />
                                                            </>
                                                        )}
                                                    />
                                                </td>
                                            )}
                                        />
                                    </tr>
                                    <tr className="compareTable-row">
                                        <th className="compareTable-heading">
                                            <span className="compareTable-headingText">
                                                <$Lang translationKey={$string('products.description')}/>
                                            </span>
                                        </th>
                                        <$Each
                                            list={ctx.comparisons}
                                            $then={(item) => <td className="compareTable-item">{$unescaped(item.summary)}</td>}
                                        />
                                    </tr>
                                    <$If
                                        query={[ctx.settings.show_product_rating]}
                                        $then={() => (
                                            <tr className="compareTable-row">
                                                <th className="compareTable-heading">
                                                    <span className="compareTable-headingText">
                                                        <$Lang translationKey={$string('products.reviews.rating_label')}/>
                                                    </span>
                                                </th>
                                                <$Each
                                                    list={ctx.comparisons}
                                                    $then={(item) => (
                                                        <td className="compareTable-item">
                                                            <$If
                                                                query={[item.rating]}
                                                                $then={() => <$Partial name="components/products/ratings" hash={{rating: item.rating}}/>}
                                                                $else={() => (
                                                                    <$Lang translationKey={$string('products.reviews.no_reviews')}/>
                                                                )}
                                                            />
                                                        </td>
                                                    )}
                                                />
                                            </tr>
                                        )}
                                    />
                                    <tr className="compareTable-row">
                                        <th className="compareTable-heading">
                                            <span className="compareTable-headingText">
                                                <$Lang translationKey={$string('products.availability')}/>
                                            </span>
                                        </th>
                                        <$Each
                                            list={ctx.comparisons}
                                            $then={(item) => (
                                                <td className="compareTable-item">
                                                    <$If
                                                        query={[item.availability]}
                                                        $then={() => <>{item.availability}</>}
                                                        $else={() => <$Lang translationKey={$string('common.not_applicable')}/>}
                                                    />
                                                </td>
                                            )}
                                        />
                                    </tr>
                                    <tr className="compareTable-row">
                                        <th className="compareTable-heading">
                                            <span className="compareTable-headingText">
                                                <$Lang translationKey={$string('common.other_details')}/>
                                            </span>
                                        </th>
                                        <$Each
                                            list={ctx.comparisons}
                                            $then={(item) => (
                                                <td className="compareTable-item">
                                                    <$If
                                                        query={[item.custom_fields]}
                                                        $then={() => (
                                                            <ul>
                                                                <$Each
                                                                    list={item.custom_fields}
                                                                    $then={(field) => (
                                                                        <li>
                                                                            {field.name}: {$unescaped(field.value)}
                                                                        </li>
                                                                    )}
                                                                />
                                                            </ul>
                                                        )}
                                                        $else={() => <$Lang translationKey={$string('common.not_applicable')}/>}
                                                    />
                                                </td>
                                            )}
                                        />
                                    </tr>
                                </table>
                            </div>
                        </main>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
