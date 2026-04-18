import { site } from "@/lib/site";

const FORM_BASE = `https://docs.google.com/forms${site.contact.googleFormPath}`;

function validEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const honeypot = typeof b._company === "string" ? b._company : "";
  if (honeypot.trim().length > 0) {
    return Response.json({ ok: true });
  }

  const email = typeof b.email === "string" ? b.email.trim() : "";
  const mobile = typeof b.mobile === "string" ? b.mobile.trim() : "";
  const applicationType = typeof b.applicationType === "string" ? b.applicationType : "";
  const applicationOther =
    typeof b.applicationOther === "string" ? b.applicationOther.trim() : "";
  const description = typeof b.description === "string" ? b.description.trim() : "";
  const timeline = typeof b.timeline === "string" ? b.timeline : "";
  const budget = typeof b.budget === "string" ? b.budget.trim() : "";

  if (!validEmail(email)) {
    return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  if (!mobile) {
    return Response.json({ ok: false, error: "Mobile number is required." }, { status: 400 });
  }
  if (!description) {
    return Response.json({ ok: false, error: "Project description is required." }, { status: 400 });
  }
  if (!timeline) {
    return Response.json({ ok: false, error: "Timeline is required." }, { status: 400 });
  }
  if (!budget) {
    return Response.json({ ok: false, error: "Budget is required." }, { status: 400 });
  }

  const allowedApp = new Set(["Website", "Mobile App", "Other"]);
  if (!allowedApp.has(applicationType)) {
    return Response.json({ ok: false, error: "Invalid application type." }, { status: 400 });
  }
  if (applicationType === "Other" && !applicationOther) {
    return Response.json({ ok: false, error: "Please describe “Other”." }, { status: 400 });
  }

  const allowedTimeline = new Set(["1 Week", "2 Weeks", "1 Month", "More Than 1 Month"]);
  if (!allowedTimeline.has(timeline)) {
    return Response.json({ ok: false, error: "Invalid timeline." }, { status: 400 });
  }

  const entries = site.contact.googleFormEntries;

  let viewHtml: string;
  try {
    const vr = await fetch(`${FORM_BASE}/viewform`, { cache: "no-store" });
    viewHtml = await vr.text();
  } catch {
    return Response.json({ ok: false, error: "Could not reach Google Forms." }, { status: 502 });
  }

  const fbzx = viewHtml.match(/name="fbzx" value="([^"]+)"/)?.[1] ?? "";

  const params = new URLSearchParams();
  params.set("emailAddress", email);
  params.set(entries.mobile, mobile);
  if (applicationType === "Other") {
    params.set(entries.applicationType, "__other_option__");
    params.set(`${entries.applicationType}.other_option_response`, applicationOther);
  } else {
    params.set(entries.applicationType, applicationType);
  }
  params.set(entries.shortDescription, description);
  params.set(entries.timeline, timeline);
  params.set(entries.budget, budget);
  params.set("fvv", "1");
  params.set("pageHistory", "0");
  if (fbzx) params.set("fbzx", fbzx);

  let submitStatus: number;
  try {
    const sr = await fetch(`${FORM_BASE}/formResponse`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      redirect: "manual",
      cache: "no-store",
    });
    submitStatus = sr.status;
  } catch {
    return Response.json({ ok: false, error: "Submit failed." }, { status: 502 });
  }

  if (submitStatus !== 200 && submitStatus !== 204) {
    return Response.json({ ok: false, error: "Google Forms rejected the submission." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
