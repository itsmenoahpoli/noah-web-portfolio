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

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ sortOrder: "asc" }, { startDate: "desc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(experiences.map(normalizeExperience));
  } catch (error) {
    console.error("GET /api/experiences:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    let json: unknown;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const raw =
      typeof json === "object" && json !== null
        ? (json as Record<string, unknown>)
        : {};
    const { id: _omitId, ...rest } = raw;

    const parsed = experienceBodySchema.safeParse(rest);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: z.flattenError(parsed.error),
        },
        { status: 400 }
      );
    }

    const lastExperience = await prisma.experience.findFirst({
      select: { sortOrder: true },
      orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
    });

    const experience = await prisma.experience.create({
      data: {
        company: parsed.data.company,
        companyLogo: parsed.data.companyLogo,
        sortOrder: (lastExperience?.sortOrder ?? -1) + 1,
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
    console.error("POST /api/experiences:", error);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Failed to create experience",
        ...(isDev && { details: prismaErrorMessage(error) }),
      },
      { status: 500 }
    );
  }
}
