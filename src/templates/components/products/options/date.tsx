import {$concat, $For, $If, $Lang, $partial, $pointer, $raw, $string, $number, place} from "@mainlanddev/hbx-bigcommerce";

export default () => {
    const earliestYear = $pointer<number>("earliest_year");
    const latestYear = $pointer<number>("latest_year");
    return (
        <div className="form-field" data-product-attribute="date">
            <label
                className="form-label form-label--alternate form-label--inlineSmall"
                dangerouslyInlineAttributes={{attributes: `${$If({test: $pointer("style"), $then: () => `${$raw('style="')}${$pointer("style")}${$raw('" ')}`})}`}}
            >
                {$pointer("display_name")}:{" "}
                {place($partial("components/common/requireness-msg"))}
            </label>
            <select
                className="form-select form-select--date"
                dangerouslyInlineAttributes={{attributes: `name="attribute[${$pointer("id")}][year]" ${$If({test: $pointer("required"), $then: () => "required"})}`}}
            >
                <option value="">
                    <$Lang keyName={$string("common.year")} />
                </option>
                <$For
                    from={earliestYear}
                    to={latestYear}
                    $then={(ctx) => (
                        <option
                            dangerouslyInlineAttributes={{attributes: `value="${ctx.$index}" ${$raw("{{#if ../selected_date.year '==' $index}}selected=\"selected\"{{/if}}")}`}}
                        >
                            {ctx.$index}
                        </option>
                    )}
                />
                {$raw("{{#if earliest_year '==' latest_year}}")}
                <option dangerouslyInlineAttributes={{attributes: `value="${earliestYear}" selected="selected"`}}>{earliestYear}</option>
                {$raw("{{/if}}")}
            </select>
            <select
                className="form-select form-select--date"
                dangerouslyInlineAttributes={{attributes: `name="attribute[${$pointer("id")}][month]" ${$If({test: $pointer("required"), $then: () => "required"})}`}}
            >
                <option value="">
                    <$Lang keyName={$string("common.month")} />
                </option>
                <$For
                    from={$number(1)}
                    to={$number(12)}
                    $then={(ctx) => (
                        <option
                            dangerouslyInlineAttributes={{attributes: `value="${ctx.$index}" ${$raw("{{#if ../selected_date.month '==' $index}}selected=\"selected\"{{/if}}")}`}}
                        >
                            <$Lang keyName={$concat($string("common.short_months."), ctx.$index)} />
                        </option>
                    )}
                />
            </select>
            <select
                className="form-select form-select--date"
                dangerouslyInlineAttributes={{attributes: `name="attribute[${$pointer("id")}][day]" ${$If({test: $pointer("required"), $then: () => "required"})}`}}
            >
                <option value="">
                    <$Lang keyName={$string("common.day")} />
                </option>
                <$For
                    from={$number(1)}
                    to={$number(31)}
                    $then={(ctx) => (
                        <option
                            dangerouslyInlineAttributes={{attributes: `value="${ctx.$index}" ${$raw("{{#if ../selected_date.day '==' $index}}selected=\"selected\"{{/if}}")}`}}
                        >
                            {ctx.$index}
                        </option>
                    )}
                />
            </select>
        </div>
    );
};
