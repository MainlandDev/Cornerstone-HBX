import {$If, $Partial, $string, $this, $unless} from '@mainlanddev/bigcommerce-react';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$_lang, $and, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('input-file', () => {
    const option = $this<ProductOptionHint>();
    return (
        <div className="form-field" data-product-attribute="input-file">
            <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_file_${option.id}`}>
                {option.display_name}:

                <$Partial name="components/common/requireness-msg"/>
            </label>

            <input
                className="form-file"
                type="file"
                id={`attribute_file_${option.id}`}
                name={`attribute[${option.id}]`}
                $$={$and(option.required, $unless(option.prefill)).then(() => $$raw('required'))}
            />
            <$If
                query={[option.original_name]}
                $then={() => (
                    <>
                        {$_lang($string('products.file_option_set'), {url: option.file_url, name: option.original_name})}
                        <label>
                            {$lang($string('cart.remove_file'))}
                            <input type="checkbox" name={option.file_remove}/>
                        </label>
                    </>
                )}
            />
            <p className="form-fileDescription">
                <$If
                    query={[option.file_size]}
                    $then={() => (
                        <>
                            {$lang($string('products.max_filesize'))}
                            <strong>
                                {option.file_size}
                                {$lang($string('products.kilobytes_abbreviation'))}
                            </strong>
                            ,
                        </>
                    )}
                />
                <$If
                    query={[option.file_types]}
                    $then={() => (
                        <>
                            {$lang($string('products.filetypes'))} <strong>{option.file_types}</strong>
                        </>
                    )}
                />
            </p>
        </div>
    );
});
