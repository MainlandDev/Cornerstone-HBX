"use server";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$dashcase, $If, $Lang, $lang, $pointer, $string, $Unless} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <h2 className="accordion-heading accordion-nav-clear-holder">
        <button
            type="button"
            className={`accordion-navigation toggleLink${$Unless({test: $pointer("start_collapsed"), $then: () => " is-open"})}`}
            data-collapsible={`#facetedSearch-content--${$dashcase($pointer("facet"))}`}
            aria-label={$lang($string("search.faceted.toggleSection"), {title: $pointer("title")})}
        >
            <span className="accordion-title">{$pointer("title")}</span>{" "}

            <span>
                <svg className="icon accordion-indicator toggleLink-text toggleLink-text--off">
                    <use href="#icon-add" />
                </svg>{" "}
                <svg className="icon accordion-indicator toggleLink-text toggleLink-text--on">
                    <use href="#icon-remove" />
                </svg>
            </span>
        </button>
        <$If
            test={$pointer("selected")}
            $then={() => (
                <a href={$pointer("remove_url")} className="facetedSearch-clearLink" data-faceted-search-facet={""}>
                    <$Lang keyName={$string("search.faceted.clear")} />
                </a>
            )}
        />
    </h2>
);
