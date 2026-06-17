import { NextResponse } from "next/server";

export async function POST(request) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("SLACK_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const slackPayload = {
    text: `New website enquiry from ${name.trim()}`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "New website enquiry", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name:*\n${name.trim()}` },
          { type: "mrkdwn", text: `*Email:*\n${email.trim()}` },
          { type: "mrkdwn", text: `*Phone:*\n${phone?.trim() || "Not provided"}` },
        ],
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Project details:*\n${message.trim()}` },
      },
    ],
  };

  try {
    const slackResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackPayload),
    });

    if (!slackResponse.ok) {
      console.error("Slack webhook failed:", slackResponse.status);
      return NextResponse.json(
        { error: "Failed to send enquiry. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Slack webhook error:", error);
    return NextResponse.json(
      { error: "Failed to send enquiry. Please try again." },
      { status: 502 }
    );
  }
}
