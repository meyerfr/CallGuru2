class Api::V1::PlaybooksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_company, only: [ :index, :create ]
  before_action :set_playbook, only: [ :show, :update ]

  def index
    playbooks = @company.playbooks.map{|playbook|
      playbook.as_json.merge({
        first_section_id: playbook.sections.order(:order_no).first.id
      })
    }
    render json: playbooks
  end

  def create
    render json: playbook
  end

  def show
    playbook = @playbook.as_json.merge({
      first_section_id: @playbook.sections.order(:order_no).first.id
    })
    render json: playbook
  end

  def update
    @playbook.update!(playbooks_params)

    render json: @playbook
  end

  private

  def set_playbook
    @playbook = Playbook.find(params.fetch(:id))
  end

  def set_company
    @company = Company.find(params.fetch(:company_id))
  end

  def playbooks_params
    params.require(:playbook).permit(
      :name,
      :description,
      :status
    )
  end
end
