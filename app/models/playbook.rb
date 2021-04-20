class Playbook < ApplicationRecord
  belongs_to :company
  has_many :sections, dependent: :destroy
  has_many :outlines, through: :sections

  STATUSES = ["draft", "archive", "live"]
  validates :status, inclusion: { in: STATUSES, message: "must be one of the following #{STATUSES.join(", ")}" }, if: proc { |playbook| playbook.status.present? }

  accepts_nested_attributes_for :sections, allow_destroy: true
  validates_associated :sections
end
