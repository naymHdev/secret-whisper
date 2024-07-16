import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
  } catch (error) {
    console.error("Error verifying user");
    return Response.json(
      {
        success: false,
        message: "error verifying user",
      },
      { status: 500 }
    );
  }
}
