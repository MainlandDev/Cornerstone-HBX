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
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        <h1 className="page-heading">
                            <$Lang translationKey={$string('gift_certificate.heading')}/>
                        </h1>
                        <GiftCertificateNavigation gift_page={$string('purchase')} urls={ctx.urls}/>

                        <main className="account account--fixed">
                            <$Each
                                list={ctx.forms.gift_certificate.errors}
                                $then={(error) => <$Partial name="components/common/alert/alert-error" context={error}/>}
                            />

                            <form
                                className="form gift-certificate-form"
                                method="post"
                                id="gift-certificate-form"
                                action={ctx.forms.gift_certificate.action}
                            >
                                <$If
                                    query={[ctx.forms.gift_certificate.cart_item_id]}
                                    $then={() => (
                                        <input type="hidden" name="cartitemid" value={ctx.forms.gift_certificate.cart_item_id}/>
                                    )}
                                />
                                <div className="form-row form-row--half">
                                    <div className="form-field">
                                        <label className="form-label" htmlFor="from_name">
                                            <$Lang translationKey={$string('forms.gift_certificate.purchase.from_name')}/>
                                            <small>
                                                <$Lang translationKey={$string('common.required')}/>
                                            </small>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            name="from_name"
                                            id="from_name"
                                            value={ctx.forms.gift_certificate.values.from_name}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label className="form-label" htmlFor="from_email">
                                            <$Lang translationKey={$string('forms.gift_certificate.purchase.from_email')}/>
                                            <small>
                                                <$Lang translationKey={$string('common.required')}/>
                                            </small>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            name="from_email"
                                            id="from_email"
                                            value={ctx.forms.gift_certificate.values.from_email}
                                        />
                                    </div>
                                </div>
                                <div className="form-row form-row--half">
                                    <div className="form-field">
                                        <label className="form-label" htmlFor="to_name">
                                            <$Lang translationKey={$string('forms.gift_certificate.purchase.to_name')}/>
                                            <small>
                                                <$Lang translationKey={$string('common.required')}/>
                                            </small>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            name="to_name"
                                            id="to_name"
                                            value={ctx.forms.gift_certificate.values.to_name}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label className="form-label" htmlFor="to_email">
                                            <$Lang translationKey={$string('forms.gift_certificate.purchase.to_email')}/>
                                            <small>
                                                <$Lang translationKey={$string('common.required')}/>
                                            </small>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            name="to_email"
                                            id="to_email"
                                            value={ctx.forms.gift_certificate.values.to_email}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <fieldset className="form-fieldset form-column">
                                        <$If
                                            query={[ctx.forms.gift_certificate.can_use_custom_amount]}
                                            $then={() => (
                                                <div className="form-field">
                                                    <label className="form-label" htmlFor="certificate_amount">
                                                        <$Lang translationKey={$string('forms.gift_certificate.purchase.amount')}/>
                                                        <small>
                                                            <$Lang translationKey={$string('common.required')}/>
                                                        </small>
                                                    </label>
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
                                                <div className="form-field">
                                                    <label className="form-label" htmlFor="selected_amount">
                                                        <$Lang translationKey={$string('forms.gift_certificate.purchase.amount')}/>
                                                        <small>
                                                            <$Lang translationKey={$string('common.required')}/>
                                                        </small>
                                                    </label>
                                                    <select className="form-select" name="selected_amount" id="selected_amount">
                                                        <$Each
                                                            list={ctx.forms.gift_certificate.amount_options}
                                                            $then={(option) => <option value={option.value}>{option.formatted}</option>}
                                                        />
                                                    </select>
                                                </div>
                                            )}
                                        />
                                        <$If
                                            query={[ctx.forms.gift_certificate.expires_in_days]}
                                            $then={() => (
                                                <div className="form-field">
                                                    <input type="checkbox" className="form-checkbox" name="agree" id="agree"/>
                                                    <label className="form-label" htmlFor="agree">
                                                        <$Lang
                                                            translationKey={$string('forms.gift_certificate.purchase.agree')}
                                                            params={{days: ctx.forms.gift_certificate.expires_in_days}}
                                                        />
                                                    </label>
                                                </div>
                                            )}
                                        />
                                        <div className="form-field">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                name="agree2"
                                                id="agree2"
                                                checked={$$when($if(ctx.forms.gift_certificate.editing))}
                                            />
                                            <label className="form-label" htmlFor="agree2">
                                                <$Lang translationKey={$string('forms.gift_certificate.purchase.agree2')}/>
                                            </label>
                                        </div>
                                    </fieldset>
                                    <fieldset className="form-fieldset form-column">
                                        <div className="form-field">
                                            <label className="form-label" htmlFor="message">
                                                <$Lang translationKey={$string('forms.gift_certificate.purchase.message')}/>
                                            </label>
                                            <textarea
                                                className="form-input"
                                                name="message"
                                                id="message"
                                                rows={8}
                                                defaultValue={ctx.forms.gift_certificate.values.message}
                                            />
                                        </div>
                                        <label className="form-label">
                                            <$Lang translationKey={$string('forms.gift_certificate.purchase.theme')}/>
                                            <small>
                                                <$Lang translationKey={$string('common.required')}/>
                                            </small>
                                        </label>
                                        <div className="form-field form-field-group">
                                            <$Each
                                                list={ctx.forms.gift_certificate.themes}
                                                $then={(theme) => (
                                                    <>
                                                        <input
                                                            type="radio"
                                                            className="form-radio"
                                                            name="certificate_theme"
                                                            id={`theme_${theme.value}`}
                                                            value={theme.value}
                                                            checked={$$when($if(theme.value, '==', ctx.forms.gift_certificate.values.theme))}
                                                        />
                                                        <label className="form-label" htmlFor={`theme_${theme.value}`}>
                                                            {theme.display}
                                                        </label>
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="form-actions">
                                    <$Inject keyName={$string('previewError')} value={$lang($string('forms.gift_certificate.purchase.preview_error'))}/>
                                    <$Inject keyName={$string('enterAmount')} value={$lang($string('forms.validate.gift.amount'))}/>
                                    <$Inject keyName={$string('toName')} value={$lang($string('forms.validate.gift.to_name'))}/>
                                    <$Inject keyName={$string('toEmail')} value={$lang($string('forms.validate.gift.to_email'))}/>
                                    <$Inject keyName={$string('fromName')} value={$lang($string('forms.validate.gift.from_name'))}/>
                                    <$Inject keyName={$string('fromEmail')} value={$lang($string('forms.validate.gift.from_email'))}/>
                                    <$Inject keyName={$string('certTheme')} value={$lang($string('forms.validate.gift.cert_theme'))}/>
                                    <$Inject keyName={$string('agreeToTerms')} value={$lang($string('forms.validate.gift.agree_terms'))}/>
                                    <input
                                        id="gift-certificate-preview"
                                        className="button"
                                        type="submit"
                                        value={$lang($string('forms.gift_certificate.purchase.preview'))}
                                        data-preview-url={ctx.forms.gift_certificate.preview}
                                    />

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
            <$Partial name="layout/base"/>
        </>
    ),
});
