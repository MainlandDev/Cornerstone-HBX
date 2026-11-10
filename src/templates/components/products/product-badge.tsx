/**
 * Source: templates/components/products/product-badge.html (15 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$unescaped, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    'badge-type': HandlebarsInlineValueToken<string>;
    badge_view: ThemeSettingsHint['product_sale_badges'];
    badge_label: HandlebarsInlineValueToken<string>;
}>(({'badge-type': badgeType, badge_view, badge_label}) => (
    /* html L1: {{#if badge_view '===' 'sash'}} */
    <$If
        query={[badge_view, '===', $string('sash')]}
        $then={() => (
            /* html L2: <div class="{{badge-type}}-flag-sash"> */
            <div className={`${badgeType}-flag-sash`}>
                {/* html L3: <span class="{{badge-type}}-text">{{{badge_label}}}</span> */}
                <span className={`${badgeType}-text`}>{/* html L3: {{{badge_label}}} */}{$unescaped(badge_label)}</span>
            </div>
        )}
        $elseThen={[
            {
                query: [badge_view, '===', $string('topleft')],
                $then: () => (
                    /* html L5: {{else if badge_view '===' 'topleft'}}
                                              html L6: <div class="{{badge-type}}-flag-side">
                    */
                    <div className={`${badgeType}-flag-side`}>
                        {/* html L7: <span class="{{badge-type}}-text">{{{badge_label}}}</span> */}
                        <span className={`${badgeType}-text`}>{/* html L7: {{{badge_label}}} */}{$unescaped(badge_label)}</span>
                    </div>
                ),
            },
            {
                query: [badge_view, '===', $string('burst')],
                $then: () => (
                    /* html L9: {{else if badge_view '===' 'burst'}}
                                              html L10: <div class="starwrap">
                    */
                    <div className="starwrap">
                        {/* html L11: <div class="{{badge-type}}-text-burst">{{{badge_label}}}</div> */}
                        <div className={`${badgeType}-text-burst`}>{/* html L11: {{{badge_label}}} */}{$unescaped(badge_label)}</div>
                        {/* html L12: <div class="{{badge-type}}-flag-star"></div> */}
                        <div className={`${badgeType}-flag-star`}></div>
                    </div>
                ),
            },
        ]}
    />
));
