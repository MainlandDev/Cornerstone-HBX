/**
 * Source: templates/components/products/promotion-callout.html (23 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $number, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$lang, $subtract} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ProductCardHint} from '@/context-products';

export default $asPartial<{
    promotions: ProductCardHint['featured_promotions'];
    mode: HandlebarsInlineValueToken<string>;
}>(({promotions, mode}) => (
    /* html L1: {{#if promotions.length}} */
    <$If
        query={[promotions.length]}
        $then={() => (
            /* html L2: {{#if mode '===' 'compact'}} */
            <$If
                query={[mode, '===', $string('compact')]}
                $then={() => (
                    /* html L3: <div class="promotionCallout promotionCallout--compact"> */
                    <div className="promotionCallout promotionCallout--compact">
                        {/* html L4: <div class="promotionCallout-item"> */}
                        <div className="promotionCallout-item">
                            {/* html L5: <span class="promotionCallout-text">{{promotions.[0].text}}</span> */}
                            <span className="promotionCallout-text">{/* html L5: {{promotions.[0].text}} */}{promotions[0].text}</span>
                            {/* html L6: {{#if promotions.[1]}} */}
                            <$If
                                query={[promotions[1]]}
                                $then={() => (
                                    /* html L7: <span class="promotionCallout-more"> */
                                    <span className="promotionCallout-more">
                                        +{/* html L8: +{{subtract promotions.length 1}} {{lang 'products.featured_promotions.more_offers' count=(subtract promotions.length 1)}} */}{$subtract(promotions.length, $number(1))} {/* html L8: {{lang 'products.featured_promotions.more_offers' count=(subtract promotions.length 1)}} */}{$lang($string('products.featured_promotions.more_offers'), {count: $subtract(promotions.length, $number(1))})}
                                    </span>
                                )}
                            />
                        </div>
                    </div>
                )}
                $else={() => (
                    /* html L13: {{else}}
                                              html L14: <ul class="promotionCallout promotionCallout--full">
                    */
                    <ul className="promotionCallout promotionCallout--full">
                        {/* html L15: {{#each promotions}} */}
                        <$Each
                            list={promotions}
                            $then={(promotion) => (
                                /* html L16: <li class="promotionCallout-item"> */
                                <li className="promotionCallout-item">
                                    {/* html L17: <span class="promotionCallout-text">{{text}}</span> */}
                                    <span className="promotionCallout-text">{/* html L17: {{text}} */}{promotion.text}</span>
                                </li>
                            )}
                        />
                    </ul>
                )}
            />
        )}
    />
));
