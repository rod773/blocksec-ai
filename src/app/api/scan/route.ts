import { NextResponse } from "next/server"
import { initDatabase, saveScan, getRecentScans } from "@/lib/db"

export async function POST(request: Request) {
  try {
    await initDatabase()
    const body = await request.json()
    const scan = await saveScan(body)
    return NextResponse.json(scan)
  } catch (error) {
    console.error("Failed to save scan:", error)
    return NextResponse.json(
      { error: "Failed to save scan" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await initDatabase()
    const scans = await getRecentScans()
    return NextResponse.json(scans)
  } catch (error) {
    console.error("Failed to fetch scans:", error)
    return NextResponse.json(
      { error: "Failed to fetch scans" },
      { status: 500 }
    )
  }
}
