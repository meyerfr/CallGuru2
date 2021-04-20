class Section < ApplicationRecord
  belongs_to :playbook
  has_many :outlines

  STATUSES = ["draft", "archive", "live"]
  validates :status, inclusion: { in: STATUSES, message: "must be one of the following #{STATUSES.join(", ")}" }, if: proc { |section| section.status.present? }

  accepts_nested_attributes_for :outlines, allow_destroy: true
  validates_associated :outlines
end
