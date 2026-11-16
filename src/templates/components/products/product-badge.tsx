"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $pointer, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => {
    const type = $pointer<string>("badge-type");
    const label = $pointer<string>("badge_label");
    return (
        <$If
            test={$pointer("badge_view")}
            operator={$string("===")}
            rvalue={$string("sash")}
            $then={() => (
                <div className={`${type}-flag-sash`}>
                    <span className={`${type}-text`}>{$unescaped(label)}</span>
                </div>
            )}
            $elseThen={[
                {
                    test: $pointer("badge_view"),
                    operator: $string("==="),
                    rvalue: $string("topleft"),
                    $then: () => (
                        <div className={`${type}-flag-side`}>
                            <span className={`${type}-text`}>{$unescaped(label)}</span>
                        </div>
                    ),
                },
                {
                    test: $pointer("badge_view"),
                    operator: $string("==="),
                    rvalue: $string("burst"),
                    $then: () => (
                        <div className="starwrap">
                            <div className={`${type}-text-burst`}>{$unescaped(label)}</div>
                            <div className={`${type}-flag-star`}></div>
                        </div>
                    ),
                },
            ]}
        />
    );
};
