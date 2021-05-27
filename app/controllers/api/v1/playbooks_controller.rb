require 'securerandom'

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
    playbook = @company.playbooks.create

    sections = load_sections(playbook)

    playbook = playbook.as_json.merge({
      sections_attributes: sections
    })
    render json: playbook
  end

  def show
    sections = load_sections(@playbook)

    playbook = @playbook.as_json.merge({
      first_section_id: @playbook.sections.order(:order_no).first.id,
      sections_attributes: sections
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
        outlines_attributes: [
          :id,
          :title,
          :order_no,
          :_destroy,
          content_blocks_attributes: [
            :id,
            :text,
            :order_no,
            :_destroy,
            content_options_attributes: [
              :id,
              :name,
              :_destroy
            ]
          ]
        ]
      ]
    )
  end

  def load_sections(playbook)
    sections = playbook.sections.order(:order_no)

    if sections.count.positive?
      destroy = '0'
    else
      destroy = '1'
      new_section = playbook.sections.create
      sections = [new_section]
    end

    return sections.map{ |section|
      outlines = load_outlines(section)
      section.as_json.merge({ outlines_attributes: outlines, _destroy: destroy })
    }
  end

  def load_outlines(section)
    outlines = section.outlines

    if outlines.count.positive?
      destroy = '0'
    else
      destroy = '1'
      new_outline = section.outlines.new(title: '')
      outlines = [new_outline]
    end

    return outlines.map{ |outline|
      content_blocks = load_content_blocks(outline)
      outline.as_json.merge({ content_blocks_attributes: content_blocks, _destroy: destroy, react_id: SecureRandom.uuid })
    }
  end

  def load_content_blocks(outline)
    content_blocks = outline.content_blocks.order(:order_no)

    if content_blocks.count.positive?
      destroy = '0'
    else
      destroy = '1'
      new_content_block = outline.content_blocks.new(text: '')
      content_blocks = [new_content_block]
    end

    return content_blocks.map{ |block|
      content_options = load_content_options(block)
      block.as_json.merge({ content_options_attributes: content_options, _destroy: destroy, react_id: SecureRandom.uuid, content_type: block.content_type })
    }
  end

  def load_content_options(block)
    return [] unless block.content_type.has_content_options?

    content_options = block.content_options

    if content_options.count.positive?
      destroy = '0'
    else
      destroy = '1'
    end

    return content_options.map{ |content_option|
      content_option.as_json.merge({ react_id: SecureRandom.uuid, _destroy: destroy })
    }
  end
end
