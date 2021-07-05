require 'securerandom'
class CallsContentBlockSerializer < ActiveModel::Serializer
  attributes :id, :text, :order_no, :contentable_type, :contentable_id, :react_id, :_destroy, :react_show
  attribute :summary_item, if: :summary_item_condition?
  # belongs_to :contenable, serializer: ContentableSerializer
  has_many :content_blocks_attributes
  belongs_to :content_type, serializer: ContentTypeSerializer

  def content_blocks_attributes
    ActiveModel::Serializer::CollectionSerializer.new(object.content_blocks.order(:created_at), serializer: CallsContentBlockSerializer, call_id: instance_options[:call_id])
  end

  def _destroy
    '0'
  end

  def react_show
    true
  end

  def react_id
    SecureRandom.uuid
  end

  def summary_item
    call = Call.find(instance_options[:call_id])
    present_summary_item = call.summary_items.find_by(content_block_id: object.id)
    summary_item = present_summary_item ? present_summary_item : call.summary_items.new(content_block_id: object.id)


    SummaryItemSerializer.new(summary_item, {content_type_group: object.content_type.group, call_id: instance_options[:call_id], content_block_id: object.id })
  end

  def summary_item_condition?
    self.object.content_type.form_input
  end
end
