"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $lang, $number, $pointer, $string, $subtract} from "@mainlanddev/hbx-bigcommerce";

interface Promotion {
    text: string;
}

export default (_props: PartialProps) => (
    <$If
        test={$pointer("promotions.length")}
        $then={() => (
            <$If
                test={$pointer("mode")}
                operator={$string("===")}
                rvalue={$string("compact")}
                $then={() => (
                    <div className="promotionCallout promotionCallout--compact">
                        <div className="promotionCallout-item">
                            <span className="promotionCallout-text">{$pointer("promotions.[0].text")}</span>
                            <$If
                                test={$pointer("promotions.[1]")}
                                $then={() => (
                                    <span className="promotionCallout-more">
                                        +{$subtract($pointer("promotions.length"), $number(1))}{" "}
                                        {$lang($string("products.featured_promotions.more_offers"), {count: $subtract($pointer("promotions.length"), $number(1))})}
                                    </span>
                                )}
                            />
                        </div>
                    </div>
                )}
                $else={() => (
                    <ul className="promotionCallout promotionCallout--full">
                        <$Each
                            list={$pointer<Promotion[]>("promotions")}
                            $then={(promotion) => (
                                <li className="promotionCallout-item">
                                    <span className="promotionCallout-text">{promotion.text}</span>
                                </li>
                            )}
                        />
                    </ul>
                )}
            />
        )}
    />
);
