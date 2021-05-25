class Api::V1::CallsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_call, only: [ :show, :update ]
  before_action :set_playbook, only: [ :create ]

  # def show
  #   call = @call
  #   playbook = call.playbook
  #   sections = playbook.sections.order(:order_no).map{ |section|
  #     outlines = section.outlines.map{ |outline|
  #       content_blocks = outline.content_blocks.map{|content_block|
  #         content_type = content_block.content_type
  #         merge_object = {
  #           content_options: content_block.content_options,
  #           content_type: content_type
  #         }
  #         if content_type.form_input
  #           # check if call has a summary already. if so check if summaryItem with content_block if pr

  #           summary = call.call_summary
  #           if summary && summary.summary_items.find_by(content_block_id: content_block.id)
  #             present_summary_item = summary.summary_items.find_by(content_block_id: content_block.id)
  #             summary_item = if content_type.complex
  #                               {
  #                                 content_block_id: content_block.id,
  #                                 content_options_attributes: present_summary_item.content_options.collect(&:id)
  #                               }
  #                            else
  #                               {
  #                                 content_block_id: content_block.id,
  #                                 simple_answer: present_summary_item.simple_answer.content
  #                               }
  #                            end
  #           else
  #             summary_item = if content_type.complex
  #               {
  #                 content_block_id: content_block.id,
  #                 content_options_attributes: []
  #               }
  #             else
  #               {
  #                 content_block_id: content_block.id,
  #                 simple_answer: ''
  #               }
  #             end
  #           end
  #           merge_object[:summary_item] = summary_item
  #         end
  #         content_block.as_json.merge(merge_object)
  #       }

  #       outline.as_json.merge({
  #         content_blocks: content_blocks
  #       })
  #     }

  #     section.as_json.merge({
  #       outlines: outlines
  #     })
  #   }
  #   call = call.as_json.merge({
  #     sections: sections
  #   })

  #   render json: call
  # end
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
    render json: @call.update(calls_params)
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
      summary_item = summary_item.as_json.merge({
        content_options_summary_items_attributes: content_options_summary_items.length.positive? ? content_options_summary_items.first : summary_item.content_options_summary_items.new
      })
    when 'multiselect'
      content_options_summary_items = summary_item.content_options_summary_items
      summary_item = summary_item.as_json.merge({
        content_options_summary_items_attributes: content_options_summary_items.length.positive? ? content_options_summary_items : summary_item.content_options_summary_items.new
      })
    when 'input'
      summary_item = summary_item.as_json.merge({
        simple_answer_attributes: summary_item.simple_answer.present? ? summary_item.simple_answer : summary_item.build_simple_answer(content: '')
      })
    end
    return summary_item
  end
end
