class Api::V1::CompaniesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_company, only: [ :show, :update ]

  def index
    companies = Company.all
    companies = companies.map { |company|
      company.as_json.merge({
        users: company.users
      })
    }
    render json: companies
  end

  def create
    company = Company.new(companies_params)
    if company.save
      render json: company
    end
  end

  def show
    render json: @company
  end

  def update
    @company.update!(companies_params)

    render json: @company
  end

  private

  def set_company
    @company = Company.find(params.fetch(:id))
  end

  def companies_params
    params.require(:company).permit(
      :name,
      :website,
      :branch,
      :description,
      user_attibutes: [
        :first_name,
        :last_name,
        :email
      ]
    )
  end
end
