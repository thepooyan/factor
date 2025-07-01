import { InewFactor } from "./interface";

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
    tax: parseInt(old.taxRate) ,
    tax_is_percent: true,
    factor_date: old.date,
  }
})
