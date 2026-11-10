/**
 * Source: templates/components/common/footer.html (94 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $if, $number, $parseHandlebarsDangerously, $string, $unescaped} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$And, $_Region, $Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$limit, $nl2br} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {BannersHint, Hint} from '@/context-common';
import SocialLinks from '@/templates/components/common/social-links';
import SubscriptionForm from '@/templates/components/common/subscription-form';
import PaymentIcons from '@/templates/components/common/payment-icons';

export default $asPartial<{
    banners: BannersHint;
    theme_settings: Hint['theme_settings'];
    settings: Hint['settings'];
    urls: Hint['urls'];
    customer: Hint['customer'];
    pages: Hint['pages'];
    categories: Hint['categories'];
    shop_by_brand: Hint['shop_by_brand'];
    social_media: Hint['social_media'];
}>(({banners, theme_settings, settings, urls, customer, pages, categories, shop_by_brand, social_media}) => (
    <>
        {/* html L1: {{#if banners.bottom}} */}
        <$If
            query={[banners.bottom]}
            $then={() => (
                /* html L2: <div class="banners" data-banner-location="bottom"> */
                <div className="banners" data-banner-location="bottom">
                    {/* html L3: {{#each (limit banners.bottom_metadata 1)}} */}
                    <$Each
                        list={$limit(banners.bottom_metadata, $number(1))}
                        $then={(banner) => (
                            /* html L4: <div class="banner" data-event-type="promotion" data-entity-id="{{this.id}}" data-name="{{this.banner-name}}" data-position="{{this.location}}" data-name="{{this.banner-name}}"> */
                            <div
                                className="banner"
                                data-event-type="promotion"
                                data-entity-id={banner.id}
                                data-name={banner['banner-name']}
                                data-position={banner.location}
                                $$={$parseHandlebarsDangerously('data-name="{{banner-name}}"')}
                            >
                                {/* html L5: <div data-event-type="promotion-click"> */}
                                <div data-event-type="promotion-click">{/* html L6: {{{this.content}}} */}{$unescaped(banner.content)}</div>
                            </div>
                        )}
                    />
                </div>
            )}
        />
        {/* html L12: <footer class="footer" role="contentinfo"> */}
        <footer className="footer" role="contentinfo">
            {/* html L13: <h2 class="footer-title-sr-only">{{lang 'footer.title'}}</h2> */}
            <h2 className="footer-title-sr-only">
                {/* html L13: {{lang 'footer.title'}} */}
                <$Lang translationKey={$string('footer.title')}/>
            </h2>
            {/* html L14: <div class="container"> */}
            <div className="container">
                {/* html L15: {{#if theme_settings.social_icon_placement_bottom '!==' 'bottom_none'}} */}
                <$If
                    query={[theme_settings.social_icon_placement_bottom, '!==', $string('bottom_none')]}
                    $then={() => (
                        /* html L16-19:
                           <article class="footer-info-col
                               footer-info-col--social
                               footer-info-col--{{#if theme_settings.social_icon_placement_bottom '===' 'bottom_left'}}left{{else}}right{{/if}}"
                               data-section-type="footer-webPages">
                        */
                        <article
                            className={`footer-info-col footer-info-col--social footer-info-col--${$if(theme_settings.social_icon_placement_bottom, '===', $string('bottom_left')).then(() => $$raw('left')).else(() => $$raw('right'))}`}
                            data-section-type="footer-webPages"
                        >
                            {/* html L20: <h3 class="footer-info-heading">{{lang 'social.connect'}}</h3> */}
                            <h3 className="footer-info-heading">
                                {/* html L20: {{lang 'social.connect'}} */}
                                <$Lang translationKey={$string('social.connect')}/>
                            </h3>
                            {/* html L21: {{> components/common/social-links}} */}
                            <SocialLinks social_media={social_media}/>
                        </article>
                    )}
                />
                {/* html L24: <section class="footer-info"> */}
                <section className="footer-info">
                    {/* html L25: <article class="footer-info-col footer-info-col--small" data-section-type="footer-webPages"> */}
                    <article className="footer-info-col footer-info-col--small" data-section-type="footer-webPages">
                        {/* html L26: <h3 class="footer-info-heading">{{lang 'footer.navigate'}}</h3> */}
                        <h3 className="footer-info-heading">
                            {/* html L26: {{lang 'footer.navigate'}} */}
                            <$Lang translationKey={$string('footer.navigate')}/>
                        </h3>
                        {/* html L27: <ul class="footer-info-list"> */}
                        <ul className="footer-info-list">
                            {/* html L28: {{#each pages}} */}
                            <$Each
                                list={pages}
                                $then={(page) => (
                                    /* html L29: <li> */
                                    <li>
                                        {/* html L30: <a href="{{url}}">{{name}}</a> */}
                                        <a href={page.url}>{/* html L30: {{name}} */}{page.name}</a>
                                    </li>
                                )}
                            />
                            {/* html L33: <li> */}
                            <li>
                                {/* html L34: <a href="{{urls.sitemap}}">{{lang 'sitemap.page_title'}}</a> */}
                                <a href={urls.sitemap}>
                                    {/* html L34: {{lang 'sitemap.page_title'}} */}
                                    <$Lang translationKey={$string('sitemap.page_title')}/>
                                </a>
                            </li>
                        </ul>
                    </article>

                    {/* html L39: <article class="footer-info-col footer-info-col--small" data-section-type="footer-categories"> */}
                    <article className="footer-info-col footer-info-col--small" data-section-type="footer-categories">
                        {/* html L40: <h3 class="footer-info-heading">{{lang 'footer.categories'}}</h3> */}
                        <h3 className="footer-info-heading">
                            {/* html L40: {{lang 'footer.categories'}} */}
                            <$Lang translationKey={$string('footer.categories')}/>
                        </h3>
                        {/* html L41: <ul class="footer-info-list"> */}
                        <ul className="footer-info-list">
                            {/* html L42: {{#each categories}} */}
                            <$Each
                                list={categories}
                                $then={(category) => (
                                    /* html L43: <li> */
                                    <li>
                                        {/* html L44: <a href="{{url}}">{{name}}</a> */}
                                        <a href={category.url}>{/* html L44: {{name}} */}{category.name}</a>
                                    </li>
                                )}
                            />
                        </ul>
                    </article>

                    {/* html L50: {{#and theme_settings.shop_by_brand_show_footer shop_by_brand.length}} */}
                    <$And
                        a={theme_settings.shop_by_brand_show_footer}
                        b={shop_by_brand.length}
                        $then={() => (
                            /* html L51: <article class="footer-info-col footer-info-col--small" data-section-type="footer-brands"> */
                            <article className="footer-info-col footer-info-col--small" data-section-type="footer-brands">
                                {/* html L52: <h3 class="footer-info-heading">{{lang 'footer.brands'}}</h3> */}
                                <h3 className="footer-info-heading">
                                    {/* html L52: {{lang 'footer.brands'}} */}
                                    <$Lang translationKey={$string('footer.brands')}/>
                                </h3>
                                {/* html L53: <ul class="footer-info-list"> */}
                                <ul className="footer-info-list">
                                    {/* html L54: {{#each shop_by_brand}} */}
                                    <$Each
                                        list={shop_by_brand}
                                        $then={(brand) => (
                                            /* html L55: <li> */
                                            <li>
                                                {/* html L56: <a href="{{url}}">{{name}}</a> */}
                                                <a href={brand.url}>{/* html L56: {{name}} */}{brand.name}</a>
                                            </li>
                                        )}
                                    />
                                    {/* html L59: <li><a href="{{urls.brands}}">{{lang 'common.view_all'}}</a></li> */}
                                    <li>
                                        {/* html L59: <a href="{{urls.brands}}"> */}
                                        <a href={urls.brands}>
                                            {/* html L59: {{lang 'common.view_all'}} */}
                                            <$Lang translationKey={$string('common.view_all')}/>
                                        </a>
                                    </li>
                                </ul>
                            </article>
                        )}
                    />

                    {/* html L64: {{#if settings.address}} */}
                    <$If
                        query={[settings.address]}
                        $then={() => (
                            /* html L65: <article class="footer-info-col footer-info-col--small" data-section-type="storeInfo"> */
                            <article className="footer-info-col footer-info-col--small" data-section-type="storeInfo">
                                {/* html L66: <h3 class="footer-info-heading">{{lang 'footer.info'}}</h3> */}
                                <h3 className="footer-info-heading">
                                    {/* html L66: {{lang 'footer.info'}} */}
                                    <$Lang translationKey={$string('footer.info')}/>
                                </h3>
                                {/* html L67: <address>{{nl2br settings.address}}</address> */}
                                <address>{/* html L67: {{nl2br settings.address}} */}{$nl2br(settings.address)}</address>
                                {/* html L68: {{#if settings.phone_number}} */}
                                <$If
                                    query={[settings.phone_number]}
                                    $then={() => (
                                        /* html L69: <strong>{{lang 'footer.call_us' phone_number=settings.phone_number}}</strong> */
                                        <strong>
                                            {/* html L69: {{lang 'footer.call_us' phone_number=settings.phone_number}} */}
                                            <$Lang translationKey={$string('footer.call_us')} params={{phone_number: settings.phone_number}}/>
                                        </strong>
                                    )}
                                />
                            </article>
                        )}
                    />

                    {/* html L74: <article class="footer-info-col" data-section-type="newsletterSubscription"> */}
                    <article className="footer-info-col" data-section-type="newsletterSubscription">
                        {/* html L75: {{#if settings.show_newsletter_box}} */}
                        <$If
                            query={[settings.show_newsletter_box]}
                            $then={() => /* html L76: {{> components/common/subscription-form}} */ <SubscriptionForm customer={customer} settings={settings} urls={urls}/>}
                        />
                        {/* html L78: {{> components/common/payment-icons}} */}
                        <PaymentIcons theme_settings={theme_settings}/>
                    </article>
                </section>
                {/* html L81: {{#if theme_settings.show_powered_by}} */}
                <$If
                    query={[theme_settings.show_powered_by]}
                    $then={() => (
                        /* html L82: <div class="footer-copyright"> */
                        <div className="footer-copyright">
                            {/* html L83: <p class="powered-by">{{lang 'footer.powered_by'}} <a href="https://www.bigcommerce.com?utm_source=merchant&amp;utm_medium=poweredbyBC" rel="nofollow">BigCommerce</a></p> */}
                            <p className="powered-by">
                                {/* html L83: {{lang 'footer.powered_by'}} */}
                                <$Lang translationKey={$string('footer.powered_by')}/>{' '}
                                {/* html L83: <a href="https://www.bigcommerce.com?utm_source=merchant&amp;utm_medium=poweredbyBC" rel="nofollow"> */}
                                <a href="https://www.bigcommerce.com?utm_source=merchant&amp;utm_medium=poweredbyBC" rel="nofollow">
                                    BigCommerce
                                </a>
                            </p>
                        </div>
                    )}
                />
                {/* html L86: {{#if theme_settings.show_copyright_footer}} */}
                <$If
                    query={[theme_settings.show_copyright_footer]}
                    $then={() => (
                        /* html L87: <div class="footer-copyright"> */
                        <div className="footer-copyright">
                            {/* html L88: <p class="powered-by">&copy; {{moment format="YYYY"}} {{settings.store_name}} </p> */}
                            <p className="powered-by">
                                {$$raw('&copy;')} {/* html L88: {{moment format="YYYY"}} */}{$parseHandlebarsDangerously('{{moment format="YYYY"}}')} {/* html L88: {{settings.store_name}} */}{settings.store_name}{' '}
                            </p>
                        </div>
                    )}
                />
            </div>
            {/* html L92: {{{region name="ssl_site_seal--global"}}} */}
            <$_Region name={$string('ssl_site_seal--global')}/>
        </footer>
    </>
));
