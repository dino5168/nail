import { buildLlmsTxt, textResponse } from "@/lib/llms";

// 靜態輸出：建置時產生 out/llms.txt（線上為 /nail/llms.txt）
export const dynamic = "force-static";

export async function GET() {
  return textResponse(await buildLlmsTxt());
}
