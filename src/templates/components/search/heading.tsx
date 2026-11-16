"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$If, $Lang, $lang, $pointer, $sanitize, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <h1 className="page-heading">
        <$If
            test={$pointer("forms.search.search_error")}
            $then={() => <$Lang keyName={$string("search.errorMessage")} />}
            $else={() => (
                <>
                    {$unescaped(
                        $lang($string("search.results.count"), {
                            count: $pointer<number>("result_count"),
                            search_query: $sanitize($pointer("forms.search.query")),
                        }),
                    )}
                </>
            )}
        />
    </h1>
);
