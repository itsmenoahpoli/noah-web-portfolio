import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { prismaErrorMessage } from "@/lib/prisma-error";
import { experienceBodySchema } from "@/lib/validations/cms";

function normalizeExperience<T extends { endDate: string | null }>(experience: T): T {
  return {
    ...experience,
    endDate: experience.endDate?.trim() ? experience.endDate : null,
  };
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    let json: unknown;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = experienceBodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: z.flattenError(parsed.error),
        },
        { status: 400 }
      );
    }

    const { id } = await params;
    const experience = await prisma.experience.update({
      where: { id },
      data: {
        company: parsed.data.company,
        companyLogo: parsed.data.companyLogo,
        categories: parsed.data.categories,
        position: parsed.data.position,
        location: parsed.data.location,
        startDate: parsed.data.startDate,
        endDate: parsed.data.endDate,
        description: parsed.data.description,
      },
    });
    return NextResponse.json(normalizeExperience(experience));
  } catch (error) {
    console.error("PUT /api/experiences/[id]:", error);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Failed to update experience",
        ...(isDev && { details: prismaErrorMessage(error) }),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.experience.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/experiences/[id]:", error);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Failed to delete experience",
        ...(isDev && { details: prismaErrorMessage(error) }),
      },
      { status: 500 }
    );
  }
}
