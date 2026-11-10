/**
 * Source: templates/pages/unavailable/maintenance.html (16 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_stylesheet} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {MaintenancePageContext} from '@/context-pagesMisc';

export default $page<MaintenancePageContext>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "head"}} */}
            <$StencilPartial name={$string('head')} $then={() => $_stylesheet($string('assets/css/maintenance.css'))}/>
            {/* html L5: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    /* html L6: <main> */
                    <main>
                        {/* html L7: <header> */}
                        <header>
                            {/* html L8: <h1>{{lang 'maintenance.down'}}</h1> */}
                            <h1>
                                {/* html L8: {{lang 'maintenance.down'}} */}
                                <$Lang translationKey={$string('maintenance.down')}/>
                            </h1>
                        </header>
                        {/* html L10: <section><p>{{{settings.maintenance.message}}}</p></section> */}
                        <section>
                            {/* html L10: <p> */}
                            <p>{/* html L10: {{{settings.maintenance.message}}} */}{$unescaped(ctx.settings.maintenance.message)}</p>
                        </section>
                        {/* html L11: <section></section> */}
                        <section></section>
                        {/* html L12: <footer><small></small></footer> */}
                        <footer>
                            {/* html L12: <small> */}
                            <small></small>
                        </footer>
                    </main>
                )}
            />
            {/* html L15: {{> layout/empty}} */}
            <$Partial name="layout/empty"/>
        </>
    ),
});
