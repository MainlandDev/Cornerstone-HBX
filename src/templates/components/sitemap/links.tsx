"use server";
import SitemapLinks from "./links.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$Each, $If, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <li>
        <a href={$pointer("url")}>{$pointer("label")}</a>
        <$If
            test={$pointer("children")}
            $then={() => (
                <ul>
                    <$Each list={$pointer<unknown[]>("children")} $then={() => <SitemapLinks />} />
                </ul>
            )}
        />
    </li>
);
