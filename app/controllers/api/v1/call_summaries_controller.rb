class Api::V1::CallSummariesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_call, only: [ :create ]
  before_action :set_call_summary, only: [ :update ]

  def create
    call_summary = @call.call_summary.create(call_summaries_params)
    render json: call_summary
  end

  def update

  end

  private

  def set_call
    @call = Call.find(params.fetch(:call_id))
  end

  def set_call_summary
    @call_summary = CallSummary.find(params.fetch(:call_summary_id))
  end

  def call_summaries_params
    params.require(:call_summary).permit(
      :call_id,
      summary_items_attributes: [:content_block_id, :order_no]
    )
  end
end
