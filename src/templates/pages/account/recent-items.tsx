/**
 * Source: templates/pages/account/recent-items.html (17 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L2: <div class="account"> */
                    <div className="account">
                        {/* html L3: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L4: <h2 class="page-heading">{{lang 'account.recent_items.heading' }}</h2> */}
                        <h2 className="page-heading">
                            {/* html L4: {{lang 'account.recent_items.heading' }} */}
                            <$Lang translationKey={$string('account.recent_items.heading')}/>
                        </h2>
                        {/* html L5: {{> components/account/navigation account_page='recent_items'}} */}
                        <$Partial
                            name="components/account/navigation"
                            hash={{account_page: $string('recent_items'), urls: ctx.urls, settings: ctx.settings, customer: ctx.customer}}
                        />

                        {/* html L7: {{#unless customer.recently_viewed_products.items}} */}
                        <$Unless
                            query={[ctx.customer.recently_viewed_products.items]}
                            $then={() => (
                                /* html L8: {{> components/common/alert/alert-info (lang 'account.recent_items.no_items')}} */
                                <$Partial
                                    name="components/common/alert/alert-info"
                                    context={$lang($string('account.recent_items.no_items'))}
                                />
                            )}
                        />

                        {/* html L11: <div> */}
                        <div>
                            {/* html L12: {{> components/products/grid products=customer.recently_viewed_products.items show_compare=customer.recently_viewed_products.show_compare}} */}
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
            {/* html L16: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
