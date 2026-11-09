import {$If, $Partial, $if, $number, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Inject} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$concat, $for, $lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import type {CustomerHint, ProductDetailHint, ProductPageHint, ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    product: ProductDetailHint;
    theme_settings: ThemeSettingsHint;
    customer: CustomerHint;
    urls: ProductPageHint['urls'];
}>(({product, theme_settings, customer, urls}) => (
    <div id="modal-review-form" className="modal" data-reveal="">
        <$Inject keyName={$string('reviewRating')} value={$lang($string('forms.validate.reviews.rating'))}/>
        <$Inject keyName={$string('reviewSubject')} value={$lang($string('forms.validate.reviews.title'))}/>
        <$Inject keyName={$string('reviewName')} value={$lang($string('forms.validate.reviews.name'))}/>
        <$Inject keyName={$string('reviewComment')} value={$lang($string('forms.validate.reviews.comment'))}/>
        <$Inject keyName={$string('reviewEmail')} value={$lang($string('forms.validate.common.email_address'))}/>
        <div className="modal-header">
            <h2 className="modal-header-title">{$lang($string('products.reviews.write_a_review'))}</h2>
            <$Partial name="components/common/modal/modal-close-btn"/>
        </div>
        <div className="modal-body">
            <div className="writeReview-productDetails">
                <div className="writeReview-productImage-container">
                    <$Partial
                        name="components/common/responsive-img"
                        hash={{
                            image: product.main_image,
                            fallback_size: theme_settings.product_size,
                            lazyload: theme_settings.lazyload_mode,
                            default_image: theme_settings.default_image_product,
                        }}
                    />
                </div>
                <h6 className="product-brand">{product.brand.name}</h6>
                <h5 className="product-title">{product.title}</h5>
            </div>
            <form className="form writeReview-form" action={urls.product.post_review} method="post">
                <fieldset className="form-fieldset">
                    <div className="form-field">
                        <label className="form-label" htmlFor="rating-rate">
                            {$lang($string('products.reviews.rating_label'))}
                            <small>{$lang($string('common.required'))}</small>
                        </label>
                        {$$raw('<!-- Stars -->')}
                        {$$raw('<!-- TODO: Review Stars need to be componentised, both for display and input -->')}
                        <select id="rating-rate" className="form-select" name="revrating" data-input="" aria-required="true">
                            <option value="">{$lang($string('products.reviews.select_rating'))}</option>
                            {$for($number(1), $number(5)).then((ctx) =>
                                $if(product.reviews.selected_rating, '===', ctx.$index)
                                    .then(() => [
                                        $$raw('<option selected value="'),
                                        ctx.$index,
                                        $$raw('">'),
                                        $lang($concat($string('products.reviews.rating.'), ctx.$index)),
                                        $$raw('</option>'),
                                    ])
                                    .else(() => [
                                        $$raw('<option value="'),
                                        ctx.$index,
                                        $$raw('">'),
                                        $lang($concat($string('products.reviews.rating.'), ctx.$index)),
                                        $$raw('</option>'),
                                    ]),
                            )}
                        </select>
                    </div>

                    {$$raw('<!-- Name -->')}
                    <$If
                        query={[product.reviews.author]}
                        $then={() => (
                            <$Partial
                                name="components/common/forms/text"
                                hash={{
                                    id: $string('revfromname'),
                                    name: $string('revfromname'),
                                    required: $string('true'),
                                    label: $lang($string('products.reviews.form_write.name')),
                                    value: product.reviews.author,
                                }}
                            />
                        )}
                        $else={() => (
                            <$Partial
                                name="components/common/forms/text"
                                hash={{
                                    id: $string('revfromname'),
                                    name: $string('revfromname'),
                                    required: $string('true'),
                                    label: $lang($string('products.reviews.form_write.name')),
                                    value: customer.name,
                                }}
                            />
                        )}
                    />

                    <$If
                        query={[product.reviews.show_review_email]}
                        $then={() => (
                            <>
                                {$$raw('<!-- Email -->')}
                                <$If
                                    query={[product.reviews.email]}
                                    $then={() => (
                                        <$Partial
                                            name="components/common/forms/text"
                                            hash={{
                                                id: $string('email'),
                                                name: $string('email'),
                                                required: $string('true'),
                                                label: $lang($string('products.reviews.form_write.email')),
                                                value: product.reviews.email,
                                            }}
                                        />
                                    )}
                                    $else={() => (
                                        <$Partial
                                            name="components/common/forms/text"
                                            hash={{
                                                id: $string('email'),
                                                name: $string('email'),
                                                required: $string('true'),
                                                label: $lang($string('products.reviews.form_write.email')),
                                                value: customer.email,
                                            }}
                                        />
                                    )}
                                />
                            </>
                        )}
                    />

                    {$$raw('<!-- Review Subject -->')}
                    <$Partial
                        name="components/common/forms/text"
                        hash={{
                            id: $string('revtitle'),
                            name: $string('revtitle'),
                            required: $string('true'),
                            label: $lang($string('products.reviews.form_write.subject')),
                            value: product.reviews.title,
                        }}
                    />

                    {$$raw('<!-- Comments -->')}
                    <$Partial
                        name="components/common/forms/multiline"
                        hash={{
                            id: $string('revtext'),
                            name: $string('revtext'),
                            required: $string('true'),
                            label: $lang($string('products.reviews.form_write.comments')),
                            value: product.reviews.text,
                        }}
                    />

                    {$unescaped(product.reviews.recaptcha.markup)}

                    <div className="form-field">
                        <input type="submit" className="button button--primary" value={$lang($string('products.reviews.form_write.submit_value'))}/>
                    </div>
                    <input type="hidden" name="product_id" value={product.id}/>
                    <input type="hidden" name="action" value="post_review"/>
                    <$If
                        query={[product.reviews.throttleToken]}
                        $then={() => <input type="hidden" name="throttleToken" value={product.reviews.throttleToken}/>}
                    />
                </fieldset>
            </form>
        </div>
    </div>
));
