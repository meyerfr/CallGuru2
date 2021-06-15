require 'securerandom'
class ContentBlockSerializer < ActiveModel::Serializer
  Rails.logger.debug "ContentBlockSerializer #{self}"
  attributes :id, :text, :order_no, :contentable_type, :contentable_id, :react_id, :_destroy, :react_show
  # belongs_to :contenable, serializer: ContentableSerializer
  has_many :content_blocks_attributes
  belongs_to :content_type, serializer: ContentTypeSerializer

  def content_blocks_attributes
    ActiveModel::Serializer::CollectionSerializer.new(object.content_blocks, each_serializer: ContentBlockSerializer)
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
end
