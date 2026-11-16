"use server";
import CategorySortBox from "../category/sort-box.tsx";
import type {PartialProps} from "@mainlanddev/hbx-bigcommerce";
import {$pointer} from "@mainlanddev/hbx-bigcommerce";

export default (_props: PartialProps) => (
    <form className="actionBar" method="get" data-sort-by="product">
        <CategorySortBox sort={$pointer("sort")} />
    </form>
);
