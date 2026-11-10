/**
 * Source: templates/pages/unsubscribe.html (12 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

export default $page({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L3: <section class="page"> */
                    <section className="page">
                        {/* html L4: <div class="page-content page-content--centered"> */}
                        <div className="page-content page-content--centered">
                            {/* html L5: <h1 class="page-heading">{{lang 'newsletter.unsubscribed_heading'}}</h1> */}
                            <h1 className="page-heading">
                                {/* html L5: {{lang 'newsletter.unsubscribed_heading'}} */}
                                <$Lang translationKey={$string('newsletter.unsubscribed_heading')}/>
                            </h1>
                            {/* html L6: {{> components/common/alert/alert-success (lang 'newsletter.unsubscribed_message' store_name=settings.store_name)}} */}
                            <$Partial
                                name="components/common/alert/alert-success"
                                context={$lang($string('newsletter.unsubscribed_message'), {store_name: ctx.settings.store_name})}
                            />
                        </div>
                    </section>
                )}
            />
            {/* html L11: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
