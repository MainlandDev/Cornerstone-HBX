import {$Partial, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$_stylesheet} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {MaintenancePageContext} from '@/context-pagesMisc';

export default $page<MaintenancePageContext>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial name={$string('head')} $then={() => $_stylesheet($string('assets/css/maintenance.css'))}/>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <main>
                        <header>
                            <h1>
                                <$Lang translationKey={$string('maintenance.down')}/>
                            </h1>
                        </header>
                        <section>
                            <p>{$unescaped(ctx.settings.maintenance.message)}</p>
                        </section>
                        <section></section>
                        <footer>
                            <small></small>
                        </footer>
                    </main>
                )}
            />
            <$Partial name="layout/empty"/>
        </>
    ),
});
