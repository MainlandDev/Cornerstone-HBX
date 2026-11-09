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
        <ul className="tabs" data-tab="">
            <$If
                query={[product.description]}
                $then={() => (
                    <li className="tab is-active">
                        <a className="tab-title" href="#tab-description">{$lang($string('products.description'))}</a>
                    </li>
                )}
            />
            <$If
                query={[product.warranty]}
                $then={() => (
                    <li className={`tab ${$unless(product.description).then(() => $$raw('is-active'))}`}>
                        <a className="tab-title" href="#tab-warranty">{$lang($string('products.warranty'))}</a>
                    </li>
                )}
            />
            <$If
                query={[theme_settings['pdp-custom-fields-tab-label']]}
                $then={() => <$AssignVar keyName={$string('additionalInfoTabLabel')} value={theme_settings['pdp-custom-fields-tab-label']}/>}
                $else={() => <$AssignVar keyName={$string('additionalInfoTabLabel')} value={$lang($string('page_builder.pdp-custom-fields-tab-label'))}/>}
            />
            <$AssignVar keyName={$string('showAdditionalInfoTab')} value={$number(0)}/>
            <$All
                values={[product.attributes, theme_settings.show_attributes_tabs]}
                $then={() => <$AssignVar keyName={$string('showAdditionalInfoTab')} value={$number(1)}/>}
            />
            <$All
                values={[product.custom_fields, theme_settings.show_custom_fields_tabs]}
                $then={() => <$AssignVar keyName={$string('showAdditionalInfoTab')} value={$number(1)}/>}
            />
            <$If
                query={[$getVar($string('showAdditionalInfoTab'))]}
                $then={() => (
                    <li className={`tab ${$unless(product.description).then(() => $unless(product.warranty).then(() => $$raw('is-active')))}`}>
                        <a
                            className="tab-title"
                            href={`#tab-${$dashcase($lowercase($sanitize($getVar($string('additionalInfoTabLabel')))))}`}
                        >
                            {$sanitize($getVar($string('additionalInfoTabLabel')))}
                        </a>
                    </li>
                )}
            />
            <$All
                values={[settings.show_product_reviews, theme_settings.show_product_reviews, product.reviews.total]}
                $then={() => (
                    <li className="tab">
                        <a className="tab-title productView-reviewTabLink" href="#tab-reviews">
                            {$lang($string('products.reviews.header'), {total: product.reviews.total})}
                        </a>
                    </li>
                )}
            />
        </ul>
        <div className="tabs-contents">
            <$If
                query={[product.description]}
                $then={() => (
                    <div className="tab-content is-active" id="tab-description">
                        {$unescaped(product.description)}
                    </div>
                )}
            />
            <$If
                query={[product.warranty]}
                $then={() => (
                    <div className={`tab-content ${$unless(product.description).then(() => $$raw('is-active'))}`} id="tab-warranty">
                        {$unescaped(product.warranty)}
                    </div>
                )}
            />
            <$If
                query={[$getVar($string('showAdditionalInfoTab'))]}
                $then={() => (
                    <div
                        className={`tab-content ${$unless(product.description).then(() => $unless(product.warranty).then(() => $$raw('is-active')))}`}
                        id={`tab-${$dashcase($lowercase($sanitize($getVar($string('additionalInfoTabLabel')))))}`}
                    >
                        <dl className="productView-info">
                            <$If query={[theme_settings.show_attributes_tabs]} $then={() => <Attributes product={product}/>}/>
                            <$If query={[theme_settings.show_custom_fields_tabs]} $then={() => <CustomFields product={product}/>}/>
                        </dl>
                    </div>
                )}
            />
            <$All
                values={[settings.show_product_reviews, theme_settings.show_product_reviews]}
                $then={() => (
                    <div className="tab-content" id="tab-reviews">
                        <Reviews reviews={product.reviews} product={product} urls={urls} theme_settings={theme_settings} pagination={pagination}/>
                    </div>
                )}
            />
        </div>
    </>
));
