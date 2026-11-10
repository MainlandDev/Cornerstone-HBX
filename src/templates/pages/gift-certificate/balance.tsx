/**
 * Source: templates/pages/gift-certificate/balance.html (37 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import GiftCertificateNavigation from '@/templates/components/gift-certificate/navigation';
import type {GiftCertificateBalancePageContext} from '@/context-pagesMisc';

export default $page<GiftCertificateBalancePageContext>({
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
                        {/* html L5: {{> components/gift-certificate/navigation gift_page='balance'}} */}
                        <GiftCertificateNavigation gift_page={$string('balance')} urls={ctx.urls}/>

                        {/* html L7: <main class="account account--fixed"> */}
                        <main className="account account--fixed">
                            {/* html L8: <h3>{{lang 'gift_certificate.balance.heading'}}</h3> */}
                            <h3>
                                {/* html L8: {{lang 'gift_certificate.balance.heading'}} */}
                                <$Lang translationKey={$string('gift_certificate.balance.heading')}/>
                            </h3>
                            {/* html L9: <p> */}
                            <p>
                                {/* html L10: <strong>{{lang 'gift_certificate.balance.intro' }}</strong> */}
                                <strong>
                                    {/* html L10: {{lang 'gift_certificate.balance.intro' }} */}
                                    <$Lang translationKey={$string('gift_certificate.balance.intro')}/>
                                </strong>
                            </p>

                            {/* html L13: {{#if gift_certificate}} */}
                            <$If
                                query={[ctx.gift_certificate]}
                                $then={() => (
                                    /* html L14: {{#if gift_certificate.error}} */
                                    <$If
                                        query={[ctx.gift_certificate.error]}
                                        $then={() => (
                                            /* html L15: {{> components/common/alert/alert-error gift_certificate.error}} */
                                            <$Partial name="components/common/alert/alert-error" context={ctx.gift_certificate.error}/>
                                        )}
                                        $else={() => (
                                            <>
                                                {/* html L16: {{else}}
                                                                                                      html L17: <h1>{{gift_certificate.balance.formatted}}</h1>
                                                */}
                                                <h1>{/* html L17: {{gift_certificate.balance.formatted}} */}{ctx.gift_certificate.balance.formatted}</h1>
                                                {/* html L18: <h3>{{gift_certificate.code}}</h3> */}
                                                <h3>{/* html L18: {{gift_certificate.code}} */}{ctx.gift_certificate.code}</h3>
                                            </>
                                        )}
                                    />
                                )}
                            />

                            {/* html L22: <form class="form form--oneField" id="gift-certificate-balance" method="get"> */}
                            <form className="form form--oneField" id="gift-certificate-balance" method="get">
                                {/* html L23: <input type="hidden" name="action" value="balance"> */}
                                <input type="hidden" name="action" value="balance"/>
                                {/* html L24: <div class="form-field"> */}
                                <div className="form-field">
                                    {/* html L25: <label class="form-label" for="giftcertificatecode"> */}
                                    <label className="form-label" htmlFor="giftcertificatecode">
                                        {/* html L26: {{lang 'forms.gift_certificate.balance.code' }} */}
                                        <$Lang translationKey={$string('forms.gift_certificate.balance.code')}/>
                                    </label>
                                    {/* html L28: <div class="form-prefixPostfix wrap"> */}
                                    <div className="form-prefixPostfix wrap">
                                        {/* html L29: <input class="form-input" id="giftcertificatecode" name="giftcertificatecode"> */}
                                        <input className="form-input" id="giftcertificatecode" name="giftcertificatecode"/>
                                        {/* html L30: <input type="submit" class="button button--primary form-prefixPostfix-button--postfix" value="{{lang 'forms.gift_certificate.balance.submit_value' }}"> */}
                                        <input
                                            type="submit"
                                            className="button button--primary form-prefixPostfix-button--postfix"
                                            value={$lang($string('forms.gift_certificate.balance.submit_value'))}
                                        />
                                    </div>
                                </div>
                            </form>
                        </main>
                    </>
                )}
            />
            {/* html L36: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
