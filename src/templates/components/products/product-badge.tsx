import {$If, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$unescaped, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemeSettingsHint} from '@/context-products';

export default $asPartial<{
    'badge-type': HandlebarsInlineValueToken<string>;
    badge_view: ThemeSettingsHint['product_sale_badges'];
    badge_label: HandlebarsInlineValueToken<string>;
}>(({'badge-type': badgeType, badge_view, badge_label}) => (
    <$If
        query={[badge_view, '===', $string('sash')]}
        $then={() => (
            <div className={`${badgeType}-flag-sash`}>
                <span className={`${badgeType}-text`}>{$unescaped(badge_label)}</span>
            </div>
        )}
        $elseThen={[
            {
                query: [badge_view, '===', $string('topleft')],
                $then: () => (
                    <div className={`${badgeType}-flag-side`}>
                        <span className={`${badgeType}-text`}>{$unescaped(badge_label)}</span>
                    </div>
                ),
            },
            {
                query: [badge_view, '===', $string('burst')],
                $then: () => (
                    <div className="starwrap">
                        <div className={`${badgeType}-text-burst`}>{$unescaped(badge_label)}</div>
                        <div className={`${badgeType}-flag-star`}></div>
                    </div>
                ),
            },
        ]}
    />
));
