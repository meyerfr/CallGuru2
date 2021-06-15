class Api::V1::ContentTypesController < ApplicationController
  before_action :authenticate_user!

  def index
    content_types = ContentType.all
    render json: content_types
  end
end
