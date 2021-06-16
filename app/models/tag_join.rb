class TagJoin < ApplicationRecord
  belongs_to :tag
  belongs_to :tagable, polymorphic: true
end
