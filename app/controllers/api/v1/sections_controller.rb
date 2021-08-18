class Api::V1::SectionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_playbook, only: [ :index, :create ]
  before_action :set_section, only: [ :show, :update ]

  def index
    render json: @playbook.sections
  end

  def create
    section = @playbook.sections.create(title: 'untitled')
    render json: section
  end

  def show
    # section = @section.as_json.merge({
    #   outlines: @section.outlines
    # })
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
      :id,
      :title,
      :description,
      :icon,
      :status,
      :order_no,
      :playbook_id,
      :_destroy,
      content_blocks_attributes: [
        :id,
        :contentable_type,
        :contentable_id,
        :content_type_id,
        :order_no,
        :_destroy,
        text: {},
        content_blocks_attributes: [
          :id,
          :contentable_type,
          :contentable_id,
          :content_type_id,
          :order_no,
          :_destroy,
          text: {},
          content_blocks_attributes: [
            :id,
            :contentable_type,
            :contentable_id,
            :content_type_id,
            :order_no,
            :_destroy,
            text: {},
            content_blocks_attributes: [
              :id,
              :contentable_type,
              :contentable_id,
              :content_type_id,
              :order_no,
              :_destroy,
              text: {},
              content_blocks_attributes: [
                :id,
                :contentable_type,
                :contentable_id,
                :content_type_id,
                :order_no,
                :_destroy,
                text: {}
              ]
            ]
          ]
        ]
      ]
    )
  end
end
