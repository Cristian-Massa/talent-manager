import { sendEmail } from "@/app/services/mailSenderService";
import { getMailTemplates } from "@/app/utils/mailing/getMailTemplates";

export async function sendConfirmationRegister(
  userToken: string,
  confirmationToken: string,
  email: string
) {
  const htmlContet = getMailTemplates("confirmRegistration.html");
  let htmlContentReplaced = htmlContet.replace(
    "{{confirmation_link}}",
    `${process.env.BASE_URL}/register/${userToken}`
  );
  htmlContentReplaced = htmlContentReplaced.replace(
    "{{confirmation_token}}",
    confirmationToken
  );

  await sendEmail(email, htmlContentReplaced);
}
