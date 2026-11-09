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
        <div className="modal-header">
            <h2 className="modal-header-title" data-product-variant="" data-name={product_name}>
                <$Lang translationKey={$string('cart.reconfigure_product')} params={{name: product_name}}/>
            </h2>
        </div>
        <div className="modal-body" data-product-option-change="">
            <div className="alertMessageBox" hidden>
                <AlertInfo/>
            </div>

            <form id="CartEditProductFieldsForm" method="post" action="cart.php" encType="multipart/form-data">
                <input type="hidden" name="action" value="EditProductFieldsInCart"/>
                <input type="hidden" name="item_id" value={quote_item_id}/>
                <div data-product-attributes-wrapper="">
                    <$Each list={options} $then={() => $_dynamicComponent($string('components/products/options'))}/>
                </div>
                <div className="form-actions">
                    <input className="button button--primary" type="submit" value={$lang($string('common.save'))}/>
                </div>
            </form>
        </div>
    </>
));
