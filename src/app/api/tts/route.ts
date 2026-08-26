import { NextRequest, NextResponse } from "next/server";
import { EdgeTTS } from "edge-tts-universal";

// Simple in-memory audio cache for high-speed instant playback
const audioCache = new Map<string, { buffer: Buffer; contentType: string }>();

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") || "";
    const voiceParam = searchParams.get("voice") || "child";

    if (!text.trim()) {
      return NextResponse.json({ error: "Missing text parameter" }, { status: 400 });
    }

    // Map friendly voice personas to Microsoft Neural voices
    let voiceName = "en-US-AnaNeural"; // Default cheerful child companion
    if (voiceParam === "educator" || voiceParam === "jenny") {
      voiceName = "en-US-JennyNeural";
    } else if (voiceParam === "adventurer" || voiceParam === "guy") {
      voiceName = "en-US-GuyNeural";
    } else if (voiceParam === "aria") {
      voiceName = "en-US-AriaNeural";
    }

    const cleanText = text.slice(0, 500); // Safety limit
    const cacheKey = `${voiceName}:${cleanText}`;

    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      return new NextResponse(new Uint8Array(cached.buffer), {
        status: 200,
        headers: {
          "Content-Type": cached.contentType,
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      });
    }

    // Synthesize using high-definition neural engine
    const tts = new EdgeTTS(cleanText, voiceName, {
      rate: "+0%",
      pitch: "+0Hz",
      volume: "+0%"
    });

    const result = await tts.synthesize();
    const arrayBuf = await result.audio.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    // Cache the audio
    if (audioCache.size < 200) {
      audioCache.set(cacheKey, { buffer, contentType: "audio/mpeg" });
    }

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("TTS synthesis error:", error);
    return NextResponse.json(
      { error: "Failed to synthesize neural audio", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const text = body.text || "";
    const voiceParam = body.voice || "child";

    if (!text.trim()) {
      return NextResponse.json({ error: "Missing text parameter" }, { status: 400 });
    }

    let voiceName = "en-US-AnaNeural";
    if (voiceParam === "educator" || voiceParam === "jenny") {
      voiceName = "en-US-JennyNeural";
    }

    const cleanText = text.slice(0, 500);
    const cacheKey = `${voiceName}:${cleanText}`;

    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      return new NextResponse(new Uint8Array(cached.buffer), {
        status: 200,
        headers: { "Content-Type": cached.contentType },
      });
    }

    const tts = new EdgeTTS(cleanText, voiceName, {
      rate: "+0%",
      pitch: "+0Hz",
      volume: "+0%"
    });

    const result = await tts.synthesize();
    const arrayBuf = await result.audio.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    if (audioCache.size < 200) {
      audioCache.set(cacheKey, { buffer, contentType: "audio/mpeg" });
    }

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (error) {
    console.error("TTS synthesis POST error:", error);
    return NextResponse.json(
      { error: "Failed to synthesize neural audio" },
      { status: 500 }
    );
  }
}
