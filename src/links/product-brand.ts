import BrandModule from "../modules/brand";
import ProductModule from "@medusajs/medusa/product";
import { defineLink } from "@medusajs/framework/utils";

// after npx medusa db:migrate or npx medusa db:sync-links
// will create a table named like ${module1}_${module1_model1}_${module2}_${module2_model1}
export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  BrandModule.linkable.brand
);
