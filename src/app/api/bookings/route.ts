import { createBooking, listBookings } from "@/lib/booking-store";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date") ?? undefined;
  const stylistId = url.searchParams.get("stylistId") ?? undefined;
  const bookings = await listBookings({ date, stylistId });

  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const result = await createBooking(payload);

  if (!result.booking) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true, booking: result.booking });
}
