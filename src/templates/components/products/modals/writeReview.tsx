import {$concat, $For, $If, $Inject, $Lang, $lang, $number, $partial, $pointer, $raw, $string, $unescaped} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <div id="modal-review-form" className="modal" data-reveal={""}>
        <$Inject keyName={$string("reviewRating")} value={$lang($string("forms.validate.reviews.rating"))} />{" "}
        <$Inject keyName={$string("reviewSubject")} value={$lang($string("forms.validate.reviews.title"))} />{" "}
        <$Inject keyName={$string("reviewName")} value={$lang($string("forms.validate.reviews.name"))} />{" "}
        <$Inject keyName={$string("reviewComment")} value={$lang($string("forms.validate.reviews.comment"))} />{" "}
        <$Inject keyName={$string("reviewEmail")} value={$lang($string("forms.validate.common.email_address"))} />
        <div className="modal-header">
            <h2 className="modal-header-title">
                <$Lang keyName={$string("products.reviews.write_a_review")} />
            </h2>
            {$partial("components/common/modal/modal-close-btn")}
        </div>
        <div className="modal-body">
            <div className="writeReview-productDetails">
                <div className="writeReview-productImage-container">
                    {$partial("components/common/responsive-img", {
                            image: $pointer("product.main_image"),
                            fallback_size: $pointer("theme_settings.product_size"),
                            lazyload: $pointer("theme_settings.lazyload_mode"),
                            default_image: $pointer("theme_settings.default_image_product"),
                        })}
                </div>
                <h6 className="product-brand">{$pointer("product.brand.name")}</h6>
                <h5 className="product-title">{$pointer("product.title")}</h5>
            </div>
            <form className="form writeReview-form" action={$pointer("urls.product.post_review")} method="post">
                <fieldset className="form-fieldset">
                    <div className="form-field">
                        <label className="form-label" htmlFor="rating-rate">
                            <$Lang keyName={$string("products.reviews.rating_label")} />{" "}
                            <small>
                                <$Lang keyName={$string("common.required")} />
                            </small>
                        </label>
                        {$raw("<!-- Stars -->")}
                        {$raw("<!-- TODO: Review Stars need to be componentised, both for display and input -->")}
                        <select id="rating-rate" className="form-select" name="revrating" data-input={""} aria-required="true">
                            <option value="">
                                <$Lang keyName={$string("products.reviews.select_rating")} />
                            </option>
                            <$For
                                from={$number(1)}
                                to={$number(5)}
                                $then={(ctx) => (
                                    <>
                                        <$If
                                            test={$pointer("../product.reviews.selected_rating")}
                                            operator={$string("===")}
                                            rvalue={$pointer("$index")}
                                            $then={() => (
                                                <option dangerouslyInlineAttributes={{attributes: `selected value="${ctx.$index}"`}}>
                                                    <$Lang keyName={$concat($string("products.reviews.rating."), ctx.$index)} />
                                                </option>
                                            )}
                                            $else={() => (
                                                <option value={ctx.$index}>
                                                    <$Lang keyName={$concat($string("products.reviews.rating."), ctx.$index)} />
                                                </option>
                                            )}
                                        />
                                    </>
                                )}
                            />
                        </select>
                    </div>

                    {$raw("<!-- Name -->")}
                    <$If
                        test={$pointer("product.reviews.author")}
                        $then={() =>
                            $partial("components/common/forms/text", {
                                    id: $string("revfromname"),
                                    name: $string("revfromname"),
                                    required: $string("true"),
                                    label: $lang($string("products.reviews.form_write.name")),
                                    value: $pointer("product.reviews.author"),
                                })
                        }
                        $else={() =>
                            $partial("components/common/forms/text", {
                                    id: $string("revfromname"),
                                    name: $string("revfromname"),
                                    required: $string("true"),
                                    label: $lang($string("products.reviews.form_write.name")),
                                    value: $pointer("customer.name"),
                                })
                        }
                    />

                    <$If
                        test={$pointer("product.reviews.show_review_email")}
                        $then={() => (
                            <>
                                {$raw("<!-- Email -->")}
                                <$If
                                    test={$pointer("product.reviews.email")}
                                    $then={() =>
                                        $partial("components/common/forms/text", {
                                                id: $string("email"),
                                                name: $string("email"),
                                                required: $string("true"),
                                                label: $lang($string("products.reviews.form_write.email")),
                                                value: $pointer("product.reviews.email"),
                                            })
                                    }
                                    $else={() =>
                                        $partial("components/common/forms/text", {
                                                id: $string("email"),
                                                name: $string("email"),
                                                required: $string("true"),
                                                label: $lang($string("products.reviews.form_write.email")),
                                                value: $pointer("customer.email"),
                                            })
                                    }
                                />
                            </>
                        )}
                    />

                    {$raw("<!-- Review Subject -->")}
                    {$partial("components/common/forms/text", {
                            id: $string("revtitle"),
                            name: $string("revtitle"),
                            required: $string("true"),
                            label: $lang($string("products.reviews.form_write.subject")),
                            value: $pointer("product.reviews.title"),
                        })}

                    {$raw("<!-- Comments -->")}
                    {$partial("components/common/forms/multiline", {
                            id: $string("revtext"),
                            name: $string("revtext"),
                            required: $string("true"),
                            label: $lang($string("products.reviews.form_write.comments")),
                            value: $pointer("product.reviews.text"),
                        })}

                    {$unescaped($pointer("product.reviews.recaptcha.markup"))}

                    <div className="form-field">
                        <input type="submit" className="button button--primary" value={$lang($string("products.reviews.form_write.submit_value"))} />
                    </div>
                    <input type="hidden" name="product_id" value={$pointer("product.id")} />
                    <input type="hidden" name="action" value="post_review" />
                    <$If
                        test={$pointer("product.reviews.throttleToken")}
                        $then={() => <input type="hidden" name="throttleToken" value={$pointer("product.reviews.throttleToken")} />}
                    />
                </fieldset>
            </form>
        </div>
    </div>
);
