class CreateContentOptionsSummaryItems < ActiveRecord::Migration[6.1]
  def change
    create_table :content_options_summary_items, id: :uuid do |t|
      t.references :summary_item, null: false, foreign_key: true, type: :uuid
      t.references :content_block, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
