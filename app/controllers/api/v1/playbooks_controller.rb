require 'securerandom'

class Api::V1::PlaybooksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_company, only: [ :index, :create ]
  before_action :set_playbook, only: [ :show, :update ]

  def index
    if current_user.role == 'CallGuru Admin'
      render json: Playbook.all, with_playbook_children: false
    else
      render json: @company.playbooks, with_playbook_children: false
    end
  end

  def create
    playbook = @company.playbooks.create

    render json: playbook, with_playbook_children: true, create: true
  end

  def show
    render json: @playbook, with_playbook_children: true
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
      :id,
      :name,
      :description,
      :status,
      sections_attributes: [
        :id,
        :title,
        :status,
        :order_no,
        :_destroy,
        content_blocks_attributes: [
          :id,
          :text,
          :order_no,
          :_destroy,
          content_blocks_attributes: [
            :id,
            :text,
            :order_no,
            :_destroy
          ]
        ]
      ]
    )
  end
end
