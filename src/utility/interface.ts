export interface InewFactor {
  date: string
  companyId: string;
  factorNumber: string;
  transferNumber: string;
  taxRate: string;

  recieverName: string,
  recieverNatinalID: string,
  recieverPostalCode: string,
  recieverAddress: string,
  recieverPhone: string,
  recieverFax: string,

  products: { name: string; quantity: number; unitPrice: number; discount: number }[]
}

export interface InewFactorNumber {
  company_id: number;
  factor_new_number: string;
  first_factor: boolean;
}

export interface Itoken {
  refresh_token: string;
  access_token: string;
}

export interface Iuser {
  user: {
    email: string;
    is_active: boolean;
    user_id: number;
  };
  token: Itoken;
}

export interface Icustomer {
  user_id: number;
  company_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  fax_number: string;
  address: string;
  city: string;
  post_code: string;
  identification_number: string;
  company_registration_number: string;
  customer_id: number;
  date_of_submit: string;
}

export interface Iprofile {
  email: string;
  first_name: string | null;
  is_active: boolean;
  last_name: string | null;
  phone_number: string | null;
  registration_date: string;
  role: string;
  user_id: number;
}

export interface ICompany {
  company_id: number;
  user_id: number;
  company_name: string;
  company_address: string;
  company_phone: string;
  company_fax: string;
  company_logo_name: string;
  description: string;
}
