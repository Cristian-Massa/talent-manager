import { ConfirmRegisterForm } from "@/app/components/form/Form";

export default async function ConfirmRegistration({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1>A mail has been sended to your inbox</h1>
      <p>please copy the code sended an introduce it in the input</p>
      <ConfirmRegisterForm token={slug} />
    </main>
  );
}
