import { beforeEach, describe, expect, it } from "vitest";
import { createBooking, resetBookingsForTests } from "./booking-store";
import { processChatMessage } from "./chatbot";

describe("booking store", () => {
  beforeEach(async () => {
    await resetBookingsForTests();
  });

  it("creates a booking for valid input", async () => {
    const result = await createBooking({
      clientName: "Taylor Stone",
      email: "taylor@example.com",
      phone: "602-555-9801",
      date: "2099-12-20",
      time: "14:00",
      serviceId: "balayage",
      stylistId: "alexis",
      notes: "",
    });

    expect(result.booking).toBeTruthy();
    expect(result.errors).toEqual([]);
  });

  it("blocks duplicate stylist slots", async () => {
    await createBooking({
      clientName: "Jordan Vale",
      email: "jordan@example.com",
      phone: "623-555-1212",
      date: "2099-12-21",
      time: "13:00",
      serviceId: "signature-haircut",
      stylistId: "niko",
      notes: "",
    });

    const duplicate = await createBooking({
      clientName: "Second Client",
      email: "second@example.com",
      phone: "480-555-2211",
      date: "2099-12-21",
      time: "13:00",
      serviceId: "signature-haircut",
      stylistId: "niko",
      notes: "",
    });

    expect(duplicate.booking).toBeNull();
    expect(duplicate.errors.join(" ")).toContain("already booked");
  });
});

describe("chatbot", () => {
  beforeEach(async () => {
    await resetBookingsForTests();
  });

  it("recommends stylists by goal", async () => {
    const response = await processChatMessage("Which stylist do you recommend for balayage and blonde?");
    expect(response.message.toLowerCase()).toContain("alexis");
  });

  it("books when all details are present", async () => {
    const response = await processChatMessage(
      "Book appointment. My name is Jamie Roe, email jamie@example.com, phone 602-555-9900, balayage with Alexis on 2099-12-22 at 2pm",
    );
    expect(response.booking).toBeTruthy();
    expect(response.message.toLowerCase()).toContain("confirmation");
  });
});
