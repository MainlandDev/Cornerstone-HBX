import {$partial, $pointer} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <form className="actionBar" method="get" data-sort-by="product">
        {$partial("components/category/sort-box", {sort: $pointer("sort")})}
    </form>
);
