import {$Partial, $string, $Unless} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import type {ExtendedThemePageAccountRecentItems} from '@/context-pagesAccount';

export default $page<ExtendedThemePageAccountRecentItems>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <div className="account">
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h2 className="page-heading">
                            <$Lang translationKey={$string('account.recent_items.heading')}/>
                        </h2>
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('recent_items'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        <$Unless
                            query={[ctx.customer.recently_viewed_products.items]}
                            $then={() => (
                                <$Partial
                                    name="components/common/alert/alert-info"
                                    context={$lang($string('account.recent_items.no_items'))}
                                />
                            )}
                        />

                        <div>
                            <$Partial
                                name="components/products/grid"
                                hash={{
                                    products: ctx.customer.recently_viewed_products.items,
                                    show_compare: ctx.customer.recently_viewed_products.show_compare,
                                }}
                            />
                        </div>
                    </div>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
