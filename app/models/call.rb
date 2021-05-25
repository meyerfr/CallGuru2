class Call < ApplicationRecord
  belongs_to :playbook
  belongs_to :user
  has_many :summary_items, dependent: :destroy

  accepts_nested_attributes_for :summary_items, allow_destroy: true

end
