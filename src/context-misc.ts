import type {HandlebarsInlineValueToken} from '@mainlanddev/bigcommerce-react';
import type {ThemeContextHint, ThemePageBrand, ThemePageContactForm, ThemePageSearch} from '@mainlanddev/bigcommerce-react/theme';

type Str = HandlebarsInlineValueToken<string>;

/**
 * `forms` on search pages: the library types it as `ThemeEmptyList | ThemeForms`; narrow to the object shape so `forms.search` resolves.
 */
export type SearchForms = Extract<ThemeContextHint<ThemePageSearch>['forms'], {search?: unknown}>;

/** `forms.search` on the advanced search page: `action` is missing from the library's `ThemeFormSearch`. */
export type AdvancedSearchForms = SearchForms & {search: {action: Str}};

/**
 * `pagination` on search pages: `ThemeEmptyList | ThemePagination`; narrow to the object shape so `pagination.product_results` resolves.
 */
export type SearchPagination = Extract<ThemeContextHint<ThemePageSearch>['pagination'], {product_results?: unknown}>;

/** `pagination` on brand pages: `ThemeEmptyList | ThemePagination`; narrow to the object shape so `pagination.brand` resolves. */
export type BrandPagination = Extract<ThemeContextHint<ThemePageBrand>['pagination'], {brand?: unknown}>;

/** `urls.rss` entries the library's `ThemeUrls` lacks (blog feeds and the product feed variants used by `components/page/rss_feed`). */
export type RssUrlsExtension = {
    rss: {
        blog: Str;
        blog_atom: Str;
        products: {new: Str; new_atom: Str; popular: Str; popular_atom: Str; featured: Str; featured_atom: Str};
    };
};

/** A faceted-search listing (`product_results` on search pages; `brand` / `category` share the same `facets` and `selected` keys). */
export type FacetedSearchHint = ThemeContextHint<ThemePageSearch>['product_results'];

/** One facet as rendered by `components/faceted-search/facets/*`; `remove_url`, `min_price` and `max_price` are missing from the library's `ThemeFacet`. */
export type FacetHint = FacetedSearchHint['facets'][number] & {remove_url: Str; min_price: Str; max_price: Str};

/** A hierarchy facet item; `has_sub_categories` and `children` are missing from the library's `ThemeFacetItem`. */
export type HierarchyItemHint = FacetedSearchHint['facets'][number]['items'][number] & {
    has_sub_categories: HandlebarsInlineValueToken<boolean>;
    children: Array<HierarchyItemHint>;
};

/** A selected-facet item; `facet` (the facet's key) is missing from the library's `ThemeFacetItem`. */
export type SelectedFacetItemHint = FacetedSearchHint['selected']['items'][number] & {facet: Str};

export type SelectedFacetsHint = {remove_all_url: Str; items: Array<SelectedFacetItemHint>};

/** The ambient keys `components/faceted-search/range-form` reads (`search_query`, `sort`) plus the range values. */
export type RangeFormHint = {search_query: Str; sort: Str; min_price: Str; max_price: Str};

/**
 * `forms.contact` on the contact page: `error`, `manualcaptcha` and a `recaptcha.markup` string are missing from the library's
 * `ThemeFormContact` (which types `recaptcha` as an array).
 */
export type ContactFormsHint = {
    contact: Omit<ThemeContextHint<ThemePageContactForm>['forms']['contact'], 'recaptcha'> & {
        error: Str;
        manualcaptcha: {name: Str; question: Str};
        recaptcha: {markup: Str};
    };
};

/** `customer` on the contact page is `null` for guests; narrow to the object shape so `customer.name` resolves. */
export type ContactCustomer = Extract<ThemeContextHint<ThemePageContactForm>['customer'], {email?: unknown}>;

/** The ambient keys `components/faceted-search/show-more-facets` reads from its listing context. */
export type ShowMoreFacetsHint = {facets: Array<FacetHint>; all_facets: Str; facet_title: Str};
