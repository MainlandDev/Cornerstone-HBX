import {$partial, $pointer, $Each, $If, $Inject, $Lang, $lang, $string} from "@mainlanddev/hbx-bigcommerce";

interface InboxOrder {
    id: string;
    date: string;
    amount: {formatted: string};
}

export default () => (
    <$If
        test={$pointer("customer.inbox.orders")}
        $then={() => (
            <>
                <h2>
                    <$Lang keyName={$string("forms.inbox.send_message")} />
                </h2>
                <form className="form" data-inbox-form={""} action={$pointer("urls.account.send_message")} method="post">
                    <$Inject keyName={$string("enterOrderNum")} value={$lang($string("forms.validate.account.inbox.order"))} />{" "}
                    <$Inject keyName={$string("enterSubject")} value={$lang($string("forms.validate.account.inbox.subject"))} />{" "}
                    <$Inject keyName={$string("enterMessage")} value={$lang($string("forms.validate.account.inbox.message"))} />
                    <div className="form-field">
                        <label className="form-label" htmlFor="message_order_id">
                            <$Lang keyName={$string("forms.inbox.order")} />{" "}
                            <small>
                                <$Lang keyName={$string("common.required")} />
                            </small>
                        </label>
                        <select className="form-select" name="message_order_id" id="message_order_id">
                            <$Each
                                list={$pointer<InboxOrder[]>("customer.inbox.orders")}
                                $then={(order) => (
                                    <option value={order.id}>
                                        <$Lang
                                            keyName={$string("forms.inbox.order_display")}
                                            id={order.id}
                                            date={order.date}
                                            total={order.amount.formatted}
                                        />
                                    </option>
                                )}
                            />
                        </select>
                    </div>
                    <div className="form-field" id="message_subject_field_id">
                        <label className="form-label" htmlFor="message_subject">
                            <$Lang keyName={$string("forms.inbox.subject")} />{" "}
                            <small>
                                <$Lang keyName={$string("common.required")} />
                            </small>
                        </label>
                        <input
                            aria-labelledby="message_subject_field_id"
                            aria-live="polite"
                            type="text"
                            className="form-input"
                            name="message_subject"
                            id="message_subject"
                        />
                    </div>
                    <div className="form-field" id="message_content_field_id">
                        <label className="form-label" htmlFor="message_content">
                            <$Lang keyName={$string("forms.inbox.message")} />{" "}
                            <small>
                                <$Lang keyName={$string("common.required")} />
                            </small>
                        </label>

                        <textarea
                            aria-labelledby="message_content_field_id"
                            aria-live="polite"
                            className="form-input"
                            name="message_content"
                            id="message_content"
                            rows={7}
                        />
                    </div>
                    <div className="form-actions">
                        <input className="button button--primary" type="submit" value={$lang($string("forms.inbox.submit_value"))} />{" "}
                        <input className="button" type="reset" value={$lang($string("forms.inbox.clear_value"))} />
                    </div>
                </form>
            </>
        )}
        $else={() => $partial("components/common/alert/alert-info", $lang($string("forms.inbox.no_orders")))}
    />
);
