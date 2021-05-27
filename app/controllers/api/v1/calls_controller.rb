class Api::V1::CallsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_call, only: [ :show, :update ]
  before_action :set_playbook, only: [ :create ]

  def show
    @playbook = @call.playbook
    @call = load_call
    render json: @call
  end

  def create
    @call = current_user.calls.create(playbook_id: @playbook.id)
    @call = load_call

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
          :content_option_id,
          :summary_item_id,
          :created_at,
          :updated_at,
          :_destroy
        ]
      ]
    )
  end

  def load_call
    sections = load_call_sections

    @playbook = @playbook.as_json.merge({ sections: sections })

    @call = @call.as_json.merge({
      playbook: @playbook#,
      # call_notes: @call.content_blocks
    })
    return @call
  end

  def load_call_sections
    sections = @playbook.sections.order(:order_no).map{ |section|
      outlines = section.outlines.map{ |outline|
        content_blocks = outline.content_blocks.map{ |block|
          content_type = block.content_type

          if content_type.form_input
            summary_item = load_summary_item(block)

            block.as_json.merge({
              summary_item: summary_item,
              content_options: block.content_options,
              content_type: content_type
            })
          else
            block.as_json.merge({
              content_options: block.content_options,
              content_type: content_type
            })
          end
        }
        outline.as_json.merge({ content_blocks: content_blocks })
      }
      section.as_json.merge({ outlines: outlines })
    }
    return sections
  end

  def load_summary_item(block)
    # present_summary_item = @call.summary_items.select { |summary| summary.id && summary.content_block.id === block.id }.first
    present_summary_item = @call.summary_items.find_by(content_block_id: block.id )

    summary_item = present_summary_item ? present_summary_item : @call.summary_items.new(content_block_id: block.id)


    case block.content_type.group
    when 'select'
      content_options_summary_items = summary_item.content_options_summary_items
      content_options_summary_items_attributes = content_options_summary_items.length.positive? ? content_options_summary_items.first : summary_item.content_options_summary_items.new
      summary_item = summary_item.as_json.merge({
        _destroy: present_summary_item ? '0' : '1',
        content_options_summary_items_attributes: content_options_summary_items_attributes
      })
    when 'multiselect'
      content_options_summary_items = summary_item.content_options_summary_items
      new_content_options_summary_items = []

      block.content_options.each do |option|
        existing_option = content_options_summary_items.find_by(content_option_id: option.id)
        if existing_option
          new_content_options_summary_items << existing_option.as_json.merge({_destroy: '0'})
        else
          new_content_options_summary_items << summary_item.content_options_summary_items.new(content_option_id: option.id).as_json.merge({_destroy: '1'})
        end
      end

      destroy =  '0'
      destroy =  '1' if content_options_summary_items.length < 0

      summary_item = summary_item.as_json.merge({
        _destroy: destroy,
        content_options_summary_items_attributes: new_content_options_summary_items
      })
    when 'input'
      simple_answer_attributes = summary_item.simple_answer.present? ? summary_item.simple_answer: summary_item.build_simple_answer(content: '')
      summary_item = summary_item.as_json.merge({
        _destroy: present_summary_item ? '0' : '1',
        simple_answer_attributes: simple_answer_attributes
      })
    end
    return summary_item
  end
end
