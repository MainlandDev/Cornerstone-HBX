/**
 * Source: templates/pages/checkout.html (38 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
            {/* html L1: {{#partial "head"}} */}
            <$StencilPartial
                name={$string('head')}
                $then={() => (
                    <>
                        {/* html L3: {{{ checkout.checkout_head }}} */}
                        {$unescaped(ctx.checkout.checkout_head)}
                        {/* html L4: {{{ stylesheet '/assets/css/optimized-checkout.css' }}} */}
                        {$_stylesheet($string('/assets/css/optimized-checkout.css'))}
                        {/* html L5: {{ getFontsCollection }} */}
                        {$getFontsCollection()}

                        {/* html L7: <script type="text/javascript" nonce="{{nonce}}"> */}
                        <script type="text/javascript" nonce={$nonce()}>
                            {/* html L8: window.language = {{{langJson 'optimized_checkout'}}}; */}
                            {[$$raw('window.language = '), $_langJson($string('optimized_checkout')), $$raw(';')]}
                        </script>

                        {/* html L11: {{{head.scripts}}} */}
                        {$unescaped(ctx.head.scripts)}
                    </>
                )}
            />
            {/* html L15: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L16: <header class="checkoutHeader optimizedCheckout-header"> */}
                        <header className="checkoutHeader optimizedCheckout-header">
                            {/* html L17: <div class="checkoutHeader-content"> */}
                            <div className="checkoutHeader-content">
                                {/* html L18: <h1 class="is-srOnly">{{lang 'checkout.title'}}</h1> */}
                                <h1 className="is-srOnly">
                                    {/* html L18: {{lang 'checkout.title'}} */}
                                    <$Lang translationKey={$string('checkout.title')}/>
                                </h1>
                                {/* html L19: <h2 class="checkoutHeader-heading"> */}
                                <h2 className="checkoutHeader-heading">
                                    {/* html L20: <a class="checkoutHeader-link" href="{{urls.home}}"> */}
                                    <a className="checkoutHeader-link" href={ctx.urls.home}>
                                        {/* html L21: {{#if checkout.header_image}} */}
                                        <$If
                                            query={[ctx.checkout.header_image]}
                                            $then={() => (
                                                /* html L22: <img alt="{{settings.store_logo.title}}" class="checkoutHeader-logo" id="logoImage" src="{{ checkout.header_image }}"/> */
                                                <img
                                                    alt={ctx.settings.store_logo.title}
                                                    className="checkoutHeader-logo"
                                                    id="logoImage"
                                                    src={ctx.checkout.header_image}
                                                />
                                            )}
                                            $else={() => /* html L23: {{ else }}
                                                                                                                        html L24: <span class="header-logo-text">{{settings.store_logo.title}}</span>
                                                         */ <span className="header-logo-text">{/* html L24: {{settings.store_logo.title}} */}{ctx.settings.store_logo.title}</span>}
                                        />
                                    </a>
                                </h2>
                            </div>
                        </header>

                        {/* html L31: {{{ checkout.checkout_content }}} */}
                        {$unescaped(ctx.checkout.checkout_content)}

                        {/* html L33: {{{ footer.scripts }}} */}
                        {$unescaped(ctx.footer.scripts)}
                    </>
                )}
            />
            {/* html L37: {{> layout/empty}} */}
            <$Partial name="layout/empty"/>
        </>
    ),
});
