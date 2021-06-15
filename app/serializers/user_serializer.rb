class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :first_name, :last_name, :email, :avatar
  # belongs_to :company, serializer: CompanySerializer

  def avatar
    if self.object.avatar.attached?
      rails_blob_url(object.avatar)
    end
  end
end
