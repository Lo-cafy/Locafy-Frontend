// Address types and constants

export interface AddressData {
  addressType: string;
  addressTitle: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  postalCode: string;
  isPrimary?: boolean;
}

export const initialDataState: AddressData = {
  addressType: "home",
  addressTitle: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  postalCode: "",
  isPrimary: false,
};

export const addressTypes = [
  { v: "home", l: "Home" },
  { v: "work", l: "Work" },
  { v: "other", l: "Other" },
];
