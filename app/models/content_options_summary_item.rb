class ContentOptionsSummaryItem < ApplicationRecord
  belongs_to :summary_item
  belongs_to :content_option
end
