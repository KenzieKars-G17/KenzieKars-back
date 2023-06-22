import { createTransport } from "nodemailer";
import { IemailRequest } from "../interfaces/email.interface";
import { AppError } from "../errors";
import Mailgen from "mailgen";

class EmailService {
  async sendEmail({ to, subject, text }: IemailRequest) {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter
      .sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html: text,
      })
      .then(() => {
        console.log("Email enviado com sucesso");
      })
      .catch((error) => {
        console.log(error);
        throw new AppError("Erro ao enviar email", 500);
      });
  }

  resetPasswordTemplate(
    userName: string,
    userEmail: string,
    token: string
  ) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Equipe KenzieKars",
        link: "http://localhost:3000/",
      },
    });

    const email = {
      body: {
        name: userName,
        intro:
          "Você recebeu este e-mail porque uma solicitação de redefinição de senha para sua conta foi recebida.",
        action: {
          instructions: "Clique no botão abaixo para redefinir sua senha:",
          button: {
            color: "#DC4D2F",
            text: "Redefina sua Senha",
            link: `http://localhost:5173/reset-password/${token}`,
          },
        },
        outro:
          "Se você não solicitou uma redefinição de senha, nenhuma ação adicional é necessária de sua parte.",
      },
    };

    const emailBody = mailGenerator.generate(email);

    const emailTemplate = {
      to: userEmail,
      subject: "Redefina sua senha",
      text: emailBody,
    };

    return emailTemplate;
  }
}

const emailService = new EmailService();

export { emailService };
