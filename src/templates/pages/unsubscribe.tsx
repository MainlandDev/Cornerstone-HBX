import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

export default $page({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <section className="page">
                        <div className="page-content page-content--centered">
                            <h1 className="page-heading">
                                <$Lang translationKey={$string('newsletter.unsubscribed_heading')}/>
                            </h1>
                            <$Partial
                                name="components/common/alert/alert-success"
                                context={$lang($string('newsletter.unsubscribed_message'), {store_name: ctx.settings.store_name})}
                            />
                        </div>
                    </section>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
