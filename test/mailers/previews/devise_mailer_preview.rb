# mailer/previews/devise_mailer_preview.rb
class DeviseMailerPreview < ActionMailer::Preview
  def invitation_instructions
    Devise::Mailer.invitation_instructions(User.all.select{|user| user.created_by_invite?}.first, "faketoken")
  end

  def confirmation_instructions
    Devise::Mailer.confirmation_instructions(User.first, {})
  end

  def unlock_instructions
    Devise::Mailer.unlock_instructions(User.first, "faketoken")
  end

  def reset_password_instructions
    Devise::Mailer.reset_password_instructions(User.first, "faketoken")
  end
end
