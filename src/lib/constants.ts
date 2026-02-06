export const GST_RATE = 0.18;
export const CURRENCY = "₹";

export const PAYU_URLS = {
	TEST: "https://test.payu.in/_payment",
	PROD: "https://secure.payu.in/_payment",
};

// Determine if running in production based on flag
const IS_PRODUCTION = import.meta.env.VITE_IS_PRODUCTION === "1";

// Select appropriate PayU merchant key based on environment
export const PAYU_MERCHANT_KEY = IS_PRODUCTION
	? import.meta.env.VITE_PAYU_KEY_PROD || ""
	: import.meta.env.VITE_PAYU_KEY_TEST || "";

// Select appropriate PayU URL based on environment
export const PAYU_URL = IS_PRODUCTION ? PAYU_URLS.PROD : PAYU_URLS.TEST;
