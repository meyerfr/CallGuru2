class Company < ApplicationRecord
  self.implicit_order_column = "created_at"

  has_many :users, dependent: :destroy
  has_many :playbooks
  accepts_nested_attributes_for :users, allow_destroy: true
  validates_associated :users

  def account_managers
    self.users.where(role: 'Account Manager')
  end

  def agents
    self.users.where(role: 'Agent')
  end
end
