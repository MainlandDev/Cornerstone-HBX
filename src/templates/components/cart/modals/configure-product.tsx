/**
 * Source: templates/components/cart/modals/configure-product.html (28 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$_dynamicComponent, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import AlertInfo from '@/templates/components/common/alert/alert-info';
import type {CartHint, ProductOptions} from '@/context-cart';

export default $asPartial<{
    product_name: CartHint['cart']['items'][number]['name'];
    quote_item_id: CartHint['cart']['items'][number]['id'];
    options: ProductOptions;
}>(({product_name, quote_item_id, options}) => (
    <>
        {/* html L1: <div class="modal-header"> */}
        <div className="modal-header">
            {/* html L2-6:
               <h2
                   class="modal-header-title"
                   data-product-variant
                   data-name="{{product_name}}"
                   >
            */}
            <h2 className="modal-header-title" data-product-variant="" data-name={product_name}>
                {/* html L7: {{lang 'cart.reconfigure_product' name=product_name}} */}
                <$Lang translationKey={$string('cart.reconfigure_product')} params={{name: product_name}}/>
            </h2>
        </div>
        {/* html L10: <div class="modal-body" data-product-option-change> */}
        <div className="modal-body" data-product-option-change="">
            {/* html L11: <div class="alertMessageBox" hidden> */}
            <div className="alertMessageBox" hidden>
                {/* html L12: {{> components/common/alert/alert-info}} */}
                <AlertInfo/>
            </div>

            {/* html L15: <form id="CartEditProductFieldsForm" method="post" action="cart.php" enctype="multipart/form-data"> */}
            <form id="CartEditProductFieldsForm" method="post" action="cart.php" encType="multipart/form-data">
                {/* html L16: <input type="hidden" name="action" value="EditProductFieldsInCart"> */}
                <input type="hidden" name="action" value="EditProductFieldsInCart"/>
                {/* html L17: <input type="hidden" name="item_id" value="{{quote_item_id}}"> */}
                <input type="hidden" name="item_id" value={quote_item_id}/>
                {/* html L18: <div data-product-attributes-wrapper> */}
                <div data-product-attributes-wrapper="">
                    {/* html L19: {{#each options}} */}
                    <$Each list={options} $then={() => $_dynamicComponent($string('components/products/options'))}/>
                </div>
                {/* html L23: <div class="form-actions"> */}
                <div className="form-actions">
                    {/* html L24: <input class="button button--primary" type="submit" value="{{lang 'common.save'}}"> */}
                    <input className="button button--primary" type="submit" value={$lang($string('common.save'))}/>
                </div>
            </form>
        </div>
    </>
));
