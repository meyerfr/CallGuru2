class CreateSections < ActiveRecord::Migration[6.1]
  def change
    create_table :sections, id: :uuid do |t|
      t.string :title
      t.text :description
      t.string :status, default: "draft"
      t.integer :order_no
      t.references :playbook, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
