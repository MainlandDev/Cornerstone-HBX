import {$Page, $partial, $pointer, $string, $getImage, $If, $Each, $Lang, $this} from "@mainlanddev/hbx-bigcommerce";

// LIBRARY GAP: types/context/downloads.ts types `downloads` as `Record<string, unknown>`, so the fields below are read from
// download-item.html, not from library docs: images[] (each item is `this` for getImage), product_name, order_id, and items[]
// with name, size, url, expired, description, days_remaining, downloads_remaining. Typed here so the pointers need no cast.
interface DownloadImage {
    readonly data: string;
}

interface DownloadItem {
    name: string;
    size: string;
    url: string;
    expired: boolean;
    description: string;
    days_remaining: number;
    downloads_remaining: number;
}

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    {$partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")})}
                    <h1 className="page-heading">
                        <$Lang keyName={$string("account.orders.downloads.heading")} number={$pointer("downloads.order_id")} />
                    </h1>
                    {$partial("components/account/navigation", {account_page: $string("orders")})}

                    <div className="account account--fixedLarge">
                        <div className="account-body">
                            <figure className="account-sidebar">
                                <$Each
                                    list={$pointer<unknown[]>("downloads.images")}
                                    $then={() => (
                                        <>
                                            <img
                                                src={$getImage($this<DownloadImage>())}
                                                alt={$pointer<string>("../downloads.product_name")}
                                                title={$pointer<string>("../downloads.product_name")}
                                            />
                                            <figcaption>{$pointer<string>("../downloads.product_name")}</figcaption>
                                        </>
                                    )}
                                />
                            </figure>

                            <section className="account-content account-content--fixed">
                                <p className="account-downloads-summary">
                                    <$Lang keyName={$string("account.orders.downloads.download_files_below")} />{" "}
                                    <strong>{$pointer("downloads.product_name")}</strong>
                                </p>

                                <ul className="account-downloadsList">
                                    <$Each
                                        list={$pointer<DownloadItem[]>("downloads.items")}
                                        $then={(item) => (
                                            <li className="account-downloadsItem">
                                                <$If
                                                    test={item.expired}
                                                    $then={() => (
                                                        <>
                                                            <h5 className="account-downloadsItem-title">
                                                                {item.name} <span className="account-downloadsItem-accent">({item.size})</span>
                                                            </h5>
                                                            <p className="account-downloadsItem-availability">
                                                                <$Lang keyName={$string("account.orders.downloads.expired_content")} />
                                                            </p>
                                                        </>
                                                    )}
                                                    $else={() => (
                                                        <>
                                                            <h5 className="account-downloadsItem-title">
                                                                <a href={item.url}>{item.name}</a> ({item.size})
                                                            </h5>

                                                            <$If
                                                                test={item.description}
                                                                $then={() => <p className="account-downloadsItem-description">{item.description}</p>}
                                                            />

                                                            <$If
                                                                test={item.days_remaining}
                                                                $then={() => (
                                                                    <p className="account-downloadsItem-availability">
                                                                        <$Lang keyName={$string("account.orders.downloads.days_remaining")} number={item.days_remaining} />{" "}
                                                                        <$If
                                                                            test={item.downloads_remaining}
                                                                            $then={() => (
                                                                                <$Lang
                                                                                    keyName={$string("account.orders.downloads.days_or_downloads")}
                                                                                    number={item.downloads_remaining}
                                                                                />
                                                                            )}
                                                                        />{" "}
                                                                        <$Lang keyName={$string("account.orders.downloads.remaining")} />
                                                                    </p>
                                                                )}
                                                                $else={() => (
                                                                    <$If
                                                                        test={item.downloads_remaining}
                                                                        $then={() => (
                                                                            <p className="account-downloadsItem-availability">
                                                                                <$Lang
                                                                                    keyName={$string("account.orders.downloads.downloads_remaining")}
                                                                                    number={item.downloads_remaining}
                                                                                />
                                                                            </p>
                                                                        )}
                                                                    />
                                                                )}
                                                            />
                                                        </>
                                                    )}
                                                />
                                            </li>
                                        )}
                                    />
                                </ul>
                            </section>
                        </div>
                    </div>
                </>
            ),
        }}
        layout="layout/base"
    />
);
