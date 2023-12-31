import { Request, Response } from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const configurePayment = (req: Request, res: Response) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
};

// TODO: Make sure the amount is correct here
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      // We will assume that this is EGP.
      currency: "eur",

      // We will asume that amount is initially in qoroosh
      // then converted to EGP by applying *100.
      amount: amount.toFixed(2) * 100,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};
