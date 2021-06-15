class Api::V1::CallsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_call, only: [ :show, :update ]
  before_action :set_playbook, only: [ :create ]

  def show
    render json: @call
  end

  def create
    @call = current_user.calls.create(playbook_id: @playbook.id)

    render json: @call
  end

  def update
    render json: @call.update!(calls_params)
  end

  private

  def set_call
    @call = Call.find(params.fetch(:id))
  end

  def set_playbook
    @playbook = Playbook.find(params.fetch(:playbook_id))
  end

  def calls_params
    params.require(:call).permit(
      :id,
      :name,
      :playbook_id,
      summary_items_attributes: [
        :id,
        :call_id,
        :content_block_id,
        :order_no,
        :created_at,
        :updated_at,
        :_destroy,
        simple_answer_attributes: [
          :id,
          :content,
          :summary_item_id,
          :created_at,
          :updated_at,
          :_destroy
        ],
        content_options_summary_items_attributes: [
          :id,
          :content_block_id,
          :summary_item_id,
          :created_at,
          :updated_at,
          :_destroy
        ]
      ]
    )
  end
end
