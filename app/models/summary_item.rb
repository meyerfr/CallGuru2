class SummaryItem < ApplicationRecord
  belongs_to :call
  belongs_to :content_block
  has_one :simple_answer, dependent: :destroy
  has_many :content_options_summary_items, dependent: :destroy
  has_many :content_options, through: :content_options_summary_items

  accepts_nested_attributes_for :simple_answer, allow_destroy: true
  accepts_nested_attributes_for :content_options_summary_items, allow_destroy: true
end
