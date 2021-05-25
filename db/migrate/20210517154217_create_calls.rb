class CreateCalls < ActiveRecord::Migration[6.1]
  def change
    create_table :calls, id: :uuid do |t|
      t.string :name
      t.string :customer_name
      t.references :playbook, null: false, foreign_key: true, type: :uuid
      t.references :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
