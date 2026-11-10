/**
 * Source: templates/pages/unavailable/hibernation.html (14 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

export default $page({
    frontmatter: {},
    content: () => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L3: <section class="page"> */
                    <section className="page">
                        {/* html L4: <div class="page-content page-content--centered"> */}
                        <div className="page-content page-content--centered">
                            {/* html L5: <h1 class="page-heading"> */}
                            <h1 className="page-heading">
                                {/* html L6: {{lang 'unavailable.hibernation_title'}} */}
                                <$Lang translationKey={$string('unavailable.hibernation_title')}/>
                            </h1>
                            {/* html L8: {{> components/common/alert/alert-error (lang 'unavailable.hibernation_message')}} */}
                            <$Partial name="components/common/alert/alert-error" context={$lang($string('unavailable.hibernation_message'))}/>
                        </div>
                    </section>
                )}
            />
            {/* html L13: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
