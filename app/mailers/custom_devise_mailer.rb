class CustomDeviseMailer < Devise::Mailer
  # if self.included_modules.include?(AbstractController::Callbacks)
  #   raise "You've already included AbstractController::Callbacks, remove this line."
  # else
  #   include AbstractController::Callbacks
  # end
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.custom_devise_mailer.confirmation_instructions.subject
  #
  before_action :add_inline_attachment!

  def confirmation_instructions(record, token, opts={})
    super
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.custom_devise_mailer.reset_password_intructions.subject
  #
  def reset_password_instructions(record, token, opts={})
    super
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.custom_devise_mailer.invitation_instructions.subject
  #
  def invitation_instructions(record, token, opts={})
    super
  end

  private
  def add_inline_attachment!
    attachments.inline['logo.svg'] = File.read("#{Rails.root}/app/assets/images/logo_banner_blue.svg")
  end
end
