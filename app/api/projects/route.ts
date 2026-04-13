import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { prismaErrorMessage } from "@/lib/prisma-error";
import {
  getPrimaryProjectImage,
  parseProjectImages,
  serializeProjectImages,
} from "@/lib/project-images";
import { projectBodySchema } from "@/lib/validations/cms";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(
      projects.map((project) => ({
        ...project,
        image: getPrimaryProjectImage(project.image),
        images: parseProjectImages(project.image),
      })),
    );
  } catch (error) {
    console.error("GET /api/projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
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

    const parsed = projectBodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: z.flattenError(parsed.error),
        },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        image: serializeProjectImages(parsed.data.images),
        technologies: parsed.data.technologies,
        githubUrl: parsed.data.githubUrl,
        liveUrl: parsed.data.liveUrl,
      },
    });
    return NextResponse.json({
      ...project,
      image: getPrimaryProjectImage(project.image),
      images: parseProjectImages(project.image),
    });
  } catch (error) {
    console.error("POST /api/projects:", error);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Failed to create project",
        ...(isDev && { details: prismaErrorMessage(error) }),
      },
      { status: 500 }
    );
  }
}
