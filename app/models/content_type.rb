class ContentType < ApplicationRecord
  has_many :content_blocks

  def has_content_options?
    ['list', 'select', 'multiselect'].include?(self.group)
  end
end
