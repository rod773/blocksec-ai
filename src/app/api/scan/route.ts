import { NextResponse } from "next/server"
import { initDatabase, saveScan, getRecentScans } from "@/lib/db"

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string"
}

function isIntegerLike(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value)
}

export async function POST(request: Request) {
  try {
    await initDatabase()

    const body = await request.json()

    const addressOk = isNonEmptyString(body?.address)
    const nameOk = isNullableString(body?.name)
    const symbolOk = isNullableString(body?.symbol)
    const resultsOk = Array.isArray(body?.results)
    const passedOk = isIntegerLike(body?.passed) && body.passed >= 0
    const totalOk = isIntegerLike(body?.total) && body.total >= 0

    if (!addressOk || !nameOk || !symbolOk || !resultsOk || !passedOk || !totalOk) {
      console.error("Invalid /api/scan payload:", {
        addressOk,
        nameOk,
        symbolOk,
        resultsOk,
        passedOk,
        totalOk,
      })
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    const scan = await saveScan({
      address: body.address,
      name: body.name ?? null,
      symbol: body.symbol ?? null,
      results: body.results,
      passed: body.passed,
      total: body.total,
    })

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
    console.log("GET /api/scan")

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
