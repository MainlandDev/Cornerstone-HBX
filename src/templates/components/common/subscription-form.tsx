/**
 * Source: templates/components/common/subscription-form.html (34 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
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
        {/* html L1: <h3 class="footer-info-heading">{{lang 'newsletter.subscribe'}}</h3> */}
        <h3 className="footer-info-heading">
            {/* html L1: {{lang 'newsletter.subscribe'}} */}
            <$Lang translationKey={$string('newsletter.subscribe')}/>
        </h3>
        {/* html L2: <p>{{lang 'newsletter.subscribe_intro'}}</p> */}
        <p>
            {/* html L2: {{lang 'newsletter.subscribe_intro'}} */}
            <$Lang translationKey={$string('newsletter.subscribe_intro')}/>
        </p>

        {/* html L4: <form class="form" action="{{urls.subscribe.action}}" method="post"> */}
        <form className="form" action={urls.subscribe.action} method="post">
            {/* html L5: <fieldset class="form-fieldset"> */}
            <fieldset className="form-fieldset">
                {/* html L6: <input type="hidden" name="action" value="subscribe"> */}
                <input type="hidden" name="action" value="subscribe"/>
                {/* html L7: <input type="hidden" name="nl_first_name" value="bc"> */}
                <input type="hidden" name="nl_first_name" value="bc"/>
                {/* html L8: <input type="hidden" name="check" value="1"> */}
                <input type="hidden" name="check" value="1"/>
                {/* html L9: <div class="form-field"> */}
                <div className="form-field">
                    {/* html L10: <label class="form-label is-srOnly" for="nl_email">{{lang 'common.email_address'}}</label> */}
                    <label className="form-label is-srOnly" htmlFor="nl_email">
                        {/* html L10: {{lang 'common.email_address'}} */}
                        <$Lang translationKey={$string('common.email_address')}/>
                    </label>
                    {/* html L11: <div class="form-prefixPostfix wrap"> */}
                    <div className="form-prefixPostfix wrap">
                        {/* html L12-22:
                           <input class="form-input"
                                  id="nl_email"
                                  name="nl_email"
                                  type="email"
                                  value="{{customer.email}}"
                                  placeholder="{{lang 'newsletter.email_placeholder'}}"
                                  aria-describedby="alertBox-message-text"
                                  aria-required="true"
                                  autocomplete="email"
                                  required
                           >
                        */}
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
                        {/* html L23-26:
                           <input class="button button--primary form-prefixPostfix-button--postfix"
                                  type="submit"
                                  value="{{lang 'newsletter.subscribe_submit'}}"
                           >
                        */}
                        <input
                            className="button button--primary form-prefixPostfix-button--postfix"
                            type="submit"
                            value={$lang($string('newsletter.subscribe_submit'))}
                        />
                    </div>
                    {/* html L28: {{#if settings.show_newsletter_summary }} */}
                    <$If
                        query={[settings.show_newsletter_summary]}
                        $then={() => /* html L29: <div class="footer-newsletter-summary">{{settings.newsletter_summary}}</div> */ <div className="footer-newsletter-summary">{/* html L29: {{settings.newsletter_summary}} */}{settings.newsletter_summary}</div>}
                    />
                </div>
            </fieldset>
        </form>
    </>
));
