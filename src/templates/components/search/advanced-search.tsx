import {$Each, $if, $string} from '@mainlanddev/bigcommerce-react';
import {$asPartial} from '@mainlanddev/bigcommerce-react/theme';
import {$$raw} from '@mainlanddev/bigcommerce-react/internal';
import {$Lang} from '@mainlanddev/bigcommerce-react/bigcommerce/jsx';
import {$lang} from '@mainlanddev/bigcommerce-react/bigcommerce';
import type {AdvancedSearchForms} from '@/context-misc';

export default $asPartial<{forms: AdvancedSearchForms}>(({forms}) => (
    <div className="page">
        <div className="page-content page-content--centered">
            <form
                className="advancedSearch-form toggle-content"
                action={forms.search.action}
                data-advanced-search-form=""
                id="advanced-search-content"
                aria-hidden="true"
            >
                <input type="hidden" name="mode" value="1"/>
                <h5 className="advancedSearch-title">
                    <$Lang translationKey={$string('forms.search.title')}/>
                </h5>
                <div className="form-row">
                    <fieldset className="form-fieldset form-column">
                        <div className="form-field">
                            <label className="form-label" htmlFor="search_query_adv">
                                <$Lang translationKey={$string('forms.search.query')}/>
                                <small>
                                    <$Lang translationKey={$string('common.required')}/>
                                </small>
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                name="search_query_adv"
                                data-error-message={$lang($string('search.error.empty_field'))}
                                id="search_query_adv"
                                value={forms.search.query}
                            />
                        </div>

                        <div className="form-field">
                            <label className="form-label" htmlFor="search-form-brand">
                                <$Lang translationKey={$string('forms.search.brand')}/>
                            </label>
                            <select className="form-select" name="brand" id="search-form-brand">
                                <option value="">
                                    <$Lang translationKey={$string('common.no_preference')}/>
                                </option>
                                <$Each
                                    list={forms.search.brands_list}
                                    $then={(brand) => (
                                        <option
                                            value={brand.id}
                                            $$={$if(forms.search.values.brand, '==', brand.id).then(() => $$raw('selected'))}
                                        >
                                            {brand.name}
                                        </option>
                                    )}
                                />
                            </select>
                        </div>
                    </fieldset>
                    <fieldset className="form-fieldset form-column">
                        <div className="form-field">
                            <label className="form-label">
                                <$Lang translationKey={$string('forms.search.categories')}/>
                            </label>
                            <div className="form-field-group" data-search-category-tree=""></div>
                        </div>
                        <div className="form-field">
                            <input type="checkbox" className="form-checkbox" name="searchsubs" value="ON" id="search-form-searchsubs" checked/>
                            <label className="form-label" htmlFor="search-form-searchsubs">
                                <$Lang translationKey={$string('forms.search.searchsubs')}/>
                            </label>
                        </div>
                    </fieldset>
                </div>
                <hr/>
                <div className="form-row">
                    <div className="form-field search-price-range">
                        <h5 className="advancedSearch-title">
                            <$Lang translationKey={$string('forms.search.by_price')}/>
                        </h5>
                        {/* The original markup puts for= on a <p>; htmlFor is not typed on <p>, so it is passed as a spread. */}
                        <p className="form-label" {...{for: 'search-form-price_from'}}>
                            <$Lang translationKey={$string('forms.search.price_range')}/>
                        </p>
                        <label>
                            <span className="is-srOnly">
                                <$Lang translationKey={$string('forms.search.price_range')}/>
                            </span>
                            <span>
                                <$Lang translationKey={$string('common.from')}/>
                            </span>
                            <input
                                type="number"
                                step="any"
                                className="form-input"
                                name="price_from"
                                id="search-form-price_from"
                                value={forms.search.values.price_from}
                            />
                        </label>
                        <label>
                            <span className="is-srOnly">
                                <$Lang translationKey={$string('forms.search.price_range')}/>
                            </span>
                            <span>
                                <$Lang translationKey={$string('common.to')}/>
                            </span>
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
                <hr/>
                <h5 className="advancedSearch-title">
                    <$Lang translationKey={$string('forms.search.by_setting')}/>
                </h5>
                <div className="form-row form-row--half">
                    <div className="form-field">
                        <label className="form-label" htmlFor="search-form-featured">
                            <$Lang translationKey={$string('forms.search.featured_products.title')}/>
                        </label>
                        <select className="form-select" name="featured" id="search-form-featured">
                            <option value="">
                                <$Lang translationKey={$string('common.no_preference')}/>
                            </option>
                            <option value="1" $$={$if(forms.search.values.featured_products, '===', $string('1')).then(() => $$raw('selected'))}>
                                <$Lang translationKey={$string('forms.search.featured_products.enabled')}/>
                            </option>
                            <option value="2" $$={$if(forms.search.values.featured_products, '===', $string('2')).then(() => $$raw('selected'))}>
                                <$Lang translationKey={$string('forms.search.featured_products.disabled')}/>
                            </option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label className="form-label" htmlFor="search-form-shipping">
                            <$Lang translationKey={$string('forms.search.free_shipping.title')}/>
                        </label>
                        <select className="form-select" name="shipping" id="search-form-shipping">
                            <option value="">
                                <$Lang translationKey={$string('common.no_preference')}/>
                            </option>
                            <option value="1" $$={$if(forms.search.values.free_shipping, '===', $string('1')).then(() => $$raw('selected'))}>
                                <$Lang translationKey={$string('forms.search.free_shipping.free')}/>
                            </option>
                            <option value="2" $$={$if(forms.search.values.free_shipping, '===', $string('2')).then(() => $$raw('selected'))}>
                                <$Lang translationKey={$string('forms.search.free_shipping.paid')}/>
                            </option>
                        </select>
                    </div>
                </div>
                <div className="form-actions">
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
