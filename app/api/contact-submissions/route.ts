import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { prismaErrorMessage } from "@/lib/prisma-error";
import { contactSubmissionSchema } from "@/lib/validations/contact";

export async function GET() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error("GET /api/contact-submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact submissions" },
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

    const parsed = contactSubmissionSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: z.flattenError(parsed.error),
        },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: parsed.data,
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact-submissions:", error);
    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "Failed to save contact submission",
        ...(isDev && { details: prismaErrorMessage(error) }),
      },
      { status: 500 }
    );
  }
}
