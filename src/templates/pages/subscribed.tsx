import {$If, $lang, $Lang, $Page, $partial, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <section className="page">
                        <div className="page-content page-content--centered">
                            <h1 className="page-heading" tabIndex={0} role="status" aria-live="assertive">
                                <$If
                                    test={$pointer("subscription.error")}
                                    $then={() => <$Lang keyName={$string("newsletter.subscribed_heading_error")} />}
                                    $else={() => <$Lang keyName={$string("newsletter.subscribed_heading")} />}
                                />
                            </h1>

                            <$If
                                test={$pointer("subscription.error")}
                                $then={() => $partial("components/common/alert/alert-error", $pointer("subscription.error"))}
                                $else={() =>
                                    $partial("components/common/alert/alert-success", $lang($string("newsletter.subscribed_message")))
                                }
                            />
                        </div>
                    </section>

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
    const subscriptionStatusElement = document.querySelector('.page-content > .page-heading');
    if (subscriptionStatusElement) subscriptionStatusElement.focus();
`,
                        }}
                    />
                </>
            ),
        }}
        layout="layout/base"
    />
);
