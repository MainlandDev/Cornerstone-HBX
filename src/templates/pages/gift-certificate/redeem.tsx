/**
 * Source: templates/pages/gift-certificate/redeem.html (19 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial, $_Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import GiftCertificateNavigation from '@/templates/components/gift-certificate/navigation';
import type {ThemeContext} from '@mainlanddev/bigcommerce-react/theme';

export default $page<ThemeContext>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L3: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L4: <h1 class="page-heading">{{lang 'gift_certificate.heading' }}</h1> */}
                        <h1 className="page-heading">
                            {/* html L4: {{lang 'gift_certificate.heading' }} */}
                            <$Lang translationKey={$string('gift_certificate.heading')}/>
                        </h1>
                        {/* html L5: {{> components/gift-certificate/navigation gift_page='redeem'}} */}
                        <GiftCertificateNavigation gift_page={$string('redeem')} urls={ctx.urls}/>

                        {/* html L7: <main class="account account--fixed"> */}
                        <main className="account account--fixed">
                            {/* html L8: <h3>{{lang 'gift_certificate.redeem.heading'}}</h3> */}
                            <h3>
                                {/* html L8: {{lang 'gift_certificate.redeem.heading'}} */}
                                <$Lang translationKey={$string('gift_certificate.redeem.heading')}/>
                            </h3>
                            {/* html L9: <p><strong>{{lang 'gift_certificate.redeem.intro' store_name=settings.store_name }}</strong></p> */}
                            <p>
                                {/* html L9: <strong> */}
                                <strong>
                                    {/* html L9: {{lang 'gift_certificate.redeem.intro' store_name=settings.store_name }} */}
                                    <$Lang translationKey={$string('gift_certificate.redeem.intro')} params={{store_name: ctx.settings.store_name}}/>
                                </strong>
                            </p>
                            {/* html L10: <ol> */}
                            <ol>
                                {/* html L11: <li>{{lang 'gift_certificate.redeem.item1' }}</li> */}
                                <li>
                                    {/* html L11: {{lang 'gift_certificate.redeem.item1' }} */}
                                    <$Lang translationKey={$string('gift_certificate.redeem.item1')}/>
                                </li>
                                {/* html L12: <li>{{lang 'gift_certificate.redeem.item2' }}</li> */}
                                <li>
                                    {/* html L12: {{lang 'gift_certificate.redeem.item2' }} */}
                                    <$Lang translationKey={$string('gift_certificate.redeem.item2')}/>
                                </li>
                                {/* html L13: <li>{{{lang 'gift_certificate.redeem.item3' cart_url=urls.cart }}}</li> */}
                                <li>
                                    {/* html L13: {{{lang 'gift_certificate.redeem.item3' cart_url=urls.cart }}} */}
                                    <$_Lang translationKey={$string('gift_certificate.redeem.item3')} params={{cart_url: ctx.urls.cart}}/>
                                </li>
                                {/* html L14: <li>{{lang 'gift_certificate.redeem.item4' }}</li> */}
                                <li>
                                    {/* html L14: {{lang 'gift_certificate.redeem.item4' }} */}
                                    <$Lang translationKey={$string('gift_certificate.redeem.item4')}/>
                                </li>
                            </ol>
                        </main>
                    </>
                )}
            />
            {/* html L18: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
