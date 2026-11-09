import {$Each, $If, $number, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$lang, $subtract} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ProductCardHint} from '@/context-products';

export default $asPartial<{
    promotions: ProductCardHint['featured_promotions'];
    mode: HandlebarsInlineValueToken<string>;
}>(({promotions, mode}) => (
    <$If
        query={[promotions.length]}
        $then={() => (
            <$If
                query={[mode, '===', $string('compact')]}
                $then={() => (
                    <div className="promotionCallout promotionCallout--compact">
                        <div className="promotionCallout-item">
                            <span className="promotionCallout-text">{promotions[0].text}</span>
                            <$If
                                query={[promotions[1]]}
                                $then={() => (
                                    <span className="promotionCallout-more">
                                        +{$subtract(promotions.length, $number(1))} {$lang($string('products.featured_promotions.more_offers'), {count: $subtract(promotions.length, $number(1))})}
                                    </span>
                                )}
                            />
                        </div>
                    </div>
                )}
                $else={() => (
                    <ul className="promotionCallout promotionCallout--full">
                        <$Each
                            list={promotions}
                            $then={(promotion) => (
                                <li className="promotionCallout-item">
                                    <span className="promotionCallout-text">{promotion.text}</span>
                                </li>
                            )}
                        />
                    </ul>
                )}
            />
        )}
    />
));
