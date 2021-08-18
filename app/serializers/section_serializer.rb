require 'securerandom'
class SectionSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :icon, :order_no, :_destroy, :react_id, :playbook_id
  has_many :content_blocks_attributes
  # belongs_to :playbook, serializer: PlaybookSerializer

  def _destroy
    '0'
  end

  def react_id
    SecureRandom.uuid
  end

  def content_blocks_attributes
    content_blocks = object.content_blocks
    if content_blocks.count == 0
      content_blocks = object.content_blocks.new(content_type_id: ContentType.find_by(style: 'paragraph').id)
      # content_blocks.content_type_id = ContentType.find_by(style: 'outline').id
      # content_blocks.content_blocks.new(content_type_id: ContentType.find_by(style: 'paragraph').id)
    end
    ActiveModel::Serializer::CollectionSerializer.new(object.content_blocks, each_serializer: ContentBlockSerializer)
  end
end
