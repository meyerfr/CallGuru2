class ContentBlock < ApplicationRecord
  self.implicit_order_column = "created_at"
  has_many :content_blocks, as: :contentable
  belongs_to :contentable, polymorphic: true
  belongs_to :content_type
  has_many :block_options_joins, dependent: :destroy
  has_many :content_options, through: :block_options_joins
  accepts_nested_attributes_for :content_options

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
