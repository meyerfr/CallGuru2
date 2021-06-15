class CreatePlaybooks < ActiveRecord::Migration[6.1]
  def change
    create_table :playbooks, id: :uuid do |t|
      t.string :name
      t.text :description
      t.string :status, default: "draft"
      t.references :company, null: false, foreign_key: true, type: :uuid
      t.references :owner, index: true, foreign_key: { to_table: :users }, type: :uuid

      t.timestamps
    end
  end
end
