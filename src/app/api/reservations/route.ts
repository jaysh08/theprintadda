import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all reservations
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}

// POST - Create a new reservation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, productName, price, size, customerName, customerPhone, customDesign } = body;

    if (!productId || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: "Product, name, and phone are required" },
        { status: 400 }
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        productId,
        productName: productName || "Unknown Product",
        price: price || 0,
        size: size || "M",
        customerName,
        customerPhone,
        customDesign: customDesign || null,
        status: "pending",
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}