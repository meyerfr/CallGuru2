class CreatePlaybooks < ActiveRecord::Migration[6.1]
  def change
    create_table :playbooks, id: :uuid do |t|
      t.string :name
      t.text :description
      t.string :status, default: "draft"
      t.references :company, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
