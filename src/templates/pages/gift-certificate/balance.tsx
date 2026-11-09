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
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h1 className="page-heading">
                            <$Lang translationKey={$string('gift_certificate.heading')}/>
                        </h1>
                        <GiftCertificateNavigation gift_page={$string('balance')} urls={ctx.urls}/>

                        <main className="account account--fixed">
                            <h3>
                                <$Lang translationKey={$string('gift_certificate.balance.heading')}/>
                            </h3>
                            <p>
                                <strong>
                                    <$Lang translationKey={$string('gift_certificate.balance.intro')}/>
                                </strong>
                            </p>

                            <$If
                                query={[ctx.gift_certificate]}
                                $then={() => (
                                    <$If
                                        query={[ctx.gift_certificate.error]}
                                        $then={() => (
                                            <$Partial name="components/common/alert/alert-error" context={ctx.gift_certificate.error}/>
                                        )}
                                        $else={() => (
                                            <>
                                                <h1>{ctx.gift_certificate.balance.formatted}</h1>
                                                <h3>{ctx.gift_certificate.code}</h3>
                                            </>
                                        )}
                                    />
                                )}
                            />

                            <form className="form form--oneField" id="gift-certificate-balance" method="get">
                                <input type="hidden" name="action" value="balance"/>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="giftcertificatecode">
                                        <$Lang translationKey={$string('forms.gift_certificate.balance.code')}/>
                                    </label>
                                    <div className="form-prefixPostfix wrap">
                                        <input className="form-input" id="giftcertificatecode" name="giftcertificatecode"/>
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
            <$Partial name="layout/base"/>
        </>
    ),
});
