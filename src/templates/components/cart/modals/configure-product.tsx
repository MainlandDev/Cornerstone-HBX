import AlertAlertInfo from "../../common/alert/alert-info.tsx";
import {$dynamicComponent, $Each, $Lang, $lang, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <div className="modal-header">
            <h2 className="modal-header-title" data-product-variant={""} data-name={$pointer("product_name")}>
                <$Lang keyName={$string("cart.reconfigure_product")} name={$pointer("product_name")} />
            </h2>
        </div>
        <div className="modal-body" data-product-option-change={""}>
            <div className="alertMessageBox" hidden={true}>
                <AlertAlertInfo />
            </div>

            <form id="CartEditProductFieldsForm" method="post" action="cart.php" encType="multipart/form-data">
                <input type="hidden" name="action" value="EditProductFieldsInCart" />
                <input type="hidden" name="item_id" value={$pointer("quote_item_id")} />
                <div data-product-attributes-wrapper={""}>
                    <$Each
                        list={$pointer<unknown[]>("options")}
                        $then={() => $unescaped($dynamicComponent($string("components/products/options")))}
                    />
                </div>
                <div className="form-actions">
                    <input className="button button--primary" type="submit" value={$lang($string("common.save"))} />
                </div>
            </form>
        </div>
    </>
);
