class ContentBlock < ApplicationRecord
  self.implicit_order_column = "created_at"
  belongs_to :contentable, polymorphic: true
  belongs_to :content_type
  has_many :block_options_joins, dependent: :destroy
  has_many :content_options, through: :block_options_joins
  accepts_nested_attributes_for :content_options
end
