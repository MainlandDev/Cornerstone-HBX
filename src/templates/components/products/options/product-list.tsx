import {$Each, $If, $Partial, $Unless, $if, $string, $this, $unless} from '@mainlanddev/bigcommerce-react';
import {$$raw, $$when} from '@mainlanddev/bigcommerce-react/internal';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('product-list', () => {
    const option = $this<ProductOptionHint>();
    return (
        <div className="form-field" data-product-attribute="product-list" role="radiogroup" aria-labelledby="product-list-label">
            <label className="form-label form-label--alternate form-label--inlineSmall" id="product-list-label">
                {option.display_name}:
                <span data-option-value=""></span>

                <$Partial name="components/common/requireness-msg"/>
            </label>

            <$If
                query={[option.values[0].image]}
                $then={() => (
                    <ul className="productOptions-list">
                        <$Unless
                            query={[option.required]}
                            $then={() => (
                                <li className="productOptions-list-item">
                                    <input
                                        className="form-radio"
                                        type="radio"
                                        name={`attribute[${option.id}]`}
                                        value=""
                                        id={`attribute_productlist_${option.id}_none`}
                                        $$={$unless(option.defaultValue).then(() => $$raw("checked"))}
                                    />
                                    <label className="form-label" htmlFor={`attribute_productlist_${option.id}_none`}>
                                        {$lang($string('products.none'))}
                                    </label>
                                </li>
                            )}
                        />
                        <$Each
                            list={option.values}
                            $then={(value) => (
                                <li className="productOptions-list-item" data-product-attribute-value={value.id}>
                                    <$If
                                        query={[value.image]}
                                        $then={() => (
                                            <figure className="productOptions-list-item-figure">
                                                <$Partial
                                                    name="components/common/responsive-img"
                                                    hash={{image: value.image, class: $string('productOptions-list-item-image'), lazyload: $string('lazyload+lqip')}}
                                                />
                                            </figure>
                                        )}
                                    />
                                    <div className="productOptions-list-item-content">
                                        <input
                                            className="form-radio"
                                            type="radio"
                                            name={`attribute[${option.id}]`}
                                            value={value.id}
                                            id={`attribute_productlist_${option.id}_${value.id}`}
                                            $$={$if(value.selected).then(() => $$raw('checked data-default'))}
                                            required={$$when(option.required)}
                                        />
                                        <label
                                            data-product-attribute-value={value.id}
                                            className="form-label"
                                            htmlFor={`attribute_productlist_${option.id}_${value.id}`}
                                        >
                                            {value.label}
                                        </label>
                                    </div>
                                </li>
                            )}
                        />
                    </ul>
                )}
                $else={() => (
                    <>
                        <$Unless
                            query={[option.required]}
                            $then={() => (
                                <>
                                    <input
                                        className="form-radio"
                                        type="radio"
                                        name={`attribute[${option.id}]`}
                                        value="0"
                                        id={`attribute_productlist_0_${option.id}`}
                                        $$={$unless(option.defaultValue).then(() => $$raw("checked"))}
                                    />
                                    <label className="form-label" htmlFor={`attribute_productlist_0_${option.id}`}>
                                        {$lang($string('products.none'))}
                                    </label>
                                </>
                            )}
                        />
                        <$Each
                            list={option.values}
                            $then={(value) => (
                                <>
                                    <input
                                        className="form-radio"
                                        type="radio"
                                        name={`attribute[${option.id}]`}
                                        value={value.id}
                                        id={`attribute_productlist_${option.id}_${value.id}`}
                                        $$={$if(value.selected).then(() => $$raw('checked data-default'))}
                                        required={$$when(option.required)}
                                    />
                                    <label data-product-attribute-value={value.id} className="form-label" htmlFor={`attribute_productlist_${option.id}_${value.id}`}>
                                        {value.label}
                                    </label>
                                </>
                            )}
                        />
                    </>
                )}
            />
        </div>
    );
});
