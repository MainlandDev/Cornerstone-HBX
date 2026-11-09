import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';

export default $page({
    frontmatter: {},
    content: () => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <main className="page">
                        <section className="page-content page-content--centered">
                            <h1 className="page-heading">
                                <$Lang translationKey={$string('server_error.page_heading')}/>
                            </h1>
                            <p className="u-textAlignCenter">
                                <$Lang translationKey={$string('server_error.message')}/>
                            </p>
                        </section>
                    </main>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
