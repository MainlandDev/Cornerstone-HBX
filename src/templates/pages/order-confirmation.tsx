/**
 * Source: templates/pages/order-confirmation.html (37 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$page, type ThemePageOrderConfirmation} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_langJson, $_stylesheet, $getFontsCollection} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';

export default $page<ThemePageOrderConfirmation>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "head"}} */}
            <$StencilPartial
                name={$string('head')}
                $then={() => (
                    <>
                        {/* html L2: {{{ checkout.checkout_head }}} */}
                        {$unescaped(ctx.checkout.checkout_head)}
                        {/* html L3: {{{ stylesheet '/assets/css/optimized-checkout.css' }}} */}
                        {$_stylesheet($string('/assets/css/optimized-checkout.css'))}
                        {/* html L4: {{ getFontsCollection }} */}
                        {$getFontsCollection()}

                        {/* html L6: <script type="text/javascript"> */}
                        <script type="text/javascript">
                            {/* html L7: window.language = {{{langJson 'optimized_checkout'}}}; */}
                            {[$$raw('window.language = '), $_langJson($string('optimized_checkout')), $$raw(';')]}
                        </script>

                        {/* html L10: {{{head.scripts}}} */}
                        {$unescaped(ctx.head.scripts)}
                    </>
                )}
            />
            {/* html L14: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L15: <header class="checkoutHeader optimizedCheckout-header"> */}
                        <header className="checkoutHeader optimizedCheckout-header">
                            {/* html L16: <div class="checkoutHeader-content"> */}
                            <div className="checkoutHeader-content">
                                {/* html L17: <h1 class="is-srOnly">{{lang 'checkout.title'}}</h1> */}
                                <h1 className="is-srOnly">
                                    {/* html L17: {{lang 'checkout.title'}} */}
                                    <$Lang translationKey={$string('checkout.title')}/>
                                </h1>
                                {/* html L18: <h2 class="checkoutHeader-heading"> */}
                                <h2 className="checkoutHeader-heading">
                                    {/* html L19: <a class="checkoutHeader-link" href="{{urls.home}}"> */}
                                    <a className="checkoutHeader-link" href={ctx.urls.home}>
                                        {/* html L20: {{#if checkout.header_image}} */}
                                        <$If
                                            query={[ctx.checkout.header_image]}
                                            $then={() => (
                                                /* html L21: <img alt="{{settings.store_logo.title}}" class="checkoutHeader-logo" id="logoImage" src="{{ checkout.header_image }}"/> */
                                                <img
                                                    alt={ctx.settings.store_logo.title}
                                                    className="checkoutHeader-logo"
                                                    id="logoImage"
                                                    src={ctx.checkout.header_image}
                                                />
                                            )}
                                            $else={() => /* html L22: {{ else }}
                                                                                                                        html L23: <span class="header-logo-text">{{settings.store_logo.title}}</span>
                                                         */ <span className="header-logo-text">{/* html L23: {{settings.store_logo.title}} */}{ctx.settings.store_logo.title}</span>}
                                        />
                                    </a>
                                </h2>
                            </div>
                        </header>

                        {/* html L30: {{{ checkout.order_confirmation_content }}} */}
                        {$unescaped(ctx.checkout.order_confirmation_content)}

                        {/* html L32: {{{ footer.scripts }}} */}
                        {$unescaped(ctx.footer.scripts)}
                    </>
                )}
            />
            {/* html L36: {{> layout/empty}} */}
            <$Partial name="layout/empty"/>
        </>
    ),
});
