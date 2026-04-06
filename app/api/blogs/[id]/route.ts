import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { prismaErrorMessage } from "@/lib/prisma-error";
import { blogBodySchema } from "@/lib/validations/cms";

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

    const { id } = await params;
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        description: parsed.data.description,
        content: parsed.data.content,
        author: parsed.data.author,
        tags: parsed.data.tags,
        image: parsed.data.image,
        ...(parsed.data.publishedAt !== undefined && {
          publishedAt: parsed.data.publishedAt,
        }),
      },
    });
    return NextResponse.json(blog);
  } catch (error) {
    console.error("PUT /api/blogs/[id]:", error);
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
        error: "Failed to update blog",
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
    await prisma.blog.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/blogs/[id]:", error);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Failed to delete blog",
        ...(isDev && { details: prismaErrorMessage(error) }),
      },
      { status: 500 }
    );
  }
}
