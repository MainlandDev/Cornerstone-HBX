/**
 * Source: templates/pages/compare.html (142 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $if, $If, $Partial, $string, $unescaped, $unless} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Inject, $Lang, $Or, $StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {ExtendedThemePageCompare} from '@/context-pagesA';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

export default $page<ExtendedThemePageCompare>({
    frontmatter: {},
    content: (ctx) => (
        <>
            {/* html L1: {{#partial "page"}} */}
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        {/* html L2: {{inject 'comparisons' comparisons}} */}
                        <$Inject keyName={$string('comparisons')} value={ctx.comparisons}/>
                        {/* html L3: {{inject 'compareRemoveMessage' (lang 'compare.no_remove')}} */}
                        <$Inject keyName={$string('compareRemoveMessage')} value={$lang($string('compare.no_remove'))}/>
                        {/* html L4: {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}} */}
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {/* html L5: <h1 class="page-heading">{{lang 'compare.header' products=comparisons.length}}</h1> */}
                        <h1 className="page-heading">
                            {/* html L5: {{lang 'compare.header' products=comparisons.length}} */}
                            <$Lang translationKey={$string('compare.header')} params={{products: ctx.comparisons.length}}/>
                        </h1>
                        {/* html L6: <main class="page"> */}
                        <main className="page">
                            {/* html L7: <div class="page-content"> */}
                            <div className="page-content">
                                {/* html L9: <table class="compareTable"> */}
                                <table className="compareTable">
                                    {/* html L10: <tr class="compareTable-row"> */}
                                    <tr className="compareTable-row">
                                        {/* html L11: <th class="compareTable-heading"></th> */}
                                        <th className="compareTable-heading"></th>
                                        {/* html L12: {{#each comparisons}} */}
                                        <$Each
                                            list={ctx.comparisons}
                                            $then={(item) => (
                                                /* html L13: <th class="compareTable-product"> */
                                                <th className="compareTable-product">
                                                    {/* html L14: <article class="card"> */}
                                                    <article className="card">
                                                        {/* html L15: <figure class="card-figure"> */}
                                                        <figure className="card-figure">
                                                            {/* html L16: <a class="card-figure__link" aria-label="{{name}}" href="{{url}}" data-event-type="product-click"> */}
                                                            <a
                                                                className="card-figure__link"
                                                                aria-label={item.name}
                                                                href={item.url}
                                                                data-event-type="product-click"
                                                            >
                                                                {/* html L17: <div class="card-img-container"> */}
                                                                <div className="card-img-container">
                                                                    {/* html L18-24:
                                                                       {{> components/common/responsive-img
                                                                           image=image
                                                                           class="card-image"
                                                                           fallback_size=../theme_settings.product_size
                                                                           lazyload=../theme_settings.lazyload_mode
                                                                           default_image=../theme_settings.default_image_product
                                                                       }}
                                                                    */}
                                                                    <$Partial
                                                                        name="components/common/responsive-img"
                                                                        hash={{
                                                                            image: item.image,
                                                                            class: $string('card-image'),
                                                                            fallback_size: ctx.theme_settings.product_size,
                                                                            lazyload: ctx.theme_settings.lazyload_mode,
                                                                            default_image: ctx.theme_settings.default_image_product,
                                                                        }}
                                                                    />
                                                                </div>
                                                            </a>
                                                            {/* html L27: <a class="compareTable-removeProduct" data-comparison-remove href="{{#if remove_url}}{{remove_url}}{{else}}#{{/if}}"> */}
                                                            <a
                                                                className="compareTable-removeProduct"
                                                                data-comparison-remove=""
                                                                href={`${$if(item.remove_url).then(() => [item.remove_url]).else(() => [$$raw('#')])}`}
                                                            >
                                                                {/* html L28: <svg class="icon"> */}
                                                                <svg className="icon">
                                                                    {/* html L29: <use href="#icon-close"></use> */}
                                                                    <use href="#icon-close"></use>
                                                                </svg>
                                                            </a>
                                                        </figure>
                                                        {/* html L33: <div class="card-body"> */}
                                                        <div className="card-body">
                                                            {/* html L34: {{#if brand.name}} */}
                                                            <$If
                                                                query={[item.brand.name]}
                                                                $then={() => (
                                                                    /* html L35: <p class="card-text"><a href="{{brand.url}}">{{ brand.name }}</a></p> */
                                                                    <p className="card-text">
                                                                        {/* html L35: <a href="{{brand.url}}"> */}
                                                                        <a href={item.brand.url}>{/* html L35: {{ brand.name }} */}{item.brand.name}</a>
                                                                    </p>
                                                                )}
                                                            />
                                                            {/* html L37: <h3 class="card-title"> */}
                                                            <h3 className="card-title">
                                                                {/* html L38: <a href="{{url}}">{{ name }}</a> */}
                                                                <a href={item.url}>{/* html L38: {{ name }} */}{item.name}</a>
                                                            </h3>
                                                            {/* html L40: {{#or ../customer (unless ../settings.hide_price_from_guests)}} */}
                                                            <$Or
                                                                values={[ctx.customer, $unless(ctx.settings.hide_price_from_guests)]}
                                                                $then={() => (
                                                                    /* html L41: {{#if price_range}} */
                                                                    <$If
                                                                        query={[item.price_range]}
                                                                        $then={() => (
                                                                            /* html L42: {{> components/products/price-range}} */
                                                                            <$Partial
                                                                                name="components/products/price-range"
                                                                                hash={{price: item.price, theme_settings: ctx.theme_settings}}
                                                                            />
                                                                        )}
                                                                        $else={() => (
                                                                            /* html L43: {{else}}
                                                                                                                                                              html L44: {{> components/products/price price=price}}
                                                                            */
                                                                            <$Partial
                                                                                name="components/products/price"
                                                                                hash={{price: item.price, theme_settings: ctx.theme_settings}}
                                                                            />
                                                                        )}
                                                                    />
                                                                )}
                                                                $else={() => /* html L46: {{else}}
                                                                                                                                                                html L47: {{> components/common/login-for-pricing}}
                                                                             */ <$Partial name="components/common/login-for-pricing"/>}
                                                            />
                                                        </div>
                                                    </article>
                                                </th>
                                            )}
                                        />
                                    </tr>
                                    {/* html L54: <tr class="compareTable-row"> */}
                                    <tr className="compareTable-row">
                                        {/* html L55: <th class="compareTable-heading"></th> */}
                                        <th className="compareTable-heading"></th>
                                        {/* html L56: {{#each comparisons}} */}
                                        <$Each
                                            list={ctx.comparisons}
                                            $then={(item) => (
                                                /* html L57: <td class="compareTable-action"> */
                                                <td className="compareTable-action">
                                                    {/* html L58: {{#if show_cart_action}} */}
                                                    <$If
                                                        query={[item.show_cart_action]}
                                                        $then={() => (
                                                            <>
                                                                {/* html L59: {{#if has_options}} */}
                                                                <$If
                                                                    query={[item.has_options]}
                                                                    $then={() => (
                                                                        /* html L60: <a href="{{url}}" data-event-type="product-click" class="button button--primary" data-product-id="{{id}}">{{lang 'products.choose_options'}}</a> */
                                                                        <a
                                                                            href={item.url}
                                                                            data-event-type="product-click"
                                                                            className="button button--primary"
                                                                            data-product-id={item.id}
                                                                        >
                                                                            {/* html L60: {{lang 'products.choose_options'}} */}
                                                                            <$Lang translationKey={$string('products.choose_options')}/>
                                                                        </a>
                                                                    )}
                                                                />
                                                                {/* html L62: {{#if pre_order}} */}
                                                                <$If
                                                                    query={[item.pre_order]}
                                                                    $then={() => (
                                                                        /* html L63: <a href="{{url}}" data-event-type="product-click" class="button button--primary" data-product-id="{{id}}"> */
                                                                        <a
                                                                            href={item.url}
                                                                            data-event-type="product-click"
                                                                            className="button button--primary"
                                                                            data-product-id={item.id}
                                                                        >
                                                                            {/* html L64: {{lang 'products.pre_order'}} */}
                                                                            <$Lang translationKey={$string('products.pre_order')}/>
                                                                        </a>
                                                                    )}
                                                                />
                                                                {/* html L67: {{#if add_to_cart_url}} */}
                                                                <$If
                                                                    query={[item.add_to_cart_url]}
                                                                    $then={() => (
                                                                        /* html L68: <a href="{{add_to_cart_url}}" data-event-type="product-click" class="button button--primary" data-product-id="{{id}}"> */
                                                                        <a
                                                                            href={item.add_to_cart_url}
                                                                            data-event-type="product-click"
                                                                            className="button button--primary"
                                                                            data-product-id={item.id}
                                                                        >
                                                                            {/* html L69: {{lang 'products.add_to_cart'}} */}
                                                                            <$Lang translationKey={$string('products.add_to_cart')}/>
                                                                        </a>
                                                                    )}
                                                                />
                                                                {/* html L72: {{#if out_of_stock_message}} */}
                                                                <$If
                                                                    query={[item.out_of_stock_message]}
                                                                    $then={() => (
                                                                        /* html L73: <a href="{{url}}" class="button button--primary" data-product-id="{{id}}">{{out_of_stock_message}}</a> */
                                                                        <a href={item.url} className="button button--primary" data-product-id={item.id}>
                                                                            {/* html L73: {{out_of_stock_message}} */}
                                                                            {item.out_of_stock_message}
                                                                        </a>
                                                                    )}
                                                                />
                                                            </>
                                                        )}
                                                    />
                                                </td>
                                            )}
                                        />
                                    </tr>
                                    {/* html L79: <tr class="compareTable-row"> */}
                                    <tr className="compareTable-row">
                                        {/* html L80: <th class="compareTable-heading"> */}
                                        <th className="compareTable-heading">
                                            {/* html L81: <span class="compareTable-headingText">{{lang 'products.description'}}</span> */}
                                            <span className="compareTable-headingText">
                                                {/* html L81: {{lang 'products.description'}} */}
                                                <$Lang translationKey={$string('products.description')}/>
                                            </span>
                                        </th>
                                        {/* html L83: {{#each comparisons}} */}
                                        <$Each
                                            list={ctx.comparisons}
                                            $then={(item) => /* html L84: <td class="compareTable-item">{{{ summary }}}</td> */ <td className="compareTable-item">{/* html L84: {{{ summary }}} */}{$unescaped(item.summary)}</td>}
                                        />
                                    </tr>
                                    {/* html L87: {{#if settings.show_product_rating}} */}
                                    <$If
                                        query={[ctx.settings.show_product_rating]}
                                        $then={() => (
                                            /* html L88: <tr class="compareTable-row"> */
                                            <tr className="compareTable-row">
                                                {/* html L89: <th class="compareTable-heading"> */}
                                                <th className="compareTable-heading">
                                                    {/* html L90: <span class="compareTable-headingText">{{lang 'products.reviews.rating_label'}}</span> */}
                                                    <span className="compareTable-headingText">
                                                        {/* html L90: {{lang 'products.reviews.rating_label'}} */}
                                                        <$Lang translationKey={$string('products.reviews.rating_label')}/>
                                                    </span>
                                                </th>
                                                {/* html L92: {{#each comparisons}} */}
                                                <$Each
                                                    list={ctx.comparisons}
                                                    $then={(item) => (
                                                        /* html L93: <td class="compareTable-item"> */
                                                        <td className="compareTable-item">
                                                            {/* html L94: {{#if rating}} */}
                                                            <$If
                                                                query={[item.rating]}
                                                                $then={() => /* html L95: {{> components/products/ratings rating=rating}} */ <$Partial name="components/products/ratings" hash={{rating: item.rating}}/>}
                                                                $else={() => (
                                                                    /* html L96: {{else}}
                                                                                                                                              html L97: {{lang 'products.reviews.no_reviews'}}
                                                                    */
                                                                    <$Lang translationKey={$string('products.reviews.no_reviews')}/>
                                                                )}
                                                            />
                                                        </td>
                                                    )}
                                                />
                                            </tr>
                                        )}
                                    />
                                    {/* html L103: <tr class="compareTable-row"> */}
                                    <tr className="compareTable-row">
                                        {/* html L104: <th class="compareTable-heading"> */}
                                        <th className="compareTable-heading">
                                            {/* html L105: <span class="compareTable-headingText">{{lang 'products.availability'}}</span> */}
                                            <span className="compareTable-headingText">
                                                {/* html L105: {{lang 'products.availability'}} */}
                                                <$Lang translationKey={$string('products.availability')}/>
                                            </span>
                                        </th>
                                        {/* html L107: {{#each comparisons}} */}
                                        <$Each
                                            list={ctx.comparisons}
                                            $then={(item) => (
                                                /* html L108: <td class="compareTable-item"> */
                                                <td className="compareTable-item">
                                                    {/* html L109: {{#if availability}} */}
                                                    <$If
                                                        query={[item.availability]}
                                                        $then={() => <>{/* html L110: {{ availability }} */}{item.availability}</>}
                                                        $else={() => /* html L111: {{else}}
                                                                                                                                                html L112: {{lang 'common.not_applicable'}}
                                                                     */ <$Lang translationKey={$string('common.not_applicable')}/>}
                                                    />
                                                </td>
                                            )}
                                        />
                                    </tr>
                                    {/* html L117: <tr class="compareTable-row"> */}
                                    <tr className="compareTable-row">
                                        {/* html L118: <th class="compareTable-heading"> */}
                                        <th className="compareTable-heading">
                                            {/* html L119: <span class="compareTable-headingText">{{lang 'common.other_details'}}</span> */}
                                            <span className="compareTable-headingText">
                                                {/* html L119: {{lang 'common.other_details'}} */}
                                                <$Lang translationKey={$string('common.other_details')}/>
                                            </span>
                                        </th>
                                        {/* html L121: {{#each comparisons}} */}
                                        <$Each
                                            list={ctx.comparisons}
                                            $then={(item) => (
                                                /* html L122: <td class="compareTable-item"> */
                                                <td className="compareTable-item">
                                                    {/* html L123: {{#if custom_fields}} */}
                                                    <$If
                                                        query={[item.custom_fields]}
                                                        $then={() => (
                                                            /* html L124: <ul> */
                                                            <ul>
                                                                {/* html L125: {{#each custom_fields}} */}
                                                                <$Each
                                                                    list={item.custom_fields}
                                                                    $then={(field) => (
                                                                        /* html L126: <li>{{name}}: {{{value}}}</li> */
                                                                        <li>
                                                                            {/* html L126: {{name}} */}
                                                                            {field.name}: {/* html L126: {{{value}}} */}{$unescaped(field.value)}
                                                                        </li>
                                                                    )}
                                                                />
                                                            </ul>
                                                        )}
                                                        $else={() => /* html L129: {{else}}
                                                                                                                                                html L130: {{lang 'common.not_applicable'}}
                                                                     */ <$Lang translationKey={$string('common.not_applicable')}/>}
                                                    />
                                                </td>
                                            )}
                                        />
                                    </tr>
                                </table>
                            </div>
                        </main>
                    </>
                )}
            />
            {/* html L141: {{> layout/base}} */}
            <$Partial name="layout/base"/>
        </>
    ),
});
