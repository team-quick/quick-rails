# frozen_string_literal: true

class PaintChannel < ApplicationCable::Channel
  def subscribed
    stream_from "paint_#{params[:room]}"
  end

  def unsubscribed; end

  def hello(data)
    ActionCable.server.broadcast("paint_#{params[:room]}", data['message'])
  end

  def draw(path)
    ActionCable.server.broadcast("paint_#{params[:room]}", path)
  end

  def pointer(pos)
  end

  def chat(payload)
  end
end
