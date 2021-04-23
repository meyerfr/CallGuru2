class BlockOptionsJoin < ApplicationRecord
  belongs_to :content_block
  belongs_to :content_option
end
