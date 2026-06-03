import { NextResponse } from "next/server"
import { initDatabase, saveTransaction, getRecentTransactions } from "@/lib/db"

export async function POST(request: Request) {
  try {
    await initDatabase()
    const body = await request.json()
    const tx = await saveTransaction(body)
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
