import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
    apiVersion: "2024-11-20.acacia" as any,
    typescript: true,
});

export const PLAN_PRICES = {
    PREMIUM_PKR: 1499,
    PREMIUM_STRIPE_PRICE_ID: process.env.STRIPE_PRICE_PREMIUM || "",
};
