class Company < ApplicationRecord
  self.implicit_order_column = "created_at"

  has_many :users
end
