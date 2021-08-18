class ChangeTextColumnTypeOfUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :content_blocks, :text
    add_column :content_blocks, :text, :jsonb
  end
end
