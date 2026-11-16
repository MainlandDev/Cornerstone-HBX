"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $Lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

interface Message {
    date: string;
    subject: string;
    unread: boolean;
    is_reply: boolean;
    message: string;
}

export default (_props: PartialProps) => (
    <>
        <h3 className="account-heading">
            <$Lang keyName={$string("account.messages.heading")} />
        </h3>

        <ul className="account-list">
            <$Each
                list={$pointer<Message[]>("messages")}
                $then={(message) => (
                    <li className="account-listItem">
                        <div className="account-message">
                            <div className="account-orderStatus">
                                <span>{message.date}</span>
                            </div>

                            <h5 className={`account-product-title ${$Unless({test: message.unread, $then: () => "is-read"})}`}>{message.subject}</h5>
                            <p className={`${$Unless({test: message.unread, $then: () => "is-read"})}`}>
                                <$If
                                    test={message.is_reply}
                                    $then={() => <$Lang keyName={$string("account.messages.merchant_said")} store_name={$pointer("../settings.store_name")} />}
                                    $else={() => <$Lang keyName={$string("account.messages.customer_said")} />}
                                />{" "}
                                {message.message}
                            </p>
                        </div>
                    </li>
                )}
            />
        </ul>
    </>
);
