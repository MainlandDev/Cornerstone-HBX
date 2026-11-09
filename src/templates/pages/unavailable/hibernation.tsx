import {$Partial, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

export default $page({
    frontmatter: {},
    content: () => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <section className="page">
                        <div className="page-content page-content--centered">
                            <h1 className="page-heading">
                                <$Lang translationKey={$string('unavailable.hibernation_title')}/>
                            </h1>
                            <$Partial name="components/common/alert/alert-error" context={$lang($string('unavailable.hibernation_message'))}/>
                        </div>
                    </section>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
