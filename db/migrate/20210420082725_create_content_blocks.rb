class CreateContentBlocks < ActiveRecord::Migration[6.1]
  def change
    create_table :content_blocks, id: :uuid do |t|
      t.references :contentable, polymorphic: true, null: false, type: :uuid
      t.references :content_type, null: false, foreign_key: true, type: :uuid
      t.string :text
      t.integer :order_no

      t.timestamps
    end
  end
end
