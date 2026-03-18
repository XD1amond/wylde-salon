import { findService, findStylist } from "@/lib/salon-data";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { timeslots } from "@/lib/booking-constants";

export type BookingInput = {
  clientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  serviceId: string;
  stylistId: string;
  notes?: string;
};

export type Booking = BookingInput & {
  id: string;
  createdAt: string;
  status: "confirmed";
};

const dataFilePath = process.env.WYLDE_BOOKINGS_FILE
  ? path.resolve(process.env.WYLDE_BOOKINGS_FILE)
  : process.env.VERCEL
    ? "/tmp/wylde-bookings.json"
    : path.join(process.cwd(), "data", "wylde-bookings.json");

let writeChain = Promise.resolve();

function isValidDate(dateValue: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateValue);
}

function isValidTime(timeValue: string) {
  return /^\d{2}:\d{2}$/.test(timeValue) && timeslots.includes(timeValue);
}

async function ensureStoreFile() {
  await mkdir(path.dirname(dataFilePath), { recursive: true });
  try {
    await readFile(dataFilePath, "utf8");
  } catch {
    await writeFile(dataFilePath, "[]", "utf8");
  }
}

async function readBookings() {
  await ensureStoreFile();
  const raw = await readFile(dataFilePath, "utf8");
  const parsed = JSON.parse(raw) as Booking[];
  return Array.isArray(parsed) ? parsed : [];
}

async function writeBookings(bookings: Booking[]) {
  await ensureStoreFile();
  await writeFile(dataFilePath, JSON.stringify(bookings, null, 2), "utf8");
}

export async function listBookings(filter?: { date?: string; stylistId?: string }) {
  const bookings = await readBookings();
  return bookings.filter((booking) => {
    if (filter?.date && booking.date !== filter.date) {
      return false;
    }
    if (filter?.stylistId && booking.stylistId !== filter.stylistId) {
      return false;
    }
    return true;
  });
}

export function validateBookingInput(input: BookingInput, existingBookings: Booking[]) {
  const errors: string[] = [];

  if (input.clientName.trim().length < 2) {
    errors.push("Client name is required.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push("A valid email is required.");
  }
  if (input.phone.replace(/[^\d]/g, "").length < 10) {
    errors.push("A valid phone number is required.");
  }
  if (!isValidDate(input.date)) {
    errors.push("Date format must be YYYY-MM-DD.");
  }
  if (!isValidTime(input.time)) {
    errors.push("Time is invalid.");
  }
  if (!findService(input.serviceId)) {
    errors.push("Selected service does not exist.");
  }
  if (!findStylist(input.stylistId)) {
    errors.push("Selected stylist does not exist.");
  }

  const appointmentDateTime = new Date(`${input.date}T${input.time}:00`);
  if (Number.isNaN(appointmentDateTime.getTime())) {
    errors.push("Appointment date/time is invalid.");
  } else if (appointmentDateTime.getTime() <= Date.now()) {
    errors.push("Appointment must be in the future.");
  }

  if (
    existingBookings.some(
      (booking) =>
        booking.date === input.date &&
        booking.time === input.time &&
        booking.stylistId === input.stylistId,
    )
  ) {
    errors.push("That timeslot is already booked with this stylist.");
  }

  return errors;
}

export async function createBooking(input: BookingInput) {
  const task = async () => {
    const bookings = await readBookings();
    const validationErrors = validateBookingInput(input, bookings);
    if (validationErrors.length > 0) {
      return { booking: null, errors: validationErrors };
    }

    const booking: Booking = {
      ...input,
      id: `WY-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };
    bookings.push(booking);
    await writeBookings(bookings);

    return { booking, errors: [] as string[] };
  };

  const result = writeChain.then(task, task);
  writeChain = result.then(
    () => undefined,
    () => undefined,
  );

  return result;
}

export async function resetBookingsForTests() {
  await writeBookings([]);
}
