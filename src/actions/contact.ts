import { defineAction } from "astro:actions";
import { z } from "astro:content"
import { nullToEmptyString } from "@/utils/index"

export const contact = {
  sendEmail: defineAction({
    accept: "form",
    input: z.object({
      name: z.preprocess(
        nullToEmptyString,
        z.string().min(1, { message: "El nombre no puede ir vació"})
      ),
      email: z.preprocess(
        nullToEmptyString,
        z.string().min(1, {message: "El email no puede ir vació"}).email({message: "Email no válido"})
      ),
      subject: z.preprocess(
        nullToEmptyString,
        z.string().min(1, {message: "El asunto no puede ir vació"})
      ),
      message: z.preprocess(
        nullToEmptyString,
        z.string().min(20, {message: "El mesaje debe tener mínimo 20 caracteres"})
      ),
    }),
    handler: async (input) => {
      const url = `${import.meta.env.HOME_URL}/wp-json/contact-form-7/v1/contact-forms/137/feedback`

      const formData = new FormData()
      formData.append("your-name", input.name)
      formData.append("your-email", input.email)
      formData.append("your-subject", input.subject)
      formData.append("your-message", input.message)
      formData.append("_wpcf7_unit_tag", "wpcf7-123")

      const res = await fetch(url, {
        method: "POST",
        body: formData
      })
      await res.json();

      return {
        error: false,
        message: "Tu mensaje se envió correctamente"
      }
    }
  })
}
