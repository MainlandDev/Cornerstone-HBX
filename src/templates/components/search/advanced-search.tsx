/**
 * Source: templates/components/search/advanced-search.html (92 lines). Per-element comments below quote the original lines (`html L<n>`).
 */
import {$Each, $if, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {AdvancedSearchForms} from '@/context-misc';

export default $asPartial<{forms: AdvancedSearchForms}>(({forms}) => (
    /* html L1: <div class="page"> */
    <div className="page">
        {/* html L2: <div class="page-content page-content--centered"> */}
        <div className="page-content page-content--centered">
            {/* html L3: <form class="advancedSearch-form toggle-content" action="{{forms.search.action}}" data-advanced-search-form id="advanced-search-content" aria-hidden="true"> */}
            <form
                className="advancedSearch-form toggle-content"
                action={forms.search.action}
                data-advanced-search-form=""
                id="advanced-search-content"
                aria-hidden="true"
            >
                {/* html L4: <input type="hidden" name="mode" value="1"> */}
                <input type="hidden" name="mode" value="1"/>
                {/* html L5: <h5 class="advancedSearch-title">{{lang 'forms.search.title'}}</h5> */}
                <h5 className="advancedSearch-title">
                    {/* html L5: {{lang 'forms.search.title'}} */}
                    <$Lang translationKey={$string('forms.search.title')}/>
                </h5>
                {/* html L6: <div class="form-row"> */}
                <div className="form-row">
                    {/* html L7: <fieldset class="form-fieldset form-column"> */}
                    <fieldset className="form-fieldset form-column">
                        {/* html L8: <div class="form-field"> */}
                        <div className="form-field">
                            {/* html L9: <label class="form-label" for="search_query_adv"> */}
                            <label className="form-label" htmlFor="search_query_adv">
                                {/* html L10: {{lang 'forms.search.query' }} */}
                                <$Lang translationKey={$string('forms.search.query')}/>
                                {/* html L11: <small>{{lang 'common.required' }}</small> */}
                                <small>
                                    {/* html L11: {{lang 'common.required' }} */}
                                    <$Lang translationKey={$string('common.required')}/>
                                </small>
                            </label>
                            {/* html L13: <input type="text" class="form-input" name="search_query_adv" data-error-message="{{lang 'search.error.empty_field'}}" id="search_query_adv" value="{{forms.search.query}}"> */}
                            <input
                                type="text"
                                className="form-input"
                                name="search_query_adv"
                                data-error-message={$lang($string('search.error.empty_field'))}
                                id="search_query_adv"
                                value={forms.search.query}
                            />
                        </div>

                        {/* html L16: <div class="form-field"> */}
                        <div className="form-field">
                            {/* html L17: <label class="form-label" for="search-form-brand"> */}
                            <label className="form-label" htmlFor="search-form-brand">
                                {/* html L18: {{lang 'forms.search.brand' }} */}
                                <$Lang translationKey={$string('forms.search.brand')}/>
                            </label>
                            {/* html L20: <select class="form-select" name="brand" id="search-form-brand"> */}
                            <select className="form-select" name="brand" id="search-form-brand">
                                {/* html L21: <option value="">{{lang 'common.no_preference'}}</option> */}
                                <option value="">
                                    {/* html L21: {{lang 'common.no_preference'}} */}
                                    <$Lang translationKey={$string('common.no_preference')}/>
                                </option>
                                {/* html L22: {{#each forms.search.brands_list}} */}
                                <$Each
                                    list={forms.search.brands_list}
                                    $then={(brand) => (
                                        /* html L23: <option value="{{id}}" {{#if ../forms.search.values.brand '==' id}}selected{{/if}}>{{name}}</option> */
                                        <option
                                            value={brand.id}
                                            $$={$if(forms.search.values.brand, '==', brand.id).then(() => $$raw('selected'))}
                                        >
                                            {/* html L23: {{name}} */}
                                            {brand.name}
                                        </option>
                                    )}
                                />
                            </select>
                        </div>
                    </fieldset>
                    {/* html L28: <fieldset class="form-fieldset form-column"> */}
                    <fieldset className="form-fieldset form-column">
                        {/* html L29: <div class="form-field"> */}
                        <div className="form-field">
                            {/* html L30: <label class="form-label"> */}
                            <label className="form-label">
                                {/* html L31: {{lang 'forms.search.categories' }} */}
                                <$Lang translationKey={$string('forms.search.categories')}/>
                            </label>
                            {/* html L33: <div class="form-field-group" data-search-category-tree></div> */}
                            <div className="form-field-group" data-search-category-tree=""></div>
                        </div>
                        {/* html L35: <div class="form-field"> */}
                        <div className="form-field">
                            {/* html L36: <input type="checkbox" class="form-checkbox" name="searchsubs" value="ON" id="search-form-searchsubs" checked> */}
                            <input type="checkbox" className="form-checkbox" name="searchsubs" value="ON" id="search-form-searchsubs" checked/>
                            {/* html L37: <label class="form-label" for="search-form-searchsubs">{{lang 'forms.search.searchsubs'}}</label> */}
                            <label className="form-label" htmlFor="search-form-searchsubs">
                                {/* html L37: {{lang 'forms.search.searchsubs'}} */}
                                <$Lang translationKey={$string('forms.search.searchsubs')}/>
                            </label>
                        </div>
                    </fieldset>
                </div>
                {/* html L41: <hr> */}
                <hr/>
                {/* html L42: <div class="form-row"> */}
                <div className="form-row">
                    {/* html L43: <div class="form-field search-price-range"> */}
                    <div className="form-field search-price-range">
                        {/* html L44: <h5 class="advancedSearch-title">{{lang 'forms.search.by_price'}}</h5> */}
                        <h5 className="advancedSearch-title">
                            {/* html L44: {{lang 'forms.search.by_price'}} */}
                            <$Lang translationKey={$string('forms.search.by_price')}/>
                        </h5>
                        {/* The original markup puts for= on a <p>; htmlFor is not typed on <p>, so it is passed as a spread. */}
                        {/* html L45: <p class="form-label" for="search-form-price_from"> */}
                        <p className="form-label" {...{for: 'search-form-price_from'}}>
                            {/* html L46: {{lang 'forms.search.price_range' }} */}
                            <$Lang translationKey={$string('forms.search.price_range')}/>
                        </p>
                        {/* html L48: <label> */}
                        <label>
                            {/* html L49: <span class="is-srOnly">{{lang 'forms.search.price_range' }}</span> */}
                            <span className="is-srOnly">
                                {/* html L49: {{lang 'forms.search.price_range' }} */}
                                <$Lang translationKey={$string('forms.search.price_range')}/>
                            </span>
                            {/* html L50: <span>{{lang 'common.from'}}</span><input type="number" step="any" class="form-input" name="price_from" id="search-form-price_from" value="{{forms.search.values.price_from}}"> */}
                            <span>
                                {/* html L50: {{lang 'common.from'}} */}
                                <$Lang translationKey={$string('common.from')}/>
                            </span>
                            {/* html L50: <input type="number" step="any" class="form-input" name="price_from" id="search-form-price_from" value="{{forms.search.values.price_from}}"> */}
                            <input
                                type="number"
                                step="any"
                                className="form-input"
                                name="price_from"
                                id="search-form-price_from"
                                value={forms.search.values.price_from}
                            />
                        </label>
                        {/* html L52: <label> */}
                        <label>
                            {/* html L53: <span class="is-srOnly">{{lang 'forms.search.price_range' }}</span> */}
                            <span className="is-srOnly">
                                {/* html L53: {{lang 'forms.search.price_range' }} */}
                                <$Lang translationKey={$string('forms.search.price_range')}/>
                            </span>
                            {/* html L54: <span>{{lang 'common.to'}}</span><input type="number" step="any" class="form-input" name="price_to" id="search-form-price_to" value="{{forms.search.values.price_to}}"> */}
                            <span>
                                {/* html L54: {{lang 'common.to'}} */}
                                <$Lang translationKey={$string('common.to')}/>
                            </span>
                            {/* html L54: <input type="number" step="any" class="form-input" name="price_to" id="search-form-price_to" value="{{forms.search.values.price_to}}"> */}
                            <input
                                type="number"
                                step="any"
                                className="form-input"
                                name="price_to"
                                id="search-form-price_to"
                                value={forms.search.values.price_to}
                            />
                        </label>
                    </div>
                </div>
                {/* html L58: <hr> */}
                <hr/>
                {/* html L59: <h5 class="advancedSearch-title">{{lang 'forms.search.by_setting'}}</h5> */}
                <h5 className="advancedSearch-title">
                    {/* html L59: {{lang 'forms.search.by_setting'}} */}
                    <$Lang translationKey={$string('forms.search.by_setting')}/>
                </h5>
                {/* html L60: <div class="form-row form-row--half"> */}
                <div className="form-row form-row--half">
                    {/* html L61: <div class="form-field"> */}
                    <div className="form-field">
                        {/* html L62: <label class="form-label" for="search-form-featured"> */}
                        <label className="form-label" htmlFor="search-form-featured">
                            {/* html L63: {{lang 'forms.search.featured_products.title' }} */}
                            <$Lang translationKey={$string('forms.search.featured_products.title')}/>
                        </label>
                        {/* html L65: <select class="form-select" name="featured" id="search-form-featured"> */}
                        <select className="form-select" name="featured" id="search-form-featured">
                            {/* html L66: <option value="">{{lang 'common.no_preference'}}</option> */}
                            <option value="">
                                {/* html L66: {{lang 'common.no_preference'}} */}
                                <$Lang translationKey={$string('common.no_preference')}/>
                            </option>
                            {/* html L67: <option value="1" {{#if forms.search.values.featured_products '===' '1'}}selected{{/if}}>{{lang 'forms.search.featured_products.enabled' }}</option> */}
                            <option value="1" $$={$if(forms.search.values.featured_products, '===', $string('1')).then(() => $$raw('selected'))}>
                                {/* html L67: {{lang 'forms.search.featured_products.enabled' }} */}
                                <$Lang translationKey={$string('forms.search.featured_products.enabled')}/>
                            </option>
                            {/* html L68: <option value="2" {{#if forms.search.values.featured_products '===' '2'}}selected{{/if}}>{{lang 'forms.search.featured_products.disabled' }}</option> */}
                            <option value="2" $$={$if(forms.search.values.featured_products, '===', $string('2')).then(() => $$raw('selected'))}>
                                {/* html L68: {{lang 'forms.search.featured_products.disabled' }} */}
                                <$Lang translationKey={$string('forms.search.featured_products.disabled')}/>
                            </option>
                        </select>
                    </div>
                    {/* html L71: <div class="form-field"> */}
                    <div className="form-field">
                        {/* html L72: <label class="form-label" for="search-form-shipping"> */}
                        <label className="form-label" htmlFor="search-form-shipping">
                            {/* html L73: {{lang 'forms.search.free_shipping.title' }} */}
                            <$Lang translationKey={$string('forms.search.free_shipping.title')}/>
                        </label>
                        {/* html L75: <select class="form-select" name="shipping" id="search-form-shipping"> */}
                        <select className="form-select" name="shipping" id="search-form-shipping">
                            {/* html L76: <option value="">{{lang 'common.no_preference'}}</option> */}
                            <option value="">
                                {/* html L76: {{lang 'common.no_preference'}} */}
                                <$Lang translationKey={$string('common.no_preference')}/>
                            </option>
                            {/* html L77: <option value="1" {{#if forms.search.values.free_shipping '===' '1'}}selected{{/if}}>{{lang 'forms.search.free_shipping.free' }}</option> */}
                            <option value="1" $$={$if(forms.search.values.free_shipping, '===', $string('1')).then(() => $$raw('selected'))}>
                                {/* html L77: {{lang 'forms.search.free_shipping.free' }} */}
                                <$Lang translationKey={$string('forms.search.free_shipping.free')}/>
                            </option>
                            {/* html L78: <option value="2" {{#if forms.search.values.free_shipping '===' '2'}}selected{{/if}}>{{lang 'forms.search.free_shipping.paid' }}</option> */}
                            <option value="2" $$={$if(forms.search.values.free_shipping, '===', $string('2')).then(() => $$raw('selected'))}>
                                {/* html L78: {{lang 'forms.search.free_shipping.paid' }} */}
                                <$Lang translationKey={$string('forms.search.free_shipping.paid')}/>
                            </option>
                        </select>
                    </div>
                </div>
                {/* html L82: <div class="form-actions"> */}
                <div className="form-actions">
                    {/* html L83-87:
                       <input
                               id="advanced-search-submit"
                               class="button button--primary"
                               type="submit"
                               value="{{lang 'forms.search.search' }}">
                    */}
                    <input
                        id="advanced-search-submit"
                        className="button button--primary"
                        type="submit"
                        value={$lang($string('forms.search.search'))}
                    />
                </div>
            </form>
        </div>
    </div>
));
