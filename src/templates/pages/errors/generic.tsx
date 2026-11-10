/**
 * Source: templates/pages/errors/generic.html (14 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $page({
    frontmatter: {},
    content: () => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L3: <main class="page"> */
                    <main className="page">
                        {/* html L4: <section class="page-content page-content--centered"> */}
                        <section className="page-content page-content--centered">
                            {/* html L5: <h1 class="page-heading">{{lang 'server_error.page_heading'}}</h1> */}
                            <h1 className="page-heading">
                                {/* html L5: {{lang 'server_error.page_heading'}} */}
                                <$Lang translationKey={$string('server_error.page_heading')}/>
                            </h1>
                            {/* html L6: <p class="u-textAlignCenter"> */}
                            <p className="u-textAlignCenter">
                                {/* html L7: {{lang 'server_error.message'}} */}
                                <$Lang translationKey={$string('server_error.message')}/>
                            </p>
                        </section>
                    </main>
                )}
            />
            {/* html L13: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
