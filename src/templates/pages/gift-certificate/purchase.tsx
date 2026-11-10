/**
 * Source: templates/pages/gift-certificate/purchase.html (126 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $Partial, $if, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$Inject, $Lang, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$$when} from '@mainlanddev/bigcommerce-react/internal';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';
import GiftCertificateNavigation from '@/templates/components/gift-certificate/navigation';
import type {GiftCertificatePurchasePageContext} from '@/context-pagesMisc';

export default $page<GiftCertificatePurchasePageContext>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L3: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L4: <h1 class="page-heading">{{lang 'gift_certificate.heading' }}</h1> */}
                        <h1 className="page-heading">
                            {/* html L4: {{lang 'gift_certificate.heading' }} */}
                            <$Lang translationKey={$string('gift_certificate.heading')}/>
                        </h1>
                        {/* html L5: {{> components/gift-certificate/navigation gift_page='purchase'}} */}
                        <GiftCertificateNavigation gift_page={$string('purchase')} urls={ctx.urls}/>

                        {/* html L7: <main class="account account--fixed"> */}
                        <main className="account account--fixed">
                            {/* html L9: {{#each forms.gift_certificate.errors}} */}
                            <$Each
                                list={ctx.forms.gift_certificate.errors}
                                $then={(error) => /* html L10: {{> components/common/alert/alert-error this}} */ <$Partial name="components/common/alert/alert-error" context={error}/>}
                            />

                            {/* html L13: <form class="form gift-certificate-form" method="post" id="gift-certificate-form" action="{{forms.gift_certificate.action}}"> */}
                            <form
                                className="form gift-certificate-form"
                                method="post"
                                id="gift-certificate-form"
                                action={ctx.forms.gift_certificate.action}
                            >
                                {/* html L14: {{#if forms.gift_certificate.cart_item_id}} */}
                                <$If
                                    query={[ctx.forms.gift_certificate.cart_item_id]}
                                    $then={() => (
                                        /* html L15: <input type="hidden" name="cartitemid" value="{{forms.gift_certificate.cart_item_id}}"> */
                                        <input type="hidden" name="cartitemid" value={ctx.forms.gift_certificate.cart_item_id}/>
                                    )}
                                />
                                {/* html L17: <div class="form-row form-row--half"> */}
                                <div className="form-row form-row--half">
                                    {/* html L18: <div class="form-field"> */}
                                    <div className="form-field">
                                        {/* html L19: <label class="form-label" for="from_name"> */}
                                        <label className="form-label" htmlFor="from_name">
                                            {/* html L20: {{lang 'forms.gift_certificate.purchase.from_name' }} */}
                                            <$Lang translationKey={$string('forms.gift_certificate.purchase.from_name')}/>
                                            {/* html L21: <small>{{lang 'common.required' }}</small> */}
                                            <small>
                                                {/* html L21: {{lang 'common.required' }} */}
                                                <$Lang translationKey={$string('common.required')}/>
                                            </small>
                                        </label>
                                        {/* html L23: <input type="text" class="form-input" name="from_name" id="from_name" value="{{forms.gift_certificate.values.from_name}}"> */}
                                        <input
                                            type="text"
                                            className="form-input"
                                            name="from_name"
                                            id="from_name"
                                            value={ctx.forms.gift_certificate.values.from_name}
                                        />
                                    </div>
                                    {/* html L25: <div class="form-field"> */}
                                    <div className="form-field">
                                        {/* html L26: <label class="form-label" for="from_email"> */}
                                        <label className="form-label" htmlFor="from_email">
                                            {/* html L27: {{lang 'forms.gift_certificate.purchase.from_email' }} */}
                                            <$Lang translationKey={$string('forms.gift_certificate.purchase.from_email')}/>
                                            {/* html L28: <small>{{lang 'common.required' }}</small> */}
                                            <small>
                                                {/* html L28: {{lang 'common.required' }} */}
                                                <$Lang translationKey={$string('common.required')}/>
                                            </small>
                                        </label>
                                        {/* html L30: <input type="text" class="form-input" name="from_email" id="from_email" value="{{forms.gift_certificate.values.from_email}}"> */}
                                        <input
                                            type="text"
                                            className="form-input"
                                            name="from_email"
                                            id="from_email"
                                            value={ctx.forms.gift_certificate.values.from_email}
                                        />
                                    </div>
                                </div>
                                {/* html L33: <div class="form-row form-row--half"> */}
                                <div className="form-row form-row--half">
                                    {/* html L34: <div class="form-field"> */}
                                    <div className="form-field">
                                        {/* html L35: <label class="form-label" for="to_name"> */}
                                        <label className="form-label" htmlFor="to_name">
                                            {/* html L36: {{lang 'forms.gift_certificate.purchase.to_name' }} */}
                                            <$Lang translationKey={$string('forms.gift_certificate.purchase.to_name')}/>
                                            {/* html L37: <small>{{lang 'common.required' }}</small> */}
                                            <small>
                                                {/* html L37: {{lang 'common.required' }} */}
                                                <$Lang translationKey={$string('common.required')}/>
                                            </small>
                                        </label>
                                        {/* html L39: <input type="text" class="form-input" name="to_name" id="to_name" value="{{forms.gift_certificate.values.to_name}}"> */}
                                        <input
                                            type="text"
                                            className="form-input"
                                            name="to_name"
                                            id="to_name"
                                            value={ctx.forms.gift_certificate.values.to_name}
                                        />
                                    </div>
                                    {/* html L41: <div class="form-field"> */}
                                    <div className="form-field">
                                        {/* html L42: <label class="form-label" for="to_email"> */}
                                        <label className="form-label" htmlFor="to_email">
                                            {/* html L43: {{lang 'forms.gift_certificate.purchase.to_email' }} */}
                                            <$Lang translationKey={$string('forms.gift_certificate.purchase.to_email')}/>
                                            {/* html L44: <small>{{lang 'common.required' }}</small> */}
                                            <small>
                                                {/* html L44: {{lang 'common.required' }} */}
                                                <$Lang translationKey={$string('common.required')}/>
                                            </small>
                                        </label>
                                        {/* html L46: <input type="text" class="form-input" name="to_email" id="to_email" value="{{forms.gift_certificate.values.to_email}}"> */}
                                        <input
                                            type="text"
                                            className="form-input"
                                            name="to_email"
                                            id="to_email"
                                            value={ctx.forms.gift_certificate.values.to_email}
                                        />
                                    </div>
                                </div>
                                {/* html L49: <div class="form-row"> */}
                                <div className="form-row">
                                    {/* html L50: <fieldset class="form-fieldset form-column"> */}
                                    <fieldset className="form-fieldset form-column">
                                        {/* html L51: {{#if forms.gift_certificate.can_use_custom_amount }} */}
                                        <$If
                                            query={[ctx.forms.gift_certificate.can_use_custom_amount]}
                                            $then={() => (
                                                /* html L52: <div class="form-field"> */
                                                <div className="form-field">
                                                    {/* html L53: <label class="form-label" for="certificate_amount"> */}
                                                    <label className="form-label" htmlFor="certificate_amount">
                                                        {/* html L54: {{lang 'forms.gift_certificate.purchase.amount' }} */}
                                                        <$Lang translationKey={$string('forms.gift_certificate.purchase.amount')}/>
                                                        {/* html L55: <small>{{lang 'common.required' }}</small> */}
                                                        <small>
                                                            {/* html L55: {{lang 'common.required' }} */}
                                                            <$Lang translationKey={$string('common.required')}/>
                                                        </small>
                                                    </label>
                                                    {/* html L57: <input type="text" data-min="{{forms.gift_certificate.minimum.value}}" data-max="{{forms.gift_certificate.maximum.value}}" data-min-formatted="{{forms.gift_certificate.minimum.formatted}}" data-max-formatted="{{forms.gift_certificate.maximum.formatted}}" class="form-input" name="certificate_amount" id="certificate_amount" value="{{forms.gift_certificate.values.amount.value}}"> */}
                                                    <input
                                                        type="text"
                                                        data-min={ctx.forms.gift_certificate.minimum.value}
                                                        data-max={ctx.forms.gift_certificate.maximum.value}
                                                        data-min-formatted={ctx.forms.gift_certificate.minimum.formatted}
                                                        data-max-formatted={ctx.forms.gift_certificate.maximum.formatted}
                                                        className="form-input"
                                                        name="certificate_amount"
                                                        id="certificate_amount"
                                                        value={ctx.forms.gift_certificate.values.amount.value}
                                                    />
                                                </div>
                                            )}
                                            $else={() => (
                                                /* html L59: {{else}}
                                                                                                      html L60: <div class="form-field">
                                                */
                                                <div className="form-field">
                                                    {/* html L61: <label class="form-label" for="selected_amount"> */}
                                                    <label className="form-label" htmlFor="selected_amount">
                                                        {/* html L62: {{lang 'forms.gift_certificate.purchase.amount' }} */}
                                                        <$Lang translationKey={$string('forms.gift_certificate.purchase.amount')}/>
                                                        {/* html L63: <small>{{lang 'common.required' }}</small> */}
                                                        <small>
                                                            {/* html L63: {{lang 'common.required' }} */}
                                                            <$Lang translationKey={$string('common.required')}/>
                                                        </small>
                                                    </label>
                                                    {/* html L65: <select class="form-select" name="selected_amount" id="selected_amount"> */}
                                                    <select className="form-select" name="selected_amount" id="selected_amount">
                                                        {/* html L66: {{#each forms.gift_certificate.amount_options}} */}
                                                        <$Each
                                                            list={ctx.forms.gift_certificate.amount_options}
                                                            $then={(option) => /* html L67: <option value="{{value}}">{{formatted}}</option> */ <option value={option.value}>{/* html L67: {{formatted}} */}{option.formatted}</option>}
                                                        />
                                                    </select>
                                                </div>
                                            )}
                                        />
                                        {/* html L72: {{#if forms.gift_certificate.expires_in_days }} */}
                                        <$If
                                            query={[ctx.forms.gift_certificate.expires_in_days]}
                                            $then={() => (
                                                /* html L73: <div class="form-field"> */
                                                <div className="form-field">
                                                    {/* html L74: <input type="checkbox" class="form-checkbox" name="agree" id="agree"> */}
                                                    <input type="checkbox" className="form-checkbox" name="agree" id="agree"/>
                                                    {/* html L75: <label class="form-label" for="agree">{{lang 'forms.gift_certificate.purchase.agree' days=forms.gift_certificate.expires_in_days}}</label> */}
                                                    <label className="form-label" htmlFor="agree">
                                                        {/* html L75: {{lang 'forms.gift_certificate.purchase.agree' days=forms.gift_certificate.expires_in_days}} */}
                                                        <$Lang
                                                            translationKey={$string('forms.gift_certificate.purchase.agree')}
                                                            params={{days: ctx.forms.gift_certificate.expires_in_days}}
                                                        />
                                                    </label>
                                                </div>
                                            )}
                                        />
                                        {/* html L78: <div class="form-field"> */}
                                        <div className="form-field">
                                            {/* html L79: <input type="checkbox" class="form-checkbox" name="agree2" id="agree2"{{#if forms.gift_certificate.editing}} checked{{/if}}> */}
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                name="agree2"
                                                id="agree2"
                                                checked={$$when($if(ctx.forms.gift_certificate.editing))}
                                            />
                                            {/* html L80: <label class="form-label" for="agree2">{{lang 'forms.gift_certificate.purchase.agree2' }}</label> */}
                                            <label className="form-label" htmlFor="agree2">
                                                {/* html L80: {{lang 'forms.gift_certificate.purchase.agree2' }} */}
                                                <$Lang translationKey={$string('forms.gift_certificate.purchase.agree2')}/>
                                            </label>
                                        </div>
                                    </fieldset>
                                    {/* html L83: <fieldset class="form-fieldset form-column"> */}
                                    <fieldset className="form-fieldset form-column">
                                        {/* html L84: <div class="form-field"> */}
                                        <div className="form-field">
                                            {/* html L85: <label class="form-label" for="message">{{lang 'forms.gift_certificate.purchase.message' }}</label> */}
                                            <label className="form-label" htmlFor="message">
                                                {/* html L85: {{lang 'forms.gift_certificate.purchase.message' }} */}
                                                <$Lang translationKey={$string('forms.gift_certificate.purchase.message')}/>
                                            </label>
                                            {/* html L86: <textarea class="form-input" name="message" id="message" rows="8" >{{forms.gift_certificate.values.message}}</textarea> */}
                                            <textarea
                                                className="form-input"
                                                name="message"
                                                id="message"
                                                rows={8}
                                                defaultValue={ctx.forms.gift_certificate.values.message}
                                            />
                                        </div>
                                        {/* html L88: <label class="form-label"> */}
                                        <label className="form-label">
                                            {/* html L89: {{lang 'forms.gift_certificate.purchase.theme' }} */}
                                            <$Lang translationKey={$string('forms.gift_certificate.purchase.theme')}/>
                                            {/* html L90: <small>{{lang 'common.required' }}</small> */}
                                            <small>
                                                {/* html L90: {{lang 'common.required' }} */}
                                                <$Lang translationKey={$string('common.required')}/>
                                            </small>
                                        </label>
                                        {/* html L92: <div class="form-field form-field-group"> */}
                                        <div className="form-field form-field-group">
                                            {/* html L93: {{#each forms.gift_certificate.themes}} */}
                                            <$Each
                                                list={ctx.forms.gift_certificate.themes}
                                                $then={(theme) => (
                                                    <>
                                                        {/* html L94: <input type="radio" class="form-radio" name="certificate_theme" id="theme_{{this.value}}" value="{{this.value}}"{{#if this.value '==' ../forms.gift_certificate.values.theme}} checked{{/if}}> */}
                                                        <input
                                                            type="radio"
                                                            className="form-radio"
                                                            name="certificate_theme"
                                                            id={`theme_${theme.value}`}
                                                            value={theme.value}
                                                            checked={$$when($if(theme.value, '==', ctx.forms.gift_certificate.values.theme))}
                                                        />
                                                        {/* html L95: <label class="form-label" for="theme_{{this.value}}">{{this.display}}</label> */}
                                                        <label className="form-label" htmlFor={`theme_${theme.value}`}>
                                                            {/* html L95: {{this.display}} */}
                                                            {theme.display}
                                                        </label>
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </fieldset>
                                </div>
                                {/* html L100: <div class="form-actions"> */}
                                <div className="form-actions">
                                    {/* html L101: {{inject 'previewError' (lang 'forms.gift_certificate.purchase.preview_error')}} */}
                                    <$Inject keyName={$string('previewError')} value={$lang($string('forms.gift_certificate.purchase.preview_error'))}/>
                                    {/* html L102: {{inject 'enterAmount' (lang 'forms.validate.gift.amount')}} */}
                                    <$Inject keyName={$string('enterAmount')} value={$lang($string('forms.validate.gift.amount'))}/>
                                    {/* html L103: {{inject 'toName' (lang 'forms.validate.gift.to_name')}} */}
                                    <$Inject keyName={$string('toName')} value={$lang($string('forms.validate.gift.to_name'))}/>
                                    {/* html L104: {{inject 'toEmail' (lang 'forms.validate.gift.to_email')}} */}
                                    <$Inject keyName={$string('toEmail')} value={$lang($string('forms.validate.gift.to_email'))}/>
                                    {/* html L105: {{inject 'fromName' (lang 'forms.validate.gift.from_name')}} */}
                                    <$Inject keyName={$string('fromName')} value={$lang($string('forms.validate.gift.from_name'))}/>
                                    {/* html L106: {{inject 'fromEmail' (lang 'forms.validate.gift.from_email')}} */}
                                    <$Inject keyName={$string('fromEmail')} value={$lang($string('forms.validate.gift.from_email'))}/>
                                    {/* html L107: {{inject 'certTheme' (lang 'forms.validate.gift.cert_theme')}} */}
                                    <$Inject keyName={$string('certTheme')} value={$lang($string('forms.validate.gift.cert_theme'))}/>
                                    {/* html L108: {{inject 'agreeToTerms' (lang 'forms.validate.gift.agree_terms')}} */}
                                    <$Inject keyName={$string('agreeToTerms')} value={$lang($string('forms.validate.gift.agree_terms'))}/>
                                    {/* html L109-114:
                                       <input
                                           id="gift-certificate-preview"
                                           class="button"
                                           type="submit"
                                           value="{{lang 'forms.gift_certificate.purchase.preview' }}"
                                           data-preview-url="{{forms.gift_certificate.preview}}">
                                    */}
                                    <input
                                        id="gift-certificate-preview"
                                        className="button"
                                        type="submit"
                                        value={$lang($string('forms.gift_certificate.purchase.preview'))}
                                        data-preview-url={ctx.forms.gift_certificate.preview}
                                    />

                                    {/* html L116-120:
                                       <input
                                           id="gift-certificate-submit"
                                           class="button button--primary"
                                           type="submit"
                                           value="{{lang 'forms.gift_certificate.purchase.submit_value' }}">
                                    */}
                                    <input
                                        id="gift-certificate-submit"
                                        className="button button--primary"
                                        type="submit"
                                        value={$lang($string('forms.gift_certificate.purchase.submit_value'))}
                                    />
                                </div>
                            </form>
                        </main>
                    </>
                )}
            />
            {/* html L125: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
