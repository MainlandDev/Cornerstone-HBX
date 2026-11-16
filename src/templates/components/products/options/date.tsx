import RequirenessMsg from "../../common/requireness-msg.tsx";
import {$concat, $For, $If, $Lang, $pointer, $raw, $string, $number} from "@mainlanddev/hbx-bigcommerce";

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
                <RequirenessMsg />
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
                            dangerouslyInlineAttributes={{attributes: `value="${ctx.$index}" ${$If({test: $pointer("../selected_date.year"), operator: $string("=="), rvalue: $pointer("$index"), $then: () => $raw('selected="selected"')})}`}}
                        >
                            {ctx.$index}
                        </option>
                    )}
                />
                <$If
                    test={earliestYear}
                    operator={$string("==")}
                    rvalue={latestYear}
                    $then={() => <option dangerouslyInlineAttributes={{attributes: `value="${earliestYear}" selected="selected"`}}>{earliestYear}</option>}
                />
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
                            dangerouslyInlineAttributes={{attributes: `value="${ctx.$index}" ${$If({test: $pointer("../selected_date.month"), operator: $string("=="), rvalue: $pointer("$index"), $then: () => $raw('selected="selected"')})}`}}
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
                            dangerouslyInlineAttributes={{attributes: `value="${ctx.$index}" ${$If({test: $pointer("../selected_date.day"), operator: $string("=="), rvalue: $pointer("$index"), $then: () => $raw('selected="selected"')})}`}}
                        >
                            {ctx.$index}
                        </option>
                    )}
                />
            </select>
        </div>
    );
};
