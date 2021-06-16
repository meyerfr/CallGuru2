class CreateTagJoins < ActiveRecord::Migration[6.1]
  def change
    create_table :tag_joins, id: :uuid do |t|
      t.references :tag, null: false, foreign_key: true, type: :uuid
      t.references :tagable, polymorphic: true, null: false, type: :uuid

      t.timestamps
    end
  end
end
