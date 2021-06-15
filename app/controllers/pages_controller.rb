class PagesController < ApplicationController
  before_action :authenticate_user!, only: [ :home ]

  def home
    @current_user = current_user
    @current_user = @current_user.as_json.merge({
      company: current_user.company.as_json.merge({
        logo: current_user.company.logo.attached? ? rails_blob_url(current_user.company.logo) : nil
      }),
      avatar: current_user.avatar.attached? ? rails_blob_url(current_user.avatar) : nil
    })
  end
end
