class ContentBlock < ApplicationRecord
  self.implicit_order_column = "created_at"
  # has_many :child_blocks, class_name: "ContentBlock",
  #                         foreign_key: "parent_block_id"

  # belongs_to :parent_block, class_name: "ContentBlock", optional: true

  has_many :content_blocks, as: :contentable
  belongs_to :contentable, polymorphic: true
  belongs_to :content_type

  accepts_nested_attributes_for :content_blocks, allow_destroy: true
  validates_associated :content_blocks

  def has_content_blocks?
    ['outline', 'list', 'select', 'multiselect'].include?(self.content_type.group)
  end

  # def validate_title
  #   type_name = self.content_type.name
  #   case type_name
  #   when 'default', 'header', 'subheader', 'text', 'number', 'percent', 'date', 'check', 'simple select', 'multiple select', 'toggle'
  #     # title must be present
  #     errors.add(:title, 'Title must be present')
  #   when 'img', 'numbered list', 'bulllet list'
  #     # no title
  #     errors.add(:title, 'Title must be empty')
  #   else
  #     errors.add(:title, "No title specifiaction for #{type_name}")
  #   end
  # end
end
