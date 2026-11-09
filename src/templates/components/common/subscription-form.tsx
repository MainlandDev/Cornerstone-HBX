import {$If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {Hint} from '@/context-common';

export default $asPartial<{
    customer: Hint['customer'];
    settings: Hint['settings'];
    urls: Hint['urls'];
}>(({customer, settings, urls}) => (
    <>
        <h3 className="footer-info-heading">
            <$Lang translationKey={$string('newsletter.subscribe')}/>
        </h3>
        <p>
            <$Lang translationKey={$string('newsletter.subscribe_intro')}/>
        </p>

        <form className="form" action={urls.subscribe.action} method="post">
            <fieldset className="form-fieldset">
                <input type="hidden" name="action" value="subscribe"/>
                <input type="hidden" name="nl_first_name" value="bc"/>
                <input type="hidden" name="check" value="1"/>
                <div className="form-field">
                    <label className="form-label is-srOnly" htmlFor="nl_email">
                        <$Lang translationKey={$string('common.email_address')}/>
                    </label>
                    <div className="form-prefixPostfix wrap">
                        <input
                            className="form-input"
                            id="nl_email"
                            name="nl_email"
                            type="email"
                            value={customer.email}
                            placeholder={$lang($string('newsletter.email_placeholder'))}
                            aria-describedby="alertBox-message-text"
                            aria-required="true"
                            autoComplete="email"
                            required
                        />
                        <input
                            className="button button--primary form-prefixPostfix-button--postfix"
                            type="submit"
                            value={$lang($string('newsletter.subscribe_submit'))}
                        />
                    </div>
                    <$If
                        query={[settings.show_newsletter_summary]}
                        $then={() => <div className="footer-newsletter-summary">{settings.newsletter_summary}</div>}
                    />
                </div>
            </fieldset>
        </form>
    </>
));
