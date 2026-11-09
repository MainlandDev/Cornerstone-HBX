import {$Partial, $parseHandlebarsDangerously, $string} from '@mainlanddev/bigcommerce-react';
import {$page} from '@mainlanddev/bigcommerce-react/theme';
import type {ThemePageAccountDownloadItem} from '@mainlanddev/bigcommerce-react/theme';
import {$StencilPartial} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import Breadcrumbs from '@/templates/components/common/breadcrumbs';

// Escape hatch: the library types `downloads` as `never`, so the heading, image and download lists read it through raw Handlebars. The page wiring and breadcrumbs are typed; the body from `<h1 class="page-heading">` on is the original Handlebars, verbatim.
export default $page<ThemePageAccountDownloadItem>({
    frontmatter: {},
    content: (ctx) => (
        <>
            <$StencilPartial
                name={$string('page')}
                $then={() => (
                    <>
                        <Breadcrumbs breadcrumbs={ctx.breadcrumbs} theme_settings={ctx.theme_settings}/>
                        {$parseHandlebarsDangerously(`    <h1 class="page-heading">{{lang 'account.orders.downloads.heading' number=downloads.order_id}}</h1>
    {{> components/account/navigation account_page='orders'}}

    <div class="account account--fixedLarge">
        <div class="account-body">
            <figure class="account-sidebar">
                {{#each downloads.images}}
                    <img src="{{getImage this}}" alt="{{../downloads.product_name}}" title="{{../downloads.product_name}}"/>
                    <figcaption>{{../downloads.product_name}}</figcaption>
                {{/each}}
            </figure>

            <section class="account-content account-content--fixed">
                <p class="account-downloads-summary">{{lang 'account.orders.downloads.download_files_below'}} <strong>{{downloads.product_name}}</strong></p>

                <ul class="account-downloadsList">
                    {{#each downloads.items}}
                        <li class="account-downloadsItem">
                            {{#if expired}}
                                <h5 class="account-downloadsItem-title">{{name}} <span class="account-downloadsItem-accent">({{size}})</span></h5>
                                <p class="account-downloadsItem-availability">{{lang 'account.orders.downloads.expired_content'}}</p>
                            {{else}}
                                <h5 class="account-downloadsItem-title">
                                    <a href="{{url}}">{{name}}</a> ({{size}})
                                </h5>

                                {{#if description}}
                                    <p class="account-downloadsItem-description">{{description}}</p>
                                {{/if}}

                                {{#if days_remaining}}
                                    <p class="account-downloadsItem-availability">
                                        {{lang 'account.orders.downloads.days_remaining' number=days_remaining}}

                                        {{#if downloads_remaining}}
                                            {{lang 'account.orders.downloads.days_or_downloads' number=downloads_remaining}}
                                        {{/if}}
                                        {{lang 'account.orders.downloads.remaining'}}
                                    </p>
                                {{else}}
                                    {{#if downloads_remaining}}
                                        <p class="account-downloadsItem-availability">{{lang 'account.orders.downloads.downloads_remaining' number=downloads_remaining}}</p>
                                    {{/if}}
                                {{/if}}
                            {{/if}}
                        </li>
                    {{/each}}
                </ul>
            </section>

        </div>
    </div>`)}
                    </>
                )}
            />
            <$Partial name="layout/base"/>
        </>
    ),
});
