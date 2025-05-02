import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || "" });

export async function POST(req: NextRequest) {
  try {
    const preference = new Preference(client);
    const body = await req.json();

    const result = await preference.create({
      body: {
        items: [
          {
            id: body.id,
            title: body.title,
            quantity: body.quantity,
            currency_id: "ARS",
            unit_price: body.price,
          },
        ],
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (error) {
    console.error("MercadoPago error:", error);
    return NextResponse.json({ error: "Failed to create preference" }, { status: 500 });
  }
}
