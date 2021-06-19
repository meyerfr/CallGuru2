require "test_helper"

class CustomDeviseMailerTest < ActionMailer::TestCase
  test "confirmation_instructions" do
    mail = CustomDeviseMailer.confirmation_instructions
    assert_equal "Confirmation instructions", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

  test "reset_password_intructions" do
    mail = CustomDeviseMailer.reset_password_intructions
    assert_equal "Reset password intructions", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

  test "invitation_instructions" do
    mail = CustomDeviseMailer.invitation_instructions
    assert_equal "Invitation instructions", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
