import { AI_FactorView } from "~/utility/apiInterface";

export const sampleData: AI_FactorView = {
  factor_infos: {
    company_id: 1,
    customer_id: 101,
    factor_number: "F-1403-001",
    factor_items: [
      {
        name: "خودکار آبی",
        quantity: 10,
        unitPrice: 5000,
        discount: 1000,
      },
    ],
    tax: "9%",
    factor_date: "1403/05/10",
    user_id: 12,
    factor_id: 550,
    factor_customer_name: "علی رضایی",
  },
  customer_infos: {
    user_id: 12,
    company_id: 1,
    customer_id: 101,
    first_name: "علی",
    phone_number: "09121234567",
    fax_number: null,
    address: "خیابان آزادی، پلاک ۱۲",
    city: "تهران",
    post_code: "1136937411",
    identification_number: "0083456219",
  },
  company_infos: {
    company_infos: {
      company_id: 1,
      company_name: "شرکت فن‌آوران داده‌پرداز",
      company_address: "تهران، خیابان شریعتی، پلاک ۱۵۰",
      company_phone: "02188445566",
      company_fax: null,
      company_logo_name: "fanavaran-logo.png",
      description: "تولیدکننده نرم‌افزارهای سازمانی",
      user_id: 12,
      post_code: "1587754411",
      tax_percentage: 9,
      shipment_price: 25000,
    },
  },
};
