/**
 * Source: templates/components/products/options/input-file.html (29 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $Partial, $string, $this, $unless} from '@mainlanddev/bigcommerce-react';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$_lang, $and, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

export default $dynamic('input-file', () => {
    const option = $this<ProductOptionHint>();
    return (
        /* html L1: <div class="form-field" data-product-attribute="input-file"> */
        <div className="form-field" data-product-attribute="input-file">
            {/* html L2: <label class="form-label form-label--alternate form-label--inlineSmall" for="attribute_file_{{id}}"> */}
            <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_file_${option.id}`}>
                {/* html L3: {{ this.display_name }}: */}
                {option.display_name}:

                {/* html L5: {{> components/common/requireness-msg}} */}
                <$Partial name="components/common/requireness-msg"/>
            </label>

            {/* html L8-14:
               <input
                   class="form-file"
                   type="file"
                   id="attribute_file_{{id}}"
                   name="attribute[{{this.id}}]"
                   {{#and required (unless prefill)}}required{{/and}}
               >
            */}
            <input
                className="form-file"
                type="file"
                id={`attribute_file_${option.id}`}
                name={`attribute[${option.id}]`}
                $$={$and(option.required, $unless(option.prefill)).then(() => $$raw('required'))}
            />
            {/* html L15: {{#if original_name}} */}
            <$If
                query={[option.original_name]}
                $then={() => (
                    <>
                        {/* html L16: {{{lang 'products.file_option_set' url=file_url name=original_name}}} */}
                        {$_lang($string('products.file_option_set'), {url: option.file_url, name: option.original_name})}
                        {/* html L17: <label>{{lang 'cart.remove_file'}}<input type="checkbox" name="{{file_remove}}"></label> */}
                        <label>
                            {/* html L17: {{lang 'cart.remove_file'}} */}
                            {$lang($string('cart.remove_file'))}
                            {/* html L17: <input type="checkbox" name="{{file_remove}}"> */}
                            <input type="checkbox" name={option.file_remove}/>
                        </label>
                    </>
                )}
            />
            {/* html L19: <p class="form-fileDescription"> */}
            <p className="form-fileDescription">
                {/* html L20: {{#if file_size}} */}
                <$If
                    query={[option.file_size]}
                    $then={() => (
                        <>
                            {/* html L21: {{lang 'products.max_filesize'}} */}
                            {$lang($string('products.max_filesize'))}
                            {/* html L22: <strong>{{file_size}}{{lang 'products.kilobytes_abbreviation'}}</strong>, */}
                            <strong>
                                {/* html L22: {{file_size}} */}
                                {option.file_size}
                                {/* html L22: {{lang 'products.kilobytes_abbreviation'}} */}
                                {$lang($string('products.kilobytes_abbreviation'))}
                            </strong>
                            ,
                        </>
                    )}
                />
                {/* html L24: {{#if file_types}} */}
                <$If
                    query={[option.file_types]}
                    $then={() => (
                        <>
                            {/* html L25: {{lang 'products.filetypes'}} <strong>{{file_types}}</strong> */}
                            {$lang($string('products.filetypes'))} {/* html L25: <strong> */}<strong>{/* html L25: {{file_types}} */}{option.file_types}</strong>
                        </>
                    )}
                />
            </p>
        </div>
    );
});
