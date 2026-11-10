/**
 * Source: templates/components/products/description-tabs.html (68 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $number, $string, $unescaped, $unless} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$All, $AssignVar} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$dashcase, $getVar, $lang, $lowercase, $sanitize} from '@mainlanddev/bigcommerce-react/bigcommerce';
import Attributes from '@/templates/components/products/attributes';
import CustomFields from '@/templates/components/products/custom-fields';
import Reviews from '@/templates/components/products/reviews';
import type {ProductDetailHint, ProductPageHint, SettingsHint, ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    product: ProductDetailHint;
    settings: SettingsHint;
    theme_settings: ThemeSettingsHint;
    urls: ProductPageHint['urls'];
    pagination: Extract<ProductPageHint['pagination'], {reviews?: unknown}>;
}>(({product, settings, theme_settings, urls, pagination}) => (
    <>
        {/* html L1: <ul class="tabs" data-tab> */}
        <ul className="tabs" data-tab="">
            {/* html L2: {{#if product.description}} */}
            <$If
                query={[product.description]}
                $then={() => (
                    /* html L3: <li class="tab is-active"> */
                    <li className="tab is-active">
                        {/* html L4: <a class="tab-title" href="#tab-description">{{lang 'products.description'}}</a> */}
                        <a className="tab-title" href="#tab-description">{/* html L4: {{lang 'products.description'}} */}{$lang($string('products.description'))}</a>
                    </li>
                )}
            />
            {/* html L7: {{#if product.warranty}} */}
            <$If
                query={[product.warranty]}
                $then={() => (
                    /* html L8: <li class="tab {{#unless product.description}}is-active{{/unless}}"> */
                    <li className={`tab ${$unless(product.description).then(() => $$raw('is-active'))}`}>
                        {/* html L9: <a class="tab-title" href="#tab-warranty">{{lang 'products.warranty'}}</a> */}
                        <a className="tab-title" href="#tab-warranty">{/* html L9: {{lang 'products.warranty'}} */}{$lang($string('products.warranty'))}</a>
                    </li>
                )}
            />
            {/* html L12: {{#if theme_settings.pdp-custom-fields-tab-label}} */}
            <$If
                query={[theme_settings['pdp-custom-fields-tab-label']]}
                $then={() => /* html L13: {{assignVar 'additionalInfoTabLabel' theme_settings.pdp-custom-fields-tab-label}} */ <$AssignVar keyName={$string('additionalInfoTabLabel')} value={theme_settings['pdp-custom-fields-tab-label']}/>}
                $else={() => /* html L14: {{else}}
                                                                html L15: {{assignVar 'additionalInfoTabLabel' (lang 'page_builder.pdp-custom-fields-tab-label')}}
                             */ <$AssignVar keyName={$string('additionalInfoTabLabel')} value={$lang($string('page_builder.pdp-custom-fields-tab-label'))}/>}
            />
            {/* html L17: {{assignVar 'showAdditionalInfoTab' 0}} */}
            <$AssignVar keyName={$string('showAdditionalInfoTab')} value={$number(0)}/>
            {/* html L18: {{#all product.attributes theme_settings.show_attributes_tabs}} */}
            <$All
                values={[product.attributes, theme_settings.show_attributes_tabs]}
                $then={() => /* html L19: {{assignVar 'showAdditionalInfoTab' 1}} */ <$AssignVar keyName={$string('showAdditionalInfoTab')} value={$number(1)}/>}
            />
            {/* html L21: {{#all product.custom_fields theme_settings.show_custom_fields_tabs}} */}
            <$All
                values={[product.custom_fields, theme_settings.show_custom_fields_tabs]}
                $then={() => /* html L22: {{assignVar 'showAdditionalInfoTab' 1}} */ <$AssignVar keyName={$string('showAdditionalInfoTab')} value={$number(1)}/>}
            />
            {/* html L24: {{#if (getVar 'showAdditionalInfoTab')}} */}
            <$If
                query={[$getVar($string('showAdditionalInfoTab'))]}
                $then={() => (
                    /* html L25: <li class="tab {{#unless product.description}}{{#unless product.warranty}}is-active{{/unless}}{{/unless}}"> */
                    <li className={`tab ${$unless(product.description).then(() => $unless(product.warranty).then(() => $$raw('is-active')))}`}>
                        {/* html L26-28:
                           <a class="tab-title"
                              href="#tab-{{dashcase (lowercase (sanitize (getVar 'additionalInfoTabLabel')))}}"
                           >
                        */}
                        <a
                            className="tab-title"
                            href={`#tab-${$dashcase($lowercase($sanitize($getVar($string('additionalInfoTabLabel')))))}`}
                        >
                            {/* html L29: {{sanitize (getVar 'additionalInfoTabLabel')}} */}
                            {$sanitize($getVar($string('additionalInfoTabLabel')))}
                        </a>
                    </li>
                )}
            />
            {/* html L33: {{#all settings.show_product_reviews theme_settings.show_product_reviews product.reviews.total}} */}
            <$All
                values={[settings.show_product_reviews, theme_settings.show_product_reviews, product.reviews.total]}
                $then={() => (
                    /* html L34: <li class="tab"> */
                    <li className="tab">
                        {/* html L35: <a class="tab-title productView-reviewTabLink" href="#tab-reviews">{{lang 'products.reviews.header' total=product.reviews.total}}</a> */}
                        <a className="tab-title productView-reviewTabLink" href="#tab-reviews">
                            {/* html L35: {{lang 'products.reviews.header' total=product.reviews.total}} */}
                            {$lang($string('products.reviews.header'), {total: product.reviews.total})}
                        </a>
                    </li>
                )}
            />
        </ul>
        {/* html L39: <div class="tabs-contents"> */}
        <div className="tabs-contents">
            {/* html L40: {{#if product.description}} */}
            <$If
                query={[product.description]}
                $then={() => (
                    /* html L41: <div class="tab-content is-active" id="tab-description"> */
                    <div className="tab-content is-active" id="tab-description">
                        {/* html L42: {{{product.description}}} */}
                        {$unescaped(product.description)}
                    </div>
                )}
            />
            {/* html L45: {{#if product.warranty}} */}
            <$If
                query={[product.warranty]}
                $then={() => (
                    /* html L46: <div class="tab-content {{#unless product.description}}is-active{{/unless}}" id="tab-warranty"> */
                    <div className={`tab-content ${$unless(product.description).then(() => $$raw('is-active'))}`} id="tab-warranty">
                        {/* html L47: {{{product.warranty}}} */}
                        {$unescaped(product.warranty)}
                    </div>
                )}
            />
            {/* html L50: {{#if (getVar 'showAdditionalInfoTab')}} */}
            <$If
                query={[$getVar($string('showAdditionalInfoTab'))]}
                $then={() => (
                    /* html L51: <div class="tab-content {{#unless product.description}}{{#unless product.warranty}}is-active{{/unless}}{{/unless}}" id="tab-{{dashcase (lowercase (sanitize (getVar 'additionalInfoTabLabel')))}}"> */
                    <div
                        className={`tab-content ${$unless(product.description).then(() => $unless(product.warranty).then(() => $$raw('is-active')))}`}
                        id={`tab-${$dashcase($lowercase($sanitize($getVar($string('additionalInfoTabLabel')))))}`}
                    >
                        {/* html L52: <dl class="productView-info"> */}
                        <dl className="productView-info">
                            {/* html L53: {{#if theme_settings.show_attributes_tabs}} */}
                            <$If query={[theme_settings.show_attributes_tabs]} $then={() => /* html L54: {{> components/products/attributes }} */ <Attributes product={product}/>}/>
                            {/* html L56: {{#if theme_settings.show_custom_fields_tabs}} */}
                            <$If query={[theme_settings.show_custom_fields_tabs]} $then={() => /* html L57: {{> components/products/custom-fields }} */ <CustomFields product={product}/>}/>
                        </dl>
                    </div>
                )}
            />
            {/* html L62: {{#all settings.show_product_reviews theme_settings.show_product_reviews}} */}
            <$All
                values={[settings.show_product_reviews, theme_settings.show_product_reviews]}
                $then={() => (
                    /* html L63: <div class="tab-content" id="tab-reviews"> */
                    <div className="tab-content" id="tab-reviews">
                        {/* html L64: {{> components/products/reviews reviews=product.reviews product=product urls=urls}} */}
                        <Reviews reviews={product.reviews} product={product} urls={urls} theme_settings={theme_settings} pagination={pagination}/>
                    </div>
                )}
            />
        </div>
    </>
));
