class ContentOption < ApplicationRecord
  self.implicit_order_column = "created_at"
  has_many :block_options_joins
  has_many :content_blocks, through: :block_options_joins
end
