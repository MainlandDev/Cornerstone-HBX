/**
 * Source: templates/components/common/modal/modal-close-btn.html (9 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$string} from '@mainlanddev/bigcommerce-react';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';

export default $asPartial<{additional_attr?: HandlebarsInlineValueToken<string>}>(({additional_attr}) => (
    /* html L1-5:
       <button class="modal-close"
               type="button"
               title="{{lang 'common.close'}}"
               {{additional_attr}}
       >
    */
    <button className="modal-close" type="button" title={$lang($string('common.close'))} $$={additional_attr}>
        {/* html L6: <span class="aria-description--hidden">{{lang 'common.close'}}</span> */}
        <span className="aria-description--hidden">
            {/* html L6: {{lang 'common.close'}} */}
            <$Lang translationKey={$string('common.close')}/>
        </span>
        {/* html L7: <span aria-hidden="true">&#215;</span> */}
        <span aria-hidden="true">{$$raw('&#215;')}</span>
    </button>
));
