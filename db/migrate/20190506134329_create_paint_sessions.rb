# frozen_string_literal: true

class CreatePaintSessions < ActiveRecord::Migration[5.2]
  # def change
  #   change_table :paint_sessions do |t|
  #     t.string :name
  #     t.string :creator
  #     t.boolean :private
  #     t.boolean :history
  #     t.boolean :authorize
  #     t.integer :participants

  #     # t.timestamps :last_update
  #     t.timestamps
  #   end
  # end

  def up
    create_table :paint_sessions do |t|
      t.string :name
      t.string :creator
      t.boolean :private
      t.boolean :history
      t.boolean :authorize
      t.integer :participants

      t.timestamps
    end
  end

  def down
    drop_table :paint_sessions
  end
end
