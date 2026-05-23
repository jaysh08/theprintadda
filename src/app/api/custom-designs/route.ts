import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all custom design requests
export async function GET() {
  try {
    const designs = await prisma.customDesign.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(designs);
  } catch (error) {
    console.error("Error fetching custom designs:", error);
    return NextResponse.json(
      { error: "Failed to fetch designs" },
      { status: 500 }
    );
  }
}

// POST - Create a new custom design request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message, designName, designPosition, designScale } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const design = await prisma.customDesign.create({
      data: {
        name,
        phone,
        email: email || null,
        message: message || null,
        designName: designName || "Unnamed Design",
        designPosition: designPosition || null,
        designScale: designScale || null,
        image: "",
        status: "pending",
      },
    });

    return NextResponse.json(design, { status: 201 });
  } catch (error) {
    console.error("Error creating custom design:", error);
    return NextResponse.json(
      { error: "Failed to create design request" },
      { status: 500 }
    );
  }
}