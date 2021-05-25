class CallSummary < ApplicationRecord
  belongs_to :call, dependent: :destroy
  has_many :summary_items, dependent: :destroy

  accepts_nested_attributes_for :summary_items, allow_destroy: true
end
