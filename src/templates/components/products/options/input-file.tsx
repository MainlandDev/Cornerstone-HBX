import {$If, $Lang, $lang, $partial, $pointer, $raw, $string, $unescaped, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <div className="form-field" data-product-attribute="input-file">
        <label className="form-label form-label--alternate form-label--inlineSmall" htmlFor={`attribute_file_${$pointer("id")}`}>
            {$pointer("display_name")}:{" "}
            {place($partial("components/common/requireness-msg"))}
        </label>
        <input
            className="form-file"
            type="file"
            id={`attribute_file_${$pointer("id")}`}
            dangerouslyInlineAttributes={{
                attributes: `name="attribute[${$pointer("id")}]" ${$raw("{{#and required (unless prefill)}}required{{/and}}")}`,
            }}
        />
        <$If
            test={$pointer("original_name")}
            $then={() => (
                <>
                    {$unescaped($lang($string("products.file_option_set"), {url: $pointer("file_url"), name: $pointer("original_name")}))}{" "}
                    <label>
                        <$Lang keyName={$string("cart.remove_file")} />
                        <input type="checkbox" name={$pointer("file_remove")} />
                    </label>
                </>
            )}
        />
        <p className="form-fileDescription">
            <$If
                test={$pointer("file_size")}
                $then={() => (
                    <>
                        <$Lang keyName={$string("products.max_filesize")} />{" "}
                        <strong>
                            {$pointer("file_size")}
                            <$Lang keyName={$string("products.kilobytes_abbreviation")} />
                        </strong>
                        ,{" "}
                    </>
                )}
            />
            <$If
                test={$pointer("file_types")}
                $then={() => (
                    <>
                        <$Lang keyName={$string("products.filetypes")} />{" "}
                        <strong>{$pointer("file_types")}</strong>
                    </>
                )}
            />
        </p>
    </div>
);
