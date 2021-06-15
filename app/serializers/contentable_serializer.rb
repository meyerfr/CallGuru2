class ContentableSerializer < ActiveModel::Serializer
  attributes :id, :text, :order_no
  has_many :content_blocks, serializer: ShallowContentBlockSerializer
end
