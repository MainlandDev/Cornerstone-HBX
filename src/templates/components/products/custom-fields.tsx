import {$Each, $pointer, $unescaped} from "@mainlanddev/hbx-bigcommerce";

interface CustomField {
    name: string;
    value: string;
}

export default () => (
    <$Each
        list={$pointer<CustomField[]>("product.custom_fields")}
        $then={(field) => (
            <>
                <dt className="productView-info-name">{field.name}:</dt>
                <dd className="productView-info-value">{$unescaped(field.value)}</dd>
            </>
        )}
    />
);
