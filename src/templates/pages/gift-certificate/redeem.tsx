import GiftCertificateNavigation from "../../components/gift-certificate/navigation.tsx";
import Breadcrumbs from "../../components/common/breadcrumbs.tsx";
import {$Lang, $lang, $Page, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <$Page
        blocks={{
            page: () => (
                <>
                    <Breadcrumbs breadcrumbs={$pointer("breadcrumbs")} />
                    <h1 className="page-heading">
                        <$Lang keyName={$string("gift_certificate.heading")} />
                    </h1>
                    <GiftCertificateNavigation gift_page={$string("redeem")} />

                    <main className="account account--fixed">
                        <h3>
                            <$Lang keyName={$string("gift_certificate.redeem.heading")} />
                        </h3>
                        <p>
                            <strong>
                                {$lang($string("gift_certificate.redeem.intro"), {store_name: $pointer("settings.store_name")})}
                            </strong>
                        </p>
                        <ol>
                            <li>
                                <$Lang keyName={$string("gift_certificate.redeem.item1")} />
                            </li>
                            <li>
                                <$Lang keyName={$string("gift_certificate.redeem.item2")} />
                            </li>
                            <li>
                                {$unescaped($lang($string("gift_certificate.redeem.item3"), {cart_url: $pointer("urls.cart")}))}
                            </li>
                            <li>
                                <$Lang keyName={$string("gift_certificate.redeem.item4")} />
                            </li>
                        </ol>
                    </main>
                </>
            ),
        }}
        layout="layout/base"
    />
);
