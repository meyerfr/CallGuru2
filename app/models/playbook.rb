class Playbook < ApplicationRecord
  belongs_to :company
  belongs_to :owner, class_name: 'User'
  has_many :sections, dependent: :destroy
  self.implicit_order_column = "created_at"

  STATUSES = ["draft", "archive", "live"]
  validates :status, inclusion: { in: STATUSES, message: "must be one of the following #{STATUSES.join(", ")}" }, if: proc { |playbook| playbook.status.present? }

  accepts_nested_attributes_for :sections, allow_destroy: true
  validates_associated :sections
end
