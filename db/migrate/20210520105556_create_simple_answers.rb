class CreateSimpleAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :simple_answers, id: :uuid do |t|
      t.string :content
      t.references :summary_item, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
