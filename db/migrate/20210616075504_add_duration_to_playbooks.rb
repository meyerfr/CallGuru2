class AddDurationToPlaybooks < ActiveRecord::Migration[6.1]
  def change
    add_column :playbooks, :duration, :integer
  end
end
