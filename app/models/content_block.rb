class ContentBlock < ApplicationRecord
  belongs_to :contentable, polymorphic: true
  belongs_to :content_type
  has_many :content_options, through: :block_options_joins
end
