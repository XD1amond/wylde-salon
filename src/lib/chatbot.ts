import { Booking, BookingInput, createBooking } from "@/lib/booking-store";
import { findService, findStylist, services, stylists } from "@/lib/salon-data";

export type ChatDraft = Partial<BookingInput>;

export type ChatResult = {
  message: string;
  draft: ChatDraft;
  booking: Booking | null;
};

function normalize(input: string) {
  return input.trim().toLowerCase();
}

function parseTime(raw: string) {
  const match = raw.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i);
  if (!match) {
    return null;
  }

  let hour = Number(match[1]);
  const minute = Number(match[2] ?? "00");
  const suffix = match[3]?.toLowerCase();

  if (suffix === "pm" && hour < 12) {
    hour += 12;
  }
  if (suffix === "am" && hour === 12) {
    hour = 0;
  }
  if (hour > 23 || minute > 59) {
    return null;
  }

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function parseDate(raw: string) {
  const isoDate = raw.match(/\b(20\d{2}-\d{2}-\d{2})\b/);
  if (isoDate) {
    return isoDate[1];
  }

  const usDate = raw.match(/\b(\d{1,2})\/(\d{1,2})\/(20\d{2})\b/);
  if (!usDate) {
    return null;
  }

  const month = String(usDate[1]).padStart(2, "0");
  const day = String(usDate[2]).padStart(2, "0");
  return `${usDate[3]}-${month}-${day}`;
}

function detectService(raw: string) {
  const lower = normalize(raw);
  return services.find((service) => lower.includes(service.name.toLowerCase()));
}

function detectStylist(raw: string) {
  const lower = normalize(raw);
  return stylists.find((stylist) => {
    const tokens = stylist.name.toLowerCase().split(" ");
    return tokens.some((token) => token.length > 2 && lower.includes(token));
  });
}

function recommendStylists(raw: string) {
  const lower = normalize(raw);

  if (lower.includes("extension")) {
    return "For extensions, Selah, Savanah, Emily, or Kaylee are your best bets — all specialize in hand-tied and extension work.";
  }
  if (lower.includes("blonde") || lower.includes("balayage") || lower.includes("highlight")) {
    return "For blondes and balayage, Selah, Rylee, Allison, or Courtney are the strongest fits. Rylee is especially known for hand-painted balayage.";
  }
  if (lower.includes("brunette") || lower.includes("bronde") || lower.includes("dimensional")) {
    return "For dimensional brunettes and lived-in brunette color, Kenzie and Allison are ideal.";
  }
  if (lower.includes("cut") || lower.includes("shape") || lower.includes("haircut")) {
    return "Courtney and Allison are the go-to for precision cuts and shape work with decades of combined experience.";
  }
  if (lower.includes("wedding") || lower.includes("event") || lower.includes("updo") || lower.includes("occasion")) {
    return "For special occasion styling and up-dos, book with any of our stylists who offer event styling services.";
  }
  if (lower.includes("frizz") || lower.includes("smooth") || lower.includes("damage") || lower.includes("keratin")) {
    return "For frizz control and smoothing, ask about our Brazilian Blow Out ($250) — any stylist can help guide you.";
  }
  if (lower.includes("scalp") || lower.includes("treatment") || lower.includes("health")) {
    return "For scalp health and conditioning treatments, our Scalp Facial ($130) or Conditioning Treatment ($70) are excellent options.";
  }
  if (lower.includes("blowout") || lower.includes("style")) {
    return "For blowouts, Paige, Ellie, Emi, and our membership tiers are all great options. Try the 'You Deserve This' membership at $50/month!";
  }
  if (lower.includes("color correction")) {
    return "Color corrections should be booked with Courtney or Allison — both have decades of experience with complex color work.";
  }

  return "Tell me your goal (color, cut, extensions, blowout, event style) and I will match the right stylist for you.";
}

function getContactDraft(raw: string) {
  const email = raw.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)?.[0];
  const phone = raw.match(/(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/)?.[0];
  const name = raw.match(/(?:my name is|i am|i'm)\s+([a-z][a-z\s'-]{1,40})/i)?.[1]?.trim();
  return { email, phone, name };
}

