# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # include Devise::Controllers::InternalHelpers
  # before_action :configure_sign_in_params, only: [:create]
  # respond_to :json

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   self.resource = warden.authenticate!(auth_options)
  #   set_flash_message(:notice, :signed_in) if is_flashing_format?
  #   sign_in(resource_name, resource)
  #   respond_with(resource) do |format|
  #     format.json { render json: {redirect_url: after_sign_in_path_for(resource)}, status: 200 }
  #   end
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end
  def destroy
    render json: sign_out(resource_name)
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
