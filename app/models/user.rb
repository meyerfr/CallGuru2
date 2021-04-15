class User < ApplicationRecord
  self.implicit_order_column = "created_at"
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  USER_ROLES = ["Account Manager", "Team Manager", "Agent", "CallGuru Admin"]

  belongs_to :company
  validates :first_name, :last_name, presence: true
  validates :role, inclusion: { in: USER_ROLES, message: "must be one of the following #{USER_ROLES.join(", ")}" }, if: proc { |user| user.role.present? }
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
