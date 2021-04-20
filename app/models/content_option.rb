class ContentOption < ApplicationRecord
  has_many :content_blocks, through: :block_options_joins
end
