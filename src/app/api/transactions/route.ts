import { NextResponse } from "next/server"
import { initDatabase, saveTransaction, getRecentTransactions } from "@/lib/db"

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string"
}

function isBigIntString(value: unknown): value is string {
  if (typeof value !== "string") return false
  // allow unsigned integer strings (no decimals)
  return /^[0-9]+$/.test(value) && value.length > 0
}

export async function POST(request: Request) {
  try {
    await initDatabase()

    const body = await request.json()

    const hashOk = isNonEmptyString(body?.hash)
    const blockNumberOk = isBigIntString(body?.blockNumber)
    const statusOk = isNonEmptyString(body?.status)
    const gasUsedOk = isNonEmptyString(body?.gasUsed)
    const fromOk = isNonEmptyString(body?.from)
    const toOk = isNullableString(body?.to)

    if (!hashOk || !blockNumberOk || !statusOk || !gasUsedOk || !fromOk || !toOk) {
      console.error("Invalid /api/transactions payload:", {
        hashOk,
        blockNumberOk,
        statusOk,
        gasUsedOk,
        fromOk,
        toOk,
      })
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    const tx = await saveTransaction({
      hash: body.hash,
      blockNumber: body.blockNumber,
      status: body.status,
      gasUsed: body.gasUsed,
      from: body.from,
      to: body.to ?? null,
    })

    return NextResponse.json(tx)
  } catch (error) {
    console.error("Failed to save transaction:", error)
    return NextResponse.json(
      { error: "Failed to save transaction" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await initDatabase()
    console.log("GET /api/transactions")

    const transactions = await getRecentTransactions()
    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Failed to fetch transactions:", error)
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    )
  }
}
