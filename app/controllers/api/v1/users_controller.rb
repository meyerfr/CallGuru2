class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_company, only: [ :index, :create ]
  before_action :set_user, only: [ :show, :update ]

  def index
    users = @company.users
    render json: users
  end

  def create
    user = @company.users.new(users_params)
    if user.save
      render json: user
    end
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
      :email
    )
  end
end
