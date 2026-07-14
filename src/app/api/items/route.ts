import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { store } from "@/lib/store";

export async function GET(request: NextRequest) {
  const authPayload = await authenticateRequest(request);
  if (!authPayload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const items = store.items.filter((item) => item.ownerId === authPayload.userId);
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const authPayload = await authenticateRequest(request);
  if (!authPayload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.title) {
    return NextResponse.json({ message: "Title wajib diisi" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const item = {
    id: crypto.randomUUID(),
    title: String(body.title),
    description: String(body.description ?? ""),
    ownerId: authPayload.userId,
    createdAt: now,
    updatedAt: now,
  };

  store.items.push(item);
  return NextResponse.json({ message: "Item berhasil dibuat", item }, { status: 201 });
}
