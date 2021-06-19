# Preview all emails at http://localhost:3000/rails/mailers/custom_devise_mailer
class CustomDeviseMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/custom_devise_mailer/confirmation_instructions
  def confirmation_instructions
    CustomDeviseMailer.confirmation_instructions(User.first, {})
  end

  # Preview this email at http://localhost:3000/rails/mailers/custom_devise_mailer/reset_password_instructions
  def reset_password_instructions
    CustomDeviseMailer.reset_password_instructions(User.first, {})
  end

  # Preview this email at http://localhost:3000/rails/mailers/custom_devise_mailer/invitation_instructions
  def invitation_instructions
    CustomDeviseMailer.invitation_instructions(User.all.select{|user| user.created_by_invite?}.first, {})
  end

  def password_change
    CustomDeviseMailer.password_change(User.first, {})
  end
end
