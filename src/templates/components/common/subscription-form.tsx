import {$If, $Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <>
        <h3 className="footer-info-heading">
            <$Lang keyName={$string("newsletter.subscribe")} />
        </h3>
        <p>
            <$Lang keyName={$string("newsletter.subscribe_intro")} />
        </p>

        <form className="form" action={$pointer("urls.subscribe.action")} method="post">
            <fieldset className="form-fieldset">
                <input type="hidden" name="action" value="subscribe" />
                <input type="hidden" name="nl_first_name" value="bc" />
                <input type="hidden" name="check" value="1" />
                <div className="form-field">
                    <label className="form-label is-srOnly" htmlFor="nl_email">
                        <$Lang keyName={$string("common.email_address")} />
                    </label>
                    <div className="form-prefixPostfix wrap">
                        <input
                            className="form-input"
                            id="nl_email"
                            name="nl_email"
                            type="email"
                            value={$pointer("customer.email")}
                            placeholder={$lang($string("newsletter.email_placeholder"))}
                            aria-describedby="alertBox-message-text"
                            aria-required="true"
                            autoComplete="email"
                            required={true}
                        />
                        <input
                            className="button button--primary form-prefixPostfix-button--postfix"
                            type="submit"
                            value={$lang($string("newsletter.subscribe_submit"))}
                        />
                    </div>
                    <$If
                        test={$pointer("settings.show_newsletter_summary")}
                        $then={() => <div className="footer-newsletter-summary">{$pointer("settings.newsletter_summary")}</div>}
                    />
                </div>
            </fieldset>
        </form>
    </>
);
