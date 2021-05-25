class CreateSummaryItems < ActiveRecord::Migration[6.1]
  def change
    create_table :summary_items, id: :uuid do |t|
      t.references :call, null: false, foreign_key: true, type: :uuid
      t.references :content_block, null: false, foreign_key: true, type: :uuid
      t.integer :order_no

      t.timestamps
    end
  end
end
