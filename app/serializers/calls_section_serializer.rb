require 'securerandom'
class CallsSectionSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :icon, :order_no, :_destroy, :react_id
  has_many :content_blocks_attributes
  # belongs_to :playbook, serializer: PlaybookSerializer

  def _destroy
    '0'
  end

  def react_id
    SecureRandom.uuid
  end

  def content_blocks_attributes
    ActiveModel::Serializer::CollectionSerializer.new(object.content_blocks, serializer: CallsContentBlockSerializer, call_id: instance_options[:call_id])
  end
end
