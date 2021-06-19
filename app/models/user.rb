class User < ApplicationRecord
  attr_reader :raw_invitation_token

  self.implicit_order_column = "created_at"
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  USER_ROLES = ["Account Manager", "Team Manager", "Agent", "CallGuru Admin"]

  belongs_to :company
  has_one_attached :avatar
  has_many :invitations, class_name: self.to_s, as: :invited_by
  has_many :calls
  validates :first_name, :last_name, presence: true
  validates :role, inclusion: { in: USER_ROLES, message: "must be one of the following #{USER_ROLES.join(", ")}" }, if: proc { |user| user.role.present? }
  devise :invitable, :database_authenticatable, :confirmable, :recoverable, :rememberable, :validatable, invite_for: 2.weeks
end
