class SimpleAnswer < ApplicationRecord
  belongs_to :summary_item
  # validates :content, presence: true, allow_blank: false
end
