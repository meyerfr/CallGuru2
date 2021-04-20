class CreateContentTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :content_types, id: :uuid do |t|
      t.string :name

      t.timestamps
    end
  end
end
