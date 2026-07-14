import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { store } from "@/lib/store";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const authPayload = await authenticateRequest(request);
  if (!authPayload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const item = store.items.find((entry) => entry.id === id && entry.ownerId === authPayload.userId);

  if (!item) {
    return NextResponse.json({ message: "Item tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ item });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const authPayload = await authenticateRequest(request);
  if (!authPayload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);

  const item = store.items.find((entry) => entry.id === id && entry.ownerId === authPayload.userId);
  if (!item) {
    return NextResponse.json({ message: "Item tidak ditemukan" }, { status: 404 });
  }

  if (!body?.title) {
    return NextResponse.json({ message: "Title wajib diisi" }, { status: 400 });
  }

  item.title = String(body.title);
  item.description = String(body.description ?? "");
  item.updatedAt = new Date().toISOString();

  return NextResponse.json({ message: "Item berhasil diupdate", item });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const authPayload = await authenticateRequest(request);
  if (!authPayload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const itemIndex = store.items.findIndex(
    (entry) => entry.id === id && entry.ownerId === authPayload.userId,
  );

  if (itemIndex < 0) {
    return NextResponse.json({ message: "Item tidak ditemukan" }, { status: 404 });
  }

  const [deleted] = store.items.splice(itemIndex, 1);
  return NextResponse.json({ message: "Item berhasil dihapus", item: deleted });
}
