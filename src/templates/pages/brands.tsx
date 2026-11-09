import {$Each, $Partial, $if, $parseHandlebarsDangerously, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import type {ExtendedThemePageBrands} from '@/context-hard';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang, $StencilPartial, $_Region} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ExtendedThemePageBrands>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* Escape hatch: the front-matter key `brands:` is null in the original, but RouteBrandsFrontMatter requires a `limit`. */}
            {$parseHandlebarsDangerously('---\nbrands:\n---\n')}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        <main className="page">
                            <h1 className="page-heading">
                                <$Lang translationKey={$string('brand.label')}/>
                            </h1>
                            <$_Region name={$string('brands_below_header')}/>
                            <ul className="brandGrid">
                                <$Each
                                    list={ctx.brands}
                                    $then={(brand) => (
                                        <li className="brand">
                                            <article className={`card ${$if(brand.alternate).then(() => $$raw('card--alternate'))}`}>
                                                <figure className="card-figure">
                                                    <a className="card-figure__link" aria-label={brand.name} href={brand.url}>
                                                        <div className="card-img-container">
                                                            <$Partial
                                                                name="components/common/responsive-img"
                                                                hash={{
                                                                    image: brand.image,
                                                                    class: $string('card-image'),
                                                                    fallback_size: ctx.theme_settings.brand_size,
                                                                    lazyload: ctx.theme_settings.lazyload_mode,
                                                                    default_image: ctx.theme_settings.default_image_brand,
                                                                }}
                                                            />
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
                            <$Partial name="components/common/paginator" context={ctx.pagination.brands}/>
                            <$_Region name={$string('brands_below_content')}/>
                        </main>
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