async function processWithOpenAI(message: string, currentDraft: ChatDraft) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are Wylde Salon's booking concierge. Return strict JSON with keys: message (string), draft (object), shouldBook (boolean). Do not include markdown.",
        },
        {
          role: "user",
          content: `Current draft: ${JSON.stringify(currentDraft)}. User message: ${message}`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "wylde_chat",
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
              draft: { type: "object", additionalProperties: true },
              shouldBook: { type: "boolean" },
            },
            required: ["message", "draft", "shouldBook"],
            additionalProperties: false,
          },
        },
      },
    }),
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  const outputText = payload?.output_text;
  if (typeof outputText !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(outputText);
    return parsed as { message: string; draft: ChatDraft; shouldBook: boolean };
  } catch {
    return null;
  }
}

export async function processChatMessage(message: string, currentDraft: ChatDraft = {}): Promise<ChatResult> {
  const nextDraft: ChatDraft = { ...currentDraft };
  const lower = normalize(message);

  const service = detectService(message);
  if (service) {
    nextDraft.serviceId = service.id;
  }

  const stylist = detectStylist(message);
  if (stylist) {
    nextDraft.stylistId = stylist.id;
  }

  const parsedDate = parseDate(message);
  if (parsedDate) {
    nextDraft.date = parsedDate;
  }

  const parsedTime = parseTime(message);
  if (parsedTime) {
    nextDraft.time = parsedTime;
  }

  const contact = getContactDraft(message);
  if (contact.email) {
    nextDraft.email = contact.email;
  }
  if (contact.phone) {
    nextDraft.phone = contact.phone;
  }
  if (contact.name) {
    nextDraft.clientName = contact.name.replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  const aiResponse = await processWithOpenAI(message, nextDraft);
  if (aiResponse) {
    const aiDraft = { ...nextDraft, ...aiResponse.draft };
    if (!aiResponse.shouldBook) {
      return {
        message: aiResponse.message,
        draft: aiDraft,
        booking: null,
      };
    }

    const requiredFields: Array<keyof BookingInput> = [
      "clientName",
      "email",
      "phone",
      "serviceId",
      "stylistId",
      "date",
      "time",
    ];
    const missing = requiredFields.filter((field) => !aiDraft[field]);

    if (missing.length > 0) {
      return {
        message: `${aiResponse.message} Missing details: ${missing.join(", ")}.`,
        draft: aiDraft,
        booking: null,
      };
    }

    const created = await createBooking(aiDraft as BookingInput);
    if (!created.booking) {
      return {
        message: `I could not complete that booking: ${created.errors.join(" ")}`,
        draft: aiDraft,
        booking: null,
      };
    }

    return {
      message: `${aiResponse.message} Confirmation ${created.booking.id}.`,
      draft: aiDraft,
      booking: created.booking,
    };
  }

  if (lower.includes("recommend") || lower.includes("which stylist") || lower.includes("who should")) {
    return {
      message: recommendStylists(message),
      draft: nextDraft,
      booking: null,
    };
  }

  const isBookingIntent =
    lower.includes("book") || lower.includes("confirm") || lower.includes("schedule");

  if (isBookingIntent) {
    const requiredFields: Array<keyof BookingInput> = [
      "clientName",
      "email",
      "phone",
      "serviceId",
      "stylistId",
      "date",
      "time",
    ];
    const missing = requiredFields.filter((field) => !nextDraft[field]);

    if (missing.length > 0) {
      return {
        message: `I can book this now. Missing details: ${missing.join(", ")}.`,
        draft: nextDraft,
        booking: null,
      };
    }

    const bookingInput = nextDraft as BookingInput;
    const created = await createBooking(bookingInput);
    if (!created.booking) {
      return {
        message: `I could not complete that booking: ${created.errors.join(" ")}`,
        draft: nextDraft,
        booking: null,
      };
    }

    const serviceName = findService(created.booking.serviceId)?.name ?? "service";
    const stylistName = findStylist(created.booking.stylistId)?.name ?? "stylist";

    return {
      message: `Booked. ${serviceName} with ${stylistName} on ${created.booking.date} at ${created.booking.time}. Confirmation ${created.booking.id}.`,
      draft: nextDraft,
      booking: created.booking,
    };
  }

  return {
    message:
      "I can recommend a stylist or book for you. Share service, stylist, date (YYYY-MM-DD), and time (e.g. 2pm).",
    draft: nextDraft,
    booking: null,
  };
}
