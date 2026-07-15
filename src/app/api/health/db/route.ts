import { NextResponse } from "next/server";
import { Pool } from "pg";

let pool: Pool | undefined;

function getPool() {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}

export async function GET() {
  try {
    const result = await getPool().query("SELECT now() AS server_time");
    return NextResponse.json({
      status: "ok",
      db: "connected",
      serverTime: result.rows[0].server_time,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", db: "disconnected", message: (error as Error).message },
      { status: 503 }
    );
  }
}
