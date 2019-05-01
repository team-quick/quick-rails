# frozen_string_literal: true

class PaintChannel < ApplicationCable::Channel
  def subscribed
    stream_from "paint_#{params[:room]}"
  end

  def unsubscribed; end

  def chat(message)
    ActionCable.server.broadcast("paint_#{params[:room]}", message)
  end

  def draw(path)
    ActionCable.server.broadcast("paint_#{params[:room]}", path)
  end

  def pointer(pos); end
end
