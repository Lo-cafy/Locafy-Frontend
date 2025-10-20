export const addressTypes = [
  { v: "home", l: "Home" },
  { v: "work", l: "Work" },
  { v: "billing", l: "Billing" },
  { v: "shipping", l: "Shipping" },
  { v: "service", l: "Service" },
  { v: "temporary", l: "Temporary" }
];

export const initialDataState = {
  addressType: "home",
  addressTitle: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  postalCode: "",
  isPrimary: true,
};
