/**
 * Source: templates/pages/subscribed.html (29 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ExtendedThemePageSubscribed} from '@/context';

export default $page<ExtendedThemePageSubscribed>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L3: <section class="page"> */}
                        <section className="page">
                            {/* html L4: <div class="page-content page-content--centered"> */}
                            <div className="page-content page-content--centered">
                                {/* html L5: <h1 class="page-heading" tabindex="0" role="status" aria-live="assertive"> */}
                                <h1 className="page-heading" tabIndex={0} role="status" aria-live="assertive">
                                    {/* html L6: {{#if subscription.error}} */}
                                    <$If
                                        query={[ctx.subscription.error]}
                                        $then={() => /* html L7: {{lang 'newsletter.subscribed_heading_error'}} */ <$Lang translationKey={$string('newsletter.subscribed_heading_error')}/>}
                                        $else={() => /* html L8: {{else}}
                                                                                                                html L9: {{lang 'newsletter.subscribed_heading'}}
                                                     */ <$Lang translationKey={$string('newsletter.subscribed_heading')}/>}
                                    />
                                </h1>

                                {/* html L13: {{#if subscription.error}} */}
                                <$If
                                    query={[ctx.subscription.error]}
                                    $then={() => /* html L14: {{> components/common/alert/alert-error subscription.error}} */ <$Partial name="components/common/alert/alert-error" context={ctx.subscription.error}/>}
                                    $else={() => (
                                        /* html L15: {{else}}
                                                                                      html L16: {{> components/common/alert/alert-success (lang 'newsletter.subscribed_message')}}
                                        */
                                        <$Partial
                                            name="components/common/alert/alert-success"
                                            context={$lang($string('newsletter.subscribed_message'))}
                                        />
                                    )}
                                />
                            </div>
                        </section>

                        {/* html L22: <script> */}
                        <script>
                            {/* html L23-24:
                               const subscriptionStatusElement = document.querySelector('.page-content > .page-heading');
                               if (subscriptionStatusElement) subscriptionStatusElement.focus();
                            */}
                            {$$raw(
                                "const subscriptionStatusElement = document.querySelector('.page-content > .page-heading'); " +
                                    'if (subscriptionStatusElement) subscriptionStatusElement.focus();',
                            )}
                        </script>
                    </>
                )}
            />
            {/* html L28: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
