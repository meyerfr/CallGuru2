class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.welcome.subject
  #
  def welcome(user)
    @user = user
    email_with_name = %("#{@user.first_name} #{@user.last_name}" <#{@user.email}>)
    mail(to: email_with_name, subject: 'Welcome to CallGuru')
  end
end
