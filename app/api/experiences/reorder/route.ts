import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { prismaErrorMessage } from "@/lib/prisma-error";

const reorderExperiencesSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, "At least one experience is required"),
});

export async function POST(request: Request) {
  try {
    let json: unknown;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = reorderExperiencesSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: z.flattenError(parsed.error),
        },
        { status: 400 },
      );
    }

    const existingExperiences = await prisma.experience.findMany({
      select: { id: true },
    });

    const existingIds = new Set(existingExperiences.map((experience) => experience.id));
    const submittedIds = new Set(parsed.data.ids);
    const hasSameMembers =
      existingExperiences.length === parsed.data.ids.length &&
      existingIds.size === submittedIds.size &&
      parsed.data.ids.every((id) => existingIds.has(id));

    if (!hasSameMembers) {
      return NextResponse.json(
        { error: "Submitted experience order is out of sync" },
        { status: 400 },
      );
    }

    await prisma.$transaction(
      parsed.data.ids.map((id, index) =>
        prisma.experience.update({
          where: { id },
          data: { sortOrder: index },
        }),
      ),
    );

    return NextResponse.json({ message: "Experience order updated successfully" });
  } catch (error) {
    console.error("POST /api/experiences/reorder:", error);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Failed to update experience order",
        ...(isDev && { details: prismaErrorMessage(error) }),
      },
      { status: 500 },
    );
  }
}
