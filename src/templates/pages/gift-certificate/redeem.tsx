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
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h1 className="page-heading">
                            <$Lang translationKey={$string('gift_certificate.heading')}/>
                        </h1>
                        <GiftCertificateNavigation gift_page={$string('redeem')} urls={ctx.urls}/>

                        <main className="account account--fixed">
                            <h3>
                                <$Lang translationKey={$string('gift_certificate.redeem.heading')}/>
                            </h3>
                            <p>
                                <strong>
                                    <$Lang translationKey={$string('gift_certificate.redeem.intro')} params={{store_name: ctx.settings.store_name}}/>
                                </strong>
                            </p>
                            <ol>
                                <li>
                                    <$Lang translationKey={$string('gift_certificate.redeem.item1')}/>
                                </li>
                                <li>
                                    <$Lang translationKey={$string('gift_certificate.redeem.item2')}/>
                                </li>
                                <li>
                                    <$_Lang translationKey={$string('gift_certificate.redeem.item3')} params={{cart_url: ctx.urls.cart}}/>
                                </li>
                                <li>
                                    <$Lang translationKey={$string('gift_certificate.redeem.item4')}/>
                                </li>
                            </ol>
                        </main>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
