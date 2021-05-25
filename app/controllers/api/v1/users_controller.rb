class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_company, only: [ :index, :create ]
  before_action :set_user, only: [ :show, :update ]

  def index
    users = @company.users
    render json: users
  end

  def create
    user = User.invite!(users_params.as_json.merge({ company_id: @company.id }), current_user) do |user|
      # only send invite when user is not Agent
      user.skip_invitation = user.role === 'Agent' ? false : true
    end

    user = user.as_json.merge({
      accept_user_invitation_url: accept_user_invitation_url(invitation_token: user.raw_invitation_token),
      current_user: current_user
    })
    render json: user
  end

  def show
    render json: @user
  end

  def update
    @user.update!(users_params)

    render json: @user
  end

  private

  def set_user
    @user = User.find(params.fetch(:id))
  end

  def set_company
    @company = Company.find(params.fetch(:company_id))
  end

  def users_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :role
    )
  end
end