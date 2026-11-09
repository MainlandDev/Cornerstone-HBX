import {$If, $Partial, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_langJson, $_stylesheet, $getFontsCollection, $nonce} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ExtendedThemePageCheckout} from '@/context-pagesA';

export default $page<ExtendedThemePageCheckout>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('head')}
                $then={() => (
                    <>
                        {$unescaped(ctx.checkout.checkout_head)}
                        {$_stylesheet($string('/assets/css/optimized-checkout.css'))}
                        {$getFontsCollection()}

                        <script type="text/javascript" nonce={$nonce()}>
                            {[$$raw('window.language = '), $_langJson($string('optimized_checkout')), $$raw(';')]}
                        </script>

                        {$unescaped(ctx.head.scripts)}
                    </>
                )}
            />
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <header className="checkoutHeader optimizedCheckout-header">
                            <div className="checkoutHeader-content">
                                <h1 className="is-srOnly">
                                    <$Lang translationKey={$string('checkout.title')}/>
                                </h1>
                                <h2 className="checkoutHeader-heading">
                                    <a className="checkoutHeader-link" href={ctx.urls.home}>
                                        <$If
                                            query={[ctx.checkout.header_image]}
                                            $then={() => (
                                                <img
                                                    alt={ctx.settings.store_logo.title}
                                                    className="checkoutHeader-logo"
                                                    id="logoImage"
                                                    src={ctx.checkout.header_image}
                                                />
                                            )}
                                            $else={() => <span className="header-logo-text">{ctx.settings.store_logo.title}</span>}
                                        />
                                    </a>
                                </h2>
                            </div>
                        </header>

                        {$unescaped(ctx.checkout.checkout_content)}

                        {$unescaped(ctx.footer.scripts)}
                    </>
                )}
            />
            <$Partial name="layout/empty"/>
        </>
    ),
});
