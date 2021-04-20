class CreateBlockOptionsJoin < ActiveRecord::Migration[6.1]
  def change
    create_table :block_options_joins, id: false do |t|
      t.references :content_block, null: false, foreign_key: true, type: :uuid
      t.references :content_option, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
