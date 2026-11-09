import {$string} from '@mainlanddev/bigcommerce-react';
import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';

export default $asPartial<{additional_attr?: HandlebarsInlineValueToken<string>}>(({additional_attr}) => (
    <button className="modal-close" type="button" title={$lang($string('common.close'))} $$={additional_attr}>
        <span className="aria-description--hidden">
            <$Lang translationKey={$string('common.close')}/>
        </span>
        <span aria-hidden="true">{$$raw('&#215;')}</span>
    </button>
));
