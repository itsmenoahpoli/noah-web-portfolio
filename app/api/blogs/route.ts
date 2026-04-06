import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { prismaErrorMessage } from "@/lib/prisma-error";
import { blogBodySchema } from "@/lib/validations/cms";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("GET /api/blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
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

    const parsed = blogBodySchema.safeParse(rest);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: z.flattenError(parsed.error),
        },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        description: parsed.data.description,
        content: parsed.data.content,
        author: parsed.data.author,
        tags: parsed.data.tags,
        image: parsed.data.image,
        publishedAt: parsed.data.publishedAt ?? new Date(),
      },
    });
    return NextResponse.json(blog);
  } catch (error) {
    console.error("POST /api/blogs:", error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A blog with this slug already exists" },
        { status: 409 }
      );
    }
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Failed to create blog",
        ...(isDev && { details: prismaErrorMessage(error) }),
      },
      { status: 500 }
    );
  }
}
