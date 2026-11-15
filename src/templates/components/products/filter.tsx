import {$partial, $pointer, place} from "@mainlanddev/hbx-bigcommerce";

export default () => (
    <form className="actionBar" method="get" data-sort-by="product">
        {place($partial("components/category/sort-box", {sort: $pointer("sort")}))}
    </form>
);
