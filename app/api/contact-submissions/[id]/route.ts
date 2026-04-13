import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { prismaErrorMessage } from "@/lib/prisma-error";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.contactSubmission.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Contact submission deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/contact-submissions/[id]:", error);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Failed to delete contact submission",
        ...(isDev && { details: prismaErrorMessage(error) }),
      },
      { status: 500 }
    );
  }
}
