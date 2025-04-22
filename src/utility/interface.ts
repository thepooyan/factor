export interface Iuser {
  user: {
    email: string,
    is_active: boolean,
    user_id: number,
  },
  token: {
    access_token: string
  }
}

export interface Icustomer{
  "user_id": number,
  "company_id": number,
  "first_name": string,
  "last_name": string,
  "phone_number": string,
  "fax_number": string,
  "address": string,
  "city": string,
  "post_code": string,
  "identification_number": string,
  "company_registration_number": string,
  "customer_id": number,
  "date_of_submit": string
}
