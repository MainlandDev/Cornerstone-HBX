/**
 * Source: templates/components/products/modals/writeReview.html (79 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
    /* html L1: <div id="modal-review-form" class="modal" data-reveal> */
    <div id="modal-review-form" className="modal" data-reveal="">
        {/* html L2: {{inject 'reviewRating' (lang 'forms.validate.reviews.rating')}} */}
        <$Inject keyName={$string('reviewRating')} value={$lang($string('forms.validate.reviews.rating'))}/>
        {/* html L3: {{inject 'reviewSubject' (lang 'forms.validate.reviews.title')}} */}
        <$Inject keyName={$string('reviewSubject')} value={$lang($string('forms.validate.reviews.title'))}/>
        {/* html L4: {{inject 'reviewName' (lang 'forms.validate.reviews.name')}} */}
        <$Inject keyName={$string('reviewName')} value={$lang($string('forms.validate.reviews.name'))}/>
        {/* html L5: {{inject 'reviewComment' (lang 'forms.validate.reviews.comment')}} */}
        <$Inject keyName={$string('reviewComment')} value={$lang($string('forms.validate.reviews.comment'))}/>
        {/* html L6: {{inject 'reviewEmail' (lang 'forms.validate.common.email_address')}} */}
        <$Inject keyName={$string('reviewEmail')} value={$lang($string('forms.validate.common.email_address'))}/>
        {/* html L7: <div class="modal-header"> */}
        <div className="modal-header">
            {/* html L8: <h2 class="modal-header-title">{{lang 'products.reviews.write_a_review'}}</h2> */}
            <h2 className="modal-header-title">{/* html L8: {{lang 'products.reviews.write_a_review'}} */}{$lang($string('products.reviews.write_a_review'))}</h2>
            {/* html L9: {{> components/common/modal/modal-close-btn}} */}
            <$Partial name="components/common/modal/modal-close-btn"/>
        </div>
        {/* html L11: <div class="modal-body"> */}
        <div className="modal-body">
            {/* html L12: <div class="writeReview-productDetails"> */}
            <div className="writeReview-productDetails">
                {/* html L13: <div class="writeReview-productImage-container"> */}
                <div className="writeReview-productImage-container">
                    {/* html L14-19:
                       {{> components/common/responsive-img
                           image=product.main_image
                           fallback_size=theme_settings.product_size
                           lazyload=theme_settings.lazyload_mode
                           default_image=theme_settings.default_image_product
                       }}
                    */}
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
                {/* html L21: <h6 class="product-brand">{{ product.brand.name }}</h6> */}
                <h6 className="product-brand">{/* html L21: {{ product.brand.name }} */}{product.brand.name}</h6>
                {/* html L22: <h5 class="product-title">{{ product.title }}</h5> */}
                <h5 className="product-title">{/* html L22: {{ product.title }} */}{product.title}</h5>
            </div>
            {/* html L24: <form class="form writeReview-form" action="{{ urls.product.post_review }}" method="post"> */}
            <form className="form writeReview-form" action={urls.product.post_review} method="post">
                {/* html L25: <fieldset class="form-fieldset"> */}
                <fieldset className="form-fieldset">
                    {/* html L26: <div class="form-field"> */}
                    <div className="form-field">
                        {/* html L27: <label class="form-label" for="rating-rate">{{lang 'products.reviews.rating_label'}} */}
                        <label className="form-label" htmlFor="rating-rate">
                            {/* html L27: {{lang 'products.reviews.rating_label'}} */}
                            {$lang($string('products.reviews.rating_label'))}
                            {/* html L28: <small>{{lang 'common.required' }}</small> */}
                            <small>{/* html L28: {{lang 'common.required' }} */}{$lang($string('common.required'))}</small>
                        </label>
                        {$$raw('<!-- Stars -->')}
                        {$$raw('<!-- TODO: Review Stars need to be componentised, both for display and input -->')}
                        {/* html L30: <!-- Stars -->
                                                      html L31: <!-- TODO: Review Stars need to be componentised, both for display and input -->
                                                      html L32: <select id="rating-rate" class="form-select" name="revrating" data-input aria-required="true">
                        */}
                        <select id="rating-rate" className="form-select" name="revrating" data-input="" aria-required="true">
                            {/* html L33: <option value="">{{lang 'products.reviews.select_rating'}}</option> */}
                            <option value="">{/* html L33: {{lang 'products.reviews.select_rating'}} */}{$lang($string('products.reviews.select_rating'))}</option>
                            {/* html L36: <option selected value="{{$index}}">{{lang (concat 'products.reviews.rating.' $index) }}</option> */}
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
                    {/* html L44: <!-- Name -->
                                              html L45: {{#if product.reviews.author}}
                    */}
                    <$If
                        query={[product.reviews.author]}
                        $then={() => (
                            /* html L46: {{> components/common/forms/text id="revfromname" name="revfromname" required="true" label=(lang 'products.reviews.form_write.name') value=product.reviews.author}} */
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
                            /* html L47: {{else}}
                                                              html L48: {{> components/common/forms/text id="revfromname" name="revfromname" required="true" label=(lang 'products.reviews.form_write.name') value=customer.name}}
                            */
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

                    {/* html L51: {{#if product.reviews.show_review_email}} */}
                    <$If
                        query={[product.reviews.show_review_email]}
                        $then={() => (
                            <>
                                {$$raw('<!-- Email -->')}
                                {/* html L52: <!-- Email -->
                                                                      html L53: {{#if product.reviews.email}}
                                */}
                                <$If
                                    query={[product.reviews.email]}
                                    $then={() => (
                                        /* html L54: {{> components/common/forms/text id="email" name="email" required="true" label=(lang 'products.reviews.form_write.email') value=product.reviews.email}} */
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
                                        /* html L55: {{else}}
                                                                                      html L56: {{> components/common/forms/text id="email" name="email" required="true" label=(lang 'products.reviews.form_write.email') value=customer.email}}
                                        */
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
                    {/* html L60: <!-- Review Subject -->
                                              html L61: {{> components/common/forms/text id="revtitle" name="revtitle" required="true" label=(lang 'products.reviews.form_write.subject') value=product.reviews.title}}
                    */}
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
                    {/* html L63: <!-- Comments -->
                                              html L64: {{> components/common/forms/multiline id="revtext" name="revtext" required="true" label=(lang 'products.reviews.form_write.comments') value=product.reviews.text}}
                    */}
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

                    {/* html L66: {{{product.reviews.recaptcha.markup}}} */}
                    {$unescaped(product.reviews.recaptcha.markup)}

                    {/* html L68: <div class="form-field"> */}
                    <div className="form-field">
                        {/* html L69-70:
                           <input type="submit" class="button button--primary"
                                  value="{{lang 'products.reviews.form_write.submit_value' }}">
                        */}
                        <input type="submit" className="button button--primary" value={$lang($string('products.reviews.form_write.submit_value'))}/>
                    </div>
                    {/* html L72: <input type="hidden" name="product_id" value="{{ product.id }}"> */}
                    <input type="hidden" name="product_id" value={product.id}/>
                    {/* html L73: <input type="hidden" name="action" value="post_review"> */}
                    <input type="hidden" name="action" value="post_review"/>
                    {/* html L74: {{#if product.reviews.throttleToken}}<input type="hidden" name="throttleToken" value="{{product.reviews.throttleToken}}">{{/if}} */}
                    <$If
                        query={[product.reviews.throttleToken]}
                        $then={() => /* html L74: <input type="hidden" name="throttleToken" value="{{product.reviews.throttleToken}}"> */ <input type="hidden" name="throttleToken" value={product.reviews.throttleToken}/>}
                    />
                </fieldset>
            </form>
        </div>
    </div>
));
