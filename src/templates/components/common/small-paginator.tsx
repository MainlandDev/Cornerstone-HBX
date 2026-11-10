/**
 * Source: templates/components/common/small-paginator.html (39 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $If, $string, type HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';

type Str = HandlebarsInlineValueToken<string>;

export default $asPartial<{
    previous: Str;
    next: Str;
    links: Array<{number: HandlebarsInlineValueToken<number>; link: Str}>;
}>(({previous, next, links}) => (
    /* html L1: <div class="pagination" role="region" aria-label="{{lang 'common.pagination'}}"> */
    <div className="pagination" role="region" aria-label={$lang($string('common.pagination'))}>
        {/* html L2: <ul class="pagination-list pagination-list--small"> */}
        <ul className="pagination-list pagination-list--small">
            {/* html L3: {{#if previous}} */}
            <$If
                query={[previous]}
                $then={() => (
                    /* html L4: <li class="pagination-item pagination-item--previous"> */
                    <li className="pagination-item pagination-item--previous">
                        {/* html L5: <a class="pagination-link" href="{{previous}}" data-faceted-search-facet> */}
                        <a className="pagination-link" href={previous} data-faceted-search-facet="">
                            {/* html L6: <i class="icon" aria-hidden="true"> */}
                            <i className="icon" aria-hidden="true">
                                {/* html L7: <svg> */}
                                <svg>
                                    {/* html L8: <use href="#icon-chevron-left"></use> */}
                                    <use href="#icon-chevron-left"></use>
                                </svg>
                            </i>
                            {/* html L11: {{lang 'common.previous'}} */}
                            <$Lang translationKey={$string('common.previous')}/>
                        </a>
                    </li>
                )}
            />

            {/* html L16: {{#if this.links.length}} */}
            <$If
                query={[links.length]}
                $then={() => (
                    /* html L17: {{#each this.links}} */
                    <$Each
                        list={links}
                        $then={(item) => (
                            /* html L18: <li class="pagination-item"> */
                            <li className="pagination-item">
                                {/* html L19: <a class="pagination-link" href="{{this.link}}">{{this.number}}</a> */}
                                <a className="pagination-link" href={item.link}>
                                    {/* html L19: {{this.number}} */}
                                    {item.number}
                                </a>
                            </li>
                        )}
                    />
                )}
            />

            {/* html L24: {{#if next}} */}
            <$If
                query={[next]}
                $then={() => (
                    /* html L25: <li class="pagination-item pagination-item--next"> */
                    <li className="pagination-item pagination-item--next">
                        {/* html L26: <a class="pagination-link" href="{{next}}" data-faceted-search-facet> */}
                        <a className="pagination-link" href={next} data-faceted-search-facet="">
                            {/* html L27: {{lang 'common.next'}} */}
                            <$Lang translationKey={$string('common.next')}/>
                            {/* html L28: <i class="icon" aria-hidden="true"> */}
                            <i className="icon" aria-hidden="true">
                                {/* html L29: <svg> */}
                                <svg>
                                    {/* html L30: <use href="#icon-chevron-right"></use> */}
                                    <use href="#icon-chevron-right"></use>
                                </svg>
                            </i>
                        </a>
                    </li>
                )}
            />
        </ul>
    </div>
));
