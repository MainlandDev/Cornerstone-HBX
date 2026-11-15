import {$Each, $frontmatter, $If, $Lang, $partial, $pointer, $region, $StencilPartial, $string, $unescaped, place} from "@mainlanddev/hbx-bigcommerce";

export const frontmatter = $frontmatter.brands({brands: null});

interface Brand {
    name: string;
    url: string;
    image: unknown;
    alternate: boolean;
}

/** `{{{region name="…"}}}` */
const region = (name: string) => place($unescaped($region({name: $string(name)})));

export default () => (
    <>
        <$StencilPartial
            name={$string("page")}
            $then={() => (
                <>
                    {place($partial("components/common/breadcrumbs", {breadcrumbs: $pointer("breadcrumbs")}))}
                    <main className="page">
                        <h1 className="page-heading">
                            <$Lang keyName={$string("brand.label")} />
                        </h1>
                        {region("brands_below_header")}
                        <ul className="brandGrid">
                            <$Each
                                list={$pointer<Brand[]>("brands")}
                                $then={(brand) => (
                                    <li className="brand">
                                        <article className={`card ${$If({test: brand.alternate, $then: () => "card--alternate"})}`}>
                                            <figure className="card-figure">
                                                <a className="card-figure__link" aria-label={brand.name} href={brand.url}>
                                                    <div className="card-img-container">
                                                        {place(
                                                            $partial("components/common/responsive-img", {
                                                                image: brand.image,
                                                                class: $string("card-image"),
                                                                fallback_size: $pointer("../theme_settings.brand_size"),
                                                                lazyload: $pointer("../theme_settings.lazyload_mode"),
                                                                default_image: $pointer("../theme_settings.default_image_brand"),
                                                            }),
                                                        )}
                                                    </div>
                                                </a>
                                            </figure>
                                            <div className="card-body">
                                                <h3 className="card-title">
                                                    <a href={brand.url}>{brand.name}</a>
                                                </h3>
                                            </div>
                                        </article>
                                    </li>
                                )}
                            />
                        </ul>
                        {place($partial("components/common/paginator", $pointer("pagination.brands")))}
                        {region("brands_below_content")}
                    </main>
                </>
            )}
        />
        {place($partial("layout/base"))}
    </>
);
