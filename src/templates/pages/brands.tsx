/**
 * Source: templates/pages/brands.html (43 lines). Per-element comments below quote the original lines (`html L<n>`).
 * Front matter of the original (lines 1-3):
 *   ---
 *   brands:
 *   ---
 */
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
            {/* html L5: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L7: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>

                        {/* html L9: <main class="page"> */}
                        <main className="page">
                            {/* html L10: <h1 class="page-heading">{{lang 'brand.label'}}</h1> */}
                            <h1 className="page-heading">
                                {/* html L10: {{lang 'brand.label'}} */}
                                <$Lang translationKey={$string('brand.label')}/>
                            </h1>
                            {/* html L11: {{{region name="brands_below_header"}}} */}
                            <$_Region name={$string('brands_below_header')}/>
                            {/* html L12: <ul class="brandGrid"> */}
                            <ul className="brandGrid">
                                {/* html L13: {{#each brands}} */}
                                <$Each
                                    list={ctx.brands}
                                    $then={(brand) => (
                                        /* html L14: <li class="brand"> */
                                        <li className="brand">
                                            {/* html L15: <article class="card {{#if alternate}}card--alternate{{/if}}"> */}
                                            <article className={`card ${$if(brand.alternate).then(() => $$raw('card--alternate'))}`}>
                                                {/* html L16: <figure class="card-figure"> */}
                                                <figure className="card-figure">
                                                    {/* html L17: <a class="card-figure__link" aria-label="{{name}}" href="{{url}}"> */}
                                                    <a className="card-figure__link" aria-label={brand.name} href={brand.url}>
                                                        {/* html L18: <div class="card-img-container"> */}
                                                        <div className="card-img-container">
                                                            {/* html L19-25:
                                                               {{> components/common/responsive-img
                                                                   image=image
                                                                   class="card-image"
                                                                   fallback_size=../theme_settings.brand_size
                                                                   lazyload=../theme_settings.lazyload_mode
                                                                   default_image=../theme_settings.default_image_brand
                                                               }}
                                                            */}
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
                                                {/* html L29: <div class="card-body"> */}
                                                <div className="card-body">
                                                    {/* html L30: <h3 class="card-title"> */}
                                                    <h3 className="card-title">
                                                        {/* html L31: <a href="{{url}}">{{name}}</a> */}
                                                        <a href={brand.url}>{/* html L31: {{name}} */}{brand.name}</a>
                                                    </h3>
                                                </div>
                                            </article>
                                        </li>
                                    )}
                                />
                            </ul>
                            {/* html L38: {{> components/common/paginator pagination.brands}} */}
                            <$Partial name="components/common/paginator" context={ctx.pagination.brands}/>
                            {/* html L39: {{{region name="brands_below_content"}}} */}
                            <$_Region name={$string('brands_below_content')}/>
                        </main>
                    </>
                )}
            />
            {/* html L42: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
