import resolveShopFromShopId from "@reactioncommerce/api-utils/graphql/resolveShopFromShopId.js";
import { encodeOrderFulfillmentGroupOpaqueId } from "../../xforms/id.js";
import xformOrderFulfillmentGroupSelectedOption from "../../xforms/xformOrderFulfillmentGroupSelectedOption.js";
import fulfillmentGroupDisplayStatus from "./fulfillmentGroupDisplayStatus.js";
import items from "./items.js";
import summary from "./summary.js";

export default {
  _id: (node) => encodeOrderFulfillmentGroupOpaqueId(node._id),
  data(node) {
    console.log("shipping",node.address);
    if (node.type === "shipping") {
      return { gqlType: "ShippingOrderFulfillmentGroupData", shippingAddress: node.address};
    }
    return null;
  },
  displayStatus: (node, { language }, context) => fulfillmentGroupDisplayStatus(context, node, language),
  items,
  selectedFulfillmentOption: (node) => xformOrderFulfillmentGroupSelectedOption(node.shipmentMethod, node),
  shop: resolveShopFromShopId,
  status: (node) => node.workflow.status,
  summary
};
