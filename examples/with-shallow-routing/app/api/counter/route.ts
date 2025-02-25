let serverCounter = 0;

export async function GET() {
  serverCounter++;
  return Response.json({ counter: serverCounter });
}
