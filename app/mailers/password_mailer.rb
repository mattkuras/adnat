class PasswordMailer < ApplicationMailer
    def send_password_reset_email(user)
        @user = user
        mail(to: user.email_address, subject: "Forgot your password?")
    end


end
