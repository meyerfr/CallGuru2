class AddIconToSections < ActiveRecord::Migration[6.1]
  def change
    add_column :sections, :icon, :string
  end
end
