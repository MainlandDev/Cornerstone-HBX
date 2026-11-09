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
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <section className="page">
                            <div className="page-content page-content--centered">
                                <h1 className="page-heading" tabIndex={0} role="status" aria-live="assertive">
                                    <$If
                                        query={[ctx.subscription.error]}
                                        $then={() => <$Lang translationKey={$string('newsletter.subscribed_heading_error')}/>}
                                        $else={() => <$Lang translationKey={$string('newsletter.subscribed_heading')}/>}
                                    />
                                </h1>

                                <$If
                                    query={[ctx.subscription.error]}
                                    $then={() => <$Partial name="components/common/alert/alert-error" context={ctx.subscription.error}/>}
                                    $else={() => (
                                        <$Partial
                                            name="components/common/alert/alert-success"
                                            context={$lang($string('newsletter.subscribed_message'))}
                                        />
                                    )}
                                />
                            </div>
                        </section>

                        <script>
                            {$$raw(
                                "const subscriptionStatusElement = document.querySelector('.page-content > .page-heading'); " +
                                    'if (subscriptionStatusElement) subscriptionStatusElement.focus();',
                            )}
                        </script>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
