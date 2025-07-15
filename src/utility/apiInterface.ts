import { InewFactor } from "./interface";

export interface AI_FactorView {
  factor_infos: {
    company_id: number;
    customer_id: number;
    factor_number: string | null;
    factor_items: [
      {
        name: string;
        quantity: number;
        unitPrice: number;
        discount: number | null;
      },
    ];
    tax: string;
    factor_date: string;
    user_id: number;
    factor_id: number;
    factor_customer_name: string;
  };
  customer_infos: {
    user_id: number;
    company_id: number;
    customer_id: number;
    first_name: string;
    phone_number: string | null;
    fax_number: string | null;
    address: string | null;
    city: string | null;
    post_code: string | null;
    identification_number: string | null;
  };
  company_infos: {
    company_infos: {
      company_id: number;
      company_name: string;
      company_address: string | null;
      company_phone: string | null;
      company_fax: string | null;
      company_logo_path: string  | null;
      description: string | null;
      user_id: number;
      post_code: string | null;
      tax_percentage: number;
      shipment_price: number | null;
    };
    // company_shipment: [
    //   {
    //     company_id: number;
    //     shipping_provider_id: number;
    //     is_active: true;
    //     custom_name: string;
    //     default_price: number;
    //     additional_info: {};
    //     service_area: string;
    //     delivery_time: string;
    //     date_of_add: string;
    //   },
    // ];
  };
}

export interface AI_ShareToken {
  share_id: 2;
  factor_id: 13;
  company_id: 2;
  unique_token: "vlZV2R1VMpKcDChgpwdKIqM0YC_Q2DXz0kFVKMkC8f4";
  shareable_link: "https://phoneex.ir/f/ShareFactor/vlZV2R1VMpKcDChgpwdKIqM0YC_Q2DXz0kFVKMkC8f4";
  has_password: false;
  expires_at: null;
  is_active: true;
  created_at: "2025-07-14T15:42:49.547106+03:30";
}
export interface AI_Factor {
  company_id: number;
  customer_id: number;
  factor_number: number | null;
  factor_final_price: number | null;
  factor_is_paid: boolean | null;
  factor_items: {
    name: string | null;
    quantity: number | null;
    unitPrice: number | null;
    discount: number | null;
  }[];
  tax: string | null;
  tax_is_percent: boolean | null;
  discount: string | null;
  discount_is_percent: boolean | null;
  factor_date: string | null;
  user_id: number | null;
  factor_id: number;
  factor_customer_name: string | null;
}

export interface AI_customer {
  customer_id?: number;
  company_id?: number;
  first_name?: string;
  gender?: string;
  phone_number?: string;
  fax_number?: string;
  address?: string;
  city?: string;
  post_code?: string;
  identification_number?: string;
  date_of_submit?: string;
}

interface AI_NewFactor {
  customer_info: {
    company_id?: number;
    first_name?: string;
    last_name?: string;
    gender?: string;
    phone_number?: string;
    fax_number?: string;
    address?: string;
    city?: string;
    post_code?: string;
    identification_number?: string;
    individual_or_legalentity?: string;
    National_Company_ID?: string;
    Company_Registration_Number?: string;
    Economic_Code?: string;
    is_visible?: boolean;
    is_active?: boolean;
  };
  factor_info: {
    company_id?: number;
    customer_id?: number;
    factor_number?: string;
    factor_final_price?: number;
    factor_is_paid?: boolean;
    factor_items?: any[];
    tax?: number;
    tax_is_percent?: boolean;
    discount?: number;
    discount_is_percent?: boolean;
    factor_date?: string;
  };
}

export const convertToDTO = (old: InewFactor): AI_NewFactor => ({
  customer_info: {
    company_id: parseInt(old.companyId),
    first_name: old.recieverName,
    phone_number: old.recieverPhone,
    fax_number: old.recieverFax,
    address: old.recieverAddress,
    post_code: old.recieverPostalCode,
    identification_number: old.recieverNatinalID,
  },
  factor_info: {
    company_id: parseInt(old.companyId),
    factor_number: old.factorNumber,
    factor_items: old.products,
    tax: parseInt(old.taxRate),
    tax_is_percent: true,
    factor_date: old.date,
  },
});
