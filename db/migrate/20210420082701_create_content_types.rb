class CreateContentTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :content_types, id: :uuid do |t|
      t.boolean :form_input, default: false
      t.string :group
      t.string :style
      t.boolean :complex, default: false

      t.timestamps
    end
  end
end
