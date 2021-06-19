class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :first_name, :last_name, :email, :avatar, :role
  attribute :invitation_sent_at, if: :created_by_invite?
  attribute :invitation_accepted, if: :created_by_invite?
  attribute :invitation_accepted_at, if: :invitation_accepted
  # belongs_to :company, serializer: CompanySerializer

  def avatar
    if object.avatar.attached?
      rails_blob_url(object.avatar)
    end
  end

  def invitation_accepted
    object.invitation_accepted?
  end

  def created_by_invite?
    object.created_by_invite?
  end
end
