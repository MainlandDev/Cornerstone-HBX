"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Lang, $lang, $pointer, $string} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <button
        className="modal-close"
        type="button"
        title={$lang($string("common.close"))}
        dangerouslyInlineAttributes={{attributes: `${$pointer("additional_attr")}`}}
    >
        <span className="aria-description--hidden">
            <$Lang keyName={$string("common.close")} />
        </span>
        <span aria-hidden="true" dangerouslySetInnerHTML={{__html: "&#215;"}} />
    </button>
);
