class SummaryItemSerializer < ActiveModel::Serializer
  attributes :id, :call_id, :content_block_id, :_destroy
  attribute :content_options_summary_items_attributes, if: :content_option_condition?
  attribute :simple_answer_attributes, if: :simple_answer_condition?

  def content_options_summary_items_attributes
    case instance_options[:content_type_group]
    when 'select'
      content_options_summary_items = object.content_options_summary_items
      return content_options_summary_items.length.positive? ? content_options_summary_items.first : object.content_options_summary_items.new
    when 'multiselect'
      content_options_summary_items = object.content_options_summary_items
      new_content_options_summary_items = []

      object.content_options.each do |option|
        existing_option = content_options_summary_items.find_by(content_option_id: option.id)
        if existing_option
          new_content_options_summary_items << existing_option
        else
          new_content_options_summary_items << summary_item.content_options_summary_items.new(content_option_id: option.id)
        end
      end
      return new_content_options_summary_items
    end
  end

  def simple_answer_attributes
    object.simple_answer.present? ? object.simple_answer: object.build_simple_answer(content: '')
  end

  def _destroy
    object.id ? '0' : '1'
  end

  def content_option_condition?
    ['select', 'multiselect'].include?(instance_options[:content_type_group])
  end

  def simple_answer_condition?
    ['input'].include?(instance_options[:content_type_group])
  end

  def call_id
    instance_options[:call_id]
  end

  def content_block_id
    instance_options[:content_block_id]
  end
end
