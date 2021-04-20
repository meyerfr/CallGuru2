class Outline < ApplicationRecord
  belongs_to :section
  has_many :content_blocks, as: :contentable

  accepts_nested_attributes_for :content_blocks, allow_destroy: true
  validates_associated :content_blocks
end
