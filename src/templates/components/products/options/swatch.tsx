/**
 * Source: templates/components/products/options/swatch.html (66 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Partial, $parseHandlebarsDangerously, $string, $this} from '@mainlanddev/bigcommerce-react';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$dynamic} from '@mainlanddev/bigcommerce-react/theme';
import type {ProductOptionHint} from '@/context-products';

// The "none" radio and the `{{#each this.values}}` loop are raw Handlebars (escape hatch): the loop calls `getImage` on an unsized image
// and indexes `data.[0..2]` (typed `string | string[]`), neither of which the typed helpers can express. The label and wrapper stay typed.
export default $dynamic('swatch', () => {
    const option = $this<ProductOptionHint>();
    return (
        /* html L1: <div class="form-field" data-product-attribute="swatch" role="radiogroup" aria-labelledby="swatchGroup_{{id}}"> */
        <div className="form-field" data-product-attribute="swatch" role="radiogroup" aria-labelledby={`swatchGroup_${option.id}`}>
            {/* html L2: <label class="form-label form-label--alternate form-label--inlineSmall" id="swatchGroup_{{id}}"> */}
            <label className="form-label form-label--alternate form-label--inlineSmall" id={`swatchGroup_${option.id}`}>
                {/* html L3: {{this.display_name}}: */}
                {option.display_name}:{/* html L4: <span data-option-value></span> */}<span data-option-value=""></span>

                {/* html L6: {{> components/common/requireness-msg}} */}
                <$Partial name="components/common/requireness-msg"/>
            </label>
            {/* html L8-9:
               <span
                   class="swatch-option-message aria-description--hidden u-hidden">
            */}
            <span className="swatch-option-message aria-description--hidden u-hidden">
                {/* html L10: {{ lang 'products.swatch_option_announcement' swatch_name=this.display_name}} */}
                {$lang($string('products.swatch_option_announcement'), {swatch_name: option.display_name})}
            </span>

            {/* html L24: <span class='form-option-variant form-option-variant--none' title="{{lang 'products.none'}}">{{lang 'products.none'}}</span> */}
            {$parseHandlebarsDangerously(`{{#unless required}}
        <input
            class="form-radio"
            type="radio"
            name="attribute[{{id}}]"
            value=""
            id="attribute_swatch_{{id}}_none"
            checked="{{#if defaultValue '==' ''}}checked{{/if}}"
            aria-label="{{lang 'products.none'}}"
        >
        <label class="form-option form-option-swatch" for="attribute_swatch_{{id}}_none">
            <span class='form-option-variant form-option-variant--none' title="{{lang 'products.none'}}">{{lang 'products.none'}}</span>
        </label>
    {{/unless}}

    {{#each this.values}}
    <div class="form-option-wrapper">
        <input class="form-radio"
               type="radio"
               name="attribute[{{../id}}]"
               value="{{id}}"
               id="attribute_swatch_{{../id}}_{{id}}"
               {{#if selected}}checked data-default{{/if}}
               {{#if ../required}}required{{/if}}
               aria-label="{{this.label}}"
        >
        <label class="form-option form-option-swatch" for="attribute_swatch_{{../id}}_{{id}}" data-product-attribute-value="{{id}}">
            {{#if image}}
                <span class='form-option-variant form-option-variant--pattern' title="{{this.label}}" style="background-image: url('{{getImage image "swatch_option_size"}}');"></span>
            {{/if}}
            {{#if data.[2]}}
                <span class='form-option-variant form-option-variant--color' title="{{this.label}}" style="background-color: #{{data.[0]}}"></span>
                <span class='form-option-variant form-option-variant--color' title="{{this.label}}" style="background-color: #{{data.[1]}}"></span>
                <span class='form-option-variant form-option-variant--color' title="{{this.label}}" style="background-color: #{{data.[2]}}"></span>
            {{else}}
                {{#if data.[1]}}
                    <span class='form-option-variant form-option-variant--color' title="{{this.label}}" style="background-color: #{{data.[0]}}"></span>
                    <span class='form-option-variant form-option-variant--color' title="{{this.label}}" style="background-color: #{{data.[1]}}"></span>
                {{else}}
                    {{#if data.[0]}}
                        <span class='form-option-variant form-option-variant--color' title="{{this.label}}" style="background-color: #{{data.[0]}}"></span>
                    {{/if}}
                {{/if}}
            {{/if}}
            {{#if pattern}}
                <span class="form-option-expanded">
                    <span class="form-option-image" style="background-image: url('{{getImage image 'core-swatch'}}');"></span>
                </span>
            {{/if}}
        </label>
    </div>
    {{/each}}`)}
        </div>
    );
});
