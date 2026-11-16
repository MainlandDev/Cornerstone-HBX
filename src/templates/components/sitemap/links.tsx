import {$Each, $If, $partial, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <li>
        <a href={$pointer("url")}>{$pointer("label")}</a>
        <$If
            test={$pointer("children")}
            $then={() => (
                <ul>
                    <$Each list={$pointer<unknown[]>("children")} $then={() => $partial("components/sitemap/links")} />
                </ul>
            )}
        />
    </li>
);
