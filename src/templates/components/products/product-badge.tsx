import {$pointer, $raw, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => {
    const type = $pointer<string>("badge-type");
    const label = $pointer<string>("badge_label");
    return (
        <>
            {$raw("{{#if badge_view '===' 'sash'}}")}
            <div className={`${type}-flag-sash`}>
                <span className={`${type}-text`}>{$unescaped(label)}</span>
            </div>
            {$raw("{{else if badge_view '===' 'topleft'}}")}
            <div className={`${type}-flag-side`}>
                <span className={`${type}-text`}>{$unescaped(label)}</span>
            </div>
            {$raw("{{else if badge_view '===' 'burst'}}")}
            <div className="starwrap">
                <div className={`${type}-text-burst`}>{$unescaped(label)}</div>
                <div className={`${type}-flag-star`}></div>
            </div>
            {$raw("{{/if}}")}
        </>
    );
};
