class Api::V1::SectionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_playbook, only: [ :index, :create ]
  before_action :set_section, only: [ :show, :update ]

  def index
    render json: @playbook.sections
  end

  def create
    render json: section
  end

  def show
    section = @section.as_json.merge({
      outlines: @section.outlines
    })
    render json: section
  end

  def update
    @section.update!(sections_params)

    render json: @section
  end

  private

  def set_section
    @section = Section.find(params.fetch(:id))
  end

  def set_playbook
    @playbook = Playbook.find(params.fetch(:playbook_id))
  end

  def sections_params
    params.require(:section).permit(
      :title,
      :description,
      :status,
      :order_no,
      :playbook_id
    )
  end
end
