class EnableUuid < ActiveRecord::Migration[5.2]
  def change
    def change
      enable_extension 'pgcrypto'
    end
  end
end