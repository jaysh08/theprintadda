import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Fetch single custom design
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const design = await prisma.customDesign.findUnique({
      where: { id },
    });

    if (!design) {
      return NextResponse.json({ error: "Design not found" }, { status: 404 });
    }

    return NextResponse.json(design);
  } catch (error) {
    console.error("Error fetching custom design:", error);
    return NextResponse.json({ error: "Failed to fetch design" }, { status: 500 });
  }
}

// PATCH - Update custom design status
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const design = await prisma.customDesign.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(design);
  } catch (error) {
    console.error("Error updating custom design:", error);
    return NextResponse.json({ error: "Failed to update design" }, { status: 500 });
  }
}

// DELETE - Delete custom design
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.customDesign.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting custom design:", error);
    return NextResponse.json({ error: "Failed to delete design" }, { status: 500 });
  }
}