class Section < ApplicationRecord
  belongs_to :playbook
  has_many :content_blocks, as: :contentable

  STATUSES = ["draft", "archive", "live"]
  validates :status, inclusion: { in: STATUSES, message: "must be one of the following #{STATUSES.join(", ")}" }, if: proc { |section| section.status.present? }

  accepts_nested_attributes_for :content_blocks, allow_destroy: true
  validates_associated :content_blocks

  def has_content_blocks?
    true
  end
end
