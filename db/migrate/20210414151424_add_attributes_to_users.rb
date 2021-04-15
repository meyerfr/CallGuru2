class AddAttributesToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :role, :string, default: "Agent"
    add_column :users, :job_title, :string
    add_reference :users, :company, null: false, foreign_key: true, type: :uuid
  end
end
