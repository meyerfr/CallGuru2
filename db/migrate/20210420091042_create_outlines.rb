class CreateOutlines < ActiveRecord::Migration[6.1]
  def change
    create_table :outlines, id: :uuid do |t|
      t.string :title
      t.references :section, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
