class CompanySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :branch, :description, :website, :logo
  has_many :users, serializer: UserSerializer

  def logo
    if object.logo.attached?
      rails_blob_url(object.logo)
    end
  end
end
